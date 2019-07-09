class ProfileManager {
  constructor(user) {
    this.user = user;
  }

  createUsername(user) {
    return `${user.firstName}.${user.lastName}.${user.id}`;
  }

  createProfileUrl(domain, username) {
    return `${domain}${username}`;
  }
}

let user = {
  id: 7863,
  firstName: 'John',
  lastName: 'Smith'
};

let manager = new ProfileManager(user);
let profileUrl = manager.createProfileUrl('https://mysocialnetwork.com', createUsername(user));

console.log(profileUrl);