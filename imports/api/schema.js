export const typeDefs = [`
  type Person {
    _id: ID!
    name: String!
    likes: Int
  }

  type RootQuery {
    person(id: ID!): Person
    people: [Person]
  }

  type Mutation {
    likePerson(id: ID!): Person
  }

  schema {
    query: RootQuery
    mutation: Mutation
  }
`];
