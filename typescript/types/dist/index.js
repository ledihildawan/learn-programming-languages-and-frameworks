function calculateTax(amount) {
    return amount * 1.2;
}
console.log(`${12} = ${calculateTax(12)}`);
console.log(`${'Hello'} = ${calculateTax('Hello')}`);
console.log(`${true} = ${calculateTax(true)}`);
