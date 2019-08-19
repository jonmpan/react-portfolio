'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _pokedexPromiseV = require('pokedex-promise-v2');

var _pokedexPromiseV2 = _interopRequireDefault(_pokedexPromiseV);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var P = new _pokedexPromiseV2.default();
var Pokemon = require('../models').Pokemon;
var EvolutionChain = require('../models').EvolutionChain;

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

var getPokemon = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(id) {
    var pokemon, query, speciesInfo, formattedPokemon, abilities, ability1, ability2, ability3, ability1Resource, ability2Resource, ability3Resource;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return P.resource('/api/v2/pokemon/' + id);

          case 3:
            pokemon = _context.sent;
            query = pokemon.name;
            _context.next = 7;
            return P.getPokemonSpeciesByName(id);

          case 7:
            speciesInfo = _context.sent;
            formattedPokemon = {};

            formattedPokemon.name = pokemon.name;
            formattedPokemon.pokedexNumber = pokemon.id;

            abilities = pokemon.abilities;
            ability1 = abilities.find(function (o) {
              return o.slot === 1;
            });
            ability2 = abilities.find(function (o) {
              return o.slot === 2;
            });
            ability3 = abilities.find(function (o) {
              return o.slot === 3;
            });
            ability1Resource = '';
            ability2Resource = '';
            ability3Resource = '';

            if (!ability1) {
              _context.next = 24;
              break;
            }

            _context.next = 21;
            return P.resource(ability1.ability.url);

          case 21:
            ability1Resource = _context.sent;

            formattedPokemon.ability1Description = removeLinebreaks(ability1Resource.effect_entries.find(function (o) {
              return o.language.name === 'en';
            }).short_effect);
            formattedPokemon.ability1 = ability1.ability.name;

          case 24:
            if (!ability2) {
              _context.next = 30;
              break;
            }

            _context.next = 27;
            return P.resource(ability2.ability.url);

          case 27:
            ability2Resource = _context.sent;

            formattedPokemon.ability2Description = removeLinebreaks(ability2Resource.effect_entries.find(function (o) {
              return o.language.name === 'en';
            }).short_effect);
            formattedPokemon.ability2 = ability2.ability.name;

          case 30:
            if (!ability3) {
              _context.next = 36;
              break;
            }

            _context.next = 33;
            return P.resource(ability3.ability.url);

          case 33:
            ability3Resource = _context.sent;

            formattedPokemon.ability3Description = removeLinebreaks(ability3Resource.effect_entries.find(function (o) {
              return o.language.name === 'en';
            }).short_effect);
            formattedPokemon.ability3 = ability3.ability.name;

          case 36:

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
            formattedPokemon.pokedexEntry = removeLinebreaks(speciesInfo.flavor_text_entries.find(function (o) {
              return o.language.name === 'en';
            }).flavor_text);
            formattedPokemon.height = pokemon.height / 10;
            formattedPokemon.weight = pokemon.weight / 10;
            formattedPokemon.statHp = pokemon.stats.find(function (o) {
              return o.stat.name === 'hp';
            }).base_stat;
            formattedPokemon.statAttack = pokemon.stats.find(function (o) {
              return o.stat.name === 'attack';
            }).base_stat;
            formattedPokemon.statDefense = pokemon.stats.find(function (o) {
              return o.stat.name === 'defense';
            }).base_stat;
            formattedPokemon.statSpecialAttack = pokemon.stats.find(function (o) {
              return o.stat.name === 'special-attack';
            }).base_stat;
            formattedPokemon.statSpecialDefense = pokemon.stats.find(function (o) {
              return o.stat.name === 'special-defense';
            }).base_stat;
            formattedPokemon.statSpeed = pokemon.stats.find(function (o) {
              return o.stat.name === 'speed';
            }).base_stat;
            formattedPokemon.jsonPokemon = pokemon;
            formattedPokemon.jsonSpecies = speciesInfo;

            return _context.abrupt('return', formattedPokemon);

          case 55:
            _context.prev = 55;
            _context.t0 = _context['catch'](0);
            throw _context.t0;

          case 58:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 55]]);
  }));

  return function getPokemon(_x) {
    return _ref.apply(this, arguments);
  };
}();

var scrape = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
    var counter, checkAndGet;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            counter = 1;

            checkAndGet = function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
                var checkIfExists, chainId, checkIfEvolutionExists, evolutionChain, whatever;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return Pokemon.findOne({
                          where: { pokedexNumber: counter }
                        });

                      case 2:
                        checkIfExists = _context3.sent;

                        if (!(counter < 808)) {
                          _context3.next = 31;
                          break;
                        }

                        if (!checkIfExists.pokedexNumber) {
                          _context3.next = 27;
                          break;
                        }

                        console.log(counter + ' exists');
                        chainId = checkIfExists.jsonSpecies.evolution_chain.url.split('/')[6];

                        console.log('chaindId ' + chainId);
                        _context3.next = 10;
                        return EvolutionChain.findOne({
                          where: { chainId: chainId }
                        });

                      case 10:
                        checkIfEvolutionExists = _context3.sent;

                        if (!checkIfEvolutionExists) {
                          _context3.next = 17;
                          break;
                        }

                        console.log('chain evolution ' + chainId + ' exists');
                        counter++;
                        checkAndGet();
                        _context3.next = 25;
                        break;

                      case 17:
                        _context3.next = 19;
                        return P.getEvolutionChainById(chainId);

                      case 19:
                        evolutionChain = _context3.sent;
                        _context3.next = 22;
                        return EvolutionChain.create({
                          chainId: evolutionChain.id,
                          json: evolutionChain,
                          createdAt: new Date(),
                          updatedAt: new Date()
                        });

                      case 22:
                        whatever = _context3.sent;

                        console.log('created chain evolution ' + chainId);
                        setTimeout(function () {
                          counter++;
                          checkAndGet();
                        }, 1000);

                      case 25:
                        _context3.next = 29;
                        break;

                      case 27:
                        console.log('does not exists');
                        setTimeout((0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                          var currentPokemon, whatever;
                          return _regenerator2.default.wrap(function _callee2$(_context2) {
                            while (1) {
                              switch (_context2.prev = _context2.next) {
                                case 0:
                                  _context2.next = 2;
                                  return getPokemon(counter);

                                case 2:
                                  currentPokemon = _context2.sent;
                                  _context2.next = 5;
                                  return Pokemon.create(currentPokemon);

                                case 5:
                                  whatever = _context2.sent;

                                  counter++;
                                  console.log(counter);
                                  checkAndGet();

                                case 9:
                                case 'end':
                                  return _context2.stop();
                              }
                            }
                          }, _callee2, undefined);
                        })), 1000 + Math.floor(Math.random * 800));

                      case 29:
                        _context3.next = 32;
                        break;

                      case 31:
                        console.log('completed');

                      case 32:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, _callee3, undefined);
              }));

              return function checkAndGet() {
                return _ref3.apply(this, arguments);
              };
            }();
            // checkAndGet();
            // fixHp();
            // statTotal();
            // setEvolutionLine();
            // randomPopularityCount();


          case 2:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function scrape() {
    return _ref2.apply(this, arguments);
  };
}();

var randomPopularityCount = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
    var i, pokemon, rand;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            i = 1;

          case 1:
            if (!(i < 810)) {
              _context5.next = 10;
              break;
            }

            _context5.next = 4;
            return Pokemon.findOne({
              where: { pokedexNumber: i }
            });

          case 4:
            pokemon = _context5.sent;
            rand = Math.floor(Math.random() * 5);

            pokemon.update({ count: rand });

          case 7:
            i++;
            _context5.next = 1;
            break;

          case 10:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function randomPopularityCount() {
    return _ref5.apply(this, arguments);
  };
}();

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

exports.default = scrape;
//# sourceMappingURL=scrape.js.map