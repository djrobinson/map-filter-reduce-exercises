function onlyEven (array) {
  // your code here
  return array.filter(function(num){
    return num % 2 === 0;
  });
}

function onlyOneWord (array) {
  // your code here
  return array.filter(function(str){
    return str.indexOf(' ') === -1;
  });
}

function positiveRowsOnly (array) {
  // your code here
  return array.filter(function(row){
     return row.every(function(num){
        return num > 0;
    });
  });
}

function allSameVowels (array) {
  // your code here
  var vowelArray = ['a', 'e', 'i', 'o', 'u', 'y'];
  return array.filter(function(word){
    var vowelObj = {};
    vowelArray.forEach(function(letter){
      if (word.indexOf(letter) !== -1)  vowelObj[letter] = true;
    });
    return (Object.keys(vowelObj).length > 1)? false : true;
  });
}

module.exports = {
  onlyEven: onlyEven,
  onlyOneWord: onlyOneWord,
  positiveRowsOnly: positiveRowsOnly,
  allSameVowels: allSameVowels
};