import { useLazyQuery, useQuery } from '@apollo/client';
import CardsClient from './Components/ClientCards/CardsClient';
import PaginationClient from './Components/ClientPagination/PaginationClient';
import SearchClient from './Components/ClientSearch/SearchClient';
import { getAllClients, getAllFilters } from './graphql/querys';
import { useEffect, useState } from 'react';

function ViewClient() {
  const [numPag, setNumPag] = useState<number>(1);
  const { data, loading, error } = useQuery(getAllClients, {
    variables: { numPage: numPag },
  });
  const [getFilters, result] = useLazyQuery(getAllFilters);
  const [filters, setFilters] = useState({});
  const [data2, setData2] = useState([]);
  const [totalData2, setTotalData2] = useState<number>(0);
  const [loading2, setLoading2] = useState<boolean>(false);
  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      getFilters({ variables: { filter: filters, numPage: numPag } });
      setData2(result.data?.FindUserQuery?.users);
      setTotalData2(result.data?.FindUserQuery?.total);
      setLoading2(result.loading);
    }
  }, [filters, result.data?.FindUserQuery, numPag]);

  return (
    <div>
      <SearchClient setFilters={setFilters} />
      <CardsClient
        FindAllusers={Object.keys(filters).length > 0 ? data2 : data?.FindAllusers?.users}
        loading={Object.keys(filters).length > 0 ? loading2 : loading}
        error={error}
      />

      <PaginationClient
        total={Object.keys(filters).length > 0 ? totalData2 : data?.FindAllusers?.total}
        setNumPag={setNumPag}
      />
    </div>
  );
}

export default ViewClient;
