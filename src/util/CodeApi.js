/**
 * @module CodeAPI
 */
export var config = {
  axiosDefaults: {

  }
}

import {camelizeHash} from "./HashHelpers.js"
import pluralize from "pluralize"

function _unrollApiResponse(objectOrValue, parentKey) {
  if (objectOrValue instanceof Array) {
    // if we have an array of hashes, keyed by a pluarl and having the singular
    // version inside, then we strip out the inside level

    const singular = pluralize.singular(parentKey)
    return objectOrValue.map((child) => {
      const keys = Object.keys(child)

      if (keys.length == 1 && keys[0] == singular) {
        const unrolledChild = child[singular]
        Object.keys(unrolledChild).forEach((key) => {
          unrolledChild[key] = _unrollApiResponse(unrolledChild[key], key)
        })

        return unrolledChild
      } else {
        return child
      }
    })
  } else {
    if (objectOrValue != null && typeof(objectOrValue) == 'object') {
      Object.keys(objectOrValue).forEach((key) => {
        objectOrValue[key] = _unrollApiResponse(objectOrValue[key], key)
      })
    }
    return objectOrValue
  }
}

export function unrollApiResponse(response) {
  if (response == null) { return response}

  Object.keys(response).forEach((key) => {
    response[key] = _unrollApiResponse(response[key], key)
  })

  return camelizeHash(response)
}
