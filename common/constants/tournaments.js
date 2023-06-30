const teamSizes = {
  '1v1': 1,
  '2v2': 2,
  '3v3': 3,
};

const ranks = [
  { name: 'Bronze', value: 0, emoji: '1124040488492740609' },
  { name: 'Silver', value: 5, emoji: '1124040537889067158' },
  { name: 'Gold', value: 10, emoji: '1124040520977612860' },
  { name: 'Platinum I', value: 15, emoji: '1124040524601495683' },
  { name: 'Platinum II', value: 16, emoji: '1124041423088517201' },
  { name: 'Platinum III', value: 17, emoji: '1124056512675987488' },
  { name: 'Diamond I', value: 20, emoji: '1124040501239230644' },
  { name: 'Diamond II', value: 25, emoji: '1124041169681260614' },
  { name: 'Diamond III', value: 30, emoji: '1124041171975553114' },
  { name: 'Champ I', value: 40, emoji: '1124040490782838914' },
  { name: 'Champ II', value: 45, emoji: '1124040494339608686' },
  { name: 'Champ III', value: 50, emoji: '1124056510029381643' },
  { name: 'Grand Champ I', value: 65, emoji: '1124040507971092590' },
  { name: 'Grand Champ II', value: 70, emoji: '1124040511360077935' },
  { name: 'Grand Champ III', value: 75, emoji: '1124040513771814932' },
  { name: 'SSL', value: 100, emoji: '1124040540518879292' },
];

module.exports = {
  teamSizes,
  ranks,
};
