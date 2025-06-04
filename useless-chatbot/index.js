const talkBtn = document.getElementById('talk-btn');
const chatInput = document.getElementById('chat-input');

talkBtn.addEventListener('click', function () {
  console.log(chatInput.value);
  chatInput.value = '';
});
