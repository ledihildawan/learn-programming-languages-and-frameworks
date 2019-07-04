function outer() {
  var data = 'closures are '
  return function inner() {
    var innerData = 'awesome'
    return data + innerData
  }
}

outer()() // closures are awesome

function outer2(a) {
  return function inner2(b) {
    return a + b
  }
}

outer2(5)(5) // 10

function outerFn() {
  var data = 'something from outer'
  return function inenrFn() {
    return 'Just return from inner function'
  }
}

outerFn()() // Just return from inner function

function outerFn2() {
  var data = 'something from outer'
  return function inner() {
    var innerData = 'something from inner'
    return data + ' ' + innerData
  }
}

outerFn2()() // something from outer something from inner