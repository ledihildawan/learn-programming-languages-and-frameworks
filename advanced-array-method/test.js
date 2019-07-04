var array = ["Saturday", "Sunday", "Monday", "Tuesday", "Saturday" ];

for ( var i = 0; i < array.length; i++){
  for (var j = i+1; j< array.length; j++){
    if (array [i] === array [j]){
      console.log(array[i]);
    }
  }
}