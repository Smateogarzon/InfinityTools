import PreviewClientDetail from './Components/ClientDetailPreview/PreviewClientDetail';
import InfoClientDetail from './Components/ClientDetailInfo/InfoClientDetail';
import ClientDetailSuspend from './Components/ClientDetailSuspend/ClientDetailSuspend';
import ClientDetailDelete from './Components/ClientDetailDelete/ClientDetailDelete';

function ViewClientDetail() {
  return (
    <>
      <PreviewClientDetail />
      <InfoClientDetail />
      <ClientDetailSuspend />
      <ClientDetailDelete />
    </>
  );
}

export default ViewClientDetail;
