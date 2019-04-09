import express from 'express';
import bodyParser from 'body-parser';
const path = require('path');

var app = express();

app.use(express.json());

// const port = 3000;

app.get('/', (req,res)=>{
	res.send('Welcome to Banka application');
});

const port = process.env.PORT || 5000;

app.listen(port, ()=>{
	console.log(`Server is running on (http://127.0.0.1:${port}) `);
});

export default app;