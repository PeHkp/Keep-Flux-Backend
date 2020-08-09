exports.up = function (knex) {
  return knex.schema.createTable("Entrega", function (table) {
    table.increments();
    table.string("IdPedido").notNullable();
    table.string("dataEntrega").notNullable();
    table.string("observacao").notNullable();

    table.string("empresa_id").notNullable();

    table.foreign("empresa_id").references("id").inTable("Empresas");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("Entrega");
};
