import { Template } from 'meteor/templating';
import { setup as blazeApolloSetup } from 'meteor/swydo:blaze-apollo';
import { client } from '/imports/apollo-client';

import { PEOPLE_QUERY } from './queries';
import { PERSON_LIKE_MUTATION } from './mutations';

import './main.html';

blazeApolloSetup({ client });

Template.peopleList.helpers({
  people() {
    return Template.instance().gqlQuery({
      query: PEOPLE_QUERY
      // Add any ApolloClient.watchQuery option, like pollInterval
    }).get().people;
  }
});

Template.personItem.events({
  'click .badge'(e) {
    e.stopPropagation();

    const { _id, likes } = this.person;

    client.mutate({
      mutation: PERSON_LIKE_MUTATION,
      variables: { id: _id },
      optimisticResponse: {
        __typename: 'Mutation',
        likePerson: {
          __typename: 'Person',
          _id,
          likes: likes + 1
        },
      },
    });
  }
});
