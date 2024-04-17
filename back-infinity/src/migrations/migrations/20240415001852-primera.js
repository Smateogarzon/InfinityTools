module.exports = {
  async up(db) {
    await db.createCollection('promise');
  },

  async down(db) {
    await db.dropCollection('promise');
  },
};
