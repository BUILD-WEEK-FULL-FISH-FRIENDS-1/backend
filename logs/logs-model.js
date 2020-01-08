const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  updateLog,
  remove
};

function find() {
  return db("logs").select('id', 'title', 'bait', 'fish', 'location', 'log', 'score');
}

function findBy(filter, column) {
    return db("logs")
        .select('*')
        .where(column, filter);
}

function add(log) {
  return db("logs")
    .insert(log, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db("logs")
    .select('id', 'userId', 'title', 'bait', 'fish', 'location', 'log', 'score')
    .where({ id })
    .first();
}

function updateLog(changes, id) {
    return db("logs")
        .update(changes)
        .where({ id })
        .then(ids => {
            return findById(ids);
        });
}

function remove(id) {
  return db("logs")
    .where({ id })
    .del()
}