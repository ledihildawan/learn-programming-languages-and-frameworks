async function sum(a, b) {
  return a + b;
}

function tripleAfter1Second(number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(number * 3);
    }, 1000);
  });
}

tripleAfter1Second(10).then((result) => {
  console.log(result);
});

const finalResult = async (number) => {
  try {
    const triple = await tripleAfter1Second(number);

    return triple % 2;
  } catch (error) {
    console.log('Something went wrong:', error);
  }
};

finalResult(333).then((result) => {
  console.log(result);
});
