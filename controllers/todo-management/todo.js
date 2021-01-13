var connection = require('../../config/config');
var jwt = require('jsonwebtoken');

// module.exports.TaskTodolistData = function(req, res) {
//     connection.query('select * from  todo_task', (err, result) => {
//         if (err) throw err;
//         console.log("hoo")
//         console.log(result)
//         res.end(JSON.stringify(result));

//     })
// }

module.exports.TaskTodolistData = function(req, res) {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    token2 = token.slice(7, token.length).trimLeft();
    varid = jwt.decode(token2)
    var userid = varid.NewData.id;
    var role_id = req.params.role_id;
    connection.query(`SELECT * FROM todo_task WHERE emp_id = ${userid}`,  (err, result) => {
        
        if (err) throw err;
        console.log("hoo")
        console.log(result)
        res.end(JSON.stringify(result));
    })
}

module.exports.todoTaskByuniqueid = function(req, res) {
    console.log(req.params.emp_id)

    connection.query('SELECT * FROM todo_task WHERE emp_id=?', [req.params.emp_id], (err, results, fields) => {
        if (!err) {
            console.log(results)
            res.send(results);
        } else {
            console.log(err)
        }
    });
}




module.exports.addTdoTask = function(req, res) {
    console.log(req.body)
    var users = {
        "emp_id": req.body.emp_id,
        "todo_date": req.body.todo_date,
        "todo_note": req.body.todo_note,
        "todo_status": req.body.todo_status,
        "emp_unique":req.body.emp_unique,
        "rolename_id":req.body.rolename_id

    }
    connection.query('INSERT INTO todo_task SET ?', users, function(error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: error
            })
        } else {
            var id = results.insertId;
            console.log(id + 'id')
            connection.query('SELECT * FROM todo_task WHERE todo_id = ?', [id], function(error, results, fields) {
                res.json({
                    status: true,
                    data: results,
                    message: 'Task  insert Successfully'
                })
            })
        }
    })
}

module.exports.deleteTodotasks = function(req, res) {
    connection.query('DELETE FROM todo_task WHERE todo_id=?', [req.params.id], (err, rows, fields) => {
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

module.exports.UpdateStatusTodoTask = function(req, res) {
    console.log(req.body)

    let todo_id = req.body.todo_id
    console.log(todo_id)

    var data = {
        "todo_status": req.body.todo_status
    }

    console.log(data)
    connection.query('UPDATE todo_task SET ? WHERE todo_id = ?', [data, todo_id], function(error, results, fields) {

        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'
            })
        } else {
            console.log(results)
            var id = todo_id;
            console.log(id + 'id')
            connection.query('SELECT * FROM todo_task WHERE todo_id = ?', [id], function(error, results, fields) {
                console.log(results + 'aman')
                    // console.log(error)
                res.json({
                    status: true,
                    data: results,
                    // fields: fields,
                    message: 'Task   Update  Successfully'
                })
            })
        }
    })
}