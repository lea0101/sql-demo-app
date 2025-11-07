const db = require("../models");
const Physicians = db.physicians;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  
};

// // Retrieve all Patient from the database.
// exports.findAllPatients = async (req, res) => {
//   try {
//     const patients = await db.sequelize.query("SELECT * FROM `Patients`", {
//       type: db.sequelize.QueryTypes.SELECT,
//       model: Patient,
//       mapToModel: true,
//       raw: true,
//     });
//     return patients;
//   } catch (error) {
//     res.status(400);
//     console.error("Error fetching patients:", error);
//   }
// };

exports.getPhysicianNamesAndIds = async (req, res) => {
    try {
    const physicians = await db.sequelize.query("SELECT physician_id, name FROM `Physicians`", {
      type: db.sequelize.QueryTypes.SELECT,
      raw: true
    });
    return physicians;
  } catch (error) {
    res.status(400);
    console.error("Error fetching patients:", error);
  }
};
// Find a single Patient with an id
exports.findPatientById = (req, res) => {
  
};

// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
  
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
  
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
  
// };

// // Find all published Tutorials
// exports.findAllPublished = (req, res) => {
  
// };
