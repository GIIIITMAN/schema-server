/**
 * PageController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    findByName: async function (req, res) {
        var pages = await Page.find({
            name: req.params.name
        });
        res.json({
            data: pages
        });
    },

    findByPath: async function (req, res) {
        var page = await Page.findOne({
            path: req.params.path
        });
        res.json({
            data: page
        })
    },

    edit: async function (req, res) {
        var page = await Page.findOne({
            path: req.params.path
        });
        let reqBody = Object.assign({}, req.body.data);
        if (reqBody && reqBody) {
            delete reqBody.id;
        }
        if (page && page.id) {
            page = await Page.updateOne({
                id: page.id
            }).set(reqBody);
        } else {
            page = await Page.create(reqBody).fetch();
        }
        res.json({
            data: page
        });
    }

};

