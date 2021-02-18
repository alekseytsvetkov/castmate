import { gql } from '@apollo/client';
import axios from 'axios';
import { initializeApollo } from '../apollo';

const apolloClient = initializeApollo(null, 'https://castmate-api.kive.dev/graphql');