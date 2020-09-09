/**
 * EndpointController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    submit: async function(req, res) {
        let reqBody = req.body;
        if (reqBody && reqBody.sqlString) {
            reqBody.sqlString = reqBody.sqlString.replace(/\r?\n/g, ' ');
        }
        let result = await Endpoint.create(reqBody).fetch();
        res.json(result);
    }
};

