const express = require("express");
const Controller = require("../controllers/home.controller");

class HomeRouter {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.get(`/`, Controller.App)
    this.router.post(`/login/auth`, Controller.loginAuth);
  }
}

module.exports = new HomeRouter().router;