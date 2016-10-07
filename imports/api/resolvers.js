import { People, Likes } from '../collections';

export const resolvers = {
    RootQuery: {
        people: () => People.find({}).fetch(),
        person: (root, { id }) => People.findOne(id)
    },
    Person: {
      _id: ({ _id }) => _id,
      name: ({ name }) => name,
      likes: ({ _id }) => Likes.find({personId: _id}).count()
    },
    Mutation: {
      likePerson: (root, { id }) => {
        Likes.insert({ personId: id });
        return People.findOne(id);
      }
    }
};
