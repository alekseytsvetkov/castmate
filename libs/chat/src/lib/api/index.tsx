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
  avatar?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  profiles?: Maybe<Array<Profile>>;
};


export type Room = {
  __typename?: 'Room';
  id: Scalars['String'];
  name: Scalars['String'];
  title: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  onlineCount: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type RoomMessage = {
  __typename?: 'RoomMessage';
  id: Scalars['String'];
  content: Scalars['String'];
  roomId: Scalars['String'];
  userId: Scalars['String'];
  user: User;
  createdAt: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  uniqCount: Scalars['Int'];
  user?: Maybe<User>;
  me: User;
  room: Room;
  rooms: Array<Room>;
  roomMessages: Array<RoomMessage>;
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


export type QueryRoomMessagesArgs = {
  roomId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  logout: Scalars['Boolean'];
  updateConnectionStatus: Scalars['Boolean'];
  createRoom: Room;
  createRoomMessage: Scalars['Boolean'];
};


export type MutationUpdateConnectionStatusArgs = {
  room?: Maybe<Scalars['String']>;
};


export type MutationCreateRoomArgs = {
  input: CreateRoomInput;
};


export type MutationCreateRoomMessageArgs = {
  input: RoomMessageCreateInput;
};

export type CreateRoomInput = {
  name: Scalars['String'];
  title: Scalars['String'];
};

export type RoomMessageCreateInput = {
  content: Scalars['String'];
  roomId: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  roomMessageCreated: RoomMessage;
  roomMessageDeleted: RoomMessage;
};


export type SubscriptionRoomMessageCreatedArgs = {
  roomId: Scalars['ID'];
};


export type SubscriptionRoomMessageDeletedArgs = {
  roomId: Scalars['ID'];
};

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

export type CreateRoomMessageMutationVariables = Exact<{
  input: RoomMessageCreateInput;
}>;


export type CreateRoomMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'createRoomMessage'>
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
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'avatar'>
  ) }
);

export const RoomMessageFieldsFragmentDoc = gql`
    fragment RoomMessageFields on RoomMessage {
  id
  content
  createdAt
  user {
    id
    name
    avatar
  }
}
    `;
export const RoomMessagesDocument = gql`
    query RoomMessages($roomId: ID!) {
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
export const RoomMessageCreatedDocument = gql`
    subscription RoomMessageCreated($roomId: ID!) {
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
    subscription RoomMessageDeleted($roomId: ID!) {
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