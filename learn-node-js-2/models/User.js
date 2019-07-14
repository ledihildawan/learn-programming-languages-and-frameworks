export default class User {
  constructor({ id, username, email, role }) {
    this._id = id;
    this._username = username;
    this._email = email;
    this._role = role;
  }

  getId = () => this._id;

  getUsername = () => this._username;

  getEmail = () => this._email;

  getRole = () => this._role;

  getData = () => ({
    id: this._id,
    username: this._username,
    email: this._email,
    role: this._role
  });
}