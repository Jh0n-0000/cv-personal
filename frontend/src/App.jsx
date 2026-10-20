
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

function App() {
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarCV() {
      try {
        const response = await fetch(`${API_URL}/cv`);

        if (!response.ok) {
          throw new Error("No fue posible cargar el perfil.");
        }

        const data = await response.json();
        setCv(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    cargarCV();
  }, []);

  if (loading) {
    return (
      <main className="estado">
        <span className="punto-carga" />
        <p>Preparando perfil profesional...</p>
      </main>
    );
  }

  if (error || !cv) {
    return (
      <main className="estado">
        <span className="estado-icono">!</span>
        <h1>Perfil temporalmente no disponible</h1>
        <p>{error || "No se encontraron datos para mostrar."}</p>
        <p className="ayuda">
          Comprueba que la API y la base de datos estén funcionando.
        </p>
      </main>
    );
  }

  const { persona, formacion } = cv;

  return (
    <main className="pagina">
      <header className="barra-superior">
        <a className="marca" href="#inicio">
          <span className="marca-simbolo">P.</span>
          <span>PERFIL<span className="marca-acento"> / CV</span></span>
        </a>

        <a className="enlace-contacto" href="#formacion">
          Explorar perfil <span aria-hidden="true">↘</span>
        </a>
      </header>

      <section className="presentacion" id="inicio">
        <div className="presentacion-texto">
          <p className="etiqueta">
            <span className="indicador" />
            PERFIL PROFESIONAL
          </p>

          <h1>
            Hola, soy
            <span className="nombre">
              {persona.nombre}
              <br />
              {persona.apellido}
            </span>
          </h1>

          <p className="descripcion">
            Una historia de aprendizaje, formación y nuevos desafíos
            construida paso a paso.
          </p>

          <div className="ubicacion">
            <span aria-hidden="true">⌖</span>
            {persona.ciudad}
          </div>
        </div>

        <div className="retrato-contenedor">
          <div className="retrato-marco">
            <img
              className="retrato"
              src={persona.foto}
              alt={`Retrato de ${persona.nombre} ${persona.apellido}`}
            />
          </div>
          <span className="retrato-sello">EN CONSTANTE<br />EVOLUCIÓN ↗</span>
          <span className="detalle-cuadro" aria-hidden="true" />
        </div>

        <div className="numero-fondo" aria-hidden="true">01</div>
      </section>

      <section className="seccion-formacion" id="formacion">
        <div className="encabezado-seccion">
          <div>
            <p className="etiqueta">01 / TRAYECTORIA</p>
            <h2>Formación<span className="titulo-acento">.</span></h2>
          </div>
          <p className="texto-seccion">
            Conocimientos adquiridos y experiencias que forman parte de mi
            camino profesional.
          </p>
        </div>

        <div className="lista-formacion">
          {formacion.map((item, index) => (
            <article className="tarjeta-formacion" key={`${item.titulo}-${index}`}>
              <span className="formacion-numero">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="formacion-detalle">
                <h3>{item.titulo}</h3>
                <p>{item.institucion}</p>
              </div>

              <span className="formacion-anio">{item.anio}</span>
              <span className="flecha-tarjeta" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <footer className="pie">
        <span>PERFIL PERSONAL <span className="marca-acento">/</span> CV</span>
        <span>Diseñado para crecer y evolucionar.</span>
      </footer>
    </main>
  );
}

export default App;
