import ApolloClient from 'apollo-client';
import { meteorClientConfig } from 'meteor/apollo';

const config = meteorClientConfig();

export const client = new ApolloClient(config);
