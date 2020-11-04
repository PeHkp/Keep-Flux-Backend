const express = require("express")
const multer = require('multer')

const EmpresaController = require("./controllers/EmpresaController")
const ClienteController = require("./controllers/ClienteController")
const PedidoController = require("./controllers/PedidoController")
const EntregaController = require("./controllers/EntregaController")
const ProdutoController = require("./controllers/ProdutoController")
const ProfileController = require("./controllers/ProfileController")
const LoginController = require("./controllers/LoginController")
const PdfController = require("./controllers/PdfController")
const CheckListController = require("./controllers/CheckListController")

const ResultadoEsperado = require("./services/resultado_esperado")

const multerConfig = require('./config/multer')

const routes = express.Router()

const upload = multer(multerConfig)

routes.get('/resultado-esperado', ResultadoEsperado.grh)

routes.get("/empresas",EmpresaController.index)
routes.post("/empresas",EmpresaController.create)
routes.delete("/empresas",EmpresaController.delete)

routes.get("/check-list",CheckListController.index)
routes.post("/check-list",CheckListController.create)
routes.delete("/check-list/:id",CheckListController.delete)
routes.put("/check-list/:id",CheckListController.edit)

routes.post("/clientes",ClienteController.create)
routes.delete("/clientes/:id",ClienteController.delete)
routes.put('/clientes/:id', ClienteController.edit)

routes.post("/produtos",upload.single("linkDaImagem"), ProdutoController.create)
routes.delete("/produtos/:id",ProdutoController.delete)
routes.put('/produtos/:id', ProdutoController.edit)

routes.post("/pedido",PedidoController.create)
routes.delete("/pedido/:id",PedidoController.delete)
routes.get("/soma-total-pedidos-recebidos",PedidoController.soma)

routes.post("/entrega",EntregaController.create)
routes.delete("/entrega/:id",EntregaController.delete)
routes.put('/entrega/:id', EntregaController.edit)

routes.post("/login",LoginController.login)
routes.post("/login-dono",LoginController.loginDono)

routes.get("/profile/produto",ProfileController.produtos)
routes.get("/profile/cliente",ProfileController.clientes)
routes.get("/profile/entrega",ProfileController.entrega)
routes.get("/profile/pedido",ProfileController.pedido)

routes.get("/pdf/:id",PdfController.gerarPDF)

module.exports = routes 