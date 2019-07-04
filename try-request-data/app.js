const getUsers = (callback) => {
  const req = new XMLHttpRequest();

  req.addEventListener('readystatechange', () => {
    if (req.readyState === 4 && req.status === 200) {
      callback(undefined, JSON.parse(req.responseText));
    } else if (req.readyState === 4) {
      callback('could not fetch data', undefined);
    }
  });

  req.open('GET', 'users.json');
  req.send();
};

getUsers((data, err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});