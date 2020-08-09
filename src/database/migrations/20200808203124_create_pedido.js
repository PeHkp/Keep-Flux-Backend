exports.up = function (knex) {
  return knex.schema.createTable("Pedido", function (table) {
    table.increments();
    table.string("cpfDoComprador").notNullable();
    table.string("nomeDoProduto").notNullable();
    table.decimal("value").notNullable();
    table.string("formaPagamento").notNullable();
    table.decimal("quantidade").notNullable();

    table.string("empresa_id").notNullable();

    table.foreign("empresa_id").references("id").inTable("Empresas");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("Pedido");
};
