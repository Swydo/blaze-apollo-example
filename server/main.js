import { setup } from 'meteor/swydo:ddp-apollo';
import { makeExecutableSchema } from 'graphql-tools';
import { SubscriptionManager } from 'graphql-subscriptions';
import { print } from 'graphql/language/printer';

import { pubsub } from '../imports/api/pubsub';
import types from '../imports/api/types.gql';
import { resolvers } from '../imports/api/resolvers';

const schema = makeExecutableSchema({
  typeDefs: print(types),
  resolvers,
});

const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
});

setup(schema, {
  subscriptionManager,
});
