function sum (array) {
  // your code here
  return array.reduce(function(prev, curr){
    return prev + curr;
  })
};

function productAll (array) {
  // your code here
  var nextArr = [];
  var nextArr = array.reduce(function(prev, curr){
    return prev.concat(curr);
  });
  return nextArr.reduce(function(a, b){
    return a * b;
  });
};

function objectify (array) {
  // your code here
  return array.reduce(function(accum, item){
    console.log(item[0]," space  ", item[1]);
    accum[item[0]] = item[1];
    return accum;
  },{});
};

function luckyNumbers (array) {
  // your code here
  return array.reduce(function(accum, item, index){
    if ( index < array.length -1 ){
      accum = accum + item + ", ";
      console.log(index);
      return accum;
    } else if ( index === array.length - 1  ){
      accum = accum + "and " + item;
      return accum;
    }
    },"Your lucky numbers are: ");
};

module.exports = {
  sum: sum,
  productAll: productAll,
  objectify: objectify,
  luckyNumbers: luckyNumbers
};