import { useState } from "react";
import type { Product } from "@/modules/shared/types/product";
import styles from "./CartProduct.module.scss";

interface ProductProps {
  product: Product;
}

const CartProduct: React.FC<ProductProps> = ({ product }) => {
  const [count, setCount] = useState(1);

  const handleDecrementClick = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }

    return;
  };

  const handleIncrementClick = () => {
    if (count < 10) {
      setCount((prev) => prev + 1);
    }

    return;
  };

  return (
    <li className={styles.product}>
      <button type="button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text-color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>

      <img src={product.image} alt="" />

      <h3>{product.name}</h3>

      <button type="button" onClick={handleDecrementClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text-color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
        </svg>
      </button>

      <p>{count}</p>

      <button type="button" onClick={handleIncrementClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text-color-primary)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
      </button>

      <p>{product.price * count}</p>
    </li>
  );
};

export default CartProduct;
