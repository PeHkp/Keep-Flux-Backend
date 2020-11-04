
exports.up = function(knex) {
  return knex.schema.createTable("check-list", function (table) {
    table.increments();
    table.string("resultado_esperado").notNullable();
    table.string("quest").notNullable();
    table.boolean("isCheck").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("check-list");
};
