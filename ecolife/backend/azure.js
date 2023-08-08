const pool = require("./config/dbConfig");

async function createTables(callback) {
  const tables = [
    {
      query:
        "CREATE TABLE IF NOT EXISTS Postcodes (postcode VARCHAR(50), suburb VARCHAR(300));",
      name: "Postcodes",
    },
    {
      query:
        "CREATE TABLE IF NOT EXISTS Electricity (year INTEGER, postcode VARCHAR(50), suburb VARCHAR(300), avg_CO2_kg_per_customer_year FLOAT);",
      name: "Electricity",
    },
    {
      query:
        "CREATE TABLE IF NOT EXISTS Gas (year INTEGER, postcode VARCHAR(50), suburb VARCHAR(300), avg_CO2_kg_per_customer_year FLOAT);",
      name: "Gas",
    },
  ];

  for (let table of tables) {
    try {
      await pool.query(table.query);
      console.log(`Created or ensured the existence of ${table.name} table.`);
    } catch (err) {
      console.error(`Error creating ${table.name} table:`, err);
      throw err;
    }
  }

  callback();
}

module.exports = createTables;
