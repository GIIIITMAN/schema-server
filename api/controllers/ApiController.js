const executor = async function(req, res, sql) {
    await sails.getDatastore('sqlStore').leaseConnection((db)=> {
        db.query(
            sql,
            (err, results, fields) => {
                if (err) {
                    res.systemErr(err);
                }
                res.json(results);
            }
        );
    });
} 


module.exports = {
    execute: async function(req, res) {
        let name = req.params.name;
        console.log('Endpoint name = ', name);
        let endpoint = await Endpoint.findOne({
            endpointName: name
        });
        if (endpoint && endpoint.sqlString) {
            await executor(req, res, endpoint.sqlString);
        } else {
            res.notFound();
        }
    }
}