'use strict'

class SessionController {
  /**
   * Store a session.
   */
  async store ({ auth, request, response, session }) {
    /**
     * Getting needed parameters.
     *
     */
    const { email, password } = request.all()

    /**
     * Wrapping the authentication in order to
     * handle errors when authentication fail.
     *
     */
    try {
      const token = await auth.attempt(email, password)
      response.send({token: token})
    } catch (e) {
      response.send({error: `Não consegui fazer login: ${e}`})
    }
  }
}

module.exports = SessionController
