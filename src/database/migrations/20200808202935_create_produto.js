exports.up = function (knex) {
  return knex.schema.createTable("Produtos", function (table) {
    table.increments();
    table.string("title").notNullable();
    table.string("description").notNullable();
    table.decimal("value").notNullable();
    table.decimal("quantidade").notNullable();
    table.string("linkDaImagem").notNullable();

    table.string("empresa_id").notNullable();

    table.foreign("empresa_id").references("id").inTable("Empresas");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("Produtos");
};
