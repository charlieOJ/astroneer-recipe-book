import { JSX, SetStateAction, useState, useEffect, useCallback } from "react";
import { Dropdown, ButtonGroup } from "react-bootstrap";

import useFetch from "../hooks/useFetch";
import { fetchItems } from "../http";

import ErrorBlock from "./ErrorBlock";

interface ItemSelectorProps {
  onSelectedItemChange: (value: any) => void;
}

const ItemSelector = ({ onSelectedItemChange }: ItemSelectorProps): JSX.Element => {
  const { isFetching, error, fetchedData: itemsList } = useFetch(fetchItems, []);
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]);

  useEffect(() => {
    setSearchList(itemsList);
  }, [itemsList]);

  const itemListOptions = useCallback((): JSX.Element[] | JSX.Element => {
    if (error) return <ErrorBlock title="Something went wrong." message={error} />;
    if (searchList === undefined) return <></>;

    return searchList.map((item: any, index: number) => {
      return (
        <Dropdown.Item key={item.name + index} eventKey={item.name}>
          {item.name}
        </Dropdown.Item>
      );
    });
  }, [error, searchList]);

  const handleItemOptionChange = (e: { target: { value: SetStateAction<string> } }): any => {
    const newItemsList = itemsList.filter((item: any) => item.name.indexOf(e.target.value) !== -1);

    setSearchList(newItemsList);
    setSearch(e.target.value);
  };

  const handleDropdownSelect = (eventKey: any, _e: any) => {
    const currentItem = searchList.filter((item: any) => item.name === eventKey)[0];
    onSelectedItemChange(currentItem);
  };

  return (
    <>
      <h2>What do you want to create ?</h2>
      <form className="col-md-4">
        <div className="mb-3">
          <ButtonGroup className="col-12">
            <Dropdown as={ButtonGroup} onSelect={handleDropdownSelect}>
              <Dropdown.Toggle variant="primary">Select an item to create</Dropdown.Toggle>
              <Dropdown.Menu className="mt-1">
                <input
                  type="text"
                  placeholder="Search..."
                  className="rounded mx-2"
                  onChange={handleItemOptionChange}
                  value={search}
                  autoFocus
                  style={{
                    width: "calc(100% - 20px)",
                  }}
                />
                {isFetching && <p>Fetching items...</p>}
                {!isFetching && itemListOptions()}
              </Dropdown.Menu>
            </Dropdown>
          </ButtonGroup>
        </div>
      </form>
    </>
  );
};

export default ItemSelector;
