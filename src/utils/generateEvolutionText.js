var a = require('indefinite');

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

const generateEvolutionText = evo => {
  let sen =
    evo.name.capitalize() + ' evolves into ' + evo.evolvesTo.capitalize();
  let cond = [];
  switch (evo.trigger) {
    case 'level-up':
      sen += ' by leveling up';
      if (evo.name === 'crabrawler') {
        cond.push('at Mount Lanakila');
      }
      if (evo.evolvesTo === 'hitmontop') {
        cond.push('to level 20 when its defense and attack are the same');
      }
      for (var key in evo.value) {
        switch (key) {
          case 'min_level':
            if (evo.evolvesTo !== 'hitmontop') {
              cond.push('to level ' + evo.value[key]);
            }
            break;
          case 'item':
            cond.push(' by using ' + a(evo.value[key].replace(/-/g, ' ')));
            break;
          case 'gender':
            switch (evo.value[key]) {
              case 1:
                cond.push('a female ' + evo.name.capitalize());
                break;
              default:
                cond.push('a male ' + evo.name.capitalize());
            }
            break;
          case 'held_item':
            cond.push('while holding ' + a(evo.value[key].replace(/-/g, ' ')));
            break;
          case 'known_move':
            cond.push(
              'while knowing the move ' + evo.value[key].replace(/-/g, ' '),
            );
            break;
          case 'known_move_type':
            cond.push(
              'while knowing a ' +
                evo.value[key].replace(/-/g, ' ') +
                ' type move',
            );
            break;
          case 'location':
            cond.push(
              'while at ' + toTitleCase(evo.value[key].replace(/-/g, ' ')),
            );
            break;
          case 'min_affection':
            cond.push(
              'with at least ' + evo.value[key] + ' hearts of affection',
            );
            break;
          case 'min_beauty':
            cond.push('with at least ' + evo.value[key] + ' beauty');
            break;
          case 'min_happiness':
            cond.push('with at least ' + evo.value[key] + ' happiness');
            break;
          case 'needs_overworld_rain':
            cond.push("while it's raining");
            break;
          case 'party_species':
            cond.push(
              'with a ' + evo.value[key].capitalize() + ' in your party',
            );
            break;
          case 'party_type':
            cond.push(
              'with another ' + evo.value[key] + ' type pokemon in the party',
            );
            break;
          case 'relative_physical_stats':
            switch (evo.value[key]) {
              case -1:
                cond.push('when its defense is greater than its attack');
                break;
              case 0:
                cond.push('when its defense and attack are the same');
                break;
              case 1:
                cond.push('when its attack is greater than its defense');
                break;
              default:
                console.log('something went wrong');
            }
            break;
          case 'time_of_day':
            cond.push(
              'during the ' + evo.value[key].replace(/-/g, ' ') + ' time',
            );
            break;
          case 'trade_species':
            cond.push('by trading with a ' + evo.value[key].replace(/-/g, ' '));
            break;
          case 'turn_upside_down':
            cond.push('while holding your console upside down');
            break;
          default:
            cond.push('with a mysterious method');
        }
      }
      break;
    case 'use-item':
      for (var key in evo.value) {
        switch (key) {
          case 'item':
            sen += ' by using ' + a(evo.value[key].replace(/-/g, ' '));
            break;
          case 'gender':
            cond.push('with a gender of ' + evo.value[key].replace(/-/g, ' '));
            break;
          case 'held_item':
            cond.push('while holding ' + a(evo.value[key].replace(/-/g, ' ')));
            break;
          case 'known_move':
            cond.push(
              'while knowing the move ' + evo.value[key].replace(/-/g, ' '),
            );
            break;
          case 'known_move_type':
            cond.push(
              'while knowing a ' +
                evo.value[key].replace(/-/g, ' ') +
                ' type move',
            );
            break;
          case 'location':
            cond.push(
              'while at ' + toTitleCase(evo.value[key].replace(/-/g, ' ')),
            );
            break;
          case 'min_affection':
            cond.push(
              'with at least ' +
                evo.value[key].replace(/-/g, ' ') +
                ' affection',
            );
            break;
          case 'min_beauty':
            cond.push(
              'with at least ' + evo.value[key].replace(/-/g, ' ') + ' beauty',
            );
            break;
          case 'min_happiness':
            cond.push(
              'with at least ' +
                evo.value[key].replace(/-/g, ' ') +
                ' happiness',
            );
            break;
          case 'min_level':
            cond.push('at level ' + evo.value[key]);
            break;
          case 'needs_overworld_rain':
            cond.push('while it is raining');
            break;
          case 'party_species':
            cond.push(
              'with a ' +
                evo.value[key].capitalize() +
                ' in your party'.replace(/-/g, ' '),
            );
            break;
          case 'party_type':
            cond.push(
              'with the party type ' + evo.value[key].replace(/-/g, ' '),
            );
            break;
          case 'relative_physical_stats':
            break;
          case 'time_of_day':
            cond.push(
              'during the ' + evo.value[key].replace(/-/g, ' ') + ' time',
            );
            break;
          case 'trade_species':
            cond.push('by trading with a ' + evo.value[key].replace(/-/g, ' '));
            break;
          case 'turn_upside_down':
            cond.push('while holding your console upside down');
            break;
          default:
            cond.push('with a mysterious method');
        }
      }
      break;
    case 'trade':
      sen += ' by trading it';
      for (var key in evo.value) {
        switch (key) {
          case 'item':
            sen += ' by using ' + a(evo.value[key].replace(/-/g, ' '));
            break;
          case 'gender':
            cond.push('with a gender of ' + evo.value[key].replace(/-/g, ' '));
            break;
          case 'held_item':
            cond.push(
              "while it's holding " + a(evo.value[key].replace(/-/g, ' ')),
            );

            break;
          case 'known_move':
            cond.push(
              'while knowing the move ' + evo.value[key].replace(/-/g, ' '),
            );
            break;
          case 'known_move_type':
            cond.push(
              'while knowing a ' +
                evo.value[key].replace(/-/g, ' ') +
                ' type move',
            );
            break;
          case 'location':
            cond.push(
              'while at ' + toTitleCase(evo.value[key].replace(/-/g, ' ')),
            );
            break;
          case 'min_affection':
            cond.push(
              'with at least ' +
                evo.value[key].replace(/-/g, ' ') +
                ' affection',
            );
            break;
          case 'min_beauty':
            cond.push(
              'with at least ' + evo.value[key].replace(/-/g, ' ') + ' beauty',
            );
            break;
          case 'min_happiness':
            cond.push(
              'with at least ' +
                evo.value[key].replace(/-/g, ' ') +
                ' happiness',
            );
            break;
          case 'min_level':
            cond.push('at level ' + evo.value[key]);
            break;
          case 'needs_overworld_rain':
            cond.push('while it is raining');
            console.log('while it is raining');
            break;
          case 'party_species':
            cond.push(
              'with a ' +
                evo.value[key].capitalize() +
                ' in your party'.replace(/-/g, ' '),
            );
            break;
          case 'party_type':
            cond.push(
              'with the party type ' + evo.value[key].replace(/-/g, ' '),
            );
            break;
          case 'relative_physical_stats':
            break;
          case 'time_of_day':
            cond.push(
              'during the ' + evo.value[key].replace(/-/g, ' ') + ' time',
            );
            break;
          case 'trade_species':
            cond.push(
              'with a ' + evo.value[key].replace(/-/g, ' ').capitalize(),
            );
            break;
          case 'turn_upside_down':
            cond.push('while holding your console upside down');
            break;
          default:
            cond.push('with a mysterious method');
        }
      }
      break;
    default:
      if (evo.evolvesTo === 'shedinja') {
        sen =
          'When Nincada evolves into Ninjask, if you have a spare pokeball and room in your party, you will get a Shedinja';
      }
    // console.log(evo.trigger);
  }
  cond.forEach(line => {
    sen += ' ' + line;
  });
  console.log(sen);
  return sen;
};

export default generateEvolutionText;

// "known_move"
// "known_move_type"
// "location"
// "min_affection"
// "min_beauty"
// "min_happiness"
// min_level
// needs_overworld_rain
// party_species
// party_type
// relative_physical_stats
// time_of_day
// trade_species
// turn_upside_down

// switch (evo.trigger) {
//     case 'level-up':
//       break;
//     case 'use-item':
//       break;
//     default:
//   }
