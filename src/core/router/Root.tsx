// React.lazy() for large pages

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "@/App";
import AccessoriesPage from "@/modules/AccessoriesPage";
import CartPage from "@/modules/CartPage";
import ContactsPage from "@/modules/ContactsPage";
import FavouritesPage from "@/modules/FavouritesPage";
import HomePage from "@/modules/HomePage";
import NotFound from "@/modules/NotFound";
import PhonesPage from "@/modules/PhonesPage";
import ProductDetailsPage from "@/modules/ProductDetailsPage";
import RightsPage from "@/modules/RightsPage";
import TabletsPage from "@/modules/TabletsPage";

const Root = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="phones" element={<PhonesPage />} />
        <Route path="tablets" element={<TabletsPage />} />
        <Route path="accessories" element={<AccessoriesPage />} />

        <Route path="favourites" element={<FavouritesPage />} />
        <Route path="cart" element={<CartPage />} />

        <Route path="contacts" element={<ContactsPage />} />
        <Route path="rights" element={<RightsPage />} />

        <Route path="product/:productId" element={<ProductDetailsPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Root;
