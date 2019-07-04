const name = 'Bar';

let template = '<div class="alert"><p>foo</p></div>';

template = '<div class="alert">' + '<p>foo</p>' + '</div>';

template = [
  '<div class="alert">',
    '<p>foo</p>',
  '</div>'
].join('');

template = `
  <div class="alert">
    <p>${name}</p>
  </div>
`;

console.log(template);