import { layout } from './components/layout';

import { homePage } from './pages/home';
import { userPage } from './pages/user';

import createCone from 'van-cone';

export const { link, route } = createCone({ routerElement: layout });

route('home', '/', homePage);
route('user', '/user/:userId', userPage);
