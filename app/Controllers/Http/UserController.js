'use strict'

const User = use('App/Models/User')
const { validateAll } = use('Validator')

class UserController {

  async store ({ auth, session, request, response }) {
    /**
     * Getting needed parameters.
     *
     */
    const data = request.only(['username', 'email', 'password', 'password_confirmation'])

    /**
     * Validating our data.
     *
     */
    const validation = await validateAll(data, {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required',
      password_confirmation: 'required_if:password|same:password',
    })

    /**
     * If validation fails, early returns with validation message.
     */
    if (validation.fails()) {
      response.send({error: 'Houveram erros de validação ao tentar registrar usuário'})
    }

    // Deleting the confirmation field since we don't
    // want to save it
    delete data.password_confirmation

    /**
     * Creating a new user into the database.
     *
     */
    try{
      const user = await User.create(data)
      response.send({user: user})
    }catch(e){
      response.send({error: `Erro ao criar o usuário: ${e}`})
    }
  }
}

module.exports = UserController
