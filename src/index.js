"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const typeorm_1 = require("typeorm");
const Product_1 = require("./entity/Product");
const Prodan_1 = require("./entity/Prodan");
const Balance_1 = require("./entity/Balance");
require("reflect-metadata");
const app = express();
app.use(cors());
typeorm_1.createConnection({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123",
    database: "shop",
    entities: [
        Product_1.Product,
        Prodan_1.Prodan,
        Balance_1.Balance
    ],
    synchronize: true,
    logging: false
}).then((connection) => __awaiter(this, void 0, void 0, function* () {
    let pr = new Product_1.Product();
    let pn = new Prodan_1.Prodan();
    let bl = new Balance_1.Balance();
    let productRepository = connection.getRepository(Product_1.Product);
    let prodanRepository = connection.getRepository(Prodan_1.Prodan);
    let blrep = connection.getRepository(Balance_1.Balance);
    let product = yield productRepository.find();
    let prodano = yield prodanRepository.find();
    let bll = yield blrep.find();
    app.use(bodyParser.urlencoded({ extended: false }));
    let goods = [];
    for (let el of product) {
        goods.push(el.name);
    }
    let balance = bll[0].balance;
    app.post("/product", (req, res) => {
        if (req.body.name === undefined || req.body.price === undefined || req.body.manufacturer === undefined || req.body.name === "" || req.body.price === "" || req.body.manufacturer === "") {
            return res.status(400).send({
                message: "Не все поля заполнены."
            });
        }
        for (let el of product) {
            if (el.name === req.body.name) {
                return res.status(400).send({
                    message: "Товар с таким именем уже существует."
                });
            }
        }
        if (!isNaN(Number(req.body.price)) && Number(req.body.price) >= 0) {
            product.push({
                id: product.length + 1,
                name: req.body.name,
                manufacturer: req.body.manufacturer,
                price: Number(req.body.price),
                number_sales: 0
            });
            pr.name = req.body.name;
            pr.number_sales = 0;
            pr.manufacturer = req.body.manufacturer;
            pr.id = product.length;
            pr.price = Number(req.body.price);
            productRepository.save(pr);
        }
        else {
            return res.status(400).send({
                message: "Цена не число или отрицательна."
            });
        }
        goods.push(req.body.name);
        res.send("OK");
    });
    app.get("/product", (req, res) => {
        if (req.query.name === undefined || req.query.name === "") {
            return res.status(400).send({
                message: "Имя не передано."
            });
        }
        for (let el of product) {
            if (el.name === req.query.name) {
                return res.send({
                    manufacturer: el.manufacturer,
                    price: el.price,
                    number_sales: el.number_sales
                });
            }
        }
        res.status(400).send({
            message: "Товар с таким именем не существует."
        });
    });
    app.delete("/product", (req, res) => {
        if (req.query.name === undefined || req.query.name === "") {
            return res.status(400).send({
                message: "Имя не передано."
            });
        }
        for (let el of product) {
            if (el.name === req.query.name) {
                pr.name = el.name;
                pr.number_sales = el.number_sales;
                pr.manufacturer = el.manufacturer;
                pr.id = el.id;
                pr.price = Number(el.price);
                productRepository.remove(pr);
                /* let prdel = productRepository.findOne(product.indexOf(el));
                 productRepository.remove(prdel);*/
                product.splice(product.indexOf(el), 1);
                goods.splice(goods.indexOf(el.name), 1);
                return res.send("OK");
            }
        }
        res.status(400).send({
            message: "Товар с таким именем не существует."
        });
    });
    app.post("/order", (req, res) => {
        if (req.query.name === undefined || req.query.name === "") {
            return res.status(400).send({
                message: "Имя не передано."
            });
        }
        for (let el of product) {
            if (el.name === req.query.name) {
                balance = balance + el.price;
                bl.id = 1;
                bl.balance = balance;
                blrep.save(bl);
                el.number_sales++;
                pr.name = el.name;
                pr.number_sales = el.number_sales;
                pr.manufacturer = el.manufacturer;
                pr.id = el.id;
                pr.price = Number(el.price);
                productRepository.save(pr);
                prodano.push({ id: prodano.length + 1, name: el.name, date: String(new Date()), price: el.price });
                pn.id = prodano.length;
                pn.name = el.name;
                pn.date = String(new Date());
                pn.price = el.price;
                prodanRepository.save(pn);
                return res.send("OK");
            }
        }
        res.status(400).send({
            message: "Товар с таким именем не существует."
        });
    });
    app.get("/order", (req, res) => {
        if (prodano.length === 0) {
            return res.status(400).send({
                message: "Ничего не куплено."
            });
        }
        res.send(prodano);
    });
    app.get("/goods", (req, res) => {
        if (goods.length === 0) {
            return res.status(400).send({
                message: "Нет товаров."
            });
        }
        res.send(goods);
    });
    app.get("/balance", (req, res) => {
        res.send({ balance: balance });
    });
    app.listen(3000, () => console.log("started"));
})).catch(error => console.log(error));
//# sourceMappingURL=index.js.map