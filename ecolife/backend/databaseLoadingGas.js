const fs = require("fs");
const csv = require("csv-parser");
const { Sequelize } = require("sequelize");
const path = require("path");
require("dotenv").config();
// Importing the configuration
const configPath = path.join(__dirname, "./config/config.json");
const config = require(configPath);

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];
let sequelize;

if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
  sequelize = new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    dbConfig
  );
}

// Import the Gas model from its module.
const Gas = require("./models/gas")(sequelize, Sequelize.DataTypes);

async function populateGasDataFromCsv() {
  const results = [];
  fs.createReadStream("./sqldata/new_gas.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      // Assuming your CSV has columns named 'year', 'postcode', 'suburb', and 'emissionPerYear'
      for (const item of results) {
        try {
          await Gas.create({
            year: item.year,
            postcode: item.postcode,
            suburb: item.suburb,
            emissionPerYear: parseFloat(item.avg_CO2_kg_per_customer_year), // Ensure this field is a float
          });
          console.log(
            `Inserted ${item.year} - ${item.postcode} - ${item.suburb}`
          );
        } catch (error) {
          console.error(
            `Failed to insert ${item.year} - ${item.postcode} - ${item.suburb}: ${error.message}`
          );
        }
      }
      console.log("Data population completed!");
      sequelize.close();
    });
}

populateGasDataFromCsv();
