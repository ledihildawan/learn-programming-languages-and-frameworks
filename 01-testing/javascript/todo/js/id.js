const Id = (() => {
  const words =
    '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';

  const generate = () => {
    let id = '';

    for (let i = 0; i < 15; i++) {
      let position = Math.floor(Math.random() * words.length);

      id += words[position];
    }
  };

  return {
    generate,
  };
})();
