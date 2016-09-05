import {Map} from 'immutable';

var API_ROOT = 'https://private-cef4b-corporatecare.apiary-mock.com'
let configuration = Map();

export function setConfiguration(name, value) {
  configuration = configuration.set(name, value);
}

export function setAll(properties) {
  configuration = configuration.merge(properties);
}

export function unsetConfiguration(name) {
  configuration = configuration.delete(name);
}

export function getConfiguration(key) {
  if (!configuration.has(key)) {
    throw new Error('Undefined configuration key: ' + key);
  }


  return configuration.get(key);
}


export default function init() {
  setConfiguration('API_ROOT', API_ROOT);
}
