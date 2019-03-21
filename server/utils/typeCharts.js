'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var defensiveTypes = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy'];

// these rows are defensive rows
var abbrev = ['no', 'fi', 'fl', 'po', 'gr', 'ro', 'bu', 'gh', 'st', 'fi', 'wa', 'gr', 'el', 'ps', 'ic', 'dr', 'da', 'fa']; // prettier-ignore
var normal = [1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]; // prettier-ignore
var fighting = [1, 1, 2, 1, 1, 0, 2, .5, 1, 1, 1, 1, .5, 1, 2, 1, 1, 1]; // prettier-ignore
var flying = [1, .5, 1, 1, 0, 2, .5, 1, 1, 1, 1, .5, 2, 1, 2, 1, 1, 1]; // prettier-ignore
var poison = [1, .5, 1, .5, 2, 1, .5, 1, 1, 1, 1, .5, 1, 2, 1, 1, 1, .5]; // prettier-ignore
var ground = [1, 1, 1, .5, 1, .5, 1, 1, 1, 1, 2, 2, 0, 1, 2, 1, 1, 1]; // prettier-ignore
var rock = [5., 2, .5, .5, 2, 1, 1, 1, 2, .5, 2, 2, 1, 1, 1, 1, 1, 1]; // prettier-ignore
var bug = [1, .5, 2, 1, .5, 2, 1, 1, 1, 2, 1, .5, 1, 1, 1, 1, 1, 1]; // prettier-ignore
var ghost = [0, 0, 1, .5, 1, 1, .5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1]; // prettier-ignore
var steel = [.5, 2, .5, 0, 2, .5, .5, 1, .5, 2, 1, .5, 1, .5, .5, .5, 1, .5]; // prettier-ignore
var fire = [1, 1, 1, 1, 2, 2, .5, 1, .5, .5, 2, .5, 1, 1, .5, 1, 1, .5]; // prettier-ignore
var water = [1, 1, 1, 1, 1, 1, 1, 1, .5, 1, .5, 2, 2, 1, .5, 1, 1, 1]; // prettier-ignore
var grass = [1, 1, 2, 2, .5, 1, 2, 1, 1, 2, .5, .5, .5, 1, 2, 1, 1, 1]; // prettier-ignore
var electric = [1, 1, .5, 1, 2, 1, 1, 1, .5, 1, 1, 1, .5, 1, 1, 1, 1, 1]; // prettier-ignore
var psychic = [1, .5, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, .5, 1, 1, 2, 1]; // prettier-ignore
var ice = [1, 2, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 1, 1, .5, 1, 1, 1]; // prettier-ignore
var dragon = [1, 1, 1, 1, 1, 1, 1, 1, 1, .5, .5, .5, .5, 1, 2, 2, 1, 2]; // prettier-ignore
var dark = [1, 2, 1, 1, 1, 1, 2, .5, 1, 1, 1, 1, 1, 0, 1, 1, .5, 2]; // prettier-ignore
var fairy = [1, .5, 1, 2, 1, 1, .5, 1, 2, 1, 1, 1, 1, 1, 1, 0, .5, 1]; // prettier-ignore

var defensiveTypeChart = function defensiveTypeChart(types) {
  var charts = {
    normal: normal,
    fighting: fighting,
    flying: flying,
    poison: poison,
    ground: ground,
    rock: rock,
    bug: bug,
    ghost: ghost,
    steel: steel,
    fire: fire,
    water: water,
    grass: grass,
    electric: electric,
    psychic: psychic,
    ice: ice,
    dragon: dragon,
    dark: dark,
    fairy: fairy
  };
  var chart = charts[types[0]];
  var chart2 = charts[types[1]];
  if (chart2) {
    chart = chart.map(function (num, i) {
      var tempObj = {};
      tempObj.type = defensiveTypes[i];
      tempObj.multiplier = num * chart2[i];
      return tempObj;
    });
  } else {
    chart = chart.map(function (num, i) {
      var tempObj = {};
      tempObj.type = defensiveTypes[i];
      tempObj.multiplier = num;
      return tempObj;
    });
  }

  var bixbyChart = {
    // noDamage: [],
    // halfDamage: [],
    // normalDamage: [],
    // doubleDamage: [],
    // quadrupleDamage: [],
    // raw: chart,
    resistances: [],
    neutral: [],
    weaknesses: []
  };

  chart.forEach(function (o) {
    if (o.multiplier === 0 || o.multiplier === 0.25 || o.multiplier === 0.5) {
      bixbyChart.resistances.push(o);
    }
    if (o.multiplier === 1) {
      bixbyChart.neutral.push(o);
    }
    if (o.multiplier === 2 || o.multiplier === 4) {
      bixbyChart.weaknesses.push(o);
    }
  });

  bixbyChart.resistances.sort(function (a, b) {
    return a.multiplier - b.multiplier;
  });
  bixbyChart.weaknesses.sort(function (a, b) {
    return a.multiplier - b.multiplier;
  });

  // chart.forEach(o => {
  //   if (o.multiplier === 0) {
  //     bixbyChart.noDamage.push(o.type);
  //   }
  // });
  // chart.forEach(o => {
  //   if (o.multiplier === 0.5) {
  //     bixbyChart.halfDamage.push(o.type);
  //   }
  // });
  // chart.forEach(o => {
  //   if (o.multiplier === 1) {
  //     bixbyChart.normalDamage.push(o.type);
  //   }
  // });
  // chart.forEach(o => {
  //   if (o.multiplier === 2) {
  //     bixbyChart.doubleDamage.push(o.type);
  //   }
  // });
  // chart.forEach(o => {
  //   if (o.multiplier === 4) {
  //     bixbyChart.quadrupleDamage.push(o.type);
  //   }
  // });
  // bixbyChart.noDamage = chart.find(o => o.multiplier === 0).type;
  // bixbyChart.halfDamage = chart.find(o => o.multiplier === 0.5).type;
  // bixbyChart.normalDamage = chart.find(o => o.multiplier === 1).type;
  // bixbyChart.doubleDamage = chart.find(o => o.multiplier === 2).type;
  // bixbyChart.quadrupleDamage = chart.find(o => o.multiplier === 4).type;

  return bixbyChart;
};

exports.defensiveTypeChart = defensiveTypeChart;
//# sourceMappingURL=typeCharts.js.map