const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const retailerAPIs = require('./apiRoutes/retailerRoutes')
const sellerAPIs = require('./apiRoutes/sellerRoutes')
const orderAPIs = require('./apiRoutes/orderRoutes')

const BASE_URL = "http://localhost/3000";
const APIinfo = [];

const app = express();
app.use(express.json());
app.use("/retailers", retailerAPIs.router);
app.use("/sellers", sellerAPIs.router);
app.use("/orders", orderAPIs.router);

APIinfo.push(retailerAPIs.info);
APIinfo.push(sellerAPIs.info);
APIinfo.push(orderAPIs.info);

app.listen(3000);

try {
  mongoose
    .connect(
      "mongodb+srv://CRLAdmin:BongoDB@crl.kicbe9r.mongodb.net/CRL?retryWrites=true&w=majority"
    )
    .then(() => {console.log('Connected to MongoDB')});
} catch (error) {
  console.log(error);
}


app.get("/", function (req, res) {
  res.send(APIinfo);
});