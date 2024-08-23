const db = require("../models");
const bcrypt = require("bcrypt");

class TeacherController {
  constructor() {}
  static async getTeacher(req, res) {
    const { teacherId } = req.params;
    try {
      const studentTeachers = await db.StudentTeacher.findAll({
        where: { teacherId },
      });

      const students = await Promise.all(
        studentTeachers.map(async (studentTeacher) => {
          return await db.Student.findOne({
            where: { RollNo: studentTeacher.studentId },
          });
        })
      );
      const teacher = await db.Teacher.findOne({
        where: { TeacherId: teacherId },
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
          {
            model: db.Student,
            as: "students",
          },
        ],
      });
      res.json({
        status: "success",
        data: { ...teacher.toJSON(), students },
      });
    } catch (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
  }
  static async getAllTeachers(req, res) {
    try {
      const id = req.query.studentId;
      const studentteachers = await db.StudentTeacher.findAll({
        where: { studentId: id },
      });
      const teachers = await Promise.all(
        studentteachers.map(async (st) => {
          return await db.Teacher.findOne({
            where: { TeacherId: st.teacherId },
          });
        })
      );
      res.json({ status: "success", data: teachers });
    } catch (err) {
      res.json({ status: "error", message: err.message });
    }
  }
  static async getAllTeachersAdmin(req, res) {
    try {
      const response = await db.Teacher.findAll();
      res.json({ status: "success", data: response });
    } catch (err) {
      res.json({ status: "error", message: err.message });
    }
  }
  static async createTeacher(req, res) {
    const { email, password, name, address } = req.body;
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = await db.User.create({
        email,
        password: hashedPassword,
      });
      await db.UserRole.create({
        userId: user.dataValues.id,
        roleId: 2,
      });
      await db.UserGroup.create({
        userId: user.dataValues.id,
        groupId: 2,
      });
      await db.Teacher.create({
        userId: user.dataValues.id,
        Name: name,
        Address: address,
      });
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
  static async updateTeacher(req, res) {
    const { teacherId } = req.params;
    const { name, address } = req.body;
    try {
      const [affectedRows] = await db.Teacher.update(
        { Name: name, Address: address },
        { where: { TeacherId: teacherId } }
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
  static async deleteTeacher(req, res) {
    const { teacherId } = req.params;
    try {
      const teacher = await db.Teacher.findOne({
        where: { TeacherId: teacherId },
      });
      await db.UserRole.destroy({
        where: { userId: teacher.dataValues.userId },
      });
      await db.UserGroup.destroy({
        where: { userId: teacher.dataValues.userId },
      });
      await db.FeaturePerms.destroy({
        where: { entityId: teacher.dataValues.userId },
      });
      await db.StudentTeacher.destroy({ where: { teacherId } });
      await db.User.destroy({ where: { id: teacher.dataValues.userId } });
      await db.Teacher.destroy({ where: { TeacherId: teacherId } });
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
  static async countTeachers(req, res) {
    const studentId = req.query.id;
    const count = await db.StudentTeacher.count({ where: { studentId } });
    res.json({ count });
  }
  static async countTeachersAdmin(req, res) {
    try {
      const count = await db.Teacher.count();
      res.json({ count });
    } catch (err) {
      res.json({ err });
    }
  }
}

module.exports = TeacherController;
