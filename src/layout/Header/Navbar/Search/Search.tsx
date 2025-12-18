import { useState } from "react";
import Icon from "@/layout/shared/components/Icon";
import styles from "./Search.module.scss";
import SearchDialog from "./SearchDialog";

const Search = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-haspopup="dialog"
        className={styles.search}
        onClick={() => setIsDialogOpen(true)}
      >
        <Icon>
          <path d="m21 21-4.34-4.34" />
          <circle cx="11" cy="11" r="8" />
        </Icon>
      </button>

      <SearchDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
};

export default Search;
