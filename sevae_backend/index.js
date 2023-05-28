const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./database/config");
const path = require("path");

require("dotenv").config();
const PORT = process.env.PORT;

const app = express();
require("./swaggerConfig")(app);

dbConnection();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));
app.use("/api/auth/", require("./routes/auth"));

app.listen(PORT, () =>
  console.log(`Servidor corriendo http://localhost:${PORT}`)
);
