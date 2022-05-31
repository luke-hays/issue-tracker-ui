import Table from 'components/Table/Table';
import '../../index.css';

const rows = [
  {
    id: 1,
    status: 'New',
    owner: 'Ravan',
    created: '2022-30-05 21:25:35',
    effort: 5,
    duedate: '2022-10-06 21:25:35',
    title: 'Missing bottom border on panel.',
  },
];

const columns = [
  { accessor: 'id', label: 'ID' },
  { accessor: 'status', label: 'Status' },
  { accessor: 'owner', label: 'Owner' },
  { accessor: 'created', label: 'Created' },
  { accessor: 'effort', label: 'Effort' },
  { accessor: 'duedate', label: 'Due Date' },
  { accessor: 'title', label: 'Title' },
];

const Home = (): JSX.Element => {
  return (
    <div className="w-fit mx-4">
      <div className="flex flex-col items-center justify-center mt-4 flex-wrap">
        <h1 className="text-7xl">Issue Tracker</h1>
        <div className="mt-8">
          <Table rows={rows} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Home;
