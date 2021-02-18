import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AuthTokens = {
  __typename?: 'AuthTokens';
  refreshToken: Scalars['String'];
  accessToken: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  verified: Scalars['Boolean'];
  profile?: Maybe<Profile>;
};


export type ChatMessage = {
  __typename?: 'ChatMessage';
  id: Scalars['String'];
  content: Scalars['String'];
  chatId: Scalars['String'];
  authorId: Scalars['String'];
  author: User;
  createdAt: Scalars['String'];
};

export type Room = {
  __typename?: 'Room';
  id: Scalars['String'];
  name: Scalars['String'];
  title: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  chatId: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  tokens: AuthTokens;
  refresh: Scalars['String'];
  user?: Maybe<User>;
  me: User;
  room: Room;
  rooms: Array<Room>;
  chatMessages: Array<ChatMessage>;
};


export type QueryTokensArgs = {
  authCode: Scalars['String'];
};


export type QueryRefreshArgs = {
  refreshToken: Scalars['String'];
};


export type QueryUserArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryRoomArgs = {
  name: Scalars['String'];
};


export type QueryRoomsArgs = {
  name: Scalars['String'];
};


export type QueryChatMessagesArgs = {
  chatId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  logout: Scalars['Boolean'];
  createChatMessage: Scalars['Boolean'];
};


export type MutationLogoutArgs = {
  refreshToken: Scalars['String'];
};


export type MutationCreateChatMessageArgs = {
  input: ChatMessageCreateInput;
};

export type ChatMessageCreateInput = {
  text: Scalars['String'];
  chatId: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  roomUpdated: Room;
  chatMessageCreated: ChatMessage;
  chatMessageDeleted: ChatMessage;
};


export type SubscriptionRoomUpdatedArgs = {
  id: Scalars['ID'];
};


export type SubscriptionChatMessageCreatedArgs = {
  chatId: Scalars['ID'];
};


export type SubscriptionChatMessageDeletedArgs = {
  chatId: Scalars['ID'];
};

export type RoomQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type RoomQuery = (
  { __typename?: 'Query' }
  & { room: (
    { __typename?: 'Room' }
    & RoomFieldsFragment
  ) }
);

export type RoomsQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type RoomsQuery = (
  { __typename?: 'Query' }
  & { rooms: Array<(
    { __typename?: 'Room' }
    & RoomFieldsFragment
  )> }
);

export type RoomFieldsFragment = (
  { __typename?: 'Room' }
  & Pick<Room, 'id' | 'name' | 'title' | 'state' | 'avatar' | 'chatId'>
);

export const RoomFieldsFragmentDoc = gql`
    fragment RoomFields on Room {
  id
  name
  title
  state
  avatar
  chatId
}
    `;
export const RoomDocument = gql`
    query room($name: String!) {
  room(name: $name) {
    ...RoomFields
  }
}
    ${RoomFieldsFragmentDoc}`;

/**
 * __useRoomQuery__
 *
 * To run a query within a React component, call `useRoomQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRoomQuery(baseOptions: Apollo.QueryHookOptions<RoomQuery, RoomQueryVariables>) {
        return Apollo.useQuery<RoomQuery, RoomQueryVariables>(RoomDocument, baseOptions);
      }
export function useRoomLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoomQuery, RoomQueryVariables>) {
          return Apollo.useLazyQuery<RoomQuery, RoomQueryVariables>(RoomDocument, baseOptions);
        }
export type RoomQueryHookResult = ReturnType<typeof useRoomQuery>;
export type RoomLazyQueryHookResult = ReturnType<typeof useRoomLazyQuery>;
export type RoomQueryResult = Apollo.QueryResult<RoomQuery, RoomQueryVariables>;
export const RoomsDocument = gql`
    query rooms($name: String!) {
  rooms(name: $name) {
    ...RoomFields
  }
}
    ${RoomFieldsFragmentDoc}`;

/**
 * __useRoomsQuery__
 *
 * To run a query within a React component, call `useRoomsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomsQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRoomsQuery(baseOptions: Apollo.QueryHookOptions<RoomsQuery, RoomsQueryVariables>) {
        return Apollo.useQuery<RoomsQuery, RoomsQueryVariables>(RoomsDocument, baseOptions);
      }
export function useRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoomsQuery, RoomsQueryVariables>) {
          return Apollo.useLazyQuery<RoomsQuery, RoomsQueryVariables>(RoomsDocument, baseOptions);
        }
export type RoomsQueryHookResult = ReturnType<typeof useRoomsQuery>;
export type RoomsLazyQueryHookResult = ReturnType<typeof useRoomsLazyQuery>;
export type RoomsQueryResult = Apollo.QueryResult<RoomsQuery, RoomsQueryVariables>;