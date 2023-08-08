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

// Import the Postcodes model from its module.
const Postcodes = require("./models/postCodes")(sequelize, Sequelize.DataTypes);

async function populateDataFromCsv() {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream("./sqldata/suburb.csv")
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        const promises = results.map(async (item) => {
          try {
            await Postcodes.create({
              postcode: item.postcode,
              suburb: item.suburb,
            });
            console.log(`Inserted ${item.postcode} - ${item.suburb}`);
          } catch (error) {
            console.error(
              `Failed to insert ${item.postcode} - ${item.suburb}: ${error.message}`
            );
          }
        });
        try {
          await Promise.all(promises);
          console.log("Data population completed!");
          resolve();
        } catch (e) {
          reject(e);
        }
      });
  });
}

populateDataFromCsv()
  .then(() => sequelize.close())
  .catch((err) => {
    console.error("Error populating data:", err);
    sequelize.close();
  });
