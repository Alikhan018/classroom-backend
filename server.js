const express = require("express");
const cors = require("cors");
const Home = require("./routes/auth.routes");
const Users = require("./routes/user.routes");
const Roles = require("./routes/roles.routes");
const Groups = require("./routes/groups.routes");
const Students = require("./routes/student.routes");
const Teachers = require("./routes/teacher.routes");
const Features = require("./routes/features.routes");

class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.host = "localhost";
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    // this.app.use(cors());
    this.app.use(cors({ origin: true, credentials: true }));
    this.start();
    this.routes();
  }
  routes() {
    this.app.use(`/`, Home);
    this.app.use(`/users`, Users);
    this.app.use(`/roles`, Roles);
    this.app.use(`/groups`, Groups);
    this.app.use(`/students`, Students);
    this.app.use(`/teachers`, Teachers);
    this.app.use(`/features`, Features);
  }
  start() {
    this.app.listen(this.port, this.host, () => {
      console.log(`Server started at http://${this.host}:${this.port}`);
    });
  }
}

module.exports = Server;
