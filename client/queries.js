import gql from 'graphql-tag';

export const PEOPLE_QUERY = gql`
query people {
  people {
    id
    name
    likes
    films {
      id
    }
  }
}
`;

export const PERSON_QUERY = gql`
query person($personId: ID!) {
  person(id: $personId) {
    id
    name
    likes
  }
}
`;

export const PERSON_LIKE_MUTATION = gql`
mutation likePerson($id: ID!) {
  likePerson(id: $id) {
    id
    likes
  }
}
`;

