const connection = require("../database/connection");
module.exports = {
  async index(request, response) {
   
    const clientes = await connection("check-list").select("*");

    return response.json(clientes);
  },

  async create(request, response) {
    const {
      resultado_esperado,
      quest,
      isCheck
    } = request.body;

    const [id] = await connection("check-list").insert({
      resultado_esperado,
      quest,
      isCheck
    });
    return response.json({ id });
  },
  async delete(request,response){

    const {id} = request.params

    await connection("check-list").where("id",id).delete()

    return response.status(204).send()
},
async edit(request,response){

  const {id} = request.params
  const {
    resultado_esperado,
    quest,
    isCheck
  } = request.body;

  if (resultado_esperado) {
    await connection("check-list")
      .where("id", id)
      .update({ resultado_esperado
      });
  } 
  if(quest){
    await connection("check-list")
    .where("id", id)
    .update({ quest
    });
  }
  if(isCheck){
    await connection("check-list")
      .where("id", id)
      .update({ isCheck
      });
  }

  return response.status(204).send()
},
};