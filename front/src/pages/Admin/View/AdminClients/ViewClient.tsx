import CardsClient from './Components/CardsClient/CardsClient';
import PaginationClient from './Components/PaginationClient/PaginationClient';
import SearchClient from './Components/SearchClient/SearchClient';

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
