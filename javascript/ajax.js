const ajax = (() => {
  function send(settings) {
    const xhr = new XMLHttpRequest();
    
    xhr.open(settings.method, settings.url);

    xhr.addEventListener('error', () => {
      settings.error({
        errorText: xhr.responseText,
        code: xhr.status
      });
    });

    xhr.addEventListener('load', () => {
      settings.success(xhr.responseText);
    });

    xhr.addEventListener('timeout', () => {
      // some action on timeout
    });

    xhr.timeout = settings.timeout || 3000;

    if (settings.headers) {
      for (let headerName in settings.headers) {
        xhr.setRequestHeader(headerName, settings.headers[headerName]);
      }
    }

    xhr.send(settings.data);
  }

  return {
    send
  }
})();

ajax.send({
  method: 'GET',
  url: 'https://jsonplaceholder.typicode.com/posts',
  success(res) {
    let response = JSON.parse(res);
    console.log(response);
  },
  error(err) {
    console.log(err);
  }
});

ajax.send({
  method: 'POST',
  url: 'https://jsonplaceholder.typicode.com/posts',
  data: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1
  }),
  headers: {
    'Content-type': 'application/json, charset=UTF-8'
  },
  success(res) {
    let response = JSON.parse(res);
    console.log(response);
  },
  error(err) {
    console.log(err);
  }
});