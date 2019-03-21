const defensiveTypes = [
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
];

// these rows are defensive rows
const abbrev =   ['no','fi','fl','po','gr','ro','bu','gh','st','fi','wa','gr','el','ps','ic','dr','da','fa']; // prettier-ignore
const normal =   [   1,   2,   1,   1,   1,   1,   1,   0,   1,   1,   1,   1,   1,   1,   1,   1,   1,   1]; // prettier-ignore
const fighting = [   1,   1,   2,   1,   1,   0,   2,  .5,   1,   1,   1,   1,  .5,   1,   2,   1,   1,   1]; // prettier-ignore
const flying =   [   1,  .5,   1,   1,   0,   2,  .5,   1,   1,   1,   1,  .5,   2,   1,   2,   1,   1,   1]; // prettier-ignore
const poison =   [   1,  .5,   1,  .5,   2,   1,  .5,   1,   1,   1,   1,  .5,   1,   2,   1,   1,   1,  .5]; // prettier-ignore
const ground =   [   1,   1,   1,  .5,   1,  .5,   1,   1,   1,   1,   2,   2,   0,   1,   2,   1,   1,   1]; // prettier-ignore
const rock =     [  5.,   2,  .5,  .5,   2,   1,   1,   1,   2,  .5,   2,   2,   1,   1,   1,   1,   1,   1]; // prettier-ignore
const bug =      [   1,  .5,   2,   1,  .5,   2,   1,   1,   1,   2,   1,  .5,   1,   1,   1,   1,   1,   1]; // prettier-ignore
const ghost =    [   0,   0,   1,  .5,   1,   1,  .5,   2,   1,   1,   1,   1,   1,   1,   1,   1,   2,   1]; // prettier-ignore
const steel =    [  .5,   2,  .5,   0,   2,  .5,  .5,   1,  .5,   2,   1,  .5,   1,  .5,  .5,  .5,   1,  .5]; // prettier-ignore
const fire =     [   1,   1,   1,   1,   2,   2,  .5,   1,  .5,  .5,   2,  .5,   1,   1,  .5,   1,   1,  .5]; // prettier-ignore
const water =    [   1,   1,   1,   1,   1,   1,   1,   1,  .5,   1,  .5,   2,   2,   1,  .5,   1,   1,   1]; // prettier-ignore
const grass =    [   1,   1,   2,   2,  .5,   1,   2,   1,   1,   2,  .5,  .5,  .5,   1,   2,   1,   1,   1]; // prettier-ignore
const electric = [   1,   1,  .5,   1,   2,   1,   1,   1,  .5,   1,   1,   1,  .5,   1,   1,   1,   1,   1]; // prettier-ignore
const psychic =  [   1,  .5,   1,   1,   1,   1,   2,   2,   1,   1,   1,   1,   1,  .5,   1,   1,   2,   1]; // prettier-ignore
const ice =      [   1,   2,   1,   1,   1,   2,   1,   1,   2,   2,   1,   1,   1,   1,  .5,   1,   1,   1]; // prettier-ignore
const dragon =   [   1,   1,   1,   1,   1,   1,   1,   1,   1,  .5,  .5,  .5,  .5,   1,   2,   2,   1,   2]; // prettier-ignore
const dark =     [   1,   2,   1,   1,   1,   1,   2,  .5,   1,   1,   1,   1,   1,   0,   1,   1,  .5,   2]; // prettier-ignore
const fairy =    [   1,  .5,   1,   2,   1,   1,  .5,   1,   2,   1,   1,   1,   1,   1,   1,   0,  .5,   1]; // prettier-ignore

const defensiveTypeChart = types => {
  const charts = {
    normal,
    fighting,
    flying,
    poison,
    ground,
    rock,
    bug,
    ghost,
    steel,
    fire,
    water,
    grass,
    electric,
    psychic,
    ice,
    dragon,
    dark,
    fairy,
  };
  let chart = charts[types[0]];
  const chart2 = charts[types[1]];
  if (chart2) {
    chart = chart.map((num, i) => {
      const tempObj = {};
      tempObj.type = defensiveTypes[i];
      tempObj.multiplier = num * chart2[i];
      return tempObj;
    });
  } else {
    chart = chart.map((num, i) => {
      const tempObj = {};
      tempObj.type = defensiveTypes[i];
      tempObj.multiplier = num;
      return tempObj;
    });
  }

  const bixbyChart = {
    // noDamage: [],
    // halfDamage: [],
    // normalDamage: [],
    // doubleDamage: [],
    // quadrupleDamage: [],
    // raw: chart,
    resistances: [],
    neutral: [],
    weaknesses: [],
  };

  chart.forEach(o => {
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

  bixbyChart.resistances.sort((a, b) => {
    return a.multiplier - b.multiplier;
  });
  bixbyChart.weaknesses.sort((a, b) => {
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

export { defensiveTypeChart };
