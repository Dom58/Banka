import express from 'express';
import bodyParser from 'body-parser';

import users from './routes/users';
import accountRoute from './routes/accountRoute';
import transactionRoute from './routes/transactionRoute';

import path from 'path';

var app = express();
// const port = 3000;
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(users);
app.use(accountRoute);
app.use(transactionRoute);

app.get('/', (req,res)=>{
	res.send({ status:200, message:'Welcome to Banka application' });
});

app.listen(port, ()=>{
	console.log(`Server is running on (http://127.0.0.1:${port}) `);
});

export default app;