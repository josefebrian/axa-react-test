import { Outlet } from 'react-router-dom';

import { Header } from 'components';

export const Layout = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
