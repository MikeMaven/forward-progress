/**
 * @module HashHelpers
 */

import camelize from 'camelize'
import decamelize from 'decamelize'


/**
 * Selects all the keys except the given keys.
 *
 */
export function except(hash, listOfKeys)
{
  return Object.keys(hash)
    .filter(key => !listOfKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = hash[key];
      return obj;
    }, {});
}

export function slice(hash, listOfKeys)
{
  return Object.keys(hash)
    .filter(key => listOfKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = hash[key];
      return obj;
    }, {});
}

export function camelizeHash(hash) {
  if(hash instanceof Array) {
    return hash.map((obj) => camelizeHash(obj))
  } else if (hash === Object(hash)){
    return Object.entries(hash).reduce((acc, key)=>{acc[camelize(key[0])]=camelizeHash(key[1]);return acc},{})
  } else {
    return hash
  }
}

export function decamelizeHash(hash) {
  if(hash instanceof Array) {
    return hash.map((obj) => decamelizeHash(obj))
  } else if (hash === Object(hash)){
    return Object.entries(hash).reduce((acc, key)=> {acc[decamelize(key[0])]=decamelizeHash(key[1]); return acc},{})
  } else {
    return hash
  }
}
