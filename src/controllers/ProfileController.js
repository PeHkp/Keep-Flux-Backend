const connection = require("../database/connection");

module.exports = {
  async produtos(request, response) {
    const empresa_id = request.headers.authorization;

    let produtos = await connection("Produtos")
      .where("empresa_id", empresa_id)
      .select("*");

    produtos = await produtos.reverse()

    return response.json(produtos);
  },
  async pedido(request, response) {
    const pedido = await connection("Pedido")
      .join("Clientes", "Clientes.cpf", "=", "Pedido.cpfDoComprador")
      .select(["Pedido.*", "Clientes.nome", "Clientes.endereco"]);

    return response.json(pedido);
  },
  async clientes(request, response) {
    const empresa_id = request.headers.authorization;

    const clientes = await connection("Clientes")
      .where("empresa_id", empresa_id)
      .select("*");

    return response.json(clientes);
  },

  async entrega(request, response) {
    const empresa_id = request.headers.authorization;

    const entrega = await connection("Entrega")
      .where("empresa_id", empresa_id)
      .select("*");

    return response.json(entrega);
  },
};
