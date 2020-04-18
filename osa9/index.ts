import express = require('express');
import bodyParser = require('body-parser');

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if(!isNaN(height) && !isNaN(weight)) {
    const bmi = calculateBmi(height, weight);
    res.send(JSON.stringify({height, weight, bmi}));
  } else {
    res.send(JSON.stringify({ error: "malformatted parameters" }));
  }

});

app.post('/exercises', (req, res) => {
  const { daily_exercises: dailyExercises, target } = req.body;

  if (!dailyExercises || !target) {
    return res.send(JSON.stringify({ error: "parameters missing" }));
  }

  try {
  const mappedExercises = dailyExercises.map((exercise: number) => Number(exercise));
  const filtered = mappedExercises.filter((exercise: number) => isNaN(exercise));

  if(!isNaN(Number(target)) && filtered.length === 0) {
    const calculated = calculateExercises(mappedExercises, target);
    return res.send(JSON.stringify(calculated));
  } else {
    return res.send(JSON.stringify({ error: "malformatted parameters"}));
  }
  
} catch(exception) {
  console.log(exception);
  return res.send(JSON.stringify({ error: "malformatted parameters"}));
}
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});