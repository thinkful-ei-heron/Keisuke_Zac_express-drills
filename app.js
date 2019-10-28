const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.listen(8000, () => { });

app.get('/sum', (req, res) => {
	const a = req.query.a;
	const b = req.query.b;

	const x = Number(a);
	const y = Number(b);

	const sum = x + y;

	if(!a || !b) {
		return res.status(400).send('Please provide a query');
	}
	if(!x || !y) {
		return res.status(400).send('Queries must be numbers');
	}
	res.send(`The sum of ${a} and ${b} is ${sum}`);
});

