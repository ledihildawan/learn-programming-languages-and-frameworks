// 1
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('Error');
    resolve('some value');
  }, 2000);
});

promise1
  .then(data => {
    console.log(data)
    return 'some new info'
  })
  .then(data => console.log(data))
  .catch(err => {
    console.log(err);
  });

// 2
function promise12() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('First step');
      resolve('First step');
    }, 2000);
  });
}

function promise2(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Second step', data);
      resolve('second step');
    }, 2000);
  });
}

function promise3(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Third step', data);
      resolve('third step');
    }, 2000);
  });
}

promise12()
  .then(promise2)
  .then(promise3)
  .catch(err => console.log(err));

// 3
function getPostById(id) {
  return new Promise((resolve, reject) => {
    ajax.send({
      method: 'GET',
      url: `https://jsonplaceholder.typicode.com/posts/${id}`,
      success: resolve,
      error: reject
    });
  });
}

function getCommentsById(id) {
  return new Promise((resolve, reject) => {
    ajax.send({
      method: 'GET',
      url: `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
      success: resolve,
      error: reject
    });
  });
}

getPostById(1)
  .then(data => console.log(data))
  .catch(err => console.log(err));


// fetch
fetch('https://jsonplaceholder.typicode.com/posts/1/comments', { method: 'GET' })
  .then(res => {
    console.log(res.status);
    console.log(res.headers.get('Content-type'));
    return res.json();
  })
  .then(data => console.log(data))
  .catch(err => console.log(err));

// 4
class JSONPlaceholder {
  getPosts(id) {
    return new Promise((resolve, reject) => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: 'GET' })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }

  getCommentsById(id) {
    return new Promise((resolve, reject) => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`, { method: 'GET' })
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  }
}

const server = new JSONPlaceholder();

server.getPosts(1)
  .then(data => data.id)
  .then(server.getCommentsById)
  .then(comments => console.log(comments));