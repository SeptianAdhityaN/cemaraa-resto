const pool = require("./db");
const data = require("./menus.json");

let newData = data.map((el) => {
  return `('${el.nama}', '${el.deskripsi}', ${el.harga}, '${el.path_gambar}', '${el.kategori}', ${el.ketersediaan})`;
});

let newDataToInsert = newData.join(",");

let seedDataQuery = `
  INSERT INTO Menus ("nama", "deskripsi", "harga", "path_gambar", "kategori", "ketersediaan")
  VALUES ${newDataToInsert}
`;

async function runSeed() {
  try {
    await pool.query(seedDataQuery);
    console.log("Success seed table menus");
  } catch (error) {
    console.log(error);
  }
}

runSeed();
