import { gql, QueryResult, useQuery } from '@apollo/client';

const ABOUT = gql`
  query GetAbout {
    about
  }
`;

const useAbout = (): QueryResult => {
  return useQuery(ABOUT);
};

export default useAbout;
