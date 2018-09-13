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

const Contract = truffleContract(CryptoStation);
Contract.setProvider(web3.currentProvider);

// set routing.
app.use("/api", (function () {
    var router = express.Router();

    router.get("/test", (request, response) => {
        response.json({message: "ISSHO"});
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
            const res = await balance();
            response.json(res);
        }
        getBalance();
    });

    router.post("/gettoken", (request, response) => {
        var body = request.body;
        if (!body.address || !body.stationId) {
            return response.json(false);
        }
        var address = body.address;

        Contract.deployed().then(function(instance) {
            // 総トークン数取得
            const getBalanceOf = async () => {
                const res = await balanceOf();
                getTokenOfOwnerByIndex(res.c[0]);
            }

            const balanceOf = async () => {
                return instance.balanceOf(address);
            }

            getBalanceOf();

            // tokenひとつひとつ取得
            const getTokenOfOwnerByIndex = async (number) => {
                var array = [];
                for (var i = 0; i < number; i++){                    
                    const res = await tokenOfOwnerByIndex(i);
                    console.log(res.c[0]);
                    const uri = await tokenURI(res.c[0]);
                    console.log(uri);
                    array.push(uri);
                }
                response.json(array);
            }

            const tokenOfOwnerByIndex = async (i) => {
                return instance.tokenOfOwnerByIndex(address, i);
            }

            const tokenURI = async (tokenId) => {
                return instance.tokenURI(tokenId);
            }
        });
    });

    router.post("/create", (request, response) => {
        var body = request.body;
        if (!body.address || !body.stationId) {
            return response.json(false);
        }
        var address = body.address;
        console.log(address);

        Contract.deployed().then(function(instance) {
            const totalSupply = async (instance) => {
                return instance.totalSupply();
            }

            const getTotalSupply = async () => {
                const res = await totalSupply(instance);
                console.log(res);
            }
            getTotalSupply();
        });
        response.json(true);
    });
 
    return router;
})());
 
// start web applicaiton.
console.log("start");
app.listen(3000);
// app.listen(process.env.PORT);