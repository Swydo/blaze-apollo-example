import ApolloClient from 'apollo-client';
import { DDPNetworkInterface } from 'meteor/swydo:ddp-apollo';

export const client = new ApolloClient({
  networkInterface: new DDPNetworkInterface(),
  dataIdFromObject: (result) => {
    if (result.id && result.__typename) {
      const dataId = result.__typename + result.id;
      return dataId;
    }

    return null;
  },
});
