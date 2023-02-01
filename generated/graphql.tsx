import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  generatePrompt?: Maybe<Array<Maybe<AnswerType>>>;
  updateAnswer?: Maybe<AnswerType>;
};


export type MutationGeneratePromptArgs = {
  prompt: Scalars['String'];
};


export type MutationUpdateAnswerArgs = {
  answer: AnswerModField;
};

export type Query = {
  __typename?: 'Query';
  test?: Maybe<Scalars['Boolean']>;
};


export type QueryTestArgs = {
  bool: Scalars['Boolean'];
};

export type AnswerModField = {
  flag?: InputMaybe<Scalars['Boolean']>;
  id: Scalars['Int'];
  modText?: InputMaybe<Scalars['String']>;
  rank?: InputMaybe<Scalars['Int']>;
};

export type AnswerType = {
  __typename?: 'answerType';
  flag?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['Int']>;
  modText?: Maybe<Scalars['String']>;
  promptId?: Maybe<Scalars['Int']>;
  rank?: Maybe<Scalars['Int']>;
  text?: Maybe<Scalars['String']>;
};

export type GeneratePromptMutationVariables = Exact<{
  prompt: Scalars['String'];
}>;


export type GeneratePromptMutation = { __typename?: 'Mutation', generatePrompt?: Array<{ __typename?: 'answerType', id?: number | null, promptId?: number | null, text?: string | null, modText?: string | null, rank?: number | null, flag?: boolean | null } | null> | null };

export type UpdateAnswerMutationVariables = Exact<{
  AnswerModField: AnswerModField;
}>;


export type UpdateAnswerMutation = { __typename?: 'Mutation', updateAnswer?: { __typename?: 'answerType', id?: number | null, promptId?: number | null, text?: string | null, modText?: string | null, rank?: number | null, flag?: boolean | null } | null };

export type TestQueryVariables = Exact<{ [key: string]: never; }>;


export type TestQuery = { __typename?: 'Query', test?: boolean | null };


export const GeneratePromptDocument = gql`
    mutation generatePrompt($prompt: String!) {
  generatePrompt(prompt: $prompt) {
    id
    promptId
    text
    modText
    rank
    flag
  }
}
    `;
export type GeneratePromptMutationFn = Apollo.MutationFunction<GeneratePromptMutation, GeneratePromptMutationVariables>;

/**
 * __useGeneratePromptMutation__
 *
 * To run a mutation, you first call `useGeneratePromptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGeneratePromptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generatePromptMutation, { data, loading, error }] = useGeneratePromptMutation({
 *   variables: {
 *      prompt: // value for 'prompt'
 *   },
 * });
 */
export function useGeneratePromptMutation(baseOptions?: Apollo.MutationHookOptions<GeneratePromptMutation, GeneratePromptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GeneratePromptMutation, GeneratePromptMutationVariables>(GeneratePromptDocument, options);
      }
export type GeneratePromptMutationHookResult = ReturnType<typeof useGeneratePromptMutation>;
export type GeneratePromptMutationResult = Apollo.MutationResult<GeneratePromptMutation>;
export type GeneratePromptMutationOptions = Apollo.BaseMutationOptions<GeneratePromptMutation, GeneratePromptMutationVariables>;
export const UpdateAnswerDocument = gql`
    mutation updateAnswer($AnswerModField: answerModField!) {
  updateAnswer(answer: $AnswerModField) {
    id
    promptId
    text
    modText
    rank
    flag
  }
}
    `;
export type UpdateAnswerMutationFn = Apollo.MutationFunction<UpdateAnswerMutation, UpdateAnswerMutationVariables>;

/**
 * __useUpdateAnswerMutation__
 *
 * To run a mutation, you first call `useUpdateAnswerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAnswerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAnswerMutation, { data, loading, error }] = useUpdateAnswerMutation({
 *   variables: {
 *      AnswerModField: // value for 'AnswerModField'
 *   },
 * });
 */
export function useUpdateAnswerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAnswerMutation, UpdateAnswerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAnswerMutation, UpdateAnswerMutationVariables>(UpdateAnswerDocument, options);
      }
export type UpdateAnswerMutationHookResult = ReturnType<typeof useUpdateAnswerMutation>;
export type UpdateAnswerMutationResult = Apollo.MutationResult<UpdateAnswerMutation>;
export type UpdateAnswerMutationOptions = Apollo.BaseMutationOptions<UpdateAnswerMutation, UpdateAnswerMutationVariables>;
export const TestDocument = gql`
    query Test {
  test(bool: false)
}
    `;

/**
 * __useTestQuery__
 *
 * To run a query within a React component, call `useTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTestQuery({
 *   variables: {
 *   },
 * });
 */
export function useTestQuery(baseOptions?: Apollo.QueryHookOptions<TestQuery, TestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TestQuery, TestQueryVariables>(TestDocument, options);
      }
export function useTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TestQuery, TestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TestQuery, TestQueryVariables>(TestDocument, options);
        }
export type TestQueryHookResult = ReturnType<typeof useTestQuery>;
export type TestLazyQueryHookResult = ReturnType<typeof useTestLazyQuery>;
export type TestQueryResult = Apollo.QueryResult<TestQuery, TestQueryVariables>;