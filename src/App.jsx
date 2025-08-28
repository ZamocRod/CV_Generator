import React, { useState, useEffect, useRef } from "react";

// --- Iconos SVG para una mejor UI ---
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {" "}
    <line x1="12" y1="5" x2="12" y2="19"></line>{" "}
    <line x1="5" y1="12" x2="19" y2="12"></line>{" "}
  </svg>
);
const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {" "}
    <polyline points="3 6 5 6 21 6"></polyline>{" "}
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>{" "}
    <line x1="10" y1="11" x2="10" y2="17"></line>{" "}
    <line x1="14" y1="11" x2="14" y2="17"></line>{" "}
  </svg>
);
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {" "}
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>{" "}
  </svg>
);

// --- Plantilla de Datos Inicial ---
const initialCvData = {
  nombre: "",
  titulo: "",
  email: "",
  telefono: "",
  ubicacion: "",
  linkedin: "",
  github: "",
  resumen: "",
  habilidades: "",
  experiencia: [
    { puesto: "", empresa: "", fecha: "", descripcion: "", detalles: "" },
  ],
  proyectos: [{ nombre: "", link: "", descripcion: "" }],
  educacion: [{ titulo: "", institucion: "", fecha: "" }],
  cursos: [{ titulo: "", institucion: "", fecha: "" }],
};

// --- Componente: Vista Previa del CV ---
const CVPreview = ({ data }) => {
  // Safeguard against data being undefined
  if (!data) {
    return (
      <div className="bg-white w-[210mm] min-h-[297mm] p-[20mm] shadow-lg text-center">
        <p>Selecciona una versión para ver la vista previa.</p>
      </div>
    );
  }

  return (
    <div
      id="cv-container"
      className="bg-white w-[210mm] min-h-[297mm] p-[20mm] shadow-lg text-[#333] font-sans text-sm leading-relaxed"
    >
      <header className="text-center border-b-2 border-gray-200 pb-2.5 mb-5">
        <h1 className="text-3xl font-bold tracking-wider uppercase">
          {data.nombre || "TU NOMBRE COMPLETO"}
        </h1>

        <h2 className="text-lg font-normal text-gray-600 mt-1">
          {data.titulo || "Tu Título Profesional"}
        </h2>

        <div className="text-xs text-gray-700 mt-2 leading-snug">
          <div>
            {data.email} {data.telefono && `| ${data.telefono}`}
            {data.ubicacion && `| ${data.ubicacion}`}
          </div>

          <div>
            {data.linkedin && (
              <a
                href={`https://linkedin.com/in/${data.linkedin}`}
                className="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >{`linkedin.com/in/${data.linkedin}`}</a>
            )}
            {data.github && ` | `}
            {data.github && (
              <a
                href={`https://github.com/${data.github}`}
                className="text-blue-600"
                target="_blank"
                rel="noopener noreferrer"
              >{`github.com/${data.github}`}</a>
            )}
          </div>
        </div>
      </header>

      {data.resumen && (
        <section className="mb-5">
          <h3 className="text-lg font-bold border-b border-gray-200 pb-1 mb-2.5">
            Resumen Profesional
          </h3>
          <p className="text-justify whitespace-pre-wrap">{data.resumen}</p>
        </section>
      )}

      {data.habilidades && (
        <section className="mb-5">
          <h3 className="text-lg font-bold border-b border-gray-200 pb-1 mb-2.5">
            Habilidades Técnicas
          </h3>

          <p className="text-justify whitespace-pre-wrap">{data.habilidades}</p>
        </section>
      )}

      {data.experiencia && data.experiencia.some((e) => e.puesto) && (
        <section className="mb-5">
          <h3 className="text-lg font-bold border-b border-gray-200 pb-1 mb-2.5">
            Experiencia Profesional
          </h3>

          {data.experiencia.map(
            (exp, index) =>
              exp.puesto && (
                <div key={index} className="mb-4">
                  <h4 className="text-base font-bold">
                    <strong>{exp.puesto}</strong> | {exp.empresa}
                  </h4>

                  <h5 className="text-sm italic text-gray-500 mb-2">
                    {exp.fecha}
                  </h5>

                  <ul className="list-disc list-inside">
                    {exp.descripcion
                      .split("\n")
                      .filter((line) => line.trim() !== "")
                      .map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                  </ul>

                  <span className="text-sm text-gray-500 ml-4">
                    {exp.detalles}
                  </span>
                </div>
              )
          )}
        </section>
      )}

      {data.proyectos && data.proyectos.some((p) => p.nombre) && (
        <section className="mb-5">
          <h3 className="text-lg font-bold border-b border-gray-200 pb-1 mb-2.5">
            Proyectos Personales
          </h3>

          {data.proyectos.map(
            (pro, index) =>
              pro.nombre && (
                <div key={index} className="mb-4">
                  <h4 className="text-base font-bold">
                    <strong>{pro.nombre}</strong>

                    {pro.link && (
                      <>
                        {" | "}
                        <a
                          href={pro.link}
                          className="text-blue-600"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver Proyecto
                        </a>
                      </>
                    )}
                  </h4>
                  <p className="whitespace-pre-wrap">{pro.descripcion}</p>
                </div>
              )
          )}
        </section>
      )}
      {data.educacion && data.educacion.some((e) => e.titulo) && (
        <section>
          <h3 className="text-lg font-bold border-b border-gray-200 pb-1 mb-2.5">
            Educación
          </h3>

          {data.educacion.map(
            (edu, index) =>
              edu.titulo && (
                <div key={index} className="mb-4">
                  <h4 className="text-base font-bold">
                    <strong>{edu.titulo}</strong> |{edu.institucion}
                  </h4>
                  <h5 className="text-sm italic text-gray-500">{edu.fecha}</h5>
                </div>
              )
          )}
        </section>
      )}
      {data.cursos && data.cursos.some((e) => e.titulo) && (
        <section>
          <h3 className="text-lg font-bold border-b border-gray-200 pb-1 mb-2.5">
            Cursos
          </h3>

          {data.cursos.map(
            (edu, index) =>
              edu.titulo && (
                <div key={index} className="mb-4">
                  <h4 className="text-base font-bold">
                    <strong>{edu.titulo}</strong> |{edu.institucion}
                  </h4>
                  <h5 className="text-sm italic text-gray-500">{edu.fecha}</h5>
                </div>
              )
          )}
        </section>
      )}
    </div>
  );
};

// --- Componente para gestionar las versiones ---
const VersionManager = ({
  versions,
  activeIndex,
  onSelect,
  onAdd,
  onDelete,
  onRename,
}) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (editingIndex !== null && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingIndex]);

  const handleRename = (index) => {
    setEditingIndex(index);
    setEditingTitle(versions[index].title);
  };

  const handleSaveRename = (index) => {
    if (editingTitle.trim()) {
      onRename(index, editingTitle.trim());
    }
    setEditingIndex(null);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      handleSaveRename(index);
    } else if (e.key === "Escape") {
      setEditingIndex(null);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-700 mb-2">Versiones de CV</h2>
      <div className="flex items-center gap-2 pb-2 overflow-x-auto">
        {versions.map((version, index) => (
          <div key={version.id} className="relative group">
            {editingIndex === index ? (
              <input
                ref={inputRef}
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                onBlur={() => handleSaveRename(index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="px-4 py-2 text-sm border-2 border-blue-500 rounded-lg focus:outline-none"
              />
            ) : (
              <button
                onClick={() => onSelect(index)}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-200 ease-in-out whitespace-nowrap ${
                  index === activeIndex
                    ? "bg-blue-600 text-white font-bold shadow-md"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {version.title}
              </button>
            )}
            {editingIndex !== index && index === activeIndex && (
              <div className="absolute -top-2 -right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleRename(index)}
                  className="p-1 bg-gray-700 text-white rounded-full hover:bg-gray-900"
                >
                  <EditIcon />
                </button>
                {versions.length > 1 && (
                  <button
                    onClick={() => onDelete(index)}
                    className="p-1 bg-red-500 text-white rounded-full hover:bg-red-700"
                  >
                    <TrashIcon />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        <button
          onClick={onAdd}
          className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 flex items-center justify-center shadow-sm"
          title="Añadir nueva versión"
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
};

// --- Componente Principal de la Aplicación ---
export default function App() {
  const [versions, setVersions] = useState(() => {
    try {
      // 1. Intenta cargar el nuevo sistema de versiones
      const savedVersions = localStorage.getItem("cvBuilderVersions");
      if (savedVersions) {
        return JSON.parse(savedVersions);
      }

      // 2. Si no existe, intenta migrar desde el sistema antiguo
      const oldSavedData = localStorage.getItem("cvData-react");
      if (oldSavedData) {
        return [
          {
            id: Date.now(),
            title: "Versión 1",
            data: JSON.parse(oldSavedData),
          },
        ];
      }

      // 3. Si no hay nada, crea la primera versión por defecto
      return [
        {
          id: Date.now(),
          title: "Versión 1",
          data: initialCvData,
        },
      ];
    } catch (error) {
      console.error("Error al cargar datos de localStorage:", error);
      return [{ id: Date.now(), title: "Versión 1", data: initialCvData }];
    }
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Guardar todas las versiones en localStorage cuando cambien
  useEffect(() => {
    try {
      localStorage.setItem("cvBuilderVersions", JSON.stringify(versions));
    } catch (error) {
      console.error("Error al guardar datos en localStorage:", error);
    }
  }, [versions]);

  const currentCvData = versions[activeIndex]?.data;

  // --- Manejadores de Estado para la versión activa ---
  const updateCurrentCvData = (newData) => {
    const newVersions = [...versions];
    newVersions[activeIndex] = { ...newVersions[activeIndex], data: newData };
    setVersions(newVersions);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...currentCvData, [name]: value };
    updateCurrentCvData(updatedData);
  };

  const handleDynamicChange = (section, index, e) => {
    const { name, value } = e.target;
    const updatedSection = [...currentCvData[section]];
    updatedSection[index] = { ...updatedSection[index], [name]: value };
    const updatedData = { ...currentCvData, [section]: updatedSection };
    updateCurrentCvData(updatedData);
  };

  const addDynamicItem = (section) => {
    const newItem =
      section === "experiencia"
        ? { puesto: "", empresa: "", fecha: "", descripcion: "", detalles: "" }
        : section === "proyectos"
        ? { nombre: "", link: "", descripcion: "" }
        : section === "educacion"
        ? { titulo: "", institucion: "", fecha: "" }
        : { titulo: "", institucion: "", fecha: "" };

    const updatedSection = [...(currentCvData[section] || []), newItem];
    const updatedData = { ...currentCvData, [section]: updatedSection };
    updateCurrentCvData(updatedData);
  };

  const removeDynamicItem = (section, index) => {
    const updatedSection = currentCvData[section].filter((_, i) => i !== index);
    const updatedData = { ...currentCvData, [section]: updatedSection };
    updateCurrentCvData(updatedData);
  };

  // --- Manejadores de Versiones ---
  const handleAddVersion = () => {
    const newVersion = {
      id: Date.now(),
      title: `Versión ${versions.length + 1}`,
      // Clona profundamente los datos de la versión activa para evitar referencias compartidas
      data: JSON.parse(JSON.stringify(currentCvData)),
    };
    setVersions([...versions, newVersion]);
    setActiveIndex(versions.length); // Cambia a la nueva versión creada
  };

  const handleDeleteVersion = (indexToDelete) => {
    if (versions.length <= 1) {
      alert("No puedes eliminar la única versión existente.");
      return;
    }
    const newVersions = versions.filter((_, index) => index !== indexToDelete);
    // Si el índice activo se ve afectado, ajústalo
    if (activeIndex >= indexToDelete) {
      setActiveIndex(Math.max(0, activeIndex - 1));
    }
    setVersions(newVersions);
  };

  const handleRenameVersion = (index, newTitle) => {
    const newVersions = [...versions];
    newVersions[index].title = newTitle;
    setVersions(newVersions);
  };

  // --- Lógica de Exportación a PDF con Puppeteer ---
  const handleExportPDF = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentCvData),
      });

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.statusText}`);
      }

      const pdfBlob = await response.blob();
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `CV_${
        currentCvData.nombre.replace(" ", "_") || "candidato"
      }.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert(
        "Hubo un error al generar el PDF. Asegúrate de que el servidor backend esté corriendo. Revisa la consola para más detalles."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      <div className="w-[450px] bg-white p-6 overflow-y-auto h-screen">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Constructor de CV
          </h1>
          <p className="text-sm text-gray-500">
            Tus datos se guardan automáticamente.
          </p>
        </header>

        <VersionManager
          versions={versions}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
          onAdd={handleAddVersion}
          onDelete={handleDeleteVersion}
          onRename={handleRenameVersion}
        />

        {currentCvData && (
          <form>
            <fieldset className="mb-4 border border-gray-200 p-4 rounded-lg">
              <legend className="font-bold text-blue-600 px-2">
                Información Personal
              </legend>

              <input
                name="nombre"
                value={currentCvData.nombre}
                onChange={handleChange}
                placeholder="Nombre Completo"
                className="w-full p-2 mb-2 border rounded"
              />

              <input
                name="titulo"
                value={currentCvData.titulo}
                onChange={handleChange}
                placeholder="Título Profesional"
                className="w-full p-2 mb-2 border rounded"
              />

              <input
                name="email"
                value={currentCvData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 mb-2 border rounded"
              />

              <input
                name="telefono"
                value={currentCvData.telefono}
                onChange={handleChange}
                placeholder="Teléfono"
                className="w-full p-2 mb-2 border rounded"
              />

              <input
                name="ubicacion"
                value={currentCvData.ubicacion}
                onChange={handleChange}
                placeholder="Ubicación"
                className="w-full p-2 mb-2 border rounded"
              />

              <input
                name="linkedin"
                value={currentCvData.linkedin}
                onChange={handleChange}
                placeholder="Usuario de LinkedIn"
                className="w-full p-2 mb-2 border rounded"
              />

              <input
                name="github"
                value={currentCvData.github}
                onChange={handleChange}
                placeholder="Usuario de GitHub"
                className="w-full p-2 border rounded"
              />
            </fieldset>

            <fieldset className="mb-4 border border-gray-200 p-4 rounded-lg">
              <legend className="font-bold text-blue-600 px-2">
                Resumen Profesional
              </legend>

              <textarea
                name="resumen"
                value={currentCvData.resumen}
                onChange={handleChange}
                placeholder="Describe tu perfil..."
                rows="5"
                className="w-full p-2 border rounded"
              ></textarea>
            </fieldset>
            <fieldset className="mb-4 border border-gray-200 p-4 rounded-lg">
              <legend className="font-bold text-blue-600 px-2">
                Habilidades Técnicas
              </legend>

              <textarea
                name="habilidades"
                value={currentCvData.habilidades}
                onChange={handleChange}
                placeholder="Lenguajes: Python, JavaScript..."
                rows="5"
                className="w-full p-2 border rounded"
              ></textarea>
            </fieldset>
            {["experiencia", "proyectos", "educacion", "cursos"].map(
              (section) => (
                <fieldset
                  key={section}
                  className="mb-4 border border-gray-200 p-4 rounded-lg"
                >
                  <legend className="font-bold text-blue-600 px-2 capitalize">
                    {section.replace("_", " ")}
                  </legend>

                  {currentCvData[section] &&
                    currentCvData[section].map((item, index) => (
                      <div
                        key={index}
                        className="border-dashed border-gray-300 border p-3 mb-3 rounded relative"
                      >
                        {Object.keys(item).map((key) => {
                          const placeholderText =
                            key.charAt(0).toUpperCase() + key.slice(1);
                          if (key === "descripcion") {
                            return (
                              <textarea
                                key={key}
                                name={key}
                                value={item[key]}
                                onChange={(e) =>
                                  handleDynamicChange(section, index, e)
                                }
                                placeholder={placeholderText}
                                rows="4"
                                className="w-full p-2 mb-2 border rounded"
                              ></textarea>
                            );
                          } else {
                            return (
                              <input
                                key={key}
                                name={key}
                                value={item[key]}
                                onChange={(e) =>
                                  handleDynamicChange(section, index, e)
                                }
                                placeholder={placeholderText}
                                className="w-full p-2 mb-2 border rounded"
                              />
                            );
                          }
                        })}
                        <button
                          type="button"
                          onClick={() => removeDynamicItem(section, index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                    ))}
                  <button
                    type="button"
                    onClick={() => addDynamicItem(section)}
                    className="w-full p-2 mt-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 flex items-center justify-center gap-2"
                  >
                    <PlusIcon /> Añadir {section.replace("_", " ")}
                  </button>
                </fieldset>
              )
            )}
          </form>
        )}
        <div className="mt-6">
          <button
            onClick={handleExportPDF}
            disabled={isLoading || !currentCvData}
            className="w-full p-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isLoading ? "Generando PDF..." : "Exportar a PDF"}
          </button>
        </div>
      </div>
      <div className="flex-1 p-10 bg-gray-100 flex justify-center">
        <CVPreview data={currentCvData} />
      </div>
    </div>
  );
}
