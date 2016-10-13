import { Likes } from '../collections';
import { swapiLoader, peopleUrl } from './swapi-loader';

export const resolvers = {
  Person: {
    _id: ({ url }) => url,
    name: ({ name }) => name,
    likes: ({ url }) => Likes.find({ personId: url }).count(),
    films: ({ films }) => swapiLoader.loadMany(films),
  },

  Film: {
    _id: ({ url }) => url,
    title: ({ title }) => title,
    people: ({ characters }) => swapiLoader.loadMany(characters),
  },

  RootQuery: {
    person: (root, { id }) => swapiLoader.load(id),
    people: (root) => swapiLoader.load(peopleUrl).then(({ results }) => results)
  },

  Mutation: {
    likePerson: (root, { id }) => {
      Likes.insert({ personId: id });
      return swapiLoader.load(id);
    },
  },
};
