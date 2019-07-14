const user1 = new UserModal({
  id: '44jweqmw03f',
  username: 'jondoe',
  emial: 'jondoe@gmail.com',
  role: 'admin'
});

const user2 = new UserModal({
  id: '87f9dsak2j',
  username: 'janemayer',
  emial: 'janemayer@gmail.com',
  role: 'customer'
});

const users = [user1.getData(), users2.getData()];

export default users;