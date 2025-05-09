const team = {
  _players: [
    {
      firstName: 'John',
      lastName: 'Doe',
      age: 25
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      age: 28
    },
    {
      firstName: 'Mike',
      lastName: 'Johnson',
      age: 30,
    }
  ],
  _games: [
    {
      opponent: 'Sharks',
      teamPoints: 90,
      opponentPoints: 85
    },
    {
      opponent: 'Bears',
      teamPoints: 100,
      opponentPoints: 95
    },
    {
      opponent: 'Lions',
      teamPoints: 85,
      opponentPoints: 90
    },
  ],

  get players() {
    return this._players;
  },

  get games() {
    return this._games;
  },

  addPlayer(firstName, lastName, age) {
    this._players.push({
      age,
      lastName,
      firstName,
    });
  },

  addGame(opponent, teamPoints, opponentPoints) {
    this._games.push({
      opponent,
      teamPoints,
      opponentPoints,
    });
  },
};

team.addPlayer('Bugs', 'Bunny', 76);

console.log(team.players);

team.addGame('Titans', 100, 98);

console.log(team.games);
