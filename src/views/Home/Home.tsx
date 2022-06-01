import useIssueList from 'hooks/useIssueList';

import Table from 'components/Table/Table';
import '../../index.css';

const columns = [
  { accessor: 'id', label: 'ID' },
  { accessor: 'status', label: 'Status' },
  { accessor: 'owner', label: 'Owner' },
  { accessor: 'created', label: 'Created' },
  { accessor: 'effort', label: 'Effort' },
  { accessor: 'due', label: 'Due Date' },
  { accessor: 'title', label: 'Title' },
];

const Home = (): JSX.Element => {
  const { loading, error, data } = useIssueList();

  if (loading)
    return (
      <div className="mt-10 flex items-center justify-center">Loading...</div>
    );
  if (error) throw new Error('test');

  return (
    <div className="w-fit mx-4">
      <div className="flex flex-col items-center justify-center mt-4 flex-wrap">
        <h1 className="text-7xl">Issue Tracker</h1>
        <div className="mt-8">
          <Table rows={data.issueList} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Home;
