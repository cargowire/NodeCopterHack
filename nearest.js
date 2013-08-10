nn = require('nearest-neighbor');

var items = [
  { name: "LAND"},
  { name: "TAKE OFF"},
  { name: "UP"},
  { name: "DOWN"},
  { name: "LEFT"},
  { name: "RIGHT"},
  { name: "DANCE"},
];

var query = { name: "kuLAND"};

var fields = [
  { name: "name", measure: nn.comparisonMethods.word },
 ];

nn.findMostSimilar(query, items, fields, function(nearestNeighbor, probability) {
  console.log(query);
  console.log(nearestNeighbor);
  console.log(probability);
});