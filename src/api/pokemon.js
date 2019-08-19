import { Router } from 'express';
import Pokedex from 'pokedex-promise-v2';
import { sequelize } from '../models';
import generateEvolutionText from '../utils/generateEvolutionText';
const P = new Pokedex();
import { defensiveTypeChart } from '../utils/typeCharts';
import allPokemon from '../utils/allPokemon';
import levenshtein from '../utils/levenshtein';

const Search = require('../models').Search;
const Pokemon = require('../models').Pokemon;
const EvolutionChain = require('../models').EvolutionChain;

export default ({ config }) => {
  let api = Router();

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

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

  const setQuery = name => {
    let query = '';
    if (name === 'meowstic') {
      query = 'meowstic-male';
    } else {
      query = replaceSpaces(name);
    }
    return query;
  };

  const attributes = [
    'id',
    'name',
    'species',
    'pokedexNumber',
    'ability1',
    'ability1Description',
    'ability2',
    'ability2Description',
    'ability3',
    'ability3Description',
    'sprite',
    'sprites',
    'type1',
    'type2',
    'pokedexEntry',
    'height',
    'weight',
    'statHp',
    'statAttack',
    'statDefense',
    'statSpecialAttack',
    'statSpecialDefense',
    'statSpeed',
    'statTotal',
    'count',
  ];

  api.get('/raw/:id', async (req, res) => {
    try {
      const query = setQuery(req.params.id);
      const pokemon = await Pokemon.findOne({
        where: { pokedexNumber: req.params.id },
      });
      res.status(200).json(pokemon);
    } catch (error) {
      throw error;
      res.status(404).json({ message: error.message });
    }
  });

  const checkProperties = obj => {
    const tempObj = {};
    for (var key in obj) {
      if (obj[key] !== null && obj[key] != '') {
        if (obj[key].name) {
          tempObj[key] = obj[key].name;
        } else {
          tempObj[key] = obj[key];
        }
      }
    }
    return tempObj;
  };

  const getEvolutions = evolutionChain => {
    let evolutions = [];
    const searchForEvolution = chain => {
      if (chain.evolves_to) {
        chain.evolves_to.forEach(data => {
          const evolution = {
            name: chain.species.name,
            evolvesTo: data.species.name,
            trigger: data.evolution_details[0].trigger.name,
          };
          delete data.evolution_details[0].trigger;
          evolution.value = checkProperties(data.evolution_details[0]);
          evolution.text = generateEvolutionText(evolution);
          delete evolution.value;
          evolutions.push(evolution);
          if (data.evolves_to) {
            searchForEvolution(data);
          }
        });
      }
    };
    searchForEvolution(evolutionChain.chain);
    return evolutions;
  };

  api.get('/evolutions/:name', async (req, res) => {
    try {
      const userId = req.query.userId;
      const pokemon = await Pokemon.findOne({
        where: { name: req.params.name },
        attributes: [...attributes, 'chainId', 'jsonPokemon'],
      });
      if (pokemon) {
        const evolutionChain = await EvolutionChain.findOne({
          where: { chainId: pokemon.chainId },
        });
        const evolutions = getEvolutions(evolutionChain.json);
        // delete pokemon.chainId;

        const promises = await evolutions.map(async (result, i) => {
          const namePokemon = await Pokemon.findOne({
            where: { name: result.name },
            attributes: ['sprite'],
          });
          const evolvesToPokemon = await Pokemon.findOne({
            where: { name: result.evolvesTo },
            attributes: ['sprite'],
          });
          result.nameSprite = namePokemon.sprite;
          result.evolvesToSprite = evolvesToPokemon.sprite;
          return result;
        });
        const promisesAll = await Promise.all(promises);

        res.status(200).json(promisesAll);
        Search.create({ userId, name: req.params.name });
      } else {
        res.status(200).json({ error: 'no pokemon named ' + req.params.name });
      }
    } catch (error) {
      throw error;
      res.status(404).json({ message: error.message });
    }
  });

  api.get('/stats/:stat', async (req, res) => {
    let offset = req.query.offset;
    if (offset) {
      offset = parseInt(offset);
    }
    if (typeof offset !== 'number') {
      offset = 0;
    }
    let param = '';
    let order = [];
    let currentStat = '';
    if (req.params.stat) {
      param = req.params.stat.toLowerCase();
    }
    switch (param) {
      case 'total':
        order.push('statTotal');
        currentStat = 'statTotal';
        break;
      case 'hp':
        order.push('statHp');
        currentStat = 'statHp';
        break;
      case 'attack':
        order.push('statAttack');
        currentStat = 'statAttack';
        break;
      case 'defense':
        order.push('statDefense');
        currentStat = 'statDefense';
        break;
      case 'specialattack':
        order.push('statSpecialAttack');
        currentStat = 'statSpecialAttack';
        break;
      case 'specialdefense':
        order.push('statSpecialDefense');
        currentStat = 'statSpecialDefense';
        break;
      case 'speed':
        order.push('statSpeed');
        currentStat = 'statSpeed';
        break;
      default:
        stat = null;
    }
    if (req.query) {
      if (req.query.sort) {
        if (req.query.sort === 'highest') {
          order.push('DESC');
        }
      }
    }

    try {
      const pokemon = await Pokemon.findAll({
        order: [order],
        limit: 10,
        offset: offset,
        attributes: attributes,
      });
      const pokemonRanked = pokemon.map((element, i) => {
        console.log(element.dataValues);
        element.dataValues.rank = i + 1 + offset;
        if (req.params.stat === 'specialdefense') {
          element.dataValues.subtitle =
            'Special Defense: ' + element.dataValues[currentStat];
        } else if (req.params.stat === 'specialattack') {
          element.dataValues.subtitle =
            'Special Attack: ' + element.dataValues[currentStat];
        } else {
          element.dataValues.subtitle =
            capitalizeFirstLetter(req.params.stat) +
            ': ' +
            element.dataValues[currentStat];
        }

        return element.dataValues;
      });
      const responseObj = { pokemon: pokemonRanked, offset: offset };

      res.status(200).json(pokemonRanked);
    } catch (error) {
      throw error;
      res.status(404).json({ message: error.message });
    }
  });

  api.get('/one/:name', async (req, res) => {
    let name = req.params.name;
    const levenshteinArray = [];

    for (var i = 0; i < allPokemon.length; i++) {
      if (levenshtein(allPokemon[i], name) === 0) {
        levenshteinArray.push(0);
        console.log('break');
        break;
      }
      levenshteinArray.push(levenshtein(allPokemon[i], name));
    }

    name = allPokemon[levenshteinArray.indexOf(Math.min(...levenshteinArray))];
    try {
      const userId = req.query.userId;
      const pokemon = await Pokemon.findOne({
        where: { name: name },
        attributes: attributes,
      });
      if (pokemon) {
        pokemon.dataValues.searchedFor = toTitleCase(
          req.params.name.replace(/-/g, ' '),
        );
        res.status(200).json(pokemon.dataValues);
        console.log(pokemon.dataValues);
        let count = pokemon.dataValues.count;
        if (pokemon.dataValues.name !== 'mimikyu') {
          let updated = await pokemon.update({ count: count + 1 });
        } else {
          let updated = await pokemon.update({ count: -1 });
        }
      } else {
        res.status(200).json({ error: 'no pokemon named ' + req.params.name });
      }
    } catch (error) {
      throw error;
      res.status(404).json({ message: error.message });
    }
  });

  api.get('/id/:id', async (req, res) => {
    try {
      const query = setQuery(req.params.id);
      const userId = req.query.userId;
      const pokemon = await Pokemon.findOne({
        where: { pokedexNumber: req.params.id },
        attributes: attributes,
      });
      if (pokemon) {
        res.status(200).json(pokemon);
        Search.create({ userId, name: pokemon.name });
      } else {
        res.status(200).json({ error: 'no pokemon with id: ' + req.params.id });
      }
    } catch (error) {
      throw error;
      res.status(404).json({ message: error.message });
    }
  });

  api.get('/popular', async (req, res) => {
    let offset = req.query.offset;
    if (offset) {
      offset = parseInt(offset);
    }
    try {
      let psqlQuery =
        'SELECT name, COUNT(*) FROM "Searches" GROUP BY name ORDER BY count DESC LIMIT 10';
      if (typeof offset === 'number') {
        psqlQuery += 'OFFSET ' + offset;
      } else {
        offset = 0;
      }
      const results = await sequelize.query(psqlQuery, {
        type: sequelize.QueryTypes.SELECT,
        offset: offset,
      });

      // map array to promises
      const promises = await results.map(async (result, i) => {
        const pokemon = await Pokemon.findOne({
          where: { name: result.name },
          attributes: attributes,
        });
        const pokemonData = pokemon.dataValues;
        pokemonData.count = result.count;
        pokemonData.rank = i + 1 + offset;
        pokemonData.subtitle = result.count + ' searches';
        return pokemonData;
      });
      const promisesAll = await Promise.all(promises);
      const responseObj = {
        pokemon: promisesAll,
        offset: offset,
      };

      res.status(200).json(promisesAll);
      // res.status(200).json(responseObj);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  api.get('/rank/:sortBy', async (req, res) => {
    let offset = req.query.offset;
    if (offset) {
      offset = parseInt(offset);
    }
    if (typeof offset !== 'number') {
      offset = 0;
    }
    let sortResponse = req.query.sort;
    let param = '';
    let order = [];
    let currentStat = '';
    if (req.params.sortBy) {
      param = req.params.sortBy.toLowerCase();
    }
    switch (param) {
      case 'height':
        order.push('height');
        currentStat = 'height';
        break;
      case 'weight':
        order.push('weight');
        currentStat = 'weight';
        break;
      case 'total':
        order.push('statTotal');
        currentStat = 'statTotal';
        break;
      case 'hp':
        order.push('statHp');
        currentStat = 'statHp';
        break;
      case 'attack':
        order.push('statAttack');
        currentStat = 'statAttack';
        break;
      case 'defense':
        order.push('statDefense');
        currentStat = 'statDefense';
        break;
      case 'specialattack':
        order.push('statSpecialAttack');
        currentStat = 'statSpecialAttack';
        break;
      case 'specialdefense':
        order.push('statSpecialDefense');
        currentStat = 'statSpecialDefense';
        break;
      case 'speed':
        order.push('statSpeed');
        currentStat = 'statSpeed';
        break;
      case 'popularity':
        order.push('count');
        currentStat = 'count';
        break;
      default:
        stat = null;
    }
    if (req.query) {
      if (req.query.sort) {
        if (req.query.sort === 'highest') {
          order.push('DESC');
        }
      }
    }

    try {
      const pokemon = await Pokemon.findAll({
        order: [order, ['id']],
        limit: 10,
        offset: offset,
        attributes: attributes,
      });
      const pokemonRanked = pokemon.map((element, i) => {
        element.dataValues.rank = i + 1 + offset;
        if (req.params.sortBy === 'specialdefense') {
          element.dataValues.subtitle =
            'Special Defense: ' + element.dataValues[currentStat];
        } else if (req.params.sortBy === 'specialattack') {
          element.dataValues.subtitle =
            'Special Attack: ' + element.dataValues[currentStat];
        } else if (req.params.sortBy === 'popularity') {
          element.dataValues.subtitle = element.dataValues.count + ' searches';
        } else if (req.params.sortBy === 'height') {
          element.dataValues.subtitle =
            capitalizeFirstLetter(req.params.sortBy) +
            ': ' +
            element.dataValues[currentStat] +
            'm';
        } else if (req.params.sortBy === 'weight') {
          element.dataValues.subtitle =
            capitalizeFirstLetter(req.params.sortBy) +
            ': ' +
            element.dataValues[currentStat] +
            'kg';
        } else {
          element.dataValues.subtitle =
            capitalizeFirstLetter(req.params.sortBy) +
            ': ' +
            element.dataValues[currentStat];
        }

        return element.dataValues;
      });
      const responseObj = {
        pokemon: pokemonRanked,
        sortBy: param,
        sort: sortResponse,
      };
      if (offset) {
        responseObj.offset = offset;
      } else {
        responseObj.offset = 0;
      }

      res.status(200).json(responseObj);
    } catch (error) {
      throw error;
      res.status(404).json({ message: error.message });
    }
  });

  api.get('/random/:quantity', async (req, res) => {
    const idRange = {
      pokedexNumber: {
        $between: [1, 802],
      },
    };
    try {
      if (req.params.quantity == 1) {
        const randomPokemon = await Pokemon.findOne({
          where: idRange,
          order: [[sequelize.literal('random()')]],
          attributes: attributes,
        });
        res.status(200).json(randomPokemon);
      } else {
        const randomPokemon = await Pokemon.findAll({
          where: idRange,
          order: [[sequelize.literal('random()')]],
          limit: req.params.quantity,
          attributes: attributes,
        });
        res.status(200).json(randomPokemon);
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

  api.get('/types/:name', async (req, res) => {
    const pokemon = await Pokemon.findOne({ where: { name: req.params.name } });
    const types = [];
    types.push(pokemon.type1);
    if (pokemon.type2) {
      types.push(pokemon.type2);
    }
    console.log(types);
    const chart = defensiveTypeChart(types);
    chart.name = req.params.name;
    res.status(200).json(chart);
  });

  return api;
};
