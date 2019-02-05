var express = require('express')
var app = express()

// SHOW LIST OF PATIENTS
app.get('/', function(req, res, next) {
	if (req.query.nationalID == undefined || req.query.nationalID == '') {
		req.getConnection(function(error, conn) {
			conn.query('SELECT * FROM Patient',function(err, rows, fields) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('patient/list', {
					title: 'Patient List', 
					data: ''
				})
			} else {
				// render to views/user/list.ejs template file
				res.render('patient/list', {
					title: 'Patient List', 
					data: rows
				})
			}
		})
		})
	}
	else {
		var id = req.query.nationalID;
		req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM patient WHERE nationalID = ?', id, function(err, rows, fields) {
						//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.render('patient/list', {
					title: 'Patient List', 
					data: ''
				})
			} else {
				// render to views/user/list.ejs template file
				console.log("nope");
				res.render('patient/list', {
					title: 'Patient List', 
					data: rows
				})
			}
		})
	})
	}
})

// SHOW ADD USER FORM
app.get('/add', function(req, res, next){	
	// render to views/patient/add.ejs
	res.render('patient/add', {
		title: 'Add New patient',
		ID: '',
		name: '',
		nationalID: '',
		mobileNo: '',	
		sex: '',
		villageName: '', 
		dateOfBirth: ''	
	})
})

// ADD NEW USER POST ACTION
app.post('/add', function(req, res, next){	
	req.assert('ID', 'ID is required').notEmpty()           //Validate ID
	req.assert('name', 'Name is required').notEmpty()             //Validate Name
	req.assert('nationalID', 'National ID is required').notEmpty()
	req.assert('mobileNo', 'Mobile No is required').notEmpty()
	req.assert('sex', 'Sex is required').notEmpty()
	req.assert('villageName', 'Village is required').notEmpty()
	req.assert('dateOfBirth', 'Date of birth is required').notEmpty()

	var errors = req.validationErrors()

    if( !errors ) {   //No errors were found.  Passed Validation!

		/********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.username = '   a user    ';
		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('username').trim(); // returns 'a user'
		********************************************/
		var patient = {
			ID: req.sanitize('ID').escape().trim(),
			name: req.sanitize('name').escape().trim(),
			nationalID: req.sanitize('nationalID').escape().trim(),
			mobileNo: req.sanitize('mobileNo').escape().trim(),
			sex: req.sanitize('sex').escape().trim(),
			villageName: req.sanitize('villageName').escape().trim(),
			dateOfBirth: req.sanitize('dateOfBirth').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('INSERT INTO patient SET ?', patient, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					
					// render to views/patient/add.ejs
					res.render('patient/add', {
						title: 'Add New Patient',
						ID: patient.ID,
						name: patient.name,
						nationalID: patient.nationalID, 	
						mobileNo: patient.mobileNo,
						sex: patient.sex,
						villageName: patient.villageName, 	
						dateOfBirth: patient.dateOfBirth				
					})
				} else {				
					req.flash('success', 'Data added successfully!')
					
					// render to views/patient/add.ejs
					res.render('patient/add', {
						title: 'Add New Patient',
						ID: '',
						name: '',
						nationalID: '',
						mobileNo: '',
						sex: '',
						villageName: '', 
						dateOfBirth: ''					
					})
				}
			})
		})
	}
	else {   //Display errors to user
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})				
		req.flash('error', error_msg)		
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
		 res.render('patient/add', { 
		 	title: 'Add New Patient',
		 	ID: req.body.ID,
		 	name: req.body.name,
		 	nationalID: req.body.nationalID, 
		 	mobileNo: req.body.mobileNo,
		 	sex: req.body.sex,
		 	villageName: req.body.villageName,
		 	dateOfBirth: req.body.dateOfBirth
		 })
		}
	})

module.exports = app