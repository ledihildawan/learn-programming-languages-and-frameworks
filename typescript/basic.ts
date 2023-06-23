interface IProfile {
  myName: string | null;
  myFavoriteNumber: number[];
  status?: string;
  getAge?: () => number;
}

const myName: IProfile['myName'] = 'Ledi Hildawan';
const myFavoriteNumber: IProfile['myFavoriteNumber'] = [4, 5, 7, 8, 10];

const profile: IProfile = {
  myName,
  myFavoriteNumber,
};

function addShipping(price: number, shipping: number): number {
  return price + shipping;
}

addShipping(1, 5);

class Queue<T> {
  private data: T[] = [];

  add(item: T) {
    this.data.push(item);
  }

  remove() {
    this.data.shift();
  }
}

const nameQueue = new Queue<string>();
nameQueue.add('Ledi');

const numQueue = new Queue<number>();
numQueue.add(11);

function MenuItem(itemID: string) {
  return (target: Function) => {
    target.prototype.id = itemID;
  };
}

@MenuItem('abc')
class Pizza {
  id: string;
}

@MenuItem('def')
class Hamburger {
  id: string;
}

console.log(new Pizza().id);
