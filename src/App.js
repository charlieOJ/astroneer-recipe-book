import { useState } from "react";
import { Dropdown, ButtonGroup } from "react-bootstrap";

import "./App.css";
import ITEMS from "./data/items";
import Header from "./components/Header.js";
import Recipe from "./components/Recipe.js";

function App() {
  const [itemsList, setItemsList] = useState(ITEMS);
  const [selectedItem, setSelectedItem] = useState("");
  const [search, setSearch] = useState("");

  const itemListOptions = () => {
    return itemsList.map((item, index) => {
      return (
        <Dropdown.Item key={item.name + index} eventKey={item.name}>
          {item.name}
        </Dropdown.Item>
      );
    });
  };

  const handleItemOptionChange = e => {
    const newItemsList = ITEMS.filter(item => item.name.indexOf(e.target.value) !== -1);

    setItemsList(newItemsList);
    setSearch(e.target.value);
  };

  const handleDropdownSelect = (eventKey, _e) => {
    const currentItem = ITEMS.filter(item => item.name === eventKey)[0];
    setSelectedItem(currentItem);
  };

  const handleClearForm = () => {
    setSelectedItem("");
  };

  return (
    <div className="container">
      <Header />

      <main className="row">
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
                  {itemListOptions()}
                </Dropdown.Menu>
              </Dropdown>
            </ButtonGroup>

            {selectedItem && (
              <p className="col badge text-bg-secondary">
                {selectedItem.name}{" "}
                <i
                  className="fa-solid fa-x"
                  style={{ cursor: "pointer" }}
                  onClick={handleClearForm}
                ></i>
              </p>
            )}
          </div>
        </form>

        <section className="col-12">
          <h3>Recipe</h3>

          {selectedItem ? <Recipe item={selectedItem} /> : <p>Nothing here.</p>}
        </section>
      </main>
    </div>
  );
}

export default App;
