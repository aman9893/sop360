var connection = require('../../config/config');
var jwt = require('jsonwebtoken');

module.exports.contactBooklistData = function (req, res, next) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    token2 = token.slice(7, token.length).trimLeft();
    varid = jwt.decode(token2)
    var userid = varid.NewData.id;
    connection.query('SELECT * FROM contact_book WHERE user_id = ?', [userid], (err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result));
    })
 }

module.exports.addcontactBook = function (req, res) {
    var users = {
        "user_id": req.body.user_id,
        "contact_name": req.body.contact_name,
        "contact_number": req.body.contact_number,
        "contact_email": req.body.contact_email,
        "contact_status": req.body.contact_status,
    }
    connection.query('INSERT INTO contact_book SET ?', users, function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: error
            })
        } else {
            var id = results.insertId;
            connection.query('SELECT * FROM contact_book WHERE contact_id = ?', [id], function (error, results, fields) {
                res.json({
                    status: true,
                    data: results,
                    message: 'Contact  Create  Successfully'
                })
            })
        }
    })
}

module.exports.UpdateConatctData = function (req, res) {
    let contact_id = req.body.contact_id
    var data = {
        "user_id": req.body.user_id,
        "contact_name": req.body.contact_name,
        "contact_number": req.body.contact_number,
        "contact_email": req.body.contact_email,
        "contact_status": req.body.contact_status,
    }

    connection.query('UPDATE contact_book SET ? WHERE contact_id = ?', [data, contact_id], function (error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            var id = contact_id;
            connection.query('SELECT * FROM contact_book WHERE contact_id = ?', [contact_id], function (error, results, fields) {
                res.json({
                    status: true,
                    data: results,
                    message: 'Conatct   Update  Successfully'
                })
            })
        }
    })
}
module.exports.deleteContactData = function (req, res) {
    connection.query('DELETE FROM contact_book WHERE contact_id=?', [req.params.contact_id], (err, rows, fields) => {
        if (!err) {
            res.json({
                status: true,
                message: 'Contact deleted Successfully'
            })
        } else {
            console.log(err)
        }
    });
}
