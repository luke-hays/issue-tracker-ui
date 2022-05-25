import Table from 'components/Table';
import '../../index.css';

const rows = [
  {
    id: 1,
    name: 'Liz Lemon',
    age: 36,
    is_manager: true,
    start_date: '02-28-1999',
  },
  {
    id: 2,
    name: 'Jack Donaghy',
    age: 40,
    is_manager: true,
    start_date: '03-05-1997',
  },
  {
    id: 3,
    name: 'Tracy Morgan',
    age: 39,
    is_manager: false,
    start_date: '07-12-2002',
  },
  {
    id: 4,
    name: 'Jenna Maroney',
    age: 40,
    is_manager: false,
    start_date: '02-28-1999',
  },
  {
    id: 5,
    name: 'Kenneth Parcell',
    age: Infinity,
    is_manager: false,
    start_date: '01-01-1970',
  },
  {
    id: 6,
    name: 'Pete Hornberger',
    age: null,
    is_manager: true,
    start_date: '04-01-2000',
  },
  {
    id: 7,
    name: 'Frank Rossitano',
    age: 36,
    is_manager: false,
    start_date: null,
  },
];

const columns = [
  { accessor: 'name', label: 'Name' },
  { accessor: 'age', label: 'Age' },
  {
    accessor: 'is_manager',
    label: 'Manager',
    format: (value: boolean) => (value ? '✔️' : '✖️'),
  },
  { accessor: 'start_date', label: 'Start Date' },
];

// const columns: [] = [];

const Home = (): JSX.Element => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center mt-4">
        <h1 className="text-7xl">Issue Tracker</h1>
        <Table rows={rows} columns={columns} />
      </div>
    </div>
  );
};

export default Home;
