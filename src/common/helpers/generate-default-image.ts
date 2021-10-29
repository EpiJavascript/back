const defaultBlue = 'https://i.imgur.com/uO2YtN5.png';
const defaultGreen = 'https://i.imgur.com/slqHgfr.png';
const defaultOrange = 'https://i.imgur.com/HwcAtw5.png';
const defaultPink = 'https://i.imgur.com/KkwurCr.png';
const defaultRed = 'https://i.imgur.com/9zFKYvC.png';

const defaultArray = [defaultBlue, defaultGreen, defaultOrange, defaultPink, defaultRed];

export function generateDefaultImage(): string {
  return defaultArray[Math.floor(Math.random() * defaultArray.length)];
}