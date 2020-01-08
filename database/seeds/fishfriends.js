
exports.seed = function(knex) {
    // Inserts seed entries
    return knex('users').insert([
      {username: 'tester', password: 'password'}
    ]);
};
