"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
function levenshteinDistance(a, b) {
  var distanceMatrix = Array(b.length + 1).fill(null).map(function () {
    return Array(a.length + 1).fill(null);
  });
  for (var i = 0; i <= a.length; i += 1) {
    distanceMatrix[0][i] = i;
  }
  for (var j = 0; j <= b.length; j += 1) {
    distanceMatrix[j][0] = j;
  }
  for (var _j = 1; _j <= b.length; _j += 1) {
    for (var _i = 1; _i <= a.length; _i += 1) {
      var indicator = a[_i - 1] === b[_j - 1] ? 0 : 1;
      distanceMatrix[_j][_i] = Math.min(distanceMatrix[_j][_i - 1] + 1, distanceMatrix[_j - 1][_i] + 1, distanceMatrix[_j - 1][_i - 1] + indicator);
    }
  }
  return distanceMatrix[b.length][a.length];
}

exports.default = levenshteinDistance;
//# sourceMappingURL=levenshtein.js.map