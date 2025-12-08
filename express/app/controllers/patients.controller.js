const db = require("../models");
const Patient = db.patients;
const Op = db.Sequelize.Op;

// Create and Save a new Patient
exports.create = (req, res) => {
  
};

// Retrieve all Patient from the database.
exports.findAllPatients = async (req, res) => {
  try {
    const patients = await db.sequelize.query("SELECT * FROM `patients`", {
      type: db.sequelize.QueryTypes.SELECT,
      model: Patient,
      mapToModel: true,
      raw: true,
    });
    return patients;
  } catch (error) {
    res.status(400);
    console.error("Error fetching patients:", error);
  }
};

exports.getPatientNamesAndIds = async (req, res) => {
    try {
    const patients = await db.sequelize.query("SELECT patient_id, name FROM `patients`", {
      type: db.sequelize.QueryTypes.SELECT,
      raw: true
    });
    return patients;
    const nameMap = new Map(patients.map(p => [p.patient_id, p.name]));
    return nameMap;
  } catch (error) {
    res.status(400);
    console.error("Error fetching patients:", error);
  }
};
// Find a single Patient with an id
exports.findPatientById = (req, res) => {
  
};