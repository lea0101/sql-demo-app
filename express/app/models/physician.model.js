module.exports = (sequelize, Sequelize) => {
  const Physician = sequelize.define("physician", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Physician;
};