const express = require("express");
const bodyParser = require("body-parser");
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require("web3");
const truffleContract = require("truffle-contract");
const CryptoStation = require("./build/contracts/CryptoStation.json")

const provider = new HDWalletProvider(
    "pause license age vicious orchard melt cushion impose frown crack devote morning",
    "https://ropsten.infura.io/7d7333c8d45e42ae82eb3f44526a0f84"
);

const web3 = new Web3(provider);
const contractAddress = "0xcf9ec8d6e47e2dcf4706b2d817e7ff7c57b82308";
 
// express application
var app = express();
 
// add body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// set routing.
app.use("/api", (function () {
    var router = express.Router();

    router.get("/test", (request, response) => {
        response.json(true);
    });
  
    // POST: /api
    router.post("/balance", (request, response) => {
        var body = request.body;
        if (!body.address || !body.stationId) {
            return response.json(false);
        }
        var address = body.address;
        const balance = async () => {
            return web3.eth.getBalance(address);
        }

        const getBalance = async () => {
            const res = await balance()
            console.log(res)
            response.json(res);
        }
        getBalance();
    });

    router.post("/create", (request, response) => {
        var body = request.body;
        if (!body.address || !body.stationId) {
            return response.json(false);
        }
        var address = body.address;
        console.log(address);

        // const balance = async () => {
        //     // return web3.eth.getBalance("0xc38dd98280c1e3a33bb5b186ba56e0ca5aee06d1");
        //     return web3.eth.getBalance("0xe88c7a642c706c20a2d5a1bad9fc44f35cd3b58c");
        // }

        // const totalSupply = async (instance) => {
        //     return instance.totalSupply.call();
        // }
          
        // const getBalance = async () => {
        //     const res = await balance()
        //     console.log(res)
        // }
          
        // getBalance();

        const Contract = truffleContract(CryptoStation);
        Contract.setProvider(web3.currentProvider);

        Contract.deployed().then(function(instance) {
            const getTotalSupply = async () => {
                const res = await totalSupply(instance);
                console.log(res);
            }
            getTotalSupply();
        })
        response.json(true);
    });
 
    return router;
})());
 
// start web applicaiton.
console.log("start");
// app.listen(3000);
app.listen(process.env.PORT);