import Table from 'components/Table/Table';
import '../../index.css';

const rows: [] = [];
const columns: [] = [];

const Home = (): JSX.Element => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-4">
        <h1 className="text-7xl">Issue Tracker</h1>
        <div className="mt-8">
          <Table rows={rows} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Home;
