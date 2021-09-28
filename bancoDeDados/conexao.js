//CRIANDO CONEXÃO
async function conecta(){
    const banco = require("mysql2/promise");
    const con = await banco.createConnection({
        host:"localhost",
        port:3306,
        user:"root",
        password:"root",
        database:"agendaEletronica"
    });
    console.log("Conexão efetuada com sucesso!");
    return con; 
}

//<><><><><><><><><><><><><><><> SEÇÃO USUÁRIO <><><><><><><><><><><><><><><><><><>
//LOGIN
async function login(usuario){
    console.log("Validando login...");
    const conexao = await conecta();
    const[retorna] = await conexao.query("SELECT * FROM usuario WHERE login = ?;", [usuario.login]);
    return resultado[0];
}

//INSERE 
async function inserirUsuario(usuario){
    console.log("Inserindo usuário...");
    const conexao = await conecta();
    const[retorna] = await conexao.query("SELECT * FROM usuario WHERE login =?;", [usuario.login]);
    
    if(retorna.length>0){
        return "Login previamente cadastrado!"
    }

    const sql = "INSERT INTO usuario(nome,login,senha,adm) VALUES (?,?,?,?)";
    const param = [usuario.nome, usuario.login, usuario.senha, usuario.adm];
    return await conexao.query(sql,param);
}

//ALTERA
async function alterarUsuario(usuario){
    console.log("Alterando usuário...");
    const conexao = await conecta();
    const[retorna] = await conexao.query("SELECT * FROM usuario WHERE id=?;",[usuario.id]);

    if (retorna.length==0){
        return "Id Inexistente!"
    }

    const sql = "UPDATE usuario SET nome=?, senha=?, adm=? WHERE id=?;";
    const param = [usuario.nome, usuario.senha, usuario.adm, usuario.id];
    return await conexao.query(sql,param);
}

//EXCLUI
async function excluirUsuario(id){
    console.log("Excluindo usuário...");
    const conexao = await conecta();
    const[retorna] = await conexao.query("SELECT * FROM usuario WHERE id=?;", [id]);

    if(retorna.length==0){
        return "Id inexistente!"
    }

    return await conexao.query("DELETE FROM usuario WHERE id=?",[id]);
}

//LISTAR TODOS
async function listarUsuarios(){
    console.log("Listando usuários...");
    const conexao = await conecta();
    const[retorna] = await conexao.query("SELECT * FROM usuario");
}

//LISTA UM USUÁRIO
async function listarUmUsuario(id){
    console.log("Listando usuário...");
    const conexao = await conecta();
    const[retorna] = await conexao.query("SELECT * FROM usuario WHERE id=?;",[id]);

    if(retorna.length==0){
        return "Id Inexistente!"
    }

    return retorna[0];
}

//<><><><><><><><><><><><><><><> SEÇÃO CONTATO <><><><><><><><><><><><><><><><><><>
//INSERE 
async function inserirContato(contato){
    console.log("Inserindo contato...");
    const conexao = await conecta();

    const sql = "INSERT INTO contato(nome,email,telefone,endereco,contato_id) VALUES (?,?,?,?,?)";
    const param = [contato.nome, contato.email, contato.telefone, contato.endereco, contato.contato_id];
    return await conexao.query(sql,param);
}

//ALTERA
async function alterarContato(contato){
    console.log("Alterando contato...");
    const conexao = await conecta();
    const[retorna] = await conexao.query("SELECT * FROM contato WHERE contato_id=?;",[contato.contato_id]);

    if (retorna.length==0){
        return "Id Inexistente!"
    }

    const sql = "UPDATE contato SET nome=?, email=?, telefone=?, endereco=? WHERE contato_id=?;";
    const param = [contato.nome, contato.email, contato.telefone, contato.endereco, contato.contato_id];
    return await conexao.query(sql,param);
}

//EXCLUI
async function excluirContato(id){
    console.log("Excluindo contato...");
    const conexao = await conecta();
    const[retorna] = await conexao.query("SELECT * FROM contato WHERE contato_id=?;", [contato.contato_id]);

    if(retorna.length==0){
        return "Id inexistente!"
    }

    return await conexao.query("DELETE FROM contato WHERE id=?",[contato.contato_id]);
}

//LISTAR TODOS
async function listarContatos(){
    console.log("Listando contatos...");
    const conexao = await conecta();
    const[retorna] = await conexao.query("SELECT * FROM contato");
}

//LISTA UM CONTATO
async function listarUmContato(id){
    console.log("Listando contato...");
    const conexao = await conecta();
    const[retorna] = await conexao.query("SELECT * FROM contato WHERE contato_id=?;",[contato.contato_id]);

    if(retorna.length==0){
        return "Id Inexistente!"
    }

    return retorna[0];
}

//<><><><><><><><><><><><><><><> SEÇÃO COMPROMISSO <><><><><><><><><><><><><><><><><><>
//INSERE 
async function inserirCompromisso(compromisso){
    console.log("Inserindo compromisso...");
    const conexao = await conecta();

    const sql = "INSERT INTO compromisso(data, observacao, participantes, endereco, status, contato_id) VALUES (?,?,?,?,?,?);";
    const param = [compromisso.data, compromisso.observacao, compromisso.participantes, compromisso.endereco, compromisso.status, compromisso.contato_id];
    return await conexao.query(sql,param);
}

//ALTERA
async function alterarCompromisso(compromisso){
    console.log("Alterando compromisso...");
    const conexao = await conecta();
    const[retorna] = await conexao.query("SELECT * FROM compromisso WHERE id=?;",[compromisso.id]);

    if (retorna.length==0){
        return "Id Inexistente!"
    }

    const sql = "UPDATE compromisso SET data = ?, observacao = ?, participantes = ?, endereco = ?,  status = ?, contato_id = ? WHERE id = ?;";
    const param = [compromisso.data, compromisso.observacao, compromisso.participantes, compromisso.endereco, compromisso.status, compromisso.contato_id];
    return await conexao.query(sql,param);
}

//EXCLUI
async function excluirCompromisso(id){
    console.log("Excluindo compromisso...");
    const conexao = await conecta();
    const[retorna] = await conexao.query("SELECT * FROM compromisso WHERE id=?;", [id]);

    if(retorna.length==0){
        return "Id inexistente!"
    }

    return await conexao.query("DELETE FROM compromisso WHERE id=?",[id]);
}

//LISTAR TODOS
async function listarCompromissos(){
    console.log("Listando compromisso...");
    const conexao = await conecta();
    const[retorna] = await conexao.query("SELECT * FROM compromisso");
}

//LISTA UM COMPROMISSO
async function listarUmCompromisso(id){
    console.log("Listando compromisso...");
    const conexao = await conecta();
    const[retorna] = await conexao.query("SELECT * FROM compromisso WHERE contato_id=?;",[id]);

    if(retorna.length==0){
        return "Id Inexistente!"
    }

    return retorna[0];
}

module.exports = { login,
    listarUsuarios, listarUmUsuario, inserirUsuario, excluirUsuario, alterarUsuario,
    listarContatos, listarUmContato, inserirContato, excluirContato, alterarContato,
    listarCompromissos, listarUmCompromisso, inserirCompromisso, excluirCompromisso, alterarCompromisso,
}