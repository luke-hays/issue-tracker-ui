import { gql, useMutation } from '@apollo/client';

const ISSUE_ADD = gql`
  mutation IssueAdd($issue: IssueInputs!) {
    issueAdd(issue: $issue) {
      id
      title
      status
      owner
      effort
      created
      due
    }
  }
`;

const useIssueAdd = (): any => {
  const [issueAdd, { data, loading, error }] = useMutation(ISSUE_ADD);

  return { issueAdd, data, loading, error };
};

export default useIssueAdd;
