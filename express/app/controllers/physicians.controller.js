const db = require("../models");
const Physicians = db.physicians;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  
};

exports.getPhysicianNamesAndIds = async (req, res) => {
    try {
    const physicians = await db.sequelize.query("SELECT physician_id, name FROM `physicians`", {
      type: db.sequelize.QueryTypes.SELECT,
      raw: true
    });
    return physicians;
  } catch (error) {
    res.status(400);
    console.error("Error fetching patients:", error);
  }
};