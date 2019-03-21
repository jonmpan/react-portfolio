import Pokedex from 'pokedex-promise-v2';

const P = new Pokedex();
const Pokemon = require('../models').Pokemon;
const EvolutionChain = require('../models').EvolutionChain;

const replaceSpaces = string => {
  return string.replace(/ /g, '-');
};

const getSprites = sprites => {
  const spritesArray = [];
  if (sprites.front_default) {
    spritesArray.push({ url: sprites.front_default });
  }
  if (sprites.back_default) {
    spritesArray.push({ url: sprites.back_default });
  }
  if (sprites.front_shiny) {
    spritesArray.push({ url: sprites.front_shiny });
  }
  if (sprites.back_shiny) {
    spritesArray.push({ url: sprites.back_shiny });
  }
  return spritesArray;
};

const removeLinebreaks = string => {
  return string.replace(/\n/g, ' ');
};

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getTypes = types => {
  const typesArray = [];
  types.forEach(type => {
    typesArray.push(type.type.name);
  });
  return typesArray;
};

const getPokemon = async id => {
  try {
    const pokemon = await P.resource('/api/v2/pokemon/' + id);
    const query = pokemon.name;
    const speciesInfo = await P.getPokemonSpeciesByName(id);
    const formattedPokemon = {};
    formattedPokemon.name = pokemon.name;
    formattedPokemon.pokedexNumber = pokemon.id;

    const abilities = pokemon.abilities;
    const ability1 = abilities.find(o => o.slot === 1);
    const ability2 = abilities.find(o => o.slot === 2);
    const ability3 = abilities.find(o => o.slot === 3);
    let ability1Resource = '';
    let ability2Resource = '';
    let ability3Resource = '';

    if (ability1) {
      ability1Resource = await P.resource(ability1.ability.url);
      formattedPokemon.ability1Description = removeLinebreaks(
        ability1Resource.effect_entries.find(o => o.language.name === 'en')
          .short_effect,
      );
      formattedPokemon.ability1 = ability1.ability.name;
    }
    if (ability2) {
      ability2Resource = await P.resource(ability2.ability.url);
      formattedPokemon.ability2Description = removeLinebreaks(
        ability2Resource.effect_entries.find(o => o.language.name === 'en')
          .short_effect,
      );
      formattedPokemon.ability2 = ability2.ability.name;
    }
    if (ability3) {
      ability3Resource = await P.resource(ability3.ability.url);
      formattedPokemon.ability3Description = removeLinebreaks(
        ability3Resource.effect_entries.find(o => o.language.name === 'en')
          .short_effect,
      );
      formattedPokemon.ability3 = ability3.ability.name;
    }

    // formattedPokemon.id = pokemon.id;
    formattedPokemon.species = capitalizeFirstLetter(pokemon.name);
    if (query === 'meowstic-male' || query === 'meowstic-female') {
      formattedPokemon.species = 'Meowstic';
    }
    formattedPokemon.sprite = pokemon.sprites.front_default;
    formattedPokemon.sprites = getSprites(pokemon.sprites);
    if (pokemon.types.length > 1) {
      formattedPokemon.type1 = pokemon.types[1].type.name;
      formattedPokemon.type2 = pokemon.types[0].type.name;
    } else {
      formattedPokemon.type1 = pokemon.types[0].type.name;
    }
    formattedPokemon.pokedexEntry = removeLinebreaks(
      speciesInfo.flavor_text_entries.find(o => o.language.name === 'en')
        .flavor_text,
    );
    formattedPokemon.height = pokemon.height / 10;
    formattedPokemon.weight = pokemon.weight / 10;
    formattedPokemon.statHp = pokemon.stats.find(
      o => o.stat.name === 'hp',
    ).base_stat;
    formattedPokemon.statAttack = pokemon.stats.find(
      o => o.stat.name === 'attack',
    ).base_stat;
    formattedPokemon.statDefense = pokemon.stats.find(
      o => o.stat.name === 'defense',
    ).base_stat;
    formattedPokemon.statSpecialAttack = pokemon.stats.find(
      o => o.stat.name === 'special-attack',
    ).base_stat;
    formattedPokemon.statSpecialDefense = pokemon.stats.find(
      o => o.stat.name === 'special-defense',
    ).base_stat;
    formattedPokemon.statSpeed = pokemon.stats.find(
      o => o.stat.name === 'speed',
    ).base_stat;
    formattedPokemon.jsonPokemon = pokemon;
    formattedPokemon.jsonSpecies = speciesInfo;

    return formattedPokemon;
  } catch (error) {
    throw error;
  }
};

const scrape = async () => {
  let counter = 1;
  const checkAndGet = async () => {
    const checkIfExists = await Pokemon.findOne({
      where: { pokedexNumber: counter },
    });
    if (counter < 808) {
      if (checkIfExists.pokedexNumber) {
        console.log(counter + ' exists');
        const chainId = checkIfExists.jsonSpecies.evolution_chain.url.split(
          '/',
        )[6];
        console.log('chaindId ' + chainId);
        const checkIfEvolutionExists = await EvolutionChain.findOne({
          where: { chainId: chainId },
        });
        if (checkIfEvolutionExists) {
          console.log('chain evolution ' + chainId + ' exists');
          counter++;
          checkAndGet();
        } else {
          const evolutionChain = await P.getEvolutionChainById(chainId);
          const whatever = await EvolutionChain.create({
            chainId: evolutionChain.id,
            json: evolutionChain,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
          console.log('created chain evolution ' + chainId);
          setTimeout(() => {
            counter++;
            checkAndGet();
          }, 1000);
        }
      } else {
        console.log('does not exists');
        setTimeout(async () => {
          const currentPokemon = await getPokemon(counter);
          const whatever = await Pokemon.create(currentPokemon);
          counter++;
          console.log(counter);
          checkAndGet();
        }, 1000 + Math.floor(Math.random * 800));
      }
    } else {
      console.log('completed');
    }
  };
  // checkAndGet();
  // fixHp();
  // statTotal();
  // setEvolutionLine();
  // randomPopularityCount();
};

const randomPopularityCount = async () => {
  for (var i = 1; i < 810; i++) {
    const pokemon = await Pokemon.findOne({
      where: { pokedexNumber: i },
    });
    const rand = Math.floor(Math.random() * 5);
    pokemon.update({ count: rand });
  }
};

// const statTotal = async () => {
//   for (var i = 1; i < 808; i++) {
//     const pokemon = await Pokemon.findOne({
//       where: { pokedexNumber: i },
//     });
//     // const dataValues = pokemon.dataValues;
//     // console.log(dataValues.statTotal);
//     const statTotal =
//       pokemon.statHp +
//       pokemon.statAttack +
//       pokemon.statDefense +
//       pokemon.statSpecialAttack +
//       pokemon.statSpecialDefense +
//       pokemon.statSpeed;
//     console.log(statTotal);
//     pokemon.update({
//       statTotal: statTotal,
//     });
//   }
// };

// const fixHp = async () => {
//   let counter = 1;
//   const checkAndFix = async () => {
//     if (counter < 808) {
//       const pokemon = await Pokemon.findOne({
//         where: { pokedexNumber: counter },
//       });
//       if (pokemon.statHp !== 0) {
//         console.log('fixed');
//         console.log(pokemon.statHp);
//         counter++;
//         checkAndFix();
//       } else {
//         setTimeout(async () => {
//           console.log('asjdfkasjdf');
//           console.log(pokemon.statHp);
//           const pokemonFromApi = await P.resource('/api/v2/pokemon/' + counter);
//           const newHp = pokemonFromApi.stats.find(o => o.stat.name === 'hp')
//             .base_stat;
//           pokemon.update({ statHp: newHp });
//           counter++;
//           checkAndFix();
//         }, 250);
//       }
//     }
//   };
//   checkAndFix();
// };

// const breakHp = async () => {
//   for (var i = 1; i < 808; i++) {
//     const pokemon = await Pokemon.findOne({
//       where: { pokedexNumber: i },
//     });
//     pokemon.update({ statHp: 0 });
//   }
// };

// const setChainId = async () => {
//   for (var i = 1; i < 808; i++) {
//     const pokemon = await Pokemon.findOne({
//       where: { pokedexNumber: i },
//     });
//     if (!pokemon.chainId) {
//       const chainId = pokemon.jsonSpecies.evolution_chain.url.split('/')[6];
//       pokemon.update({ chainId: chainId });
//     }
//   }
// };

// const convertToJson = async () => {
//   for (var i = 255; i < 675; i++) {
//     const evolutionChain = await EvolutionChain.findOne({
//       where: { id: i },
//     });
//     if (evolutionChain) {
//       // console.log(evolutionChain.dataValues.json);
//       evolutionChain.update({ json: JSON.parse(evolutionChain.json) });
//     }
//   }
// };

// const scrapeEvos = async () => {
//   let counter = 1;
//   const checkAndGet = async () => {

//     const checkIfExists = await Pokemon.findAll({
//       where: { chainId: counter },
//     });
//     if (counter < 500 && counter) {
//       if (
//         checkIfExists.length
//       ) {
//         console.log('chain ' + counter + ' exists');
//         counter++;
//         checkAndGet();
//       } else {
//         console.log('does not exists');
//         setTimeout(async () => {
//           const evolutionChain = await P.getEvolutionChainById(counter);
//           EvolutionChain.create({
//             chainId: evolutionChain.id,
//             json: JSON.stringify(evolutionChain),
//             createdAt: new Date(),
//             updatedAt: new Date(),
//           });
//           counter++;
//           console.log(counter);
//           checkAndGet();
//         }, 500);
//       }
//     } else {
//       console.log('completed');
//     }
//   };
//   checkAndGet();
// };

export default scrape;
