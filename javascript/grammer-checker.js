const story = 'Last weekend, I took literally the most beautiful bike ride of my life. It was literally the most beautiful thing. The route is called "The 9W" and it crosses the state borders twice. The scenery is beautiful, but it also has many challenging sections that truly test your endurance. Overall, it was a great experience, and I can’t wait to do it again.';

const badWord = 'great';
const misspelledWord = 'beautiful';
const unnecessaryWord = 'literally';

let storyWords = story.split(' ');

console.log(`Word count: ${storyWords.length}`);

storyWords = storyWords.filter(word => word !== unnecessaryWord);
storyWords = storyWords.map(word => word === misspelledWord ? 'stunning' : word);

const badWordIndex = storyWords.findIndex(word => word === badWord);

console.log(`Bad word index: ${badWordIndex}`);

if (badWordIndex !== -1) {
  storyWords[badWordIndex] = 'really';
}

let lengthCheck = storyWords.every(word => word.length <= 10);

console.log(`All words <= 10 characters: ${lengthCheck}`);

storyWords = storyWords.map(word => word.length > 10 ? 'glorious' : word);

console.log(storyWords.join(' '));
