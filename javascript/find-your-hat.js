// Import prompt-sync to get user input from the terminal
const prompt = require('prompt-sync')({ sigint: true });

class Field {
  constructor(field) {
    this.field = field;
    this.playerPosition = { x: 0, y: 0 };
    this.field[0][0] = '*'; // Initial player position
  }

  // Method to print the current state of the field
  print() {
    this.field.forEach(row => console.log(row.join(' ')));
  }

  // Method to move the player based on direction input
  movePlayer(direction) {
    switch (direction) {
      case 'up':
        this.playerPosition.y -= 1;
        break;
      case 'down':
        this.playerPosition.y += 1;
        break;
      case 'left':
        this.playerPosition.x -= 1;
        break;
      case 'right':
        this.playerPosition.x += 1;
        break;
      default:
        console.log('Invalid move');
        return;
    }

    // Check if the player has moved outside the field
    if (this.isOutOfBounds()) {
      console.log('You stepped outside the field! Game over.');
      process.exit();
    }

    // Check the new position
    const newPosition = this.field[this.playerPosition.y][this.playerPosition.x];
    if (newPosition === 'O') {
      console.log('You fell in a hole! Game over.');
      process.exit();
    } else if (newPosition === '^') {
      console.log('You found your hat! You win!');
      process.exit();
    } else {
      // Update the player's position on the field
      this.field[this.playerPosition.y][this.playerPosition.x] = '*';
    }
  }

  // Method to check if the player is out of field bounds
  isOutOfBounds() {
    return (
      this.playerPosition.x < 0 ||
      this.playerPosition.y < 0 ||
      this.playerPosition.x >= this.field[0].length ||
      this.playerPosition.y >= this.field.length
    );
  }

  // Static method to generate a random field
  static generateField(height, width, holePercentage = 0.2) {
    const field = Array.from({ length: height }, () =>
      Array.from({ length: width }, () =>
        Math.random() < holePercentage ? 'O' : '░'
      )
    );

    // Place the hat at a random position that is not the starting position
    let hatX, hatY;
    do {
      hatX = Math.floor(Math.random() * width);
      hatY = Math.floor(Math.random() * height);
    } while (hatX === 0 && hatY === 0);

    field[hatY][hatX] = '^';
    field[0][0] = '*'; // Set player start position

    return field;
  }
}

// Main game loop
const myField = new Field(Field.generateField(10, 10, 0.3));

while (true) {
  myField.print();
  const direction = prompt('Which way? (up, down, left, right) ').toLowerCase();
  myField.movePlayer(direction);
}
