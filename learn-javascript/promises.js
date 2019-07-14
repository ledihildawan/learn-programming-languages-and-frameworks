const getLocation = async () => {
  const response = await fetch("http://ipinfo.io/json?token=82d2a6c02ec27b");

  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error('Unable to fetch location');
  }
}

getLocation()
  .then((data) => console.log(data))
  .catch((err) => e.message);


// 2
const getAllUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");

  if (response.status === 200) {
    const data = await response.json();
    return data;
  } else {
    throw new Error('Unable to fetch users');
  }
};

const users = getAllUsers();