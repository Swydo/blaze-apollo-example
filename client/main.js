import { Template } from 'meteor/templating';
import { setup as blazeApolloSetup } from 'meteor/swydo:blaze-apollo';
import { client } from '../imports/apollo-client';

import PEOPLE_QUERY from '../imports/queries/peopleQuery.graphql';
import PERSON_LIKE_MUTATION from '../imports/queries/likePersonMutation.graphql';
import PERSON_LIKE_SUBSCRIPTION from '../imports/queries/likePersonSubscription.graphql';

import './main.html';

blazeApolloSetup({ client });

const { PeopleList, PersonItem } = Template;

// eslint-disable-next-line prefer-arrow-callback
PeopleList.onCreated(function created() {
  this.gqlSubscribe({
    query: PERSON_LIKE_SUBSCRIPTION,
  });
});

PeopleList.helpers({
  people() {
    const { people } = Template.instance().gqlQuery({
      query: PEOPLE_QUERY,
    }).get();

    return people && people.sort((a, b) => b.likes - a.likes);
  },
});

PersonItem.events({
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
