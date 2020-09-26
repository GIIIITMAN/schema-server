/**
 * EndpointController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    submit: async function(req, res) {
        let reqBody = Object.assign({}, req.body);
        if (reqBody && reqBody.sqlString) {
            reqBody.sqlString = reqBody.sqlString.replace(/\r?\n/g, ' ');
        }
        let existEndpoint = await Endpoint.findOne({
            endpointName: reqBody.endpointName
        })
        if (existEndpoint && existEndpoint.id) {
            let result = await Endpoint.updateOne({
                endpointName: reqBody.endpointName
            }).set(reqBody);
            res.json({
                status: 0,
                data: result
            });
        } else {
            let result = await Endpoint.create(reqBody).fetch();
            res.json({
                status: 0,
                data: result
            });
        }
    },
    func: async function(req, res) {
        let reqBody = Object.assign({}, req.body);
        // if (reqBody && reqBody.funcString) {
            // reqBody.funcString = reqBody.funcString.replace(/\r?\n/g, ';');
        // }
        let existEndpoint = await Endpoint.findOne({
            endpointName: reqBody.endpointName
        })
        if (existEndpoint && existEndpoint.id) {
            let result = await Endpoint.updateOne({
                endpointName: reqBody.endpointName
            }).set(reqBody);
            res.json({
                status: 0,
                data: result
            });
        } else {
            let result = await Endpoint.create(reqBody).fetch();
            res.json({
                status: 0,
                data: result
            });
        }
    }
};

