/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  // schema server routes
  'GET /page': { controller: 'PageController', action: 'find' },
  'GET /page/:id': { controller: 'PageController', action: 'findOne' },
  'GET /page/byName/:name': { controller: 'PageController', action: 'findByName' },
  'GET /page/byPath/:path': { controller: 'PageController', action: 'findByPath' },
  'POST /page': { controller: 'PageController', action: 'create' },
  'POST /page/:id': { controller: 'PageController', action: 'update' },
  'POST /page/delete/:id': { controller: 'PageController', action: 'destroy' },
  'POST /page/edit/:path': { controller: 'PageController', action: 'edit' },


  'POST /sql/read': { controller: 'SqlController', action: 'read' },
  'POST /sql/write': { controller: 'SqlController', action: 'write' },

  'GET /endpoint': { controller: 'EndpointController', action: 'find' },
  'POST /endpoint/submit': { controller: 'EndpointController', action: 'submit' },
  'POST /endpoint/func': { controller: 'EndpointController', action: 'func' },
  'POST /endpoint/delete/:id': { controller: 'EndpointController', action: 'destroy' },


  'POST /api/:name': { controller: 'ApiController', action: 'execute' },
  'POST /api/func/:name': { controller: 'ApiController', action: 'func' },

};
