"use strict";
const { Model, DataTypes } = require("sequelize");

class Student extends Model {
  static associate(models) {
    Student.belongsTo(models.User, {
      foreignKey: "userId",
      as: "users",
    });
    Student.belongsToMany(models.Teacher, {
      through: models.StudentTeacher,
      foreignKey: "studentId",
      otherKey: "teacherId",
      as: "teachers",
    });
  }
}

const initStudent = (sequelize) => {
  Student.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "User",
          key: "id",
        },
      },
      RollNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Grade: {
        type: DataTypes.CHAR,
      },
    },
    {
      sequelize,
      modelName: "Student",
      tableName: "Students",
      timestamps: false,
    }
  );
  return Student;
};

module.exports = initStudent;
