const pool = require("./db");

let createTableMenus = `
  CREATE TABLE Menus (
  "id" SERIAL PRIMARY KEY, 
  "nama" VARCHAR(255),
  "deskripsi" TEXT,
  "harga" NUMERIC(10,2),
  "path_gambar" TEXT, 
  "kategori" VARCHAR(50),
  "ketersediaan" BOOLEAN
);
`;

async function runSetup() {
  try {
    await pool.query(createTableMenus);
    console.log("Success setup table menus");
  } catch (error) {
    console.log(error);
  }
}

runSetup();
