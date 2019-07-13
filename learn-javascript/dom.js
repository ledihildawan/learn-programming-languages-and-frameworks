// Query and remove
const p = document.querySelector('p');
p.remove();

// Query all and remove
const ps = document.querySelectorAll('p');

ps.forEach(function (p) {
  p.remove();
});

// Add a new element
const newP = document.createElement('p');
newP.textContent = 'New paragraph';
document.body.appendChild(newP);

//
const todos = [
  {
    text: 'order cat food',
    compeleted: false
  },
  {
    text: 'buy food',
    compeleted: false
  },
  {
    text: 'wash car',
    compeleted: true
  },
]