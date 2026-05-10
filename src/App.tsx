import { JSX, useState } from "react";

import "./App.css";

import Header from "./components/Header";
import ItemSelector from "./components/ItemSelector";
import Recipe from "./components/Recipe";

export const RESOURCES_BASE_URL = "https://static.wikia.nocookie.net/astroneer_gamepedia/images/";

const App = (): JSX.Element => {
  const [selectedItem, setSelectedItem] = useState<any>();

  const handleClearForm = () => {
    setSelectedItem(null);
  };

  return (
    <div className="container">
      <Header />

      <main className="row">
        <div>
          <ItemSelector onSelectedItemChange={value => setSelectedItem(value)} />
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
        <section className="col-12">
          <h3>Recipe</h3>

          {selectedItem && selectedItem ? <Recipe item={selectedItem} /> : <p>Nothing here.</p>}
        </section>
      </main>
    </div>
  );
};

export default App;
