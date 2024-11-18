// lib/graphql-client.ts
import { GraphQLClient } from 'graphql-request';

const GRAPHQL_ENDPOINT = process.env.WORDPRESS_GRAPHQL_ENDPOINT || 'https://aigirlfriendblog.com/graphql';

export const client = new GraphQLClient(GRAPHQL_ENDPOINT);