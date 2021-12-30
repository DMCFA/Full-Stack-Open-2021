interface exerciseCalc {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const numberOfDays = (hours: number[]): number => {
  let total: number = 0;
  hours.forEach((num) => (total += 1));
  return total;
};

const trainingDays = (hours: number[]): number => {
  let total: number = 0;
  hours.forEach((num) => {
    if (num !== 0) {
      total = +1;
    }
  });
  return total;
};

const getAverage = (hours: number[]): number => {
  const days: number = numberOfDays(hours);
  let total: number = 0;
  let average: number;
  hours.forEach((num) => (total += num));
  average = total / days;
  return average;
};

const success = (average: number, target: number): boolean => {
  return average > target ? true : false;
};

const getRating = (average: number, target: number): number => {
  if (average < target) {
    return 1;
  } else if (average === target) {
    return 2;
  } else {
    return 3;
  }
};

const ratingDesc = (rating: number): string => {
  if (rating === 1) {
    return 'Below Average';
  } else if (rating === 2) {
    return 'Average';
  } else {
    return 'Above Average';
  }
};

function calculateExercises(hours: number[], target: number): exerciseCalc {
  let average: number = getAverage(hours);
  let rating: number = getRating(average, target);
  return {
    periodLength: numberOfDays(hours),
    trainingDays: trainingDays(hours),
    success: success(average, target),
    rating: rating,
    ratingDescription: ratingDesc(rating),
    target: target,
    average: average,
  };
}

calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);
