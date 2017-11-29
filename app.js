const express = require('express');

const app = express();

app.use((req,res,next)=>{

	//TO SEND THE JSON RESPONSE SIGNIFYING EVERYTHING WENT OK

	res.status(200).json({

		message : 'It works'

	});

});

module.exports = app;