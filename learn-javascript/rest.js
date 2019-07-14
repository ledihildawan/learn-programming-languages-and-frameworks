const printTeam = (team, coach, ...players) => {
  players = [...players];

  console.log(`Team: ${team}`);
  console.log(`Coach: ${coach}`);
  console.log(`Players: ${players.join(', ')}`);
}

printTeam('Real Madrid', 'Zinedine Zidane', 'Hazard', 'Jovic', 'Vinicius');