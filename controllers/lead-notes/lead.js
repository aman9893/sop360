var connection = require('../../config/config');
var jwt = require('jsonwebtoken');

module.exports.getleadnotes = function(req, res) {
    console.log(req.params.id)

    connection.query('SELECT * FROM lead_notes WHERE lead_id=?', [req.params.id], (err, results, fields) => {
        if (!err) {
            console.log(results)
            res.send(results);
        } else {
            console.log(err)
        }
    });
}

module.exports.addNotesLead = function(req, res) {
    console.log(req.body)
    var users = {
        "note": req.body.note,
        "lead_id": req.body.lead_id,
        "lead_name": req.body.lead_name,
        "note_date": req.body.note_date,
        "note_description": req.body.note_description,
    }

    connection.query('INSERT INTO lead_notes SET ?', users, function(error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            var id = results.insertId;
            console.log(id + 'id')
            connection.query('SELECT * FROM lead_notes WHERE lead_noteid = ?', [id], function(error, results, fields) {
                res.json({
                    status: true,
                    data: results,
                    message: 'notes  insert Successfully'
                })
            })
        }
    })
}

module.exports.deletetask = function(req, res) {
    connection.query('DELETE FROM task_list WHERE task_id=?', [req.params.task_id], (err, rows, fields) => {
        if (!err) {
            console.log('deleted')
            res.json({
                status: true,
                message: 'Task deleted Successfully'

            })
        } else {
            console.log(err)
        }
    });
}

module.exports.UpdateTask = function(req, res) {
    console.log("update")
    let task_id = req.body.task_id
    console.log(task_id)
    var users = {
        "note": req.body.note,
        "lead_id": req.body.lead_id,
        "lead_name": req.body.lead_name,
        "note_date": req.body.note_date,
        "note_description": req.body.note_description,
    }

    connection.query('UPDATE task_list SET ? WHERE task_id = ?', [users, task_id], function(error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            console.log(results)
            var id = task_id;
            console.log(id + 'id')
            connection.query('SELECT * FROM task_list WHERE task_id = ?', [id], function(error, results, fields) {
                res.json({
                    status: true,
                    data: results,
                    message: 'Task  Status  Update  Successfully'
                })
            })
        }
    })
}



module.exports.UpdateStatusTask = function(req, res) {
    console.log(req.body)

    let task_id = req.body.task_id
    console.log(task_id)

    var data = {
        "task_status": req.body.task_status
    }

    console.log(data)
    connection.query('UPDATE task_list SET ? WHERE task_id = ?', [data, task_id], function(error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            console.log(results)
            var id = task_id;
            console.log(id + 'id')
            connection.query('SELECT * FROM task_list WHERE task_id = ?', [id], function(error, results, fields) {
                console.log(results + 'aman')
                    // console.log(error)
                res.json({
                    status: true,
                    data: results,
                    // fields: fields,
                    message: 'Task  Status  Update  Successfully'
                })
            })
        }
    })
}

module.exports.taskListByEmpid = function(req, res) {
    console.log(req.params.task_allotted_emp)

    connection.query('SELECT * FROM task_list WHERE task_allotted_emp=?', [req.params.task_allotted_emp], (err, results, fields) => {
        if (!err) {
            console.log(results)
            res.send(results);
        } else {
            console.log(err)
        }
    });
}

