const {body, validationResult} = require("express-validator");
const {read} = require("fs");
const { isModuleNamespaceObject } = require("util/types");
const banco = require("../bancoDeDados/conexao");

module.exports = app => {

    //HOME
    app.route("/").get((req,res) => {
    res.send();
    });

    //ACESSA A PÁGINA INICIAL DA AGENDA
    app.route("/agendaInicio").
    all(app.configuracao.passport.authenticate())
    .post((req, res) => {
        res.send();  
    });


    //CADASTRAR USUÁRIO
    app.route("/cadastrarUsuario")
        .get((req,res) => {
            res.send();
    });

    //CADASTRAR NOVO CONTATO
    app.route("/novoContato")
        .all(app.configuracao.passport.authenticate())
        .get((req,res) => {
            res.send();
        });

        //CADASTRAR NOVO COMPROMISSO
        app.route("/novoCompromisso")
        .all(app.configuracao.passport.authenticate())
        .get((req, res) => {
            res.send();
    });

    //SAIR
    app.route("/sair")
    .all(app.configuracao.passport.authenticate())
    .get((req, res) => {
        res.send();
    });

    //LOGIN
    app.post("/login", app.configuracao.autenticacao.login)
    app.post("/validateToken", app.configuracao.autenticacao.validaChave)

    //><><><><><><><><>><><><><><><><> SEÇÃO USUÁRIO <><><><><><<><><><><><><><><><>

    //CRIANDO USUÁRIO - QUANDO FOR ADMINISTRADOR RECEBE 1, QUANDO NÃO RECEBE 0
    app.route("/adicionarUsuario").post([
        body("nome", "*Campo obrigatório").trim().isLength({min:2, max:100}),
        body("login", "*Campo obrigatório").trim().isLength({min: 2, max:20}),
        body("senha", "*Obs.: Senha deve ter entre 6 e 8 caracteres").trim().isLength({min:6,max:8}),
        body("admin").trim(),
    ],
    async (req, res) => {
        const erro = validationResult(req);
        if (!erro.isEmpty()) {
            res.send(erro.array())
        } else {
            const resultado = await banco.inserirUsuario({
                nome: req.body.nome,
                login: req.body.login,
                senha: req.body.senha,
                admin: req.body.admin,
            });
        res.send(resultado);
        }
    });

    //EXCLUINDO USUÁRIO
    app.route("/excluirUsuario")
        .all(app.configuracao.passport.authenticate())
        .delete([
        body("id", "*Campo obrigatório").trim().isLength({min:1}),],
    
        async (req, res) => {
            const erro = validationResult(req);
            if (!erro.isEmpty()) {
                res.send(erro.array())
            } else {
                const resultado = await banco.excluirUsuario(req.body.id);
                res.send(resultado);
        }
    });

    //ALTERANDO USUÁRIO
    app.route("/alterarUsuario")
        .all(app.configuracao.passport.authenticate())
        .all(app.configuracao.passport.authenticate())
        .put([
            body("id", "*Campo obrigatório").trim().isLength({ min: 1 }),
            body("nome", "*Campo obrigatório").trim().isLength({ min: 3, max: 80 }),
            body("senha", "A senha precisa ter entre 6 e 8 caracteres").trim().isLength({min:6,max:8}),
            body("admin").trim(),],
        async (req, res) => {
            const erro = validationResult(req);
            if (!erro.isEmpty()) {
                res.send(erro.array())
            } else {
                const resultado = await banco.alterarUsuario({
                    id: req.body.id,
                    nome: req.body.nome,
                    senha: req.body.senha,
                    admin: req.body.admin,
            });
            res.send(resultado);
        }
    });

    //LISTAR TODOS OS USUÁRIOS
    app.route("/listarUsuarios")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
        const resultado = await banco.listarUsuarios();
        res.send(resultado);
    });

    //LISTAR UM USUÁRIO
    app.route("/listarUmUsuario/:id?")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
        if (req.params.id) {
            const resultado = await banco.listarUmUsuario(req.params.id);
            res.send(resultado);
        } else {
            res.send("Id Inexistente!")
        }
    });

    //><><><><><><><><>><><><><><><><> SEÇÃO CONTATO <><><><><><<><><><><><><><><><>

    //ADICIONAR CONTATO
    app.route("/adicionarContato")
        .all(app.configuracao.passport.authenticate())
        .post([
            body("nome", "*Campo obrigatório").trim().isLength({min:2,max:100}),
            body("telefone").trim(),
            body("endereco").trim(),
            body("contato_id").trim().isLength({min:1}),],
        async (req, res) => {
            const erro = validationResult(req);

            if (!erro.isEmpty()) {
                res.send(erro.array())
            } else {
                const resultado = await banco.inserirContato({
                    nome: req.body.nome,
                    email: req.body.email,
                    telefone: req.body.telefone,
                    endereco: req.body.endereco,
                    contato_id: req.body.contato_id,
                });
                res.send(resultado);
            }
    });

    //EXCLUIR CONTATO
    app.route("/excluirContato")
        .all(app.configuracao.passport.authenticate())
        .delete([
            body("id", "*Campo obrigatório").trim().isLength({min:1}),],

        async (req, res) => {
            const erro = validationResult(req);
            
            if (!erro.isEmpty()) {
                res.send(erro.array())
            } else {
                const resultado = await banco.excluirContato(req.body.id);
                res.send(resultado);
            }
        });

    //ALTERAR CONTATO
    app.route("/alterarContato")
        .all(app.configuracao.passport.authenticate())
        .put([
            body("id", "*Campo obrigatório").trim().isLength({min:1}),
            body("nome", "*Campo obrigatório").trim().isLength({min:2,max:100}),
            body("telefone").trim(),
            body("endereco").trim(),
            body("contatos_id").trim().isLength({min:1}),],
        
        async (req, res) => {
            const erro = validationResult(req);
            
            if (!erro.isEmpty()) {
                res.send(erro.array())
            } else {
                const resultado = await banco.alterarContato({
                    id: req.body.id,
                    nome: req.body.nome,
                    email: req.body.email,
                    telefone: req.body.telefone,
                    endereco: req.body.endereco,
                    contato_id: req.body.contato_id,
                });
                res.send(resultado);
            }
        });

    //LISTAR TODOS OS CONTATOS
    app.route("/listarContatos")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
        const resultado = await banco.listarUsuarios();
        res.send(resultado);
    });

    //LISTAR UM CONTATO
    app.route("/listarUmContato/:id?")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
        
        if (req.params.id) {
            const resultado = await banco.listarUmContato(req.params.id);
            res.send(resultado);
        } else {
            res.send("Id Inexistente!")
        }
    });

    //><><><><><><><><>><><><><><><><> SEÇÃO COMPROMISSO <><><><><><<><><><><><><><><><>

    //INSERIR COMPROMISSOS
    app.route("/inserirCompromisso")
        .all(app.configuracao.passport.authenticate())
        .post([
            body("data", "*Campo obrigatório").trim().isLength({ min: 19 }), //'2000-12-12 00:00:00'
            body("obs").trim(),
            body("participantes").trim(),
            body("endereco").trim(),
            body("status").trim(),
            body("contato_id").trim().isLength({min:1}),],
    async (req, res) => {
        const erro = validationResult(req);
        
        if (!erro.isEmpty()) {
            res.send(erro.array())
        } else {
            const resultado = await banco.inserirCompromisso({
                data: req.body.data,
                observacao: req.body.observacao,
                participantes: req.body.participantes,
                endereco: req.body.endereco,
                status: req.body.status,
                contato_id: req.body.contato_id,
            });
            res.send(resultado);
        }
    });

    //EXCLUI COMPROMISSO
    app.route("/excluirCompromisso")
        .all(app.configuracao.passport.authenticate())
        .delete([
            body("id", "*Campo obrigatório").trim().isLength({ min:1}),],
    
        async (req, res) => {
            const erro = validationResult(req);
                
            if (!erro.isEmpty()) {
                res.send(erro.array())
            } else {
                const resultado = await banco.excluirCompromisso(req.body.id);
                res.send(resultado);
            }
    });

    //ALTERAR COMPROMISSO
    app.route("/alterarCompromisso")
        .all(app.configuracao.passport.authenticate())
        .put([
            body("id", "*Campo obrigatório").trim().isLength({min:1}),
            body("data", "*Campo obrigatório").trim().isLength({min:19}),
            body("observacao").trim(),
            body("participantes").trim(),
            body("endereco").trim(),
            body("status").trim(),
            body("contato_id").trim().isLength({min:1}),],
        async (req, res) => {
        const erro = validationResult(req);
        
        if (!erro.isEmpty()) {
            res.send(erro.array())
        } else {
            const resultado = await banco.alterarCompromisso({
                id: req.body.id,
                data: req.body.data,
                observacao: req.body.observacao,
                participantes: req.body.participantes,
                endereco: req.body.endereco,
                status: req.body.status,
                user_id: req.body.user_id,
            });
            res.send(resultado);
        }
    });

    //LISTAR TODOS COMPROMISSOS
        app.route("/meusCompromissos/:id?")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
    
        if (req.params.id) {
            const resultado = await banco.listarCompromissos(req.params.id);
            res.send(resultado);
        } else {
            res.send("Favor informar um id de usuário válida!")
        }
    });

    //LISTAR UM COMPROMISSO
    app.route("/listarUmCompromisso/:id?")
        .all(app.configuracao.passport.authenticate())
        .get(async (req, res) => {
        
        if (req.params.id) {
            const resultado = await banco.listarUmCompromisso(req.params.id);
            res.send(resultado);
        } else {
            res.send("Id Inexistente!")
    }
    });
}