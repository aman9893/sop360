var connection = require('../../config/config');
var jwt = require('jsonwebtoken');

module.exports.StockManagementInfoList = function (req, res) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    token2 = token.slice(7, token.length).trimLeft();
    varid = jwt.decode(token2)
    var userid = varid.NewData.id;
    connection.query('SELECT * FROM stock_management WHERE user_id = ?', [userid], (err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result));
    })
}

module.exports.addStockManagement = function (req, res) {
    var users = {
        "user_id": req.body.user_id,
        "item_name": req.body.item_name,
        "item_description": req.body.item_description,
        "item_related": req.body.item_related,
        "item_holder_name": req.body.item_holder_name,
        "item_quantity": req.body.item_quantity,
        "item_status": req.body.item_status,
        "item_issued_date": req.body.item_issued_date,
        "item_return_date": req.body.item_return_date,
    }
    connection.query('INSERT INTO stock_management SET ?', users, function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some errorwith query'
            })
        } else {
            var stock_id = results.insertId;
            connection.query('SELECT * FROM stock_management WHERE stock_id = ?', [stock_id], function (error, results, fields) {
                res.json({
                    status: true,
                    data: results,
                    //  fields: fields,
                    message: 'Product  Insert  Successfully !'
                })
            })
        }
    })
}

module.exports.deleteStockManagement = function (req, res) {
    connection.query('DELETE FROM stock_management WHERE stock_id=?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.json({
                status: true,
                message: 'Product Deleted Successfully ! '
            })
        }
        else {
        }
    });
}


module.exports.UpdateStockInfoData = function (req, res) {
    let stock_id = req.body.stock_id;
    var data = {
        "item_name": req.body.item_name,
        "item_description": req.body.item_description,
        "item_related": req.body.item_related,
        "item_holder_name": req.body.item_holder_name,
        "item_quantity": req.body.item_quantity,
        "item_status": req.body.item_status,
        "item_issued_date": req.body.item_issued_date,
        "item_return_date": req.body.item_return_date,
    }

    connection.query('UPDATE stock_management SET ? where stock_id = ? ', [data, stock_id], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'There some error with query'
            })
        } else {
            connection.query('SELECT * FROM stock_management WHERE stock_id = ?', [stock_id], function (error, results, fields) {
                res.json({
                    status: true,
                    data: results,
                    message: 'Product Upadte   Successfully'
                })
            })
        }
    })
}

module.exports.updateStockList = function (req, res) {
    let stock_id = req.body.stock_id
    var data = {
        "item_status": req.body.item_status,
        "item_issued_date": req.body.item_issued_date,
        "item_return_date": req.body.item_return_date,
        "item_quantity": req.body.item_return_date,
        "item_holder_name": req.body.item_holder_name,
    }

    connection.query('UPDATE stock_management SET ? WHERE stock_id = ?', [data, stock_id], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            var id = stock_id;
            connection.query('SELECT * FROM stock_management WHERE stock_id = ?', [stock_id], function (error, results, fields) {
                res.json({
                    status: true,
                    data: results,
                    message: 'Product   Update  Successfully'
                })
            })
        }
    })
}

module.exports.UpdateStockItem = function (req, res) {
    let stock_id = req.body.stock_id
    var data = {
        "item_quantity": req.body.item_quantity
    }
    connection.query('UPDATE stock_management SET ? WHERE stock_id = ?', [data, stock_id], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            res.json({
                status: true,
                data: results,
                // fields: fields,
                // message: 'Task  Status  Update  Successfully'
            })
        }
    })
}
