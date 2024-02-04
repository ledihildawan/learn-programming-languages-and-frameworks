import './style.css';

import van from 'vanjs-core';

import { link } from './router';
import { layout } from './components/layout';

const { div, nav, h1, footer, small, p } = van.tags;

const App = () => {
  return div(
    nav(
      link({ name: 'home', }, h1('Pizza')),
      link({ name: 'user', class: 'btn' },  'Add new Pizza'),
    ),

    layout,

    footer(
      p(
        small('© 2024 Pizza, Inc.')
      )
    )
  );
}


document.body.replaceChildren(App());
