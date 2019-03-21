'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _pokedexPromiseV = require('pokedex-promise-v2');

var _pokedexPromiseV2 = _interopRequireDefault(_pokedexPromiseV);

var _models = require('../models');

var _generateEvolutionText = require('../utils/generateEvolutionText');

var _generateEvolutionText2 = _interopRequireDefault(_generateEvolutionText);

var _typeCharts = require('../utils/typeCharts');

var _allPokemon = require('../utils/allPokemon');

var _allPokemon2 = _interopRequireDefault(_allPokemon);

var _levenshtein = require('../utils/levenshtein');

var _levenshtein2 = _interopRequireDefault(_levenshtein);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var P = new _pokedexPromiseV2.default();


var Search = require('../models').Search;
var Pokemon = require('../models').Pokemon;
var EvolutionChain = require('../models').EvolutionChain;

exports.default = function (_ref) {
  var config = _ref.config;

  var api = (0, _express.Router)();

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  var replaceSpaces = function replaceSpaces(string) {
    return string.replace(/ /g, '-');
  };

  var getSprites = function getSprites(sprites) {
    var spritesArray = [];
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

  var removeLinebreaks = function removeLinebreaks(string) {
    return string.replace(/\n/g, ' ');
  };

  var capitalizeFirstLetter = function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  var getTypes = function getTypes(types) {
    var typesArray = [];
    types.forEach(function (type) {
      typesArray.push(type.type.name);
    });
    return typesArray;
  };

  var setQuery = function setQuery(name) {
    var query = '';
    if (name === 'meowstic') {
      query = 'meowstic-male';
    } else {
      query = replaceSpaces(name);
    }
    return query;
  };

  var attributes = ['id', 'name', 'species', 'pokedexNumber', 'ability1', 'ability1Description', 'ability2', 'ability2Description', 'ability3', 'ability3Description', 'sprite', 'sprites', 'type1', 'type2', 'pokedexEntry', 'height', 'weight', 'statHp', 'statAttack', 'statDefense', 'statSpecialAttack', 'statSpecialDefense', 'statSpeed', 'statTotal', 'count'];

  api.get('/raw/:id', function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
      var query, pokemon;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              query = setQuery(req.params.id);
              _context.next = 4;
              return Pokemon.findOne({
                where: { pokedexNumber: req.params.id }
              });

            case 4:
              pokemon = _context.sent;

              res.status(200).json(pokemon);
              _context.next = 12;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](0);
              throw _context.t0;

            case 12:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 8]]);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());

  var checkProperties = function checkProperties(obj) {
    var tempObj = {};
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

  var getEvolutions = function getEvolutions(evolutionChain) {
    var evolutions = [];
    var searchForEvolution = function searchForEvolution(chain) {
      if (chain.evolves_to) {
        chain.evolves_to.forEach(function (data) {
          var evolution = {
            name: chain.species.name,
            evolvesTo: data.species.name,
            trigger: data.evolution_details[0].trigger.name
          };
          delete data.evolution_details[0].trigger;
          evolution.value = checkProperties(data.evolution_details[0]);
          evolution.text = (0, _generateEvolutionText2.default)(evolution);
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

  api.get('/evolutions/:name', function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
      var userId, pokemon, evolutionChain, evolutions, promises, promisesAll;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              userId = req.query.userId;
              _context3.next = 4;
              return Pokemon.findOne({
                where: { name: req.params.name },
                attributes: [].concat(attributes, ['chainId', 'jsonPokemon'])
              });

            case 4:
              pokemon = _context3.sent;

              if (!pokemon) {
                _context3.next = 20;
                break;
              }

              _context3.next = 8;
              return EvolutionChain.findOne({
                where: { chainId: pokemon.chainId }
              });

            case 8:
              evolutionChain = _context3.sent;
              evolutions = getEvolutions(evolutionChain.json);
              // delete pokemon.chainId;

              _context3.next = 12;
              return evolutions.map(function () {
                var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(result, i) {
                  var namePokemon, evolvesToPokemon;
                  return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          _context2.next = 2;
                          return Pokemon.findOne({
                            where: { name: result.name },
                            attributes: ['sprite']
                          });

                        case 2:
                          namePokemon = _context2.sent;
                          _context2.next = 5;
                          return Pokemon.findOne({
                            where: { name: result.evolvesTo },
                            attributes: ['sprite']
                          });

                        case 5:
                          evolvesToPokemon = _context2.sent;

                          result.nameSprite = namePokemon.sprite;
                          result.evolvesToSprite = evolvesToPokemon.sprite;
                          return _context2.abrupt('return', result);

                        case 9:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  }, _callee2, undefined);
                }));

                return function (_x5, _x6) {
                  return _ref4.apply(this, arguments);
                };
              }());

            case 12:
              promises = _context3.sent;
              _context3.next = 15;
              return Promise.all(promises);

            case 15:
              promisesAll = _context3.sent;


              res.status(200).json(promisesAll);
              Search.create({ userId: userId, name: req.params.name });
              _context3.next = 21;
              break;

            case 20:
              res.status(200).json({ error: 'no pokemon named ' + req.params.name });

            case 21:
              _context3.next = 27;
              break;

            case 23:
              _context3.prev = 23;
              _context3.t0 = _context3['catch'](0);
              throw _context3.t0;

            case 27:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined, [[0, 23]]);
    }));

    return function (_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }());

  api.get('/stats/:stat', function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
      var offset, param, order, currentStat, pokemon, pokemonRanked, responseObj;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              offset = req.query.offset;

              if (offset) {
                offset = parseInt(offset);
              }
              if (typeof offset !== 'number') {
                offset = 0;
              }
              param = '';
              order = [];
              currentStat = '';

              if (req.params.stat) {
                param = req.params.stat.toLowerCase();
              }
              _context4.t0 = param;
              _context4.next = _context4.t0 === 'total' ? 10 : _context4.t0 === 'hp' ? 13 : _context4.t0 === 'attack' ? 16 : _context4.t0 === 'defense' ? 19 : _context4.t0 === 'specialattack' ? 22 : _context4.t0 === 'specialdefense' ? 25 : _context4.t0 === 'speed' ? 28 : 31;
              break;

            case 10:
              order.push('statTotal');
              currentStat = 'statTotal';
              return _context4.abrupt('break', 32);

            case 13:
              order.push('statHp');
              currentStat = 'statHp';
              return _context4.abrupt('break', 32);

            case 16:
              order.push('statAttack');
              currentStat = 'statAttack';
              return _context4.abrupt('break', 32);

            case 19:
              order.push('statDefense');
              currentStat = 'statDefense';
              return _context4.abrupt('break', 32);

            case 22:
              order.push('statSpecialAttack');
              currentStat = 'statSpecialAttack';
              return _context4.abrupt('break', 32);

            case 25:
              order.push('statSpecialDefense');
              currentStat = 'statSpecialDefense';
              return _context4.abrupt('break', 32);

            case 28:
              order.push('statSpeed');
              currentStat = 'statSpeed';
              return _context4.abrupt('break', 32);

            case 31:
              stat = null;

            case 32:
              if (req.query) {
                if (req.query.sort) {
                  if (req.query.sort === 'highest') {
                    order.push('DESC');
                  }
                }
              }

              _context4.prev = 33;
              _context4.next = 36;
              return Pokemon.findAll({
                order: [order],
                limit: 10,
                offset: offset,
                attributes: attributes
              });

            case 36:
              pokemon = _context4.sent;
              pokemonRanked = pokemon.map(function (element, i) {
                console.log(element.dataValues);
                element.dataValues.rank = i + 1 + offset;
                if (req.params.stat === 'specialdefense') {
                  element.dataValues.subtitle = 'Special Defense: ' + element.dataValues[currentStat];
                } else if (req.params.stat === 'specialattack') {
                  element.dataValues.subtitle = 'Special Attack: ' + element.dataValues[currentStat];
                } else {
                  element.dataValues.subtitle = capitalizeFirstLetter(req.params.stat) + ': ' + element.dataValues[currentStat];
                }

                return element.dataValues;
              });
              responseObj = { pokemon: pokemonRanked, offset: offset };


              res.status(200).json(pokemonRanked);
              _context4.next = 46;
              break;

            case 42:
              _context4.prev = 42;
              _context4.t1 = _context4['catch'](33);
              throw _context4.t1;

            case 46:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, undefined, [[33, 42]]);
    }));

    return function (_x7, _x8) {
      return _ref5.apply(this, arguments);
    };
  }());

  api.get('/one/:name', function () {
    var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
      var name, levenshteinArray, i, userId, pokemon, count, updated, _updated;

      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              name = req.params.name;
              levenshteinArray = [];
              i = 0;

            case 3:
              if (!(i < _allPokemon2.default.length)) {
                _context5.next = 12;
                break;
              }

              if (!((0, _levenshtein2.default)(_allPokemon2.default[i], name) === 0)) {
                _context5.next = 8;
                break;
              }

              levenshteinArray.push(0);
              console.log('break');
              return _context5.abrupt('break', 12);

            case 8:
              levenshteinArray.push((0, _levenshtein2.default)(_allPokemon2.default[i], name));

            case 9:
              i++;
              _context5.next = 3;
              break;

            case 12:

              name = _allPokemon2.default[levenshteinArray.indexOf(Math.min.apply(Math, levenshteinArray))];
              _context5.prev = 13;
              userId = req.query.userId;
              _context5.next = 17;
              return Pokemon.findOne({
                where: { name: name },
                attributes: attributes
              });

            case 17:
              pokemon = _context5.sent;

              if (!pokemon) {
                _context5.next = 34;
                break;
              }

              pokemon.dataValues.searchedFor = toTitleCase(req.params.name.replace(/-/g, ' '));
              res.status(200).json(pokemon.dataValues);
              console.log(pokemon.dataValues);
              count = pokemon.dataValues.count;

              if (!(pokemon.dataValues.name !== 'mimikyu')) {
                _context5.next = 29;
                break;
              }

              _context5.next = 26;
              return pokemon.update({ count: count + 1 });

            case 26:
              updated = _context5.sent;
              _context5.next = 32;
              break;

            case 29:
              _context5.next = 31;
              return pokemon.update({ count: -1 });

            case 31:
              _updated = _context5.sent;

            case 32:
              _context5.next = 35;
              break;

            case 34:
              res.status(200).json({ error: 'no pokemon named ' + req.params.name });

            case 35:
              _context5.next = 41;
              break;

            case 37:
              _context5.prev = 37;
              _context5.t0 = _context5['catch'](13);
              throw _context5.t0;

            case 41:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, undefined, [[13, 37]]);
    }));

    return function (_x9, _x10) {
      return _ref6.apply(this, arguments);
    };
  }());

  api.get('/id/:id', function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(req, res) {
      var query, userId, pokemon;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              query = setQuery(req.params.id);
              userId = req.query.userId;
              _context6.next = 5;
              return Pokemon.findOne({
                where: { pokedexNumber: req.params.id },
                attributes: attributes
              });

            case 5:
              pokemon = _context6.sent;

              if (pokemon) {
                res.status(200).json(pokemon);
                Search.create({ userId: userId, name: pokemon.name });
              } else {
                res.status(200).json({ error: 'no pokemon with id: ' + req.params.id });
              }
              _context6.next = 13;
              break;

            case 9:
              _context6.prev = 9;
              _context6.t0 = _context6['catch'](0);
              throw _context6.t0;

            case 13:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, undefined, [[0, 9]]);
    }));

    return function (_x11, _x12) {
      return _ref7.apply(this, arguments);
    };
  }());

  api.get('/popular', function () {
    var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(req, res) {
      var offset, psqlQuery, results, promises, promisesAll, responseObj;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              offset = req.query.offset;

              if (offset) {
                offset = parseInt(offset);
              }
              _context8.prev = 2;
              psqlQuery = 'SELECT name, COUNT(*) FROM "Searches" GROUP BY name ORDER BY count DESC LIMIT 10';

              if (typeof offset === 'number') {
                psqlQuery += 'OFFSET ' + offset;
              } else {
                offset = 0;
              }
              _context8.next = 7;
              return _models.sequelize.query(psqlQuery, {
                type: _models.sequelize.QueryTypes.SELECT,
                offset: offset
              });

            case 7:
              results = _context8.sent;
              _context8.next = 10;
              return results.map(function () {
                var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(result, i) {
                  var pokemon, pokemonData;
                  return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                      switch (_context7.prev = _context7.next) {
                        case 0:
                          _context7.next = 2;
                          return Pokemon.findOne({
                            where: { name: result.name },
                            attributes: attributes
                          });

                        case 2:
                          pokemon = _context7.sent;
                          pokemonData = pokemon.dataValues;

                          pokemonData.count = result.count;
                          pokemonData.rank = i + 1 + offset;
                          pokemonData.subtitle = result.count + ' searches';
                          return _context7.abrupt('return', pokemonData);

                        case 8:
                        case 'end':
                          return _context7.stop();
                      }
                    }
                  }, _callee7, undefined);
                }));

                return function (_x15, _x16) {
                  return _ref9.apply(this, arguments);
                };
              }());

            case 10:
              promises = _context8.sent;
              _context8.next = 13;
              return Promise.all(promises);

            case 13:
              promisesAll = _context8.sent;
              responseObj = {
                pokemon: promisesAll,
                offset: offset
              };


              res.status(200).json(promisesAll);
              // res.status(200).json(responseObj);
              _context8.next = 21;
              break;

            case 18:
              _context8.prev = 18;
              _context8.t0 = _context8['catch'](2);

              res.status(404).json({ message: _context8.t0.message });

            case 21:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, undefined, [[2, 18]]);
    }));

    return function (_x13, _x14) {
      return _ref8.apply(this, arguments);
    };
  }());

  api.get('/rank/:sortBy', function () {
    var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(req, res) {
      var offset, sortResponse, param, order, currentStat, pokemon, pokemonRanked, responseObj;
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              offset = req.query.offset;

              if (offset) {
                offset = parseInt(offset);
              }
              if (typeof offset !== 'number') {
                offset = 0;
              }
              sortResponse = req.query.sort;
              param = '';
              order = [];
              currentStat = '';

              if (req.params.sortBy) {
                param = req.params.sortBy.toLowerCase();
              }
              _context9.t0 = param;
              _context9.next = _context9.t0 === 'height' ? 11 : _context9.t0 === 'weight' ? 14 : _context9.t0 === 'total' ? 17 : _context9.t0 === 'hp' ? 20 : _context9.t0 === 'attack' ? 23 : _context9.t0 === 'defense' ? 26 : _context9.t0 === 'specialattack' ? 29 : _context9.t0 === 'specialdefense' ? 32 : _context9.t0 === 'speed' ? 35 : _context9.t0 === 'popularity' ? 38 : 41;
              break;

            case 11:
              order.push('height');
              currentStat = 'height';
              return _context9.abrupt('break', 42);

            case 14:
              order.push('weight');
              currentStat = 'weight';
              return _context9.abrupt('break', 42);

            case 17:
              order.push('statTotal');
              currentStat = 'statTotal';
              return _context9.abrupt('break', 42);

            case 20:
              order.push('statHp');
              currentStat = 'statHp';
              return _context9.abrupt('break', 42);

            case 23:
              order.push('statAttack');
              currentStat = 'statAttack';
              return _context9.abrupt('break', 42);

            case 26:
              order.push('statDefense');
              currentStat = 'statDefense';
              return _context9.abrupt('break', 42);

            case 29:
              order.push('statSpecialAttack');
              currentStat = 'statSpecialAttack';
              return _context9.abrupt('break', 42);

            case 32:
              order.push('statSpecialDefense');
              currentStat = 'statSpecialDefense';
              return _context9.abrupt('break', 42);

            case 35:
              order.push('statSpeed');
              currentStat = 'statSpeed';
              return _context9.abrupt('break', 42);

            case 38:
              order.push('count');
              currentStat = 'count';
              return _context9.abrupt('break', 42);

            case 41:
              stat = null;

            case 42:
              if (req.query) {
                if (req.query.sort) {
                  if (req.query.sort === 'highest') {
                    order.push('DESC');
                  }
                }
              }

              _context9.prev = 43;
              _context9.next = 46;
              return Pokemon.findAll({
                order: [order, ['id']],
                limit: 10,
                offset: offset,
                attributes: attributes
              });

            case 46:
              pokemon = _context9.sent;
              pokemonRanked = pokemon.map(function (element, i) {
                element.dataValues.rank = i + 1 + offset;
                if (req.params.sortBy === 'specialdefense') {
                  element.dataValues.subtitle = 'Special Defense: ' + element.dataValues[currentStat];
                } else if (req.params.sortBy === 'specialattack') {
                  element.dataValues.subtitle = 'Special Attack: ' + element.dataValues[currentStat];
                } else if (req.params.sortBy === 'popularity') {
                  element.dataValues.subtitle = element.dataValues.count + ' searches';
                } else if (req.params.sortBy === 'height') {
                  element.dataValues.subtitle = capitalizeFirstLetter(req.params.sortBy) + ': ' + element.dataValues[currentStat] + 'm';
                } else if (req.params.sortBy === 'weight') {
                  element.dataValues.subtitle = capitalizeFirstLetter(req.params.sortBy) + ': ' + element.dataValues[currentStat] + 'kg';
                } else {
                  element.dataValues.subtitle = capitalizeFirstLetter(req.params.sortBy) + ': ' + element.dataValues[currentStat];
                }

                return element.dataValues;
              });
              responseObj = {
                pokemon: pokemonRanked,
                sortBy: param,
                sort: sortResponse
              };

              if (offset) {
                responseObj.offset = offset;
              } else {
                responseObj.offset = 0;
              }

              res.status(200).json(responseObj);
              _context9.next = 57;
              break;

            case 53:
              _context9.prev = 53;
              _context9.t1 = _context9['catch'](43);
              throw _context9.t1;

            case 57:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, undefined, [[43, 53]]);
    }));

    return function (_x17, _x18) {
      return _ref10.apply(this, arguments);
    };
  }());

  api.get('/random/:quantity', function () {
    var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(req, res) {
      var idRange, randomPokemon, _randomPokemon;

      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              idRange = {
                pokedexNumber: {
                  $between: [1, 802]
                }
              };
              _context10.prev = 1;

              if (!(req.params.quantity == 1)) {
                _context10.next = 9;
                break;
              }

              _context10.next = 5;
              return Pokemon.findOne({
                where: idRange,
                order: [[_models.sequelize.literal('random()')]],
                attributes: attributes
              });

            case 5:
              randomPokemon = _context10.sent;

              res.status(200).json(randomPokemon);
              _context10.next = 13;
              break;

            case 9:
              _context10.next = 11;
              return Pokemon.findAll({
                where: idRange,
                order: [[_models.sequelize.literal('random()')]],
                limit: req.params.quantity,
                attributes: attributes
              });

            case 11:
              _randomPokemon = _context10.sent;

              res.status(200).json(_randomPokemon);

            case 13:
              _context10.next = 18;
              break;

            case 15:
              _context10.prev = 15;
              _context10.t0 = _context10['catch'](1);

              res.status(404).json({ message: _context10.t0.message });

            case 18:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, undefined, [[1, 15]]);
    }));

    return function (_x19, _x20) {
      return _ref11.apply(this, arguments);
    };
  }());

  api.get('/types/:name', function () {
    var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(req, res) {
      var pokemon, types, chart;
      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return Pokemon.findOne({ where: { name: req.params.name } });

            case 2:
              pokemon = _context11.sent;
              types = [];

              types.push(pokemon.type1);
              if (pokemon.type2) {
                types.push(pokemon.type2);
              }
              console.log(types);
              chart = (0, _typeCharts.defensiveTypeChart)(types);

              chart.name = req.params.name;
              res.status(200).json(chart);

            case 10:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, undefined);
    }));

    return function (_x21, _x22) {
      return _ref12.apply(this, arguments);
    };
  }());

  return api;
};
//# sourceMappingURL=pokemon.js.map