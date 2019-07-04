var mongoose = require('mongoose');
var Product = require('../models/product');

mongoose.connect('mongodb://localhost/shopping', { useNewUrlParser: true });

function createProduct(imagePath, title, description, price) {
  return new Product({
    imagePath: imagePath,
    title: title,
    description: description,
    price: price
  });
}

var products = [
  createProduct('https://upload.wikimedia.org/wikipedia/en/thumb/4/44/Red_Dead_Redemption_II.jpg/220px-Red_Dead_Redemption_II.jpg', 'Red Dead Redemption 2 (video game)', 'Red Dead Redemption 2 (video game) is a Western-themed action-adventure game. Played from a first or third-person perspective, the game is set in an open-world environment featuring a fictionalized version of the Western U.S.', 59),
  createProduct('https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Celeste_box_art_final.png/220px-Celeste_box_art_final.png', 'Celeste (video game)', 'Celeste is a platform game in which players control a girl named Madeline as she makes her way up a mountain while avoiding various deadly obstacles. Along with jumping and climbing up walls for a limited amount of time, Madeline has the ability to perform a mid-air dash in the eight cardinal and intercardinal directions.', 19),
  createProduct('https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Monster_Hunter_World_cover_art.jpg/220px-Monster_Hunter_World_cover_art.jpg', 'Monster Hunter: World (video game)', 'Monster Hunter: World is an open-world action role-playing game played from a third-person perspective. Similar to previous games in the series, the player takes the role of a player-created character who travels to the "New World", an unpopulated land mass filled with monsters, to join the Research Commission that study the land from their central command base of Astera.', 50),
  createProduct('https://upload.wikimedia.org/wikipedia/en/thumb/e/e1/Spider-Man_PS4_cover.jpg/220px-Spider-Man_PS4_cover.jpg', 'Marvel\'s Spider-Man (video game)', 'Spider-Man is an open world action-adventure game set in the borough of Manhattan in a fictionalised version of modern-day New York City. It is presented from a third-person perspective showing the playable character on screen and allowing the camera to be freely rotated around it. The primary playable character is the superhero Spider-Man.', 40),
  createProduct('https://upload.wikimedia.org/wikipedia/en/thumb/9/99/ACOdysseyCoverArt.png/220px-ACOdysseyCoverArt.png', 'Assassin\'s Creed Odyssey (video game)', 'Assassin\'s Creed Odyssey places more emphasis on role-playing elements than previous games in the series. The game contains dialogue options, branching quests, and multiple endings. The player is able to choose the gender of the main character, adopting the role of Alexios or Kassandra.', 60),
  createProduct('https://upload.wikimedia.org/wikipedia/en/thumb/5/50/Super_Smash_Bros._Ultimate.jpg/220px-Super_Smash_Bros._Ultimate.jpg', 'Super Smash Bros. Ultimate (video games)', 'Super Smash Bros. Ultimate is a fighting game for up to eight players in which characters from Nintendo games and from other third-party franchises must try to knock each other out of an arena. Each player has a percentage meter which raises when they take damage, making them easier to launch in the air and out of the arena', 60),
  createProduct('https://upload.wikimedia.org/wikipedia/en/thumb/1/1c/Call_of_Duty_Black_Ops_4_official_box_art.jpg/220px-Call_of_Duty_Black_Ops_4_official_box_art.jpg', 'Call of Duty: Black Ops 4 (video game)', 'Call of Duty: Black Ops 4 is a multiplayer first-person shooter video game. Unlike previous titles in the Call of Duty series, Black Ops 4 is the first entry to not feature a traditional single-player campaign, and contains only Multiplayer, Zombies and a new battle royale mode called Blackout.', 60),
  createProduct('https://upload.wikimedia.org/wikipedia/en/thumb/2/27/Ni_no_Kuni_II_Revenant_Kingdom_cover_art.jpg/220px-Ni_no_Kuni_II_Revenant_Kingdom_cover_art.jpg', 'Ni no Kuni II: Revenant Kingdom (video game)', 'Ni no Kuni II: Revenant Kingdom is a role-playing game played from a third-person perspective. Players complete quests—linear scenarios with set objectives—to progress through the story. Outside of quests, players can freely roam the open world, where they explore towns, villages, dungeons, and other dangerous places scattered throughout the world.', 60),
  createProduct('https://upload.wikimedia.org/wikipedia/en/thumb/8/88/Hitman_2_%282018%29_cover.jpg/220px-Hitman_2_%282018%29_cover.jpg', 'Hitman 2 (video game)', 'Hitman 2\'s gameplay is similar to its 2016 predecessor, as Agent 47, a contract assassin working for the International Contract Agency (ICA), travels to various locations around the globe to eliminate high-profile targets. The game features six missions, which are set in six distinct locations.', 60),
  createProduct('https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Far_Cry_5_boxshot.jpg/220px-Far_Cry_5_boxshot.jpg', 'Far Cry 5 (video game)', 'Similar to its predecessors, Far Cry 5 is an action-adventure first-person shooter set in an open world environment which the player can explore freely on foot or via various vehicles. Unlike previous titles in the series where the player takes on the role of a set character, the game gives the player the opportunity to customize their character\'s appearance.', 60)
];

var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save(function(err, result) {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}