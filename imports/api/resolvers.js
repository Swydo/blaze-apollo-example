import { Likes } from '../collections';
import { swapiLoader, peopleUrl } from './swapi-loader';
import pubsub from './pubsub';

const resolvers = {
  Person: {
    id: ({ url }) => url,
    name: ({ name }) => name,
    likes: ({ url }) => Likes.find({ personId: url }).count(),
    films: ({ films }) => swapiLoader.loadMany(films),
  },

  Film: {
    id: ({ url }) => url,
    title: ({ title }) => title,
    people: ({ characters }) => swapiLoader.loadMany(characters),
  },

  Query: {
    person: (root, { id }) => swapiLoader.load(id),
    people: () => swapiLoader.load(peopleUrl),
  },

  Mutation: {
    likePerson: (root, { id }) => {
      Likes.insert({ personId: id });

      return swapiLoader.load(id).then((likePerson) => {
        pubsub.publish('likePerson', { likePerson });
        return likePerson;
      });
    },
  },
};

export default resolvers;
