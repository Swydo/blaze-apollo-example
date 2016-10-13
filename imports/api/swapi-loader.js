import DataLoader from 'dataloader';
import rp from 'request-promise-native';

export const peopleUrl = 'http://swapi.co/api/people/';

export const urlLoader = new DataLoader(keys =>
  Promise.all(keys.map(key => rp({ uri: key, json: true })))
);

async function subLoader(data) {
  let result;

  if (data.results) {
    const nextData = await urlLoader.load(data.next);

    result = data.results.concat(nextData.results);
  } else {
    result = data;
  }

  return result;
}

export const swapiLoader = new DataLoader(keys =>
  Promise.all(keys.map(key => urlLoader.load(key).then(subLoader)))
);
