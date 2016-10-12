import DataLoader from 'dataloader';
import rp from 'request-promise-native';

export const peopleUrl = 'http://swapi.co/api/people/';

export const swapiLoader = new DataLoader((keys) => {
  return Promise.all(keys.map((key) => rp({ uri: key, json: true })));
});
