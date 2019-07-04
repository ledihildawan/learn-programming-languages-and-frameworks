function couter() {
  var count = 0
  return function() {
    return ++count
  }
}

var counter1 = outer()
counter1() // 1
counter1() // 2

var counter2 = outer()
counter2() // 1
counter2() // 2

counter1() // 3

count // ReferenceError