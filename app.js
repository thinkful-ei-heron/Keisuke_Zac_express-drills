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
  const shift = parseInt(req.query.shift);

  if (!text) {
    return res.status(400).send('Please provide a text query');
  }

  if(shift > 25){
    return res.status(400).send('Please provide a shift value (integer), or an integer less than 26');
  }
	
  let newString = '';

  for (let i = 0; i < text.length; i++){
    const currCharCode = text.charCodeAt(i);
    if ( (text.charCodeAt(i) >= 65 && text.charCodeAt(i) <= 90) ){
      if (currCharCode + shift > 90 ) {
        let overShift = currCharCode + shift - 90;
        newString += String.fromCharCode(65 + overShift - 1);
      } else if (currCharCode + shift < 65 ){
        let overShift = currCharCode + shift - 65;
        newString += String.fromCharCode(90 + overShift + 1);
      } else {
        newString += String.fromCharCode(currCharCode + shift);
      }
    } else if ( (text.charCodeAt(i) >= 97 && text.charCodeAt(i) <= 122) ){
      if (currCharCode + shift > 122 ) {
        let overShift = currCharCode + shift - 122;
        newString += String.fromCharCode(97 + overShift - 1);
      } else if (currCharCode + shift < 97 ){
        let overShift = currCharCode + shift - 97;
        newString += String.fromCharCode(122 + overShift + 1);
      } else {
        newString += String.fromCharCode(currCharCode + shift);
      }
    } else {
      newString += String.fromCharCode(currCharCode);
    }
  }
  res.status(200).send(newString);
});
