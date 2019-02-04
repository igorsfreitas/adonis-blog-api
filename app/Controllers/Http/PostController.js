'use strict'

const Post = use('App/Models/Post')
const { validateAll } = use('Validator')

class PostController {
  async index ({ response }) {
    /**
     * Fetch all posts inside database.
     *
     */
    const posts = await Post.all()

    /**
     * Return the response
     * with the posts fetched as data.
     *
     */
    response.send({ posts: posts.toJSON() })
  }

  async store ({ request, response }) {
    /**
     * Getting needed parameters.
     *
     */
    const data = request.only(['title', 'body'])

    /**
     * Validating our data.
     *
     */
    const validation = await validateAll(data, {
      title: 'required',
      body: 'required',
    })

    /**
     * If validation fails, early returns with validation message.
     */
    if (validation.fails()) {
      response.send({error: 'Houveram erros de validação ao tentar registrar usuário'})
    }

    /**
     * Creating a new post into the database.
     *
     */
    try{
      await Post.create(data)
      response.send({message: `Post created with success !`})
    }catch(e){
      response.send({error: `Error trying to create Post: ${e}`}) 
    }
    
  }

  async update ({ params, session, request, response }) {

    
    /**
     * Getting needed parameters.
     *
     */
    const data = request.only(['title', 'body'])

    /**
     * Validating our data.
     *
     */
    const validation = await validateAll(data, {
      title: 'required',
      body: 'required',
    })

    /**
     * If validation fails, early returns with validation message.
     */
    if (validation.fails()) {
      response.send({error: 'Houveram erros de validação na edição do post'})
    }

    /**
     * Finding the post and updating fields on it
     * before saving it to the database.
     *
     */

    try{
      const post = await Post.findOrFail(params.id)
      post.merge(data)
      await post.save()
      response.send({message: `Post ${params.id} updated with success !`})
    }catch(e){
      response.send({error: `Error trying to update Post: ${e}`}) 
    }
    
  }

  async delete ({ params, response }) {
    /**
     * Finding the post and deleting it
     *
     */
    try{
      const post = await Post.findOrFail(params.id)
      await post.delete()
      response.send({message: 'Post deleted with success'})
    }catch(e){
      response.send({error: `Error trying to delete Post: ${e}`}) 
    }
    
  }
}

module.exports = PostController
