const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const port = 3000;
const dal = require('./../dal/server');
const { v4: uuidv4 } = require('uuid');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
	next();
});

app.options('*', function (req, res) {
	res.send(200);
});

const Controller = {
	home: (req, res) => {
		res.render('./home');
	},
	addPerson: (req, res) => {
		res.render('./addPerson');
	},
	newPerson: (req, res) => {
		const uid = uuidv4();
		const name = req.query.name;
		dal.addPerson([uid, name], err => {
			if (err) console.log(err)
			else {
				res.render('./qr',{uid});
			}
		})
	},
	addScore: (req, res) => {
		const uid = req.query.personid;
		dal.addScore(uid, err => {
			if (err) console.log(err)
			else {
				res.send('Score added');
			}
		})
	},
	all: (req, res) => {
		dal.all((err, val) => {
			if (err) console.log(err)
			else {
				res.send(val);
			}
		})
	},
}

server.listen(port, (err) => {
	if (err) {
		throw err;
	}
	/* eslint-disable no-console */
	console.log('Node Endpoints working :)');
});

module.exports = Controller;