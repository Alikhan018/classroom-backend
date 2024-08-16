const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.start();
    this.routes();
  }
  routes() {
    this.app.get("/", (req, res) => {
      res.json({ message: "App is running" });
    });
  }
  start() {
    this.app.listen(3000, () => {
      console.log("Server started at http://localhost:3000");
    });
  }
}

module.exports = Server;
