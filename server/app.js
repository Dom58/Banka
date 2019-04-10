import express from 'express';
import bodyParser from 'body-parser';

import users from './routes/users';
import accountRoute from './routes/accountRoute';

import path from 'path';

var app = express();
// const port = 3000;
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(users);
app.use(accountRoute);


app.get('/', (req,res)=>{
	res.send('<h2>Welcome to Banka application ...</h2>');
});


app.listen(port, ()=>{
	console.log(`Server is running on (http://127.0.0.1:${port}) `);
});

export default app;