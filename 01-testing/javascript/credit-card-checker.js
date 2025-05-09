const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 1, 2, 4, 3, 8, 5, 2, 1];
const invalid1 = [4, 5, 3, 2, 6, 7, 7, 9, 1, 2, 4, 3, 8, 5, 2, 6];
const mystery1 = [3, 7, 1, 6, 5, 7, 5, 3, 9, 8, 3, 6, 1, 7, 9, 5];

const batch = [valid1, invalid1, mystery1];

function validateCred(cardNumber) {
  let sum = 0;
  let shouldDouble = false;

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = cardNumber[i];

    if (shouldDouble) {
      digit *= 2;

      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

function findInvalidCards(cards) {
  return cards.filter(card => !validateCred(card));
}

function stringToCardArray(cardString) {
  return cardString.split('').map(Number);
}

function idInvalidCardCompanies(invalidCards) {
  const companies = [];

  invalidCards.forEach(card => {
    switch (card[0]) {
      case 3:
        if (!companies.includes('Amex')) {
          companies.push('Amex');
        }

        break;
      case 4:
        if (!companies.includes('Visa')) {
          companies.push('Visa');
        }

        break;
      case 5:
        if (!companies.includes('Mastercard')) {
          companies.push('Mastercard');
        }

        break;
      case 6:
        if (!companies.includes('Discover')) {
          companies.push('Discover');
        }

        break;
      default:
        console.log('Company not found for card starting with:', card[0]);
    }
  });

  return companies;
}

console.log(validateCred(valid1));
console.log(validateCred(invalid1));

const invalidCards = findInvalidCards(batch);

console.log(invalidCards);
console.log(idInvalidCardCompanies(invalidCards));
