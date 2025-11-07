module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define("room", {
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

  return Room;
};