'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', 'PostController.index')

// Those routes should be only accessible
// when you are not logged in
Route.group(() => {
  Route.post('login', 'SessionController.store')
  Route.post('register', 'UserController.store')
})//.middleware(['guest'])

// Those routes should be only accessible
// when you are logged in
Route.group(() => {
  Route.post('posts', 'PostController.store')
  Route.get('posts/:id/delete', 'PostController.delete')
  Route.put('posts/:id', 'PostController.update')
}).middleware(['auth'])
