export const typeDefs = [`
type Person {
  _id: ID!
  name: String!
  likes: Int
}

type RootQuery {
  people: [Person]
  person(id: ID!): Person
}

type Mutation {
  likePerson (
    id: ID!
  ): Person
}

schema {
  query: RootQuery
  mutation: Mutation
}
`];
