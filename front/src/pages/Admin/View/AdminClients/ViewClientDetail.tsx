import { Link } from 'react-router-dom';
import PreviewClientDetail from './Components/ClientDetailPreview/PreviewClientDetail';
import InfoClientDetail from './Components/ClientDetailInfo/InfoClientDetail';
import ClientDetailSuspend from './Components/ClientDetailSuspend/ClientDetailSuspend';
import ClientDetailDelete from './Components/ClientDetailDelete/ClientDetailDelete';

function ViewClientDetail() {
  return (
    <Link to='/admin/client/detail/${id}'>
      <PreviewClientDetail />
      <InfoClientDetail />
      <ClientDetailSuspend />
      <ClientDetailDelete />
    </Link>
  );
}

export default ViewClientDetail;
