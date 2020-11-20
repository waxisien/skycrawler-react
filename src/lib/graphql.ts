import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { Bounds } from "google-map-react";

const uri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/graphql"
    : "/graphql";

export const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

export const mapBounds = makeVar<Bounds | undefined>(undefined);
export const minHeightFilter = makeVar<number>(0);
export const statusFilter = makeVar<boolean>(false);
