// Appointments (id, physician_id, patient_id, room_id, datetime, purpose)
module.exports = (sequelize, Sequelize) => {
  const Appointment = sequelize.define("appointment", {
    appt_id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    physician_name: {
      type: Sequelize.STRING
    },
    patient_name: {
      type: Sequelize.STRING
    },
    room_id: {
        type: Sequelize.INTEGER
    },
    appt_date: {
        type: Sequelize.INTEGER
    },
    purpose: {
        type: Sequelize.STRING
    }
  });

  return Appointment;
};