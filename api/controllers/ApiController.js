const executor = async function(req, res, sql) {
    await sails.getDatastore('sqlStore').leaseConnection((db)=> {
        db.query(
            sql,
            (err, results, fields) => {
                if (err) {
                    // res.serverError(err);
                    res.json({
                        statue: 500,
                        msg: err
                    });
                }
                res.json({
                    status: 0,
                    data: results
                });
            }
        );
    });
}

const sqlParser = function(sql, paramsObj) {
    let sqlString = sql;
    for (let key in paramsObj) {
        sqlString = sqlString.replace(new RegExp(`@${key}@`, 'g'), paramsObj[key]);
    }
    // replace the rest placeholder as empty
    sqlString = sqlString.replace(/@[A-Za-z_0-9]+@/g, '');
    return sqlString;
}


module.exports = {
    execute: async function(req, res) {
        let name = req.params.name;
        console.log('Endpoint name = ', name);
        let endpoint = await Endpoint.findOne({
            endpointName: name
        });
        if (endpoint && endpoint.sqlString) {
            let params = req.body;
            let sql = sqlParser(endpoint.sqlString, params);
            console.log(sql);
            await executor(req, res, sql);
        } else {
            res.notFound();
        }
    }
}