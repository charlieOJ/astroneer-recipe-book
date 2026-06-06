/// <reference types="webpack-env" />

const normalizeKey = (key: any) => {
  // Remove the initial "./"
  let cleanKey = key.replace(/^\.\//, "");
  // Remove extension
  cleanKey = cleanKey.replace(/\.(jpg|jpeg|png|webp|svg|gif)$/i, "");
  return cleanKey;
};

const allImages = {} as any;

// Load images for /resources
const resourcesContext = require.context(
  "./assets/images/resources",
  false,
  /\.(jpg|jpeg|png|webp)$/,
);
resourcesContext.keys().forEach(key => {
  const name = normalizeKey(key);

  allImages[name] = resourcesContext(key);
});

// Load images for /items
const itemsContext = require.context("./assets/images/items", false, /\.(jpg|jpeg|png|webp)$/);
itemsContext.keys().forEach(key => {
  const name = normalizeKey(key);

  allImages[name] = itemsContext(key);
});

// Load images for /planets
const planetsContext = require.context("./assets/images/planets", false, /\.(jpg|jpeg|png|webp)$/);
planetsContext.keys().forEach(key => {
  const name = normalizeKey(key);

  allImages[name] = planetsContext(key);
});

// Load images for /hazards
const hazardsContext = require.context("./assets/images/hazards", false, /\.(jpg|jpeg|png|webp)$/);
hazardsContext.keys().forEach(key => {
  const name = normalizeKey(key);

  allImages[name] = hazardsContext(key);
});

export default allImages;
