var express = require('express');
var app = express();
const consign = require('consign');

app.use(express.urlencoded({extended: true}));

consign()
    .include('./configuracao/passport.js')
    .then('./configuracao/middlewares.js')
    .then('./configuracao/auth.js')
    .then('./rotas/rotas.js')
    .into(app)

app.listen(8080, function() {
    console.log("Rodando na porta 8080");
})