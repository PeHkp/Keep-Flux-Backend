const connection = require("../database/connection")

module.exports = {

    async produtos(request,response) {

        const empresa_id = request.headers.authorization

        const produtos = await connection("Produtos").where("empresa_id", empresa_id).select("*")

        return response.json(produtos)
    },
    async pedido(request,response) {

        const empresa_id = request.headers.authorization

        const pedido = await connection("Pedido").where("empresa_id", empresa_id).select("*")

        return response.json(pedido)
    },
    async clientes(request,response) {

        const empresa_id = request.headers.authorization

        const clientes = await connection("Clientes").where("empresa_id", empresa_id).select("*")

        return response.json(clientes)
    },
    
    async entrega(request,response) {

        const empresa_id = request.headers.authorization

        const entrega = await connection("Entrega").where("empresa_id", empresa_id).select("*")

        return response.json(entrega)
    },
    
}