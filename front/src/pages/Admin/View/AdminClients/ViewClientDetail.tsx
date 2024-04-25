import { Link } from 'react-router-dom';
import PreviewClientDetail from './Components/PreviewClientDetail/PreviewClientDetail';

function ViewClientDetail() {
  return (
    <Link to='/admin/client/detail/${id}'>
      <PreviewClientDetail />
    </Link>
  );
}

export default ViewClientDetail;
