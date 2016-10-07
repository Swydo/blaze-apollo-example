export const People = new Mongo.Collection('people');

// We could count the likes with within the people collection, but a
// seperate collection shows some of the power of GraphQL in the resolvers
export const Likes = new Mongo.Collection('likes');

// Default people
// We should use swapi.co with our own data in the future
// That would totally give an idea of the power of GraphQL 
if (!People.findOne()) {
  const people = [{
    _id: '1',
    name: 'Luke Skywalker'
  }, {
    _id: '2',
    name: 'C-3PO'
  }];

  people.forEach((person) => People.insert(person));
}
