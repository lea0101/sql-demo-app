const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello world!" });
});

app.get("/api/patients", (req, res) => {  
  res.send(findAllPatients(req, res));
})

app.get("/api/patients/names", async (req, res) => {
  await getPatientNamesAndIds(req, res).then(
    value => {
      const nameMap = new Map(value.map(p => [p.patient_id, p.name]));
      res.send(JSON.stringify(Object.fromEntries(nameMap)));
    }
  );
}) 

app.get("/api/physicians/names", async (req, res) => {
  await getPhysicianNamesAndIds(req, res).then(
    value => {
      const nameMap = new Map(value.map(p => [p.physician_id, p.name]));
      res.send(JSON.stringify(Object.fromEntries(nameMap)));
    }
  );
}) 

app.get("/api/appointments", async (req, res) => { 
  await findAllAppointments(req, res).then(value => res.send(value));
})

app.get("/api/appointments/filtered", async (req, res) => {
  await getFilteredAppointments(req, res).then(value => res.send(value));
})

app.post("/api/appointments/new", async (req,res) => {
  await createAppointment(req.body, res);
})

app.post("/api/appointments/update", async (req, res) => {
  await updateAppointment(req.body, res);
})

app.delete("/api/appointments/delete", async (req, res) => {
  await deleteAppointment(req, res);
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const db = require("./app/models");
const { findAll, findAllPatients, getPatientNamesAndIds } = require("./app/controllers/patients.controller");
const { findAllAppointments, createAppointment, updateAppointment, deleteAppointment, getFilteredAppointments } = require("./app/controllers/appointments.controller");
const { getPhysicianNamesAndIds } = require("./app/controllers/physicians.controller");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
