import { Outlet } from 'react-router-dom';

import Navigation from '../components/navigation/navigation.component';

function MainLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default MainLayout;
