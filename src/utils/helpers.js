export const isInteger = value =>
  value !== "" && Number.isInteger(Number(value));

export const add = (firstTerm, secondTerm) => {
  const numerator =
    firstTerm.numerator * secondTerm.denominator +
    secondTerm.numerator * firstTerm.denominator;

  const denominator = firstTerm.denominator * secondTerm.denominator;

  return { numerator, denominator };
};

export const subtract = (minuend, subtrahend) => {
  const numerator =
    minuend.numerator * subtrahend.denominator -
    subtrahend.numerator * minuend.denominator;

  const denominator = minuend.denominator * subtrahend.denominator;

  return { numerator, denominator };
};

export const multiply = (firstMultiplier, secondMultiplier) => {
  const numerator = firstMultiplier.numerator * secondMultiplier.numerator;

  const denominator =
    firstMultiplier.denominator * secondMultiplier.denominator;

  return { numerator, denominator };
};

export const divide = (dividend, divider) => {
  const numerator = dividend.numerator * divider.denominator;

  const denominator = dividend.denominator * divider.numerator;

  return { numerator, denominator };
};

export const calculateGCD = (firstNumber, secondNumber) => {
  if (firstNumber < secondNumber) {
    const temp = secondNumber;

    secondNumber = firstNumber;
    firstNumber = temp;
  }

  if (secondNumber === 0) return 1;

  let divider = secondNumber;

  while (firstNumber % secondNumber !== 0) {
    const temp = secondNumber;

    secondNumber = firstNumber % secondNumber;
    firstNumber = temp;
    divider = secondNumber;
  }

  return divider;
};

export const simplify = ({ numerator, denominator }) => {
  const gcd = calculateGCD(numerator, denominator);

  return { numerator: numerator / gcd, denominator: denominator / gcd };
};

export const calculate = (currentFractions, currentOperations) => {
  let calculatedValue = currentFractions[0];

  for (let iterator = 0; iterator < currentFractions.length; iterator++) {
    switch (currentOperations[iterator]) {
      case "+":
        calculatedValue = add(
          calculatedValue,
          currentFractions[iterator + 1]
        );

        break;
      case "-":
        calculatedValue = subtract(
          calculatedValue,
          currentFractions[iterator + 1]
        );

        break;
      case "*":
        calculatedValue = multiply(
          calculatedValue,
          currentFractions[iterator + 1]
        );

        break;
      case "/":
        calculatedValue = divide(
          calculatedValue,
          currentFractions[iterator + 1]
        );

        break;
    }
  }

  return simplify(calculatedValue);
};
