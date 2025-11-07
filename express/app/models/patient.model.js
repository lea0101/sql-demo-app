// Patients (id, name, date_of_birth, cell_phone, city, date_of_birth)
module.exports = (sequelize, Sequelize) => {
  const Patient = sequelize.define("patient", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING
    },
    cell_phone: {
      type: Sequelize.STRING
    },
    city: {
      type: Sequelize.STRING
    },
        date_of_birth: {
      type: Sequelize.INTEGER
    }
  });

  return Patient;
};