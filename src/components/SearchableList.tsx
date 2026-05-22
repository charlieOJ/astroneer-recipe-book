import { useRef, useState } from "react";
import { itemType } from "../types/itemType";

interface Props {
  items: itemType[];
  itemKeyFn: (item: itemType) => string;
  children: any;
}

const SearchableList = ({ items, itemKeyFn, children }: Props) => {
  const [search, setSearch] = useState("");
  const lastChange = useRef(0);

  const searchResults = items.filter(item =>
    JSON.stringify(item.name).includes(search.toLowerCase()),
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (lastChange.current > 0) {
      clearTimeout(lastChange.current);
    }

    lastChange.current = setTimeout(() => {
      lastChange.current = 0;
      setSearch(e.target.value);
    }, 500);
  };

  return (
    <div className="searchable-list">
      <input type="search" placeholder="Search" onChange={onChange} />

      <div className="row">
        {searchResults.map(item => (
          <div className="col-xs-12 col-md-3 my-3" key={itemKeyFn(item)}>
            {children(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchableList;
