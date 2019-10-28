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

app.get('/cipher', (req, res) => {
	const text = req.query.text;
	const shift = req.query.shift;

	if (!parseInt(shift)) {
		return res.status(400).send('Shift must be an integer');
	}

	let result = '';
	for (let i = 0; i < text.length; i++) {
		const input = text.charCodeAt(i);
		let alpha;

		if (input <= 90) {
			alpha = 'upper';
		}
		else if (input >= 97) {
			alpha = 'lower';
		}

		let code = (text.charCodeAt(i) + shift);
		if (code > 90 && alpha === 'upper') {
			code -= 26;
		}
		else if (code > 122 && alpha === 'lower') {
			code -= 26;
		}

		result += String.fromCharCode(code);
	};

	res.send(result);
})