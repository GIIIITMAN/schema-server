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
    read: async function(req, res) {
        await executor(req, res, 'select * from user_info;');
    },
    
    write: async function(req, res) {
        // let sql = 'INSERT INTO `user_info`(`user_id`,`user_name`,`user_role`,`user_password`,`user_dept`,`user_manager`)VALUES(\'zhangsan\',\'张三\',\'sale\',\'123456\',\'销售\',\'admin\');';
        let sql = 'delete from `user_info` where `user_id` = \'zhangsan\';';
        await executor(req, res, sql);
    }
}