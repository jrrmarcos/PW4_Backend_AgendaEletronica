const {authSecret} = require("../.env")
const jwt = require('jwt-simple')

const banco = require("../bancoDeDados/conexao");

module.exports = app => {
    const login = async (req, res) => {
        console.log("req: ", req);
        if (!req.body.login || !req.body.senha) {
            res.status(401).send("Informe usuário e senha!")
        } else {
            const resultado = await banco.login({
                login: req.body.login,
                senha: req.body.senha,
            });
            console.log("resultado: ", resultado)
            console.log("req.body.senha: ", req.body.senha)
            if (resultado.length == 0) { 
                return res.status(400).send("Usuário não cadastrado!") 
            }
            
            const isMath = req.body.senha == resultado.senha ? true : false
            if (!isMath) { 
                return res.status(401).send("Acesso negado!") 
            }
            
            const now = Math.floor(Date.now() / 1000)
            
            const payload = {
                id: resultado.id,
                nome: resultado.nome,
                email: resultado.admin,
                iat: now,
                exp: now * (60 * 60 * 2),
            }

            res.json({
                ...payload,
                token: jwt.encode(payload, authSecret)
            })
        }
    }

    const validaChave = async (req, res) => {
        const usuarioDados = req.body || null
        try {
            if (usuarioDados) {
                const chave = jwt.decode(usuarioDados.chave, authSecret)
                if (new Date(chave.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch (e) { }
    }

    return {login, validaChave}
}