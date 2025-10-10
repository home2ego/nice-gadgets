import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App';
import HomePage from './modules/HomePage';
import PhonesPage from './modules/PhonesPage';
import TabletsPage from './modules/TabletsPage';
import AccessoriesPage from './modules/AccessoriesPage';
import NotFound from './modules/NotFound';

// React.lazy() for large pages

const Root = () => (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="phones" element={<PhonesPage />} />
        <Route path="tablets" element={<TabletsPage />} />
        <Route path="accessories" element={<AccessoriesPage />} />

        <Route path="favorites" element={<div>Favorites Page</div>} />
        <Route path="cart" element={<div>Cart Page</div>} />

        <Route path="contacts" element={<div>Contacts Page</div>} />
        <Route path="rights" element={<div>Rights Page</div>} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </HashRouter>
);

export default Root;
