import CardsClient from './Components/ClientCards/CardsClient';
import PaginationClient from './Components/ClientPagination/PaginationClient';
import SearchClient from './Components/ClientSearch/SearchClient';

function ViewClient() {
  return (
    <div>
      <SearchClient />
      <CardsClient />
      <PaginationClient />
    </div>
  );
}

export default ViewClient;
