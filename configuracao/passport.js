const {authSecret} = require("../.env")
const passport = require("passport")
const passportJwt = require("passport-jwt")
const {Strategy,ExtractJwt} = passportJwt
const banco = require('../bancoDeDados/conexao')

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {      
       
        const user = banco.listarUmUsuario({
            id: payload.id,
        });
        
        if (user != 'Id Inexistente!') {
            return done(null, { ...payload })
        } else{ 
            return false 
        }
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', {session: false})
    }
}