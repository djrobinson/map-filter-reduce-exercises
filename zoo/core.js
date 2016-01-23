var data = require('./data');

function entryCalculator (entrants) {
  // your code here
  if ( entrants === undefined || entrants.length === 0 ) return 0;
  var entArray = Object.keys(entrants);
  return entArray.reduce(function(accum, next){
    return accum + entrants[next] * data.prices[next];
  },0)
};

function schedule (dayName) {
  // your code here
  var keys = Object.keys(data.hours);
  // console.log(keys);
  var returnObj = {};
  if (dayName === undefined){
    keys.map(function(key){
      var sentence;
      if(data.hours[key].close - data.hours[key].open === 0){
        returnObj[key] = 'CLOSED';
      } else {
        returnObj[key] = 'Open from ' + data.hours[key].open + 'am until ' + (data.hours[key].close - 12) + 'pm';
      }
      // console.log(sentence);
    })
    return returnObj;
  } else {
    //should be able to refactor this, but probably won't end up doing it
      if(data.hours[dayName].close - data.hours[dayName].open === 0){
        returnObj[dayName] = 'CLOSED';
      } else {
        returnObj[dayName] = 'Open from ' + data.hours[dayName].open + 'am until ' + (data.hours[dayName].close - 12) + 'pm';
      }
    return returnObj;
  }

};

function animalCount (species) {
  // your code here
  var returnObj = {}

  data.animals.map(function(animal){
    returnObj[animal.name] = animal.residents.length;
  })
  if (species === undefined){
    return returnObj;
  } else {
    return returnObj[species];
  }
};

function animalMap (options) {
  // your code here
  var returnObj = {};
  var locationArr = ['NE','SE','NW','SW'];
  locationArr.forEach(function(loc){
    var localAnimals = [];
    if (options === undefined ) defaultFunc(localAnimals, loc);
    else if (options.includeNames === true) namesFunc(localAnimals,loc)
    else defaultFunc(localAnimals, loc);

  })

  function defaultFunc(localAnimals, loc){
    data.animals.map(function(animal){
      if (animal.location === loc) {
        localAnimals.push(animal['name']);
    }
    returnObj[loc] = localAnimals;
    })
  }

  function namesFunc(localAnimals, loc){
    data.animals.map(function(animal){
      var animalObj = {};
      var iterArray = iterGen(animal);
      if ( animal.location === loc ){
          var nameArray = iterArray.map(function(item){
            return item['name'];
          })
        animalObj[animal.name] = nameArray;
      }
      if (Object.keys(animalObj).length > 0)
      localAnimals.push(animalObj);
    })
    returnObj[loc] = localAnimals;
  }

  function iterGen(animal){
    if (options.hasOwnProperty('sex') && options.hasOwnProperty('includeNames')) {
      return animal.residents.filter(function(item){
        if (item['sex'] === options.sex) return item;
      })
    } else {
      return animal.residents;
    }
  }
  return returnObj;
};

function animalPopularity (rating) {
  // your code here
  var popularObj = {2:[], 3:[], 4:[], 5:[]};
  data.animals.map(function(animal){
    popularObj[animal['popularity']].push(animal['name']);
  })
  if (rating === undefined){
    return popularObj;
  } else {
    return popularObj[rating];
  }
};

function animalsByIds (ids) {
  // your code here
  var retArr = [];
  if (ids === undefined)
    { return [] }
  else if (typeof ids === 'string')
    { filterIds(ids); }
  else if (typeof ids === 'object')
    { ids.map(function(id){
        filterIds(id);
      });
    }
    return retArr;

  function filterIds(id){
    return data.animals.filter(function(animal){
      if (animal['id'] === id) retArr.push(animal);
    })
  };
};

function animalByName (animalName) {
  // your code here
  if ( animalName === undefined ) return {};
   var retVal;
   data.animals.map(function(animal){
    animal['residents'].filter(function(resident){
      if (animalName === resident['name']) {
        resident['species'] = animal['name'];
        retVal = resident;
      }
    })
   });
   return retVal;
};

function employeesByIds (ids) {
  // your code here
  var retArr = [];
  if (ids === undefined)
    { return [] }
  else if (typeof ids === 'string')
    { filterIds(ids); }
  else if (typeof ids === 'object')
    { ids.map(function(id){
        filterIds(id);
      });
    }
  return retArr;

  function filterIds(id){
    return data.employees.filter(function(employee){
      if (employee['id'] === id) retArr.push(employee);
    })
  };
};

function employeeByName (employeeName) {
  // your code here
  if (employeeName === undefined) return {};
  return data.employees.filter(function(employee){
      return ( employeeName === employee['firstName'] || employeeName === employee['lastName']);
    })[0];
};

function managersForEmployee (idOrName) {
  // your code here

  return data.employees.filter(function(employee){
    if ( idOrName === employee['id'] || idOrName === employee['firstName'] || idOrName === employee['lastName']){
      return employee['managers'].map(function(mgrId){
        checkManagers(employee, mgrId);
        return employee;
      })

    }
  })[0];

  function checkManagers(employee, mgrId){

    return data.employees.filter(function(manager){
      if ( manager['id'] === mgrId) {
        employee['managers'][employee['managers'].indexOf(mgrId)] = manager['firstName'] + " " + manager['lastName'];
      }
    })
  }

};

function employeeCoverage (idOrName) {
  // your code here
  var retVal = {}
  data.employees.map(function(employee){
    var animArr = employee['responsibleFor'].map(function(animalId){
      return matchAnimals(animalId)[0];
    });
    if ( idOrName === undefined){
      retVal[employee['firstName'] + " " + employee['lastName']] = animArr;
    } else if ( idOrName.indexOf('-') !== -1 && employee['id'] === idOrName){
      retVal[employee['firstName'] + " " + employee['lastName']] = animArr;
    } else if ( idOrName === employee['firstName'] || idOrName === employee['lastName']){
      retVal[employee['firstName'] + " " + employee['lastName']] = animArr;
    }
    // console.log(retVal);
  });

  function matchAnimals(animalId){
    var animalArray = [];
    data.animals.map(function(animal){
      if ( animalId === animal['id'] ){
        // console.log(animal['name']);
        animalArray.push(animal['name']);
      }
    })
    return animalArray;
  }
  return retVal;

  // if ( idOrName === undefined ){
  //   return retVal;
  // } else if ( idOrName.indexOf('-') !== -1 ){
  //   var emplName = data.employees.filter(function(employee){
  //     if (employee['id'] === idOrName) {
  //       var retValName = employee['firstName'] + " " + employee['lastName'];
  //       return retValName;
  //     }
  //   })[0];
  //   console.log(emplName);
  //   return retVal[emplName['firstName']+" "+emplName['lastName']];
  // }
};


module.exports = {
  entryCalculator: entryCalculator,
  schedule: schedule,
  animalCount: animalCount,
  animalMap: animalMap,
  animalPopularity: animalPopularity,
  animalsByIds: animalsByIds,
  animalByName: animalByName,
  employeesByIds: employeesByIds,
  employeeByName: employeeByName,
  managersForEmployee: managersForEmployee,
  employeeCoverage: employeeCoverage
}