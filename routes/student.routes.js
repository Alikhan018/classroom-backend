const express = require("express");
const Controller = require("../controllers/student.controller");

class StudentRoutes {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.get("/", Controller.getAllStudents);
    this.router.get("/count", Controller.countStudents);
    this.router.post("/create", Controller.createStudent);
    this.router.get("/:studentId", Controller.getStudent);
    this.router.delete("/delete/:studentId", Controller.deleteStudent);
    this.router.put("/update/:studentId", Controller.updateStudent);
  }
}

module.exports = new StudentRoutes().router;
