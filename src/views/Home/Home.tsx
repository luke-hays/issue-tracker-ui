import useIssueList from 'hooks/useIssueList';

import Table from 'components/Table/Table';
import '../../index.css';
import IssueAddForm from './IssueAddForm';

const columns = [
  { accessor: 'id', label: 'ID' },
  { accessor: 'status', label: 'Status' },
  { accessor: 'owner', label: 'Owner' },
  { accessor: 'created', label: 'Created' },
  { accessor: 'effort', label: 'Effort' },
  { accessor: 'due', label: 'Due Date' },
  { accessor: 'title', label: 'Title' },
];

const modifyDates: any = (data: any) => {
  return data.map((e: any) => {
    const newCreated = new Date(e.created).toString();
    const newDue = new Date(e.due).toString() ?? undefined;

    return { ...e, created: newCreated, due: newDue };
  });
  return data;
};

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
          <Table rows={modifyDates(data.issueList)} columns={columns} />
        </div>
        <IssueAddForm />
      </div>
    </div>
  );
};

export default Home;
