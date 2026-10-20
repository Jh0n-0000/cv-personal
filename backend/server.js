
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST || "database",
  user: process.env.DB_USER || "cv_user",
  password: process.env.DB_PASSWORD || "cv_password",
  database: process.env.DB_NAME || "cv_database",
  port: 3306
};

app.get("/cv", async (req, res) => {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    const [personas] = await connection.execute(
      "SELECT id, nombre, apellido, ciudad, foto FROM persona LIMIT 1"
    );

    if (personas.length === 0) {
      return res.status(404).json({
        error: "No se encontraron datos personales"
      });
    }

    const persona = personas[0];

    const [formaciones] = await connection.execute(
      `SELECT titulo, institucion, anio
       FROM formacion
       WHERE persona_id = ?
       ORDER BY anio DESC`,
      [persona.id]
    );

    res.json({
      persona,
      formacion: formaciones
    });
  } catch (error) {
    console.error("Error al consultar el CV:", error.message);

    res.status(500).json({
      error: "No se pudo obtener el curriculum vitae"
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

app.get("/", (req, res) => {
  res.json({
    mensaje: "API del CV personal funcionando",
    endpoint: "/cv"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor backend activo en el puerto ${PORT}`);
});
