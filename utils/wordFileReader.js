import fs from 'fs';

const wordsFile = fs.readFileSync('sgb-words.txt', 'utf8');

export default wordsFile;