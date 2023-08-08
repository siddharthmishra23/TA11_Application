const path = require("path");
const express = require("express");
const cors = require("cors");
const { fileURLToPath } = require("url");
const app = express();
require("dotenv").config();

// As you're not using ES6 import, you won't have access to import.meta.url.
// If you really need the directory and filename, you can utilize the native __dirname and __filename in Node.js without these lines:
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "./dist")));

const db = require("./models");
const electricityRouter = require("./routes/Electricity");
const gasRouter = require("./routes/Gas");
const postcodesRouter = require("./routes/Postcodes");

app.use("/electricity", electricityRouter);
app.use("/gas", gasRouter);
app.use("/postcodes", postcodesRouter);
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

const PORT = process.env.PORT || 3005;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
