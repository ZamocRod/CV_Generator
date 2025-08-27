// server/server.js

// Paso 1: Instalar dependencias en la carpeta /server
// npm install express puppeteer cors

import express from "express";
import puppeteer from "puppeteer";
import cors from "cors";
import fs from "fs/promises";
import path from "path";

const app = express();
const port = 4000; // El backend correrá en el puerto 4000

// Middlewares
app.use(cors()); // Permite que el frontend (en otro puerto) se comunique con este backend
app.use(express.json()); // Permite al servidor entender el JSON que envía React

// Función para generar el HTML del CV con los datos recibidos
const createCvHtml = async (data) => {
  // Leemos la plantilla HTML base
  const templatePath = path.resolve(process.cwd(), "templates/cvTemplate.html");
  let template = await fs.readFile(templatePath, "utf-8"); // Reemplazamos los marcadores de posición con los datos reales

  template = template.replace(
    "{{nombre}}",
    data.nombre || "TU NOMBRE COMPLETO"
  );
  template = template.replace(
    "{{titulo}}",
    data.titulo || "Tu Título Profesional"
  );
  template = template.replace("{{email}}", data.email || "");
  template = template.replace("{{telefono}}", data.telefono || "");
  template = template.replace("{{ubicacion}}", data.ubicacion || "");
  template = template.replace(
    "{{linkedin}}",
    data.linkedin ? `linkedin.com/in/${data.linkedin}` : ""
  );
  template = template.replace(
    "{{linkedin_url}}",
    data.linkedin ? `https://linkedin.com/in/${data.linkedin}` : "#"
  );
  template = template.replace(
    "{{github}}",
    data.github ? `github.com/${data.github}` : ""
  );
  template = template.replace(
    "{{github_url}}",
    data.github ? `https://github.com/${data.github}` : "#"
  ); // Generar secciones dinámicamente

  const generateSection = (title, content) =>
    content
      ? `<section class="cv-seccion"><h3>${title}</h3><p>${content.replace(
          /\n/g,
          "<br>"
        )}</p></section>`
      : "";
  template = template.replace(
    "{{resumen}}",
    generateSection("Resumen Profesional", data.resumen)
  );
  template = template.replace(
    "{{habilidades}}",
    generateSection("Habilidades Técnicas", data.habilidades)
  );

  const generateListSection = (title, items, renderItem) => {
    if (
      !items ||
      items.length === 0 ||
      !items.some((item) => Object.values(item).some((val) => val))
    ) {
      return "";
    }
    return `
            <section class="cv-seccion">
                <h3>${title}</h3>
                ${items.map(renderItem).join("")}
            </section>
        `;
  };

  template = template.replace(
    "{{experiencia}}",
    generateListSection(
      "Experiencia Profesional",
      data.experiencia,
      (exp) => `
        <div class="cv-item">
            <h4><strong>${exp.puesto}</strong> | ${exp.empresa}</h4>
            <h5>${exp.fecha}</h5>
            <ul>${exp.descripcion
        .split("\n")
        .filter((l) => l)
        .map((l) => `<li>${l}</li>`)
        .join("")}</ul>
            ${
        exp.detalles ? `<span class="detalles">${exp.detalles}</span>` : ""
      }
        </div>
    `
    )
  );

  template = template.replace(
    "{{proyectos}}",
    generateListSection(
      "Proyectos Personales",
      data.proyectos,
      (pro) => `
        <div class="cv-item">
             <h4><strong>${pro.nombre}</strong> ${
        pro.link ? `| <a href="${pro.link}">Ver Proyecto</a>` : ""
      }</h4>
             <p>${pro.descripcion.replace(/\n/g, "<br>")}</p>
        </div>
    `
    )
  );

  template = template.replace(
    "{{educacion}}",
    generateListSection(
      "Educación",
      data.educacion,
      (edu) => `
        <div class="cv-item">
            <h4><strong>${edu.titulo}</strong> | ${edu.institucion}</h4>
            <h5>${edu.fecha}</h5>
        </div>
    `
    )
  ); // --- AÑADIDO: Sección de Cursos ---

  template = template.replace(
    "{{cursos}}",
    generateListSection(
      "Cursos y Certificaciones",
      data.cursos,
      (curso) => `
        <div class="cv-item">
            <h4><strong>${curso.titulo}</strong> | ${curso.institucion}</h4>
            <h5>${curso.fecha}</h5>
        </div>
    `
    )
  );

  return template;
};

// El endpoint que recibirá los datos y generará el PDF
app.post("/api/generate-pdf", async (req, res) => {
  console.log("Recibidos datos para generar PDF...");
  try {
    const cvData = req.body;
    const htmlContent = await createCvHtml(cvData); // Iniciar Puppeteer

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage(); // Cargar nuestro HTML en la página virtual

    await page.setContent(htmlContent, { waitUntil: "networkidle0" }); // Generar el PDF

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true, // Importante para que los estilos se apliquen
      margin: {
        top: "20mm",
        right: "20mm",
        bottom: "20mm",
        left: "20mm",
      },
    });

    await browser.close(); // Enviar el PDF de vuelta al frontend

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=cv.pdf");
    res.send(pdfBuffer);
    console.log("PDF generado y enviado exitosamente.");
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    res.status(500).send("Error al generar el PDF.");
  }
});

app.listen(port, () => {
  console.log(`Servidor de PDF corriendo en http://localhost:${port}`);
});
