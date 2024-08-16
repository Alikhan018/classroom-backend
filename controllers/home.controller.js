const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "key4login";

class Home {
  constructor() {}

  static async App(req, res) {
    res.json({ message: "App is running" });
  }

  static async loginAuth(req, res) {
    const { email, password } = req.body;
    try {
      const user = await db.User.findOne({
        where: { email: email },
        include: [
          { model: db.Student, as: "student" },
          { model: db.Teacher, as: "teacher" },
        ],
      });

      if (user) {
        if (await bcrypt.compare(password, user.password)) {
          const refinedFromUser = {
            id: user.id,
            email: user.email,
            student: user.student || null,
            teacher: user.teacher || null,
          };
          const token = jwt.sign({ refinedFromUser }, secretKey);
          res.json({
            message: "Logged in",
            token,
            user: refinedFromUser,
          });
        } else {
          res.status(401).json({ message: "Password is wrong" });
        }
      } else {
        res.status(404).json({ message: "User not found!" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }

  // static async matchPassword(req, res) {
  //   const { password } = req.body;
  //   try {
  //     const user = await User.findOne({ where: { email: req.user.id } });
  //     if (user) {
  //       if (user.password === password) {
  //         res.json({ message: "Password matched" });
  //       }
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ message: err.message });
  //   }
  // }
}

module.exports = Home;
