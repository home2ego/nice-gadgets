import clsx from "clsx";
import styles from "./Count.module.scss";

interface CountProps {
  quantity: number;
}

const Count: React.FC<CountProps> = ({ quantity }) => (
  <span className={clsx(styles.count, "text--xs")}>{quantity}</span>
);

export default Count;
