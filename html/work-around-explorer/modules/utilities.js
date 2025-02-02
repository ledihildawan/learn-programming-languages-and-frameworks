export const formatNumber = (number) => {
  const [integerPart, decimalPart] = number.toString().split('.');

  let formattedInteger = '';

  for (let i = integerPart.length - 1, j = 1; i >= 0; i--, j++) {
    formattedInteger = `${integerPart[i]}${formattedInteger}`;

    if (j % 3 === 0 && i !== 0) {
      formattedInteger = `,${formattedInteger}`;
    }
  }

  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}
