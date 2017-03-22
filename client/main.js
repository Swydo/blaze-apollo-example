import { Template } from 'meteor/templating';
import { setup as blazeApolloSetup } from 'meteor/swydo:blaze-apollo';
import { client } from '../imports/apollo-client';

import {
  PEOPLE_QUERY,
  PERSON_LIKE_MUTATION,
  PERSON_LIKE_SUBSCRIPTION,
} from './queries';

import './main.html';

blazeApolloSetup({ client });

const { peopleList, personItem } = Template;

// eslint-disable-next-line prefer-arrow-callback
peopleList.onCreated(function created() {
  this.gqlSubscribe({
    query: PERSON_LIKE_SUBSCRIPTION,
  });
});

peopleList.helpers({
  people() {
    const { people } = Template.instance().gqlQuery({
      query: PEOPLE_QUERY,
    }).get();

    return people && people.sort((a, b) => b.likes - a.likes);
  },
});

personItem.events({
  click() {
    const { id, likes } = this.person;
    const newLikes = likes + 1;

    client.mutate({
      mutation: PERSON_LIKE_MUTATION,
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        likePerson: {
          __typename: 'Person',
          id,
          likes: newLikes,
        },
      },
    });
  },
});
