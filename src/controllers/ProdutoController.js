const connection = require("../database/connection");

module.exports = {
  

  async create(request, response) {
    const {
      title,
      description,
      value,
      quantidade
    } = request.body;
    const empresa_id = request.headers.authorization;

    const [id] = await connection("Produtos").insert({
      title,
      description,
      value,
      quantidade,
      linkDaImagem: `https://keep-flux.herokuapp.com/uploads/${request.file.filename}`,
      empresa_id,
    });

    return response.json({ id });
  },
  async delete(request, response) {
    const { id } = request.params;
    const empresa_id = request.headers.authorization;

    const produto = await connection("Produtos")
      .where("id", id)
      .select("empresa_id")
      .first();

    if (produto.empresa_id !== empresa_id) {
      return response
        .status(401)
        .json({ erro: "Operação nao pode ser completada" });
    }
    await connection("Produtos").where("id", id).delete();

    return response.status(204).send();
  },
  async edit(request, response) {
    const { id } = request.params;
    const { value, quantidade } = request.body;

    await connection("Produtos").where("id", id).update({ value, quantidade });

    return response.status(204).send();
  },
};
