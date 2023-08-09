require("dotenv").config();
const createTables = require("./azure");

const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "./dist")));

const electricityRouter = require("./routes/Electricity");
const gasRouter = require("./routes/Gas");
const postcodesRouter = require("./routes/Postcodes");

app.use("/electricity", electricityRouter);
app.use("/gas", gasRouter);
app.use("/postcodes", postcodesRouter);
//app.get(/^(?!\/api).+/, (req, res) => {
// res.sendFile(path.join(__dirname, "./dist/index.html"));
//});
const PORT = process.env.PORT || 3001;
createTables(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
