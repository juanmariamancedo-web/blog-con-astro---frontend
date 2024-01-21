import { ApolloClient, InMemoryCache } from '@apollo/client';

const API_URL = import.meta.env.PUBLIC_API_URL

const client = new ApolloClient({
    uri: `${API_URL}/graphql`,
    cache: new InMemoryCache(),
    connectToDevTools: true
});

export default client