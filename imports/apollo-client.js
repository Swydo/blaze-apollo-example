import ApolloClient from 'apollo-client';
import { DDPNetworkInterface } from 'meteor/swydo:ddp-apollo';

export const client = new ApolloClient({
  networkInterface: new DDPNetworkInterface(),
});
