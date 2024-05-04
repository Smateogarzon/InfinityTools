import { useLazyQuery, useQuery } from '@apollo/client';
import CardsClient from './Components/ClientCards/CardsClient';
import PaginationClient from './Components/ClientPagination/PaginationClient';
import SearchClient from './Components/ClientSearch/SearchClient';
import { getAllClients, getAllFilters } from './graphql/querys';
import { useEffect, useState } from 'react';

function ViewClient() {
  const { data, loading, error } = useQuery(getAllClients);
  const [getFilters, result] = useLazyQuery(getAllFilters);
  const [filters, setFilters] = useState({});
  const [data2, setData2] = useState([]);
  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      getFilters({ variables: { filter: filters } });
      setData2(result.data?.FindUserQuery);
    }
  }, [filters, result.data?.FindUserQuery]);

  return (
    <div>
      <SearchClient setFilters={setFilters} />
      <CardsClient
        FindAllusers={Object.keys(filters).length > 0 ? data2 : data?.FindAllusers}
        loading={loading}
        error={error}
      />
      <PaginationClient />
    </div>
  );
}

export default ViewClient;
