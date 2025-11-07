const db = require("../models");
const Appointment = db.appointments;
const Op = db.Sequelize.Op;

// Create and Save a new Patient
exports.create = (req, res) => {
  
};

// Retrieve all Appts from the database.
exports.findAllAppointments = async (req, res) => {
  try {
    return appts = await db.sequelize.query(
      "SELECT a.appt_id, ph.name AS physician_name, pa.name AS patient_name, a.room_id, a.appt_date, a.purpose FROM `Appointments` a JOIN `Patients` pa ON pa.patient_id = a.patient_id JOIN `Physicians` ph ON ph.physician_id = a.physician_id", 
      {
      type: db.sequelize.QueryTypes.SELECT,
      raw: true,
    }).then(value => [...value]);
  } catch (error) {
    res.status(400);
    console.error("Error fetching appointments:", error);
  }
};

exports.getFilteredAppointments = async (req, res) => {
  try {
    console.log(req.query);
    var filter = "WHERE ";
    if (req.query.patient_id)
    {
      filter = filter + ` pa.patient_id = ${req.query.patient_id} AND `
    }
    if (req.query.physician_id)
    {
      filter = filter + ` ph.physician_id = ${req.query.physician_id} AND `
    }
    if (req.query.room_id)
    {
      filter = filter + ` a.room_id = ${req.query.room_id} AND `
    }
    if (req.query.purpose)
    {
      filter = filter + ` a.purpose = ${req.query.purpose} AND `
    }
    filter = filter + `a.appt_date >= DATE('${req.query.startDate}') AND a.appt_date <= DATE('${req.query.endDate}')`;
    return appts = await db.sequelize.query(
      `SELECT a.appt_id, ph.name AS physician_name, pa.name AS patient_name, a.room_id, a.appt_date, a.purpose FROM Appointments a JOIN Patients pa ON pa.patient_id = a.patient_id JOIN Physicians ph ON ph.physician_id = a.physician_id ` + filter, 
      {
      type: db.sequelize.QueryTypes.SELECT,
      raw: true,
    }).then(value => [...value]);
  } catch (error) {
    res.status(400);
    console.error("Error fetching appointments:", error);
  }
};

function apptToJSON(appt)
{
  return  {
    appt_id: appt.appt_id,
    physician_name: appt.physician_name,
    patient_name: appt.patient_name,
    room_id: appt.room_id,
    appt_date: appt.appt_date,
    purpose: appt.purpose
  };
}

exports.createAppointment = async (reqBody, res) => {
  try {
    await db.sequelize.query(
      `INSERT INTO Appointments (physician_id, patient_id, room_id, appt_date, purpose) VALUES (${reqBody.physician_id}, ${reqBody.patient_id}, ${reqBody.room_id}, DATE("${reqBody.appt_date.substring(0, 10)}"), "${reqBody.purpose}")`,
    );
    console.log(reqBody);
    res.status(200);
    return;
  }
  catch (error)
  {
    res.status(400);
  }
}

exports.updateAppointment = async (reqBody, res) => {
  try {
    await db.sequelize.query(
      `UPDATE Appointments SET physician_id=${reqBody.physician_id}, patient_id=${reqBody.patient_id}, room_id=${reqBody.room_id}, appt_date=DATE("${reqBody.appt_date.substring(0, 10)}, purpose="${reqBody.purpose}" WHERE appt_id=${reqBody.appt_id}`
    );
    res.status(200);
    return;
  }
  catch (error)
  {
    res.status(400);
  }
}

exports.deleteAppointment = async (req, res) => {
  try {
    await db.sequelize.query(
      `DELETE FROM Appointments WHERE appt_id=${req.query.id}`
    );
    res.status(200);
    return;
  }
  catch (error)
  {
    res.status(400);
  }
}
/*
// Find a single Patient with an id
exports.findPatientById = (req, res) => {
  
};
*/

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
