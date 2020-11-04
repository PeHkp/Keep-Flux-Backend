module.exports = {
  async grh(request, response) {
   
    const data = [
      {
        resultado_esperado: "GRH1"
      },
      {
        resultado_esperado: "GRH2"
      },
      {
        resultado_esperado: "GRH3"
      },
      {
        resultado_esperado: "GRH4"
      },
      {
        resultado_esperado: "GRH5"
      },
      {
        resultado_esperado: "GRH6"
      },
      {
        resultado_esperado: "GRH7"
      },
      {
        resultado_esperado: "GRH8"
      },
      {
        resultado_esperado: "GRH9"
      },
      {
        resultado_esperado: "GRH10"
      },
      {
        resultado_esperado: "GRH11"
      },
    ]

    return response.json(data);
  },
}