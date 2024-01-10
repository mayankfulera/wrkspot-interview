import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import axios from 'axios';
import { useMemo, useState } from 'react';
import './App.css';
import Filters from './components/filters';
import Header from './components/header';
import ReactTable from './components/tableData';

function App() {
  const [search, setSearch] = useState('');
  const [populationFilter, setPopulationFilter] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columnHelper = createColumnHelper();

  const columns = useMemo(() => {
    return [
      columnHelper.accessor('name', {
        header: () => <div className="display-flex">Country Name</div>,
      }),
      columnHelper.accessor('abbreviation', {
        header: () => <div className="display-flex">Code</div>,
      }),
      columnHelper.accessor('capital', {
        header: () => <div className="display-flex">Capital</div>,
      }),
      columnHelper.accessor('phone', {
        header: () => <div className="display-flex">Ph Code</div>,
      }),
      columnHelper.accessor('population', {
        header: () => <div className="display-flex">Population</div>,
      }),
      columnHelper.accessor('flag', {
        header: () => <div className="display-flex">Flag</div>,
      }),
      columnHelper.accessor('emblem', {
        header: () => <div className="display-flex">Emblem</div>,
      }),
    ];
  }, [columnHelper]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const showCountries = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        'https://mocki.io/v1/ec42d07b-99b4-4d9b-b678-4643ef8baad8',
      );
      if (res.status === 200) {
        const temp = res.data.map((item) => {
          return { ...item, flag: item.media.flag, emblem: item.media.emblem };
        });
        setCountries(temp);
        setFilteredData(temp);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      throw new Error(err);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    const temp = countries.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilteredData(temp);
  };

  const checkPopulation = (value) => {
    switch (value) {
      case '1M':
        return 1000000;
      case '5M':
        return 5000000;
      case '10M':
        return 10000000;
      default:
        return null;
    }
  };

  const handlePopulationChange = (e) => {
    setPopulationFilter(e.target.value);
    if (e.target.value !== 'Population') {
      const temp = countries.filter(
        (item) => item.population < checkPopulation(e.target.value),
      );
      setFilteredData(temp);
    } else {
      setFilteredData(countries);
    }
  };

  const clearData = () => {
    setFilteredData(countries);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <Header></Header>
      <Filters
        search={search}
        handleSearchChange={handleSearchChange}
        populationFilter={populationFilter}
        handlePopulationChange={handlePopulationChange}
        clearData={clearData}
        showCountries={showCountries}
      ></Filters>
      <ReactTable
        table={table}
        filteredData={filteredData}
        loading={loading}
      ></ReactTable>
    </div>
  );
}

export default App;
