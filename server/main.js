import { setup } from 'meteor/swydo:ddp-apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { SubscriptionManager } from 'graphql-subscriptions';

import { pubsub } from '../imports/api/pubsub';
import { typeDefs } from '../imports/api/schema';
import { resolvers } from '../imports/api/resolvers';

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
