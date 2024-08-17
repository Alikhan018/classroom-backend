const express = require("express");
const Controller = require("../controllers/teacher.controller");

class TeacherRoutes {
  constructor() {
    this.router = express.Router();
    this.routes();
  }
  routes() {
    this.router.get(`/`, Controller.getAllTeachers);
    this.router.get(`/count`, Controller.countTeachers);
    this.router.post(`/create`, Controller.createTeacher);
    this.router.get(`/:teacherId`, Controller.getTeacher);
    this.router.put(`/update/:teacherId`, Controller.updateTeacher);
    this.router.delete(`/delete/:teacherId`, Controller.deleteTeacher);
  }
}

module.exports = new TeacherRoutes().router;
