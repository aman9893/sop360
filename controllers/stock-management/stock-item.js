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
        "item_assginvalue": req.body.item_assginvalue,
        "item_selling_price": req.body.item_selling_price,
        "item_quantity": req.body.item_quantity,
        "item_status": req.body.item_status,
        "create_date": req.body.create_date,
        "purchase_date": req.body.purchase_date,
        "expiry_date": req.body.expiry_date,
        "buying_price": req.body.buying_price,
        "item_number": req.body.item_number,
        "vendor_number": req.body.vendor_number,
        "vendor_name": req.body.vendor_name,
        "category": req.body.category,
        "gst_tax": req.body.gst_tax,
        "discunt": req.body.discunt,
        "total_item_amt": req.body.total_item_amt,

    }
    connection.query('INSERT INTO stock_management SET ?', users, function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: error
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
        "item_assginvalue": req.body.item_assginvalue,
        "item_selling_price": req.body.item_selling_price,
        "item_quantity": req.body.item_quantity,
        "item_status": req.body.item_status,
        "create_date": req.body.create_date,
        "purchase_date": req.body.purchase_date,
        "expiry_date": req.body.expiry_date,
        "buying_price": req.body.buying_price,
        "item_number": req.body.item_number,
        "vendor_number": req.body.vendor_number,
        "category": req.body.category,
        "gst_tax": req.body.gst_tax,
        "discunt": req.body.discunt,
        "total_item_amt": req.body.total_item_amt,
    }

    connection.query('UPDATE stock_management SET ? where stock_id = ? ', [data, stock_id], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: error
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
        "create_date": req.body.create_date,
        "purchase_date": req.body.purchase_date,
        "item_quantity": req.body.purchase_date,
        "item_selling_price": req.body.item_selling_price,
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
