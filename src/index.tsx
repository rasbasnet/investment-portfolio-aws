import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import AuthProvider from "./frontend/AuthenticatorProvider";

const client = new ApolloClient({
	uri: "https://backendclient.com/",
	cache: new InMemoryCache(),
});

ReactDOM.render(
	<ApolloProvider client={client}>
		<AuthProvider>
			<App />
		</AuthProvider>
	</ApolloProvider>,
	document.getElementById("root")
);
