const runSql = async function(req, res, sql) {
    let ds = await sails.getDatastore('sqlStore');
    // await ds.leaseConnection(
    //     (conn) => {
    //         try {
    //             conn.query(
    //                 sql,
    //                 (err, packets, fields) => {
    //                     if (err) {
    //                         res.json({
    //                             status: 500,
    //                             err
    //                         });
    //                     }
    //                     res.json({
    //                         status: 200,
    //                         data: packets
    //                     });
    //                 }
    //             )
    //         } catch(e) {
    //             res.serverError(e);
    //         }
    //     }
    // );
    let results = await ds.sendNativeQuery(sql); // select * is not supported
    return results;
}

const parseSql = function(sql, paramsObj) {
    let sqlString = sql;
    for (let key in paramsObj) {
        sqlString = sqlString.replace(new RegExp(`@${key}@`, 'g'), paramsObj[key]);
    }
    // replace the rest placeholder as empty
    sqlString = sqlString.replace(/@[A-Za-z_0-9]+@/g, '');
    return sqlString;
}

const runFunc = async function(req, res, name, funcString) {
    let vm = require('vm');
    let ds = await sails.getDatastore('sqlStore');
    let executeQuery = async function(sql) {
        let result = await ds.sendNativeQuery(sql);
        // console.log(result)
        return result;
    }
    const ctx = vm.createContext({req, res, executeQuery});
    let code = 'try {(' + funcString + ')(req, res, executeQuery);}catch(e){console.log("Error in API Function");res.serverError(e);}';
    let script = new vm.Script(code, name);
    await script.runInContext(ctx);
}

module.exports = {
    execute: async function(req, res) {
        try {
            let name = req.params.name;
            console.log('Endpoint name = ', name);
            let endpoint = await Endpoint.findOne({
                endpointName: name
            });
            if (endpoint && endpoint.sqlString) {
                let params = req.body;
                let sql = parseSql(endpoint.sqlString, params);
                console.log(sql);
                let results = await runSql(req, res, sql);
                res.json({
                    status: 200,
                    data: results
                })
            } else {
                res.notFound();
            }
        } catch(e) {
            console.log('Cannot execute sql!');
            res.serverError(e);
        }
    },
    func: async function(req, res) {
        try {
            let name = req.params.name;
            console.log('Endpoint name = ', name);
            let endpoint = await Endpoint.findOne({
                endpointName: name
            });
            if (endpoint && endpoint.funcString) {
                await runFunc(req, res, name, endpoint.funcString);
            } else {
                res.notFound();
            }
        } catch(e) {
            console.log('Cannot execute Function!');
            res.serverError(e);
        }
    }
}