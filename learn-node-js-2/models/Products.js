export default class Product {
  constructor({ id, name, price, images }) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._images = images;
  }

  getId = () => this._id;

  getName = () => this._name;

  getPrice = () => this._price;

  getImages = () => this._images;

  getData = () => ({
    id: this._id,
    name: this._name,
    price: this._price,
    images: this._images,
  });
}