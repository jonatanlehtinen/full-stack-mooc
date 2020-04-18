interface CLIArgumentsExercice {
  target: number;
  hours: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): CLIArgumentsExercice => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const [, , target, ...hours ] = args;
  const mappedHours = hours.map(hour => Number(hour));
  const filtered = mappedHours.filter(hour => isNaN(hour));

  if(!isNaN(Number(target)) && filtered.length === 0) {
    return {
      target: Number(target),
      hours: mappedHours
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

interface Rating {
  rating: number;
  ratingDescription: string;
}

const getRating = (average: number, target: number): Rating => {
  const ratio = average / target;
  if(ratio < 0.5) {
    return {
      rating: 1,
      ratingDescription: "You failed"
    };
  } else if(ratio < 1) {
    return {
      rating: 2,
      ratingDescription: "You almost succeeded"
    };
  } else {
    return {
      rating: 3,
      ratingDescription: "You did well!"
    };
  }
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number; 
}

export const calculateExercises = (hours: Array<number>, target: number): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter(hour => hour > 0).length;
  const average = hours.reduce((a, b) => a + b) / periodLength;
  const success = average > target;
  const rating = getRating(average, target);

  return {
    periodLength,
    trainingDays,
    success,
    ...rating,
    target,
    average
  };
};


try {
  const { target, hours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch(exception) {
  console.log('Error, something bad happened, message: ', exception.message);
}
