const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const retailerAPIs = require("./apiRoutes/retailerRoutes");
const sellerAPIs = require("./apiRoutes/sellerRoutes");
const orderAPIs = require("./apiRoutes/orderRoutes");
const mailAPIs = require("./apiRoutes/mailerRoutes");
const cors = require("cors");

const BASE_URL = "http://localhost:8000/";
const APIinfo = [];

const app = express();
app.use(cors());
app.use(express.json());
app.use("/retailers", retailerAPIs.router);
app.use("/sellers", sellerAPIs.router);
app.use("/orders", orderAPIs.router);
app.use("/mail", mailAPIs.router);

APIinfo.push(retailerAPIs.info);
APIinfo.push(sellerAPIs.info);
APIinfo.push(orderAPIs.info);
APIinfo.push(mailAPIs.info);

app.listen(8000);

try {
  mongoose
    .connect(
      "mongodb+srv://CRLAdmin:BongoDB@crl.kicbe9r.mongodb.net/CRL?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Connected to MongoDB");
    });
} catch (error) {
  console.log(error);
}

app.get("/", function (req, res) {
  console.log("get api called")
  for (section of APIinfo) {
    for (api in section) {
      for (entry of section[api]) {
        entry.route = BASE_URL + entry.route;
      }
    }
  }
  res.send(APIinfo);
});
