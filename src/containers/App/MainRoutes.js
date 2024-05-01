import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from 'layouts';

// import containers for main routes
const Main = lazy(() => import('containers/Home'))
const Posts = lazy(() => import('containers/Posts'))
const Albums = lazy(() => import('containers/Albums'))
const Photos = lazy(() => import('containers/Photos'))

const MainRoutes = () => {
  return (
    <Routes basename="/">
      <Route path="/" element={<Main />} />
      <Route element={<Layout />}>
        <Route path="/posts" element={<Posts />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/photos" element={<Photos />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
