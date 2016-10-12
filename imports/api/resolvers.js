import rp from 'request-promise-native';
import { Likes } from '../collections';

const peopleUrl = 'http://swapi.co/api/people/';

export const resolvers = {
  Person: {
    _id: ({ url }) => url,
    name: ({ name }) => name,
    likes: ({ url }) => Likes.find({ personId: url }).count()
  },

  RootQuery: {
    person: (root, { id }) => rp({ uri: id, json: true }),
    people: (root) => rp({ uri: peopleUrl, json: true })
                        .then(({ results }) => results)
  },

  Mutation: {
    likePerson: (root, { id }) => {
      Likes.insert({ personId: id });
      return rp({ uri: id, json: true });
    }
  }
};
