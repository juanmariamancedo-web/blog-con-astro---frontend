import {ApolloProvider} from "@apollo/client"
import client from "../utils/apolloserver"

export default function ApolloProviderTag({children}: {children: JSX.Element}) {
    return(
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}