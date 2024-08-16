"use strict";
const { Model, DataTypes } = require("sequelize");

class StudentTeacher extends Model {}

const initStudentTeacher = (sequelize) => {
  StudentTeacher.init(
    {
      studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Student",
          key: "RollNo",
        },
        primaryKey: true,
      },
      teacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Teacher",
          key: "TeacherId",
        },
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "StudentTeacher",
      tableName: "StudentsTeachers",
      timestamps: false,
    }
  );
  return StudentTeacher;
};

module.exports = initStudentTeacher;
