const connection = require("../database/connection");
const pdf = require("html-pdf");
const data = new Date();
const dia = data.getDate();
const mes = data.getMonth();
const ano = data.getFullYear();

module.exports = {
  async gerarPDF(request, response) {
    const { id } = request.params;
    const empresa_id = request.headers.authorization;

    const [pedido] = await connection("Pedido").where("id", id).select("*");
    if (pedido.empresa_id !== empresa_id) {
      return response.json({
        Error: "Esse pedido nao foi encontrado",
      });
    } else {
      const cliente = await connection("Clientes")
        .where("cpf", pedido.cpfDoComprador)
        .select(["nome", "endereco"]);

      var conteudo = `
        <h2>----------------------------------------------</h2>
        <h1>ID empresa : ${pedido.empresa_id}</h1>
        <h2>----------------------------------------------</h2>
        <h1>Dados do comprador:</h1>
        <h2>CPF : ${pedido.cpfDoComprador}</h2>
        <h2>Nome : ${cliente.nome}</h2>
        <h2>Endereco de entrega : ${cliente.endereco}</h2>
        <h2>----------------------------------------------</h2>
        <h1>Dados do produto:</h1>
        <h2>Produto : ${pedido.nomeDoProduto}</h2>
        <h2>Quantidade : ${pedido.quantidade}</h2>
        <h2>----------------------------------------------</h2>
        <h1>Dados da compra:</h1>
        <h2>Valor : ${Intl.NumberFormat("py-BR", {
          style: "currency",
          currency: "BRL",
        }).format(pedido.value)}</h2>
        <h2>Forma de pagamento :  ${pedido.formaPagamento}</h2>
        <h2>----------------------------------------------</h2>
        <h4>Nota Físcal gerada em ${dia}/${mes + 1}/${ano}.</h4>

        
    `;

      pdf.create(conteudo, {}).toFile(`./Notas/${id}.pdf`, (err, res) => {
        if (err) {
        } else {
        }
      });

      return response.json({ Ok: "PDF Gerado com sucesso" });
    }
  },
};
