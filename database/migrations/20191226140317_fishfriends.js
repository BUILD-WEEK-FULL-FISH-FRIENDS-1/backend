
exports.up = function(knex) {
    return knex.schema
    .createTable('users', users => {
        users.increments();
        users
            .string('username', 255)
            .notNullable()
            .unique();
        users
            .string('password', 255)
            .notNullable();
        
    })
    .createTable('logs', logs => {
        logs.increments();
        logs
            .integer('userId')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        logs
            .string('title', 255)
            .notNullable();
        logs
            .string('bait', 255);
        logs
            .string('fish', 255);
        logs
            .string('location', 255)
            .notNullable();
        logs
            .string('log', 500)
            .notNullable();
        logs
            .integer('score')
            .notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfEists('users')
        .dropTableIfEists('logs');
};
