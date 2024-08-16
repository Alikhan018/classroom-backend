"use strict";
const { Model, DataTypes, Sequelize } = require("sequelize");

class Teacher extends Model {
  static associate(models) {
    Teacher.belongsTo(models.User, {
      foreignKey: "userId",
      as: "users",
    });
    Teacher.belongsToMany(models.Teacher, {
      through: models.RoleGroup,
      foreignKey: "teacherId",
      otherKey: "studentId",
      as: "students",
    });
  }
}

const initTeacher = (sequelize) => {
  Teacher.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "User",
          keye: "id",
        },
      },
      TeacherId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      Address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Teacher",
      tableName: "Teachers",
      timestamps: false,
    }
  );
  return Teacher;
};

module.exports = initTeacher;
