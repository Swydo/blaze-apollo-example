export const typeDefs = [`
  type Person {
    _id: ID!
    name: String!
    films: [Film]
    likes: Int
  }

  type Film {
    _id: ID!
    title: String!
    people: [Person]
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
