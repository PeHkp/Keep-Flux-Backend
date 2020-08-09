exports.up = function (knex) {
  return knex.schema.createTable("Clientes", function (table) {
    table.increments();
    table.string("nome").notNullable();
    table.string("cpf").notNullable();
    table.string("numero").notNullable();
    table.string("endereco").notNullable();
    table.string("email").notNullable();
    table.string("sexo").notNullable();
    table.string("nacimento").notNullable();

    table.string("empresa_id").notNullable();

    table.foreign("empresa_id").references("id").inTable("Empresas");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("Clientes");
};
