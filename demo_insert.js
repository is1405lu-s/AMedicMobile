
var mysql = require('mysql');


       var con = mysql.createConnection({
        host: "amedic-mysqldbserver.mysql.database.azure.com",
        user: "mysqldbuser@amedic-mysqldbserver",
        password: "Grupp2122",
        database: "amedicdb"
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("SELECT * FROM Patient", function (err, result) {
            if (err) throw err;
            console.log(result);
        });
    });

<!--
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("INSERT INTO Village VALUES ('By', 'Zomba')", function (err, result) {
            if (err) throw err;
            console.log(result);
        });
    });

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        con.query("INSERT INTO Patient VALUES (1, 'Ayo', 1, +2651234567, 'Female', 'By', '1950-01-01')", function (err, result) {
            if (err) throw err;
            console.log(result);
        });
    });
-->