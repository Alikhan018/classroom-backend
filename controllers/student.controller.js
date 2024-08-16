const { where } = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../models");

class StudentController {
  constructor() {}
  static async getStudent(req, res) {
    const studentId = req.params.studentId;
    try {
      const student = await db.Student.findOne({
        where: { RollNo: studentId },
        include: [
          {
            model: db.User,
            as: "users",
            include: [
              {
                model: db.Feature,
                as: "features",
              },
              {
                model: db.Role,
                as: "roles",
                include: [
                  {
                    model: db.Feature,
                    as: "features",
                  },
                ],
              },
              {
                model: db.Group,
                as: "groups",
                include: [
                  {
                    model: db.Feature,
                    as: "features",
                  },
                ],
              },
            ],
          },
        ],
      });
      res.json({
        status: "success",
        data: student,
      });
    } catch (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
  }
  static async getAllStudents(req, res) {
    try {
      const students = await db.Student.findAll();
      res.json({
        status: "success",
        data: students,
      });
    } catch (err) {
      res.json({
        status: "error",
        message: err.message,
      });
    }
  }
  static async createStudent(req, res) {
    const { email, password, name, age, address } = req.body;
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = await db.User.create({
        email,
        password: hashedPassword,
      });
      await db.UserRole.create({
        userId: user.dataValues.id,
        roleId: 1,
      });
      await db.UserGroup.create({
        userId: user.dataValues.id,
        groupId: 1,
      });
      await db.Student.create({
        userId: user.dataValues.id,
        Name: name,
        Age: age,
        Address: address,
      });
      res.json({
        status: "success",
      });
    } catch (err) {
      console.log(err);
      res.json({
        status: "error",
        message: err.message,
      });
    }
  }
  static async updateStudent(req, res) {
    const { studentId } = req.params;
    const { name, address, age } = req.body;
    try {
      const [affectedRows] = await db.Student.update(
        { Name: name, Age: age, Address: address },
        { where: { RollNo: studentId } }
      );

      if (affectedRows === 0) {
        return res.json({ status: "error", message: "No rows updated" });
      }

      res.json({ status: "success" });
    } catch (err) {
      res.json({
        status: "error",
      });
    }
  }
  static async deleteStudent(req, res) {
    const studentId = req.params.studentId;
    try {
      const st = await db.Student.findOne({ where: { RollNo: studentId } });
      await db.UserRole.destroy({ where: { userId: st.dataValues.userId } });
      await db.UserGroup.destroy({ where: { userId: st.dataValues.userId } });
      await db.FeaturePerms.destroy({
        where: { entityId: st.dataValues.userId },
      });
      await db.StudentTeacher.destroy({ where: { studentId } });
      await db.User.destroy({ where: { id: st.dataValues.userId } });
      await db.Student.destroy({ where: { RollNo: studentId } });
      res.json({
        status: "success",
      });
    } catch (err) {
      res.json({
        status: "error",
        message: err.message,
      });
    }
  }
  static async countStudents(req, res) {
    const count = await db.sequelize.query(
      'SELECT CAST(COUNT(*) AS INTEGER) FROM "Students"',
      { type: db.sequelize.QueryTypes.SELECT }
    );
    res.json({ count: count[0].count });
  }
}

module.exports = StudentController;
