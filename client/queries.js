import gql from 'graphql-tag';

export const PEOPLE_QUERY = gql`
query people {
  people {
    _id
    name
    likes
  }
}
`;

export const PERSON_QUERY = gql`
query person($personId: ID!) {
  person(id: $personId) {
    _id
    name
    likes
  }
}
`;
