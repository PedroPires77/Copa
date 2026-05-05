const images = require.context('../assets/jogos', false, /\.png$/);

export const teamLogos = images.keys().reduce((acc, item) => {
  const name = item
    .replace('./', '')
    .replace('.png', '')
    .toLowerCase();

  acc[name] = images(item);
  return acc;
}, {});