const express = require("express");
const Controller = require("../controllers/features.controller");

class FeatureRouter {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.get(`/`, Controller.getFeaturesByEntityType);
  }
}

module.exports = new FeatureRouter().router;
