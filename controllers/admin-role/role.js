
var connection = require('../../config/config');
var jwt = require('jsonwebtoken');

//---------------------------------------------------------
module.exports.updateUserRegisterData = function (req, res) {
    let user_id = req.body.user_id
    var today = new Date();
    var data = {
        "name": req.body.name,
        "email": req.body.email,
        "password": req.body.password,
        "company_name": req.body.company_name,
        "company_logo": req.body.company_logo,
    }

    connection.query('UPDATE users SET ? WHERE id = ?', [data, user_id], function (error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            res.json({
                status: true,
                data: results,
                fields: fields,
                message: 'User Update Successfully'
            })
        }
    });
}
module.exports.getUserProfile = function (req, res) {
    connection.query('SELECT * FROM users WHERE id=?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
        }
    });
}


