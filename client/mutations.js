import gql from 'graphql-tag';

export const PERSON_LIKE_MUTATION = gql`
mutation likePerson($id: ID!) {
  likePerson(id: $id) {
    _id
    likes
  }
}
`;
