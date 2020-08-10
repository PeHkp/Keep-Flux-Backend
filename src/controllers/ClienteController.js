const connection = require("../database/connection");

module.exports = {
  async create(request, response) {
    const {
      nome,
      cpf,
      numero,
      endereco,
      email,
      sexo,
      nacimento,
    } = request.body;
    const empresa_id = request.headers.authorization;

    const [id] = await connection("Clientes").insert({
      nome,
      cpf,
      numero,
      endereco,
      email,
      sexo,
      nacimento,
      empresa_id,
    });

    return response.json({ id });
  },
  async delete(request, response) {
    const { id } = request.params;
    const empresa_id = request.headers.authorization;

    const cliente = await connection("Clientes")
      .where("id", id)
      .select("empresa_id")
      .first();

    if (cliente.empresa_id !== empresa_id) {
      return response
        .status(401)
        .json({ erro: "Operacao nao pode ser completada" });
    }
    await connection("Clientes").where("id", id).delete();

    return response.status(204).send();
  },

  async edit(request, response) {
    const { id } = request.params;
    const { numero, endereco, email } = request.body;

    await connection("Clientes")
      .where("id", id)
      .update({ numero, endereco, email });

    return response.status(204).send();
  },
};
