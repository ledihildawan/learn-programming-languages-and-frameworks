function game() {
  var score = Math.random() * 10;
  console.log(score >= 5);
}
game();

(function () {
  var score = Math.random() * 10;
  console.log(score >= 5);
})();

(function (goodLuck) {
  var score = Math.random() * 10;
  console.log(score >= 5 - goodLuck);
})(5);