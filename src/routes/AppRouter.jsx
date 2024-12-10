// src/routes/AppRouter.jsx
import { Routes, Route } from 'react-router-dom';
import PATHS from './paths';
import Layout from '../components/layout/Layout';

// Pages
import Home from '../pages/Home';
import Tasks from '../pages/Tasks';
import Calendar from '../pages/Calendar';
import Categories from '../pages/Categories';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={PATHS.HOME} element={<Layout><Home /></Layout>} />
      <Route path={PATHS.TASKS} element={<Layout><Tasks /></Layout>} />
      <Route path={PATHS.CALENDAR} element={<Layout><Calendar /></Layout>} />
      <Route path={PATHS.CATEGORIES} element={<Layout><Categories /></Layout>} />
    </Routes>
  );
};

export default AppRouter;