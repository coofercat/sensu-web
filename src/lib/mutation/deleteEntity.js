import gql from "/vendor/graphql-tag";
import handle from "/lib/exceptionHandler";

const fragment = gql`
  fragment DeleteEntityMutation_entity on Entity {
    deleted @client
  }
`;

const mutation = gql`
  mutation DeleteEntityMutation($input: DeleteRecordInput!) {
    deleteEntity(input: $input) {
      deletedId
    }
  }
`;

export default (client, { id }) =>
  client.mutate({
    mutation,
    variables: {
      input: { id },
    },
    update: cache => {
      try {
        const ev = cache.readFragment({ fragment, id });
        const data = { ...ev, deleted: true };
        cache.writeFragment({ fragment, id, data });
      } catch (error) {
        handle(error);
      }
    },
    optimisticResponse: {
      deleteEntity: {
        deletedId: id,
        __typename: "DeleteRecordPayload",
      },
      __typename: "Mutation",
    },
  });
