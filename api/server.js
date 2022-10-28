const express = require("express");
const cors = require("cors");
const Web3 = require("web3");
const mongodb = require("mongodb").MongoClient;
const contract = require("@truffle/contract");
const artifacts = require("./build/contracts/Contacts.json");
const artifacts_escrow = require("./build/contracts/Escrow.json");
const routes = require("./routes");
const { CONTACT_ABI, CONTACT_ADDRESS, ESCROW_ABI } = require("./config");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

if (typeof web3 !== "undefined") {
  var web3 = new Web3(web3.currentProvider);
} else {
  var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

mongodb.connect(
  process.env.MONGOURI,
  {
    useUnifiedTopology: true,
  },
  async (err, client) => {
    const db = client.db("Cluster0");
    const accounts = await web3.eth.getAccounts();
    const contactList = new web3.eth.Contract(
      CONTACT_ABI.CONTACT_ABI,
      CONTACT_ADDRESS.CONTACT_ADDRESS
    );
    const escrowList = new web3.eth.Contract(ESCROW_ABI.ESCROW_ABI);

    routes(app, db, accounts, contactList);
    app.listen(process.env.PORT || 3001, () => {
      console.log("listening on port " + (process.env.PORT || 3001));
    });
  }
);
