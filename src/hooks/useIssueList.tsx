import { gql, QueryResult, useQuery } from '@apollo/client';

const ISSUES = gql`
  query FullList {
    issueList {
      id
      title
      status
      effort
      created
      due
      owner
    }
  }
`;

const useIssueList = (): QueryResult => {
  return useQuery(ISSUES);
};

export default useIssueList;
