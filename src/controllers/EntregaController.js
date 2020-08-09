const connection = require("../database/connection")

module.exports = {

    async create(request,response) {
        const {IdPedido, dataEntrega, observacao } = request.body
        const empresa_id = request.headers.authorization

        const [id] = await connection("Entrega").insert({
            IdPedido,
            dataEntrega,
            observacao,
            empresa_id
        })

        return response.json({id})
    },
    async delete(request,response){

        const {id} = request.params
        const empresa_id = request.headers.authorization

        const entrega = await connection("Entrega")
        .where("id",id)
        .select("empresa_id").first()

        if(entrega.empresa_id !== empresa_id){
            return response.status(401).json({erro : "Operacao nao pode ser completada"})
        }
        await connection("Entrega").where("id",id).delete()

        return response.status(204).send()
    },
    async edit(request, response) {
        const { id } = request.params
        const { dataEntrega, observacao} = request.body
    
        await connection('Entrega')
          .where('id', id)
          .update({ dataEntrega, observacao})
    
        return response.status(204).send()
      }
}