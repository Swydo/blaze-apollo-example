export const typeDefs = [`
  type Person {
    id: ID!
    name: String!
    films: [Film]
    likes: Int
  }

  type Film {
    id: ID!
    title: String!
    people: [Person]
  }

  type Query {
    person(id: ID!): Person
    people: [Person]
  }

  type Mutation {
    likePerson(id: ID!): Person
  }

  type Subscription {
    likePerson: Person
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`];
