
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('logs').del()
    .then(function () {
      // Inserts seed entries
      return knex('logs').insert([
        {userId: '1', title: 'Fish at the lake', bait: 'live worms', fish: '3 trout', location: 'the lake', log: 'went fishing out on the lake with my boat', score: '76'},
        {userId: '1', title: 'went noodling', bait: 'my leg', fish: '1 catfish', location: 'the river', log: 'stuck my leg in some holesand got bit', score: '84'},
      ]);
    });
};
