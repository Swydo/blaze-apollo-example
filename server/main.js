import { setup } from 'meteor/swydo:ddp-apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { SubscriptionManager } from 'graphql-subscriptions';

import typeDefs from '../imports/api/schema.gql';
import resolvers from '../imports/api/resolvers';
import pubsub from '../imports/api/pubsub';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
});

setup(schema, {
  subscriptionManager,
});
