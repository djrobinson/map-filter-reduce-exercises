function multiplyBy10 (array) {
 // your code here
 return array.map(function(num){
  return num * 10;
 });
}

function shiftRight (array) {
 // your code here
  return array.map(function(item){
    var index;
    if(array.indexOf(item) === 0){
      index = 2;
    } else {
      index = Math.abs(array.indexOf(item) - 1);
    }
    console.log(index);
    return array[index];
  });
}

function onlyVowels (array) {
 // your code here
  var vowelArray = ['a', 'e', 'i', 'o', 'u', 'y'];
  return array.map(function(word){
    var toArray = word.split('').filter(function(letter){
      return (vowelArray.indexOf(letter) !== -1);
    });
    return toArray.join('');
 });
}

function doubleMatrix (array) {
 // your code here
  return array.map(function(row){
    return row.map(function(num){
      return num * 2;
    })
  })

};

module.exports = {
  multiplyBy10: multiplyBy10,
  shiftRight: shiftRight,
  onlyVowels: onlyVowels,
  doubleMatrix: doubleMatrix
};