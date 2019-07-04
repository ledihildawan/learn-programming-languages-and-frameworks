function factorialize(num) {
 
 var totalFactorial = 1;
 
 for(var i = 1 ; i <= num ; i++){
  totalFactorial *= i;
  console.log(totalFactorial)
 }

 return totalFactorial;
}

factorialize(5);