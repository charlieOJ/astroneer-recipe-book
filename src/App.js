import "./App.css";
import RESOURCES, { BASE_URL } from "./data/resources";
import Header from "./components/Header.js";

function App() {
  const miningResources = RESOURCES.filter(resource => resource.obtainBy === "mining");
  const smeltingResources = RESOURCES.filter(resource => resource.obtainBy === "smelting");
  const atmosphericCondenserResources = RESOURCES.filter(
    resource => resource.obtainBy === "atmosphericCondenser",
  );
  const chemistryLabResources = RESOURCES.filter(resource => resource.obtainBy === "chemistryLab");

  const renderResourcesList = (title, resourcesList) => {
    return (
      <>
        <h2>{title}</h2>
        <ul>
          {resourcesList.map((resource, index) => {
            return (
              <li key={index}>
                <img
                  src={BASE_URL + resource.logo + `.png`}
                  width="25"
                  alt={`${resource.name} icon`}
                />
                {resource.name}
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  return (
    <div>
      <div className="container">
        <Header />

        <main>
          {renderResourcesList("Mining", miningResources)}
          {renderResourcesList("Smelting", smeltingResources)}
          {renderResourcesList("Atmospheric Condenser", atmosphericCondenserResources)}
          {renderResourcesList("Chemistry Lab", chemistryLabResources)}
        </main>
      </div>
    </div>
  );
}

export default App;
