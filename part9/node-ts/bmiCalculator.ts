const calculateBMI = (weight: number, height: number): string => {
  return 'Normal (healthy weight)';
};

const weight: number = Number(process.argv[2]);
const height: number = Number(process.argv[3]);

calculateBMI(weight, height);
