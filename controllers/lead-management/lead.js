var connection = require('../../config/config');
var jwt = require('jsonwebtoken');

module.exports.LeadInfoList = function(req, res) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    token2 = token.slice(7, token.length).trimLeft();
    varid = jwt.decode(token2)
    if (varid.NewData != null) {
        var userid = varid.NewData.id;
    }
    connection.query('SELECT * FROM lead_management WHERE user_id = ?', [userid], (err, result) => {
        if (err) throw err;
        res.end(JSON.stringify(result));
    })
}
/////////////////////////////////////////////////////////
module.exports.addLead = function(req, res) {
    var users = {
        "user_id": req.body.user_id,
        "lead_name": req.body.lead_name,
        "email": req.body.email,
        "phone_number": req.body.phone_number,
        "address": req.body.address,
        "important_notes": req.body.important_notes,
        "date_of_meeting": req.body.date_of_meeting,
        "qulification": req.body.qulification,
        "emp_description":req.body.emp_description,
        "admin_description":req.body.admin_description
    }
    connection.query('INSERT INTO  lead_management SET ?', users, function(error, results, fields) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            var lead_id = results.insertId;
            connection.query('SELECT * FROM lead_management WHERE lead_id = ?', [lead_id], function(error, results, fields) {
                res.json({
                    status: true,
                    data: results,
                    message: 'Customer  insert Successfully'
                })
            })
        }
    })
}


module.exports.UpdateLeadInfo = function(req, res) {
    let lead_id = req.body.lead_id
    var data = {
        "user_id": req.body.user_id,
        "lead_name": req.body.lead_name,
        "email": req.body.email,
        "phone_number": req.body.phone_number,
        "address": req.body.address,
        "important_notes": req.body.important_notes,
        "date_of_meeting": req.body.date_of_meeting,
        "qulification": req.body.qulification,
        "emp_description":req.body.emp_description,
        "admin_description":req.body.admin_description
    }

    connection.query('UPDATE lead_management SET ? WHERE lead_id = ?', [data, lead_id], function(error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            var id = lead_id;
            connection.query('SELECT * FROM lead_management WHERE lead_id = ?', [lead_id], function(error, results, fields) {
                res.json({
                    status: true,
                    data: results,
                    message: 'Customer   Update  Successfully'
                })
            })
        }
    })
}

module.exports.deleteLeadList = function(req, res) {
    connection.query('DELETE FROM lead_management WHERE lead_id=?', [req.params.id], (err) => {
        if (!err) {
            res.json({
                status: true,
                message: 'Customer deleted Successfully'
            })
        } else {
        }
    });
}

//-----------------------------details by id  ------------------------------------------------------

module.exports.LeadListByid = function(req, res) {
    connection.query('SELECT * FROM lead_management WHERE lead_id=?', [req.params.lead_id], (err, results) => {
        if (!err) {
            res.send(results);
        } else {
        }
    });
}