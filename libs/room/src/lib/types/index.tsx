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
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  verified: Scalars['Boolean'];
  profile?: Maybe<Profile>;
};


export type AuthTokens = {
  __typename?: 'AuthTokens';
  refreshToken: Scalars['String'];
  accessToken: Scalars['String'];
};

export type RoomMessage = {
  __typename?: 'RoomMessage';
  id: Scalars['String'];
  content: Scalars['String'];
  roomId: Scalars['String'];
  authorId: Scalars['String'];
  author: User;
  createdAt: Scalars['String'];
};

export type Room = {
  __typename?: 'Room';
  id: Scalars['String'];
  name: Scalars['String'];
  userId: Scalars['String'];
  author: User;
  currentMedia: Scalars['String'];
  mediaStatus: Scalars['String'];
  members: Array<User>;
  messages: Array<RoomMessage>;
  createdAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  tokens: AuthTokens;
  refresh: Scalars['String'];
  me: User;
  user: User;
  rooms: Array<Room>;
  room: Room;
  roomMessages: Array<RoomMessage>;
};


export type QueryTokensArgs = {
  authCode: Scalars['String'];
};


export type QueryRefreshArgs = {
  refreshToken: Scalars['String'];
};


export type QueryUserArgs = {
  userId: Scalars['ID'];
};


export type QueryRoomArgs = {
  roomId: Scalars['ID'];
};


export type QueryRoomMessagesArgs = {
  roomId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  logout: Scalars['Boolean'];
  createRoom: Room;
  toggleMediaStatus: Scalars['Boolean'];
  createRoomMessage: Scalars['Boolean'];
};


export type MutationLogoutArgs = {
  refreshToken: Scalars['String'];
};


export type MutationCreateRoomArgs = {
  input: RoomCreateInput;
};


export type MutationToggleMediaStatusArgs = {
  input: MediaStatusChangeInput;
};


export type MutationCreateRoomMessageArgs = {
  input: RoomMessageCreateInput;
};

export type RoomCreateInput = {
  currentMedia: Scalars['String'];
};

export type MediaStatusChangeInput = {
  roomId: Scalars['String'];
  mediaStatus: Scalars['String'];
};

export type RoomMessageCreateInput = {
  text: Scalars['String'];
  roomId: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  roomMessageCreated: RoomMessage;
  roomMediaStatusChanged: Room;
  roomCreated: Room;
  roomMessageDeleted: RoomMessage;
};


export type SubscriptionRoomMessageCreatedArgs = {
  roomId: Scalars['ID'];
};


export type SubscriptionRoomMediaStatusChangedArgs = {
  roomId: Scalars['ID'];
};


export type SubscriptionRoomMessageDeletedArgs = {
  roomId: Scalars['ID'];
};

export type RoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type RoomsQuery = (
  { __typename?: 'Query' }
  & { rooms: Array<(
    { __typename?: 'Room' }
    & RoomFieldsFragment
  )> }
);

export type RoomQueryVariables = Exact<{
  roomId: Scalars['ID'];
}>;


export type RoomQuery = (
  { __typename?: 'Query' }
  & { room: (
    { __typename?: 'Room' }
    & RoomFieldsFragment
  ) }
);

export type RoomMessagesQueryVariables = Exact<{
  roomId: Scalars['ID'];
}>;


export type RoomMessagesQuery = (
  { __typename?: 'Query' }
  & { roomMessages: Array<(
    { __typename?: 'RoomMessage' }
    & RoomMessageFieldsFragment
  )> }
);

export type CreateRoomMutationVariables = Exact<{
  input: RoomCreateInput;
}>;


export type CreateRoomMutation = (
  { __typename?: 'Mutation' }
  & { createRoom: (
    { __typename?: 'Room' }
    & RoomFieldsFragment
  ) }
);

export type ToggleMediaStatusMutationVariables = Exact<{
  input: MediaStatusChangeInput;
}>;


export type ToggleMediaStatusMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'toggleMediaStatus'>
);

export type CreateRoomMessageMutationVariables = Exact<{
  input: RoomMessageCreateInput;
}>;


export type CreateRoomMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createRoomMessage'>
);

export type RoomMediaStatusChangedSubscriptionVariables = Exact<{
  roomId: Scalars['ID'];
}>;


export type RoomMediaStatusChangedSubscription = (
  { __typename?: 'Subscription' }
  & { roomMediaStatusChanged: (
    { __typename?: 'Room' }
    & Pick<Room, 'mediaStatus'>
  ) }
);

export type RoomCreatedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type RoomCreatedSubscription = (
  { __typename?: 'Subscription' }
  & { roomCreated: (
    { __typename?: 'Room' }
    & RoomFieldsFragment
  ) }
);

export type RoomMessageCreatedSubscriptionVariables = Exact<{
  roomId: Scalars['ID'];
}>;


export type RoomMessageCreatedSubscription = (
  { __typename?: 'Subscription' }
  & { roomMessageCreated: (
    { __typename?: 'RoomMessage' }
    & RoomMessageFieldsFragment
  ) }
);

export type RoomMessageDeletedSubscriptionVariables = Exact<{
  roomId: Scalars['ID'];
}>;


export type RoomMessageDeletedSubscription = (
  { __typename?: 'Subscription' }
  & { roomMessageDeleted: (
    { __typename?: 'RoomMessage' }
    & RoomMessageFieldsFragment
  ) }
);

export type RoomMessageFieldsFragment = (
  { __typename?: 'RoomMessage' }
  & Pick<RoomMessage, 'id' | 'content' | 'createdAt'>
  & { author: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
    & { profile?: Maybe<(
      { __typename?: 'Profile' }
      & Pick<Profile, 'id' | 'name' | 'avatar'>
    )> }
  ) }
);

export type RoomFieldsFragment = (
  { __typename?: 'Room' }
  & Pick<Room, 'id' | 'createdAt' | 'name' | 'currentMedia' | 'mediaStatus'>
  & { author: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
    & { profile?: Maybe<(
      { __typename?: 'Profile' }
      & Pick<Profile, 'id' | 'name' | 'avatar'>
    )> }
  ), members: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
    & { profile?: Maybe<(
      { __typename?: 'Profile' }
      & Pick<Profile, 'id' | 'name' | 'avatar'>
    )> }
  )>, messages: Array<(
    { __typename?: 'RoomMessage' }
    & Pick<RoomMessage, 'id' | 'createdAt' | 'content'>
    & { author: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
      & { profile?: Maybe<(
        { __typename?: 'Profile' }
        & Pick<Profile, 'id' | 'name' | 'avatar'>
      )> }
    ) }
  )> }
);

export const RoomMessageFieldsFragmentDoc = gql`
    fragment RoomMessageFields on RoomMessage {
  id
  content
  createdAt
  author {
    id
    name
    profile {
      id
      name
      avatar
    }
  }
}
    `;
export const RoomFieldsFragmentDoc = gql`
    fragment RoomFields on Room {
  id
  createdAt
  name
  currentMedia
  mediaStatus
  author {
    id
    name
    profile {
      id
      name
      avatar
    }
  }
  members {
    id
    name
    profile {
      id
      name
      avatar
    }
  }
  messages {
    id
    createdAt
    author {
      id
      name
      profile {
        id
        name
        avatar
      }
    }
    content
  }
}
    `;
export const RoomsDocument = gql`
    query rooms {
  rooms {
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
 *   },
 * });
 */
export function useRoomsQuery(baseOptions?: Apollo.QueryHookOptions<RoomsQuery, RoomsQueryVariables>) {
        return Apollo.useQuery<RoomsQuery, RoomsQueryVariables>(RoomsDocument, baseOptions);
      }
export function useRoomsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoomsQuery, RoomsQueryVariables>) {
          return Apollo.useLazyQuery<RoomsQuery, RoomsQueryVariables>(RoomsDocument, baseOptions);
        }
export type RoomsQueryHookResult = ReturnType<typeof useRoomsQuery>;
export type RoomsLazyQueryHookResult = ReturnType<typeof useRoomsLazyQuery>;
export type RoomsQueryResult = Apollo.QueryResult<RoomsQuery, RoomsQueryVariables>;
export const RoomDocument = gql`
    query room($roomId: ID!) {
  room(roomId: $roomId) {
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
 *      roomId: // value for 'roomId'
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
export const RoomMessagesDocument = gql`
    query roomMessages($roomId: ID!) {
  roomMessages(roomId: $roomId) {
    ...RoomMessageFields
  }
}
    ${RoomMessageFieldsFragmentDoc}`;

/**
 * __useRoomMessagesQuery__
 *
 * To run a query within a React component, call `useRoomMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoomMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomMessagesQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useRoomMessagesQuery(baseOptions: Apollo.QueryHookOptions<RoomMessagesQuery, RoomMessagesQueryVariables>) {
        return Apollo.useQuery<RoomMessagesQuery, RoomMessagesQueryVariables>(RoomMessagesDocument, baseOptions);
      }
export function useRoomMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RoomMessagesQuery, RoomMessagesQueryVariables>) {
          return Apollo.useLazyQuery<RoomMessagesQuery, RoomMessagesQueryVariables>(RoomMessagesDocument, baseOptions);
        }
export type RoomMessagesQueryHookResult = ReturnType<typeof useRoomMessagesQuery>;
export type RoomMessagesLazyQueryHookResult = ReturnType<typeof useRoomMessagesLazyQuery>;
export type RoomMessagesQueryResult = Apollo.QueryResult<RoomMessagesQuery, RoomMessagesQueryVariables>;
export const CreateRoomDocument = gql`
    mutation createRoom($input: RoomCreateInput!) {
  createRoom(input: $input) {
    ...RoomFields
  }
}
    ${RoomFieldsFragmentDoc}`;
export type CreateRoomMutationFn = Apollo.MutationFunction<CreateRoomMutation, CreateRoomMutationVariables>;

/**
 * __useCreateRoomMutation__
 *
 * To run a mutation, you first call `useCreateRoomMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMutation, { data, loading, error }] = useCreateRoomMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRoomMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomMutation, CreateRoomMutationVariables>) {
        return Apollo.useMutation<CreateRoomMutation, CreateRoomMutationVariables>(CreateRoomDocument, baseOptions);
      }
export type CreateRoomMutationHookResult = ReturnType<typeof useCreateRoomMutation>;
export type CreateRoomMutationResult = Apollo.MutationResult<CreateRoomMutation>;
export type CreateRoomMutationOptions = Apollo.BaseMutationOptions<CreateRoomMutation, CreateRoomMutationVariables>;
export const ToggleMediaStatusDocument = gql`
    mutation toggleMediaStatus($input: mediaStatusChangeInput!) {
  toggleMediaStatus(input: $input)
}
    `;
export type ToggleMediaStatusMutationFn = Apollo.MutationFunction<ToggleMediaStatusMutation, ToggleMediaStatusMutationVariables>;

/**
 * __useToggleMediaStatusMutation__
 *
 * To run a mutation, you first call `useToggleMediaStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleMediaStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleMediaStatusMutation, { data, loading, error }] = useToggleMediaStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useToggleMediaStatusMutation(baseOptions?: Apollo.MutationHookOptions<ToggleMediaStatusMutation, ToggleMediaStatusMutationVariables>) {
        return Apollo.useMutation<ToggleMediaStatusMutation, ToggleMediaStatusMutationVariables>(ToggleMediaStatusDocument, baseOptions);
      }
export type ToggleMediaStatusMutationHookResult = ReturnType<typeof useToggleMediaStatusMutation>;
export type ToggleMediaStatusMutationResult = Apollo.MutationResult<ToggleMediaStatusMutation>;
export type ToggleMediaStatusMutationOptions = Apollo.BaseMutationOptions<ToggleMediaStatusMutation, ToggleMediaStatusMutationVariables>;
export const CreateRoomMessageDocument = gql`
    mutation createRoomMessage($input: RoomMessageCreateInput!) {
  createRoomMessage(input: $input)
}
    `;
export type CreateRoomMessageMutationFn = Apollo.MutationFunction<CreateRoomMessageMutation, CreateRoomMessageMutationVariables>;

/**
 * __useCreateRoomMessageMutation__
 *
 * To run a mutation, you first call `useCreateRoomMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoomMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoomMessageMutation, { data, loading, error }] = useCreateRoomMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateRoomMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateRoomMessageMutation, CreateRoomMessageMutationVariables>) {
        return Apollo.useMutation<CreateRoomMessageMutation, CreateRoomMessageMutationVariables>(CreateRoomMessageDocument, baseOptions);
      }
export type CreateRoomMessageMutationHookResult = ReturnType<typeof useCreateRoomMessageMutation>;
export type CreateRoomMessageMutationResult = Apollo.MutationResult<CreateRoomMessageMutation>;
export type CreateRoomMessageMutationOptions = Apollo.BaseMutationOptions<CreateRoomMessageMutation, CreateRoomMessageMutationVariables>;
export const RoomMediaStatusChangedDocument = gql`
    subscription roomMediaStatusChanged($roomId: ID!) {
  roomMediaStatusChanged(roomId: $roomId) {
    mediaStatus
  }
}
    `;

/**
 * __useRoomMediaStatusChangedSubscription__
 *
 * To run a query within a React component, call `useRoomMediaStatusChangedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRoomMediaStatusChangedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomMediaStatusChangedSubscription({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useRoomMediaStatusChangedSubscription(baseOptions: Apollo.SubscriptionHookOptions<RoomMediaStatusChangedSubscription, RoomMediaStatusChangedSubscriptionVariables>) {
        return Apollo.useSubscription<RoomMediaStatusChangedSubscription, RoomMediaStatusChangedSubscriptionVariables>(RoomMediaStatusChangedDocument, baseOptions);
      }
export type RoomMediaStatusChangedSubscriptionHookResult = ReturnType<typeof useRoomMediaStatusChangedSubscription>;
export type RoomMediaStatusChangedSubscriptionResult = Apollo.SubscriptionResult<RoomMediaStatusChangedSubscription>;
export const RoomCreatedDocument = gql`
    subscription roomCreated {
  roomCreated {
    ...RoomFields
  }
}
    ${RoomFieldsFragmentDoc}`;

/**
 * __useRoomCreatedSubscription__
 *
 * To run a query within a React component, call `useRoomCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRoomCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomCreatedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useRoomCreatedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<RoomCreatedSubscription, RoomCreatedSubscriptionVariables>) {
        return Apollo.useSubscription<RoomCreatedSubscription, RoomCreatedSubscriptionVariables>(RoomCreatedDocument, baseOptions);
      }
export type RoomCreatedSubscriptionHookResult = ReturnType<typeof useRoomCreatedSubscription>;
export type RoomCreatedSubscriptionResult = Apollo.SubscriptionResult<RoomCreatedSubscription>;
export const RoomMessageCreatedDocument = gql`
    subscription roomMessageCreated($roomId: ID!) {
  roomMessageCreated(roomId: $roomId) {
    ...RoomMessageFields
  }
}
    ${RoomMessageFieldsFragmentDoc}`;

/**
 * __useRoomMessageCreatedSubscription__
 *
 * To run a query within a React component, call `useRoomMessageCreatedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRoomMessageCreatedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomMessageCreatedSubscription({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useRoomMessageCreatedSubscription(baseOptions: Apollo.SubscriptionHookOptions<RoomMessageCreatedSubscription, RoomMessageCreatedSubscriptionVariables>) {
        return Apollo.useSubscription<RoomMessageCreatedSubscription, RoomMessageCreatedSubscriptionVariables>(RoomMessageCreatedDocument, baseOptions);
      }
export type RoomMessageCreatedSubscriptionHookResult = ReturnType<typeof useRoomMessageCreatedSubscription>;
export type RoomMessageCreatedSubscriptionResult = Apollo.SubscriptionResult<RoomMessageCreatedSubscription>;
export const RoomMessageDeletedDocument = gql`
    subscription roomMessageDeleted($roomId: ID!) {
  roomMessageDeleted(roomId: $roomId) {
    ...RoomMessageFields
  }
}
    ${RoomMessageFieldsFragmentDoc}`;

/**
 * __useRoomMessageDeletedSubscription__
 *
 * To run a query within a React component, call `useRoomMessageDeletedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRoomMessageDeletedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoomMessageDeletedSubscription({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useRoomMessageDeletedSubscription(baseOptions: Apollo.SubscriptionHookOptions<RoomMessageDeletedSubscription, RoomMessageDeletedSubscriptionVariables>) {
        return Apollo.useSubscription<RoomMessageDeletedSubscription, RoomMessageDeletedSubscriptionVariables>(RoomMessageDeletedDocument, baseOptions);
      }
export type RoomMessageDeletedSubscriptionHookResult = ReturnType<typeof useRoomMessageDeletedSubscription>;
export type RoomMessageDeletedSubscriptionResult = Apollo.SubscriptionResult<RoomMessageDeletedSubscription>;