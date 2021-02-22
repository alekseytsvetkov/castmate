const emojiList = new Set(['MorshuPls', 'catJAM', 'Pog', '2Head', '4HEader', '5Head',
'AlienPls', 'AYAYA', 'Clap', 'coffinPls', 'ddHuh', 'EZY', 'gachiBASS', 'GuitarTime',
'HACKERMANS', 'KEKW', 'lickL', 'lickR', 'LULW', 'MLADY', 'monkaHmm', 'nymnCorn', 'OMEGALUL',
'peepoHappy', 'peepoPoo', 'peepoRun', 'Pepega', 'PepeHands', 'pepeJAM', 'Pogey', 'POGGERS',
'PogTasty', 'popCat', 'pugPls', 'ricardoFlick', 'sadCat', 'Sadge', 'sumSmash', 'TriDance',
'weirdChamp', 'YEP']);

// Ebalo -> <eid:Ebalo:ebalo>
export const convertTextToEmojiCode = (text: string) => {
  return text
    .split(' ')
    .map((word) => (emojiList.has(word) ? `<eid:${word}:${word}>` : word))
    .join(' ');
};

// Text <eid:Ebalo:ebalo> bla-bla -> [
//   {type: 'text', value: 'Text'},
//   {type: 'emoji', name: 'Ebalo', id: 'ebalo'},
//   {type: 'text', value: 'bla-bla'},
// ]
export const splitTextToEmojiArray = (text: string) => {
  return text.split(/(\<eid\:[^:]+\:[a-zA-Z0-9]+\>)/g).map((txt) => {
    const findEmoji = txt.match(/\<eid\:([^:]+)\:([a-zA-Z0-9]+)\>/);

    if (findEmoji) {
      return { type: 'emoji', name: findEmoji[1], id: findEmoji[2] };
    }

    return { type: 'text', value: txt };
  });
};