import { useState } from 'react';
import { orchids } from '../data/ListOfOrchids';
import OrchidModal from './OrchidModal';
import OrchidsPresentation from './OrchidsPresentation';

export default function OrchidsContainer() {
  const [selectedOrchid, setSelectedOrchid] = useState(null);

  return (
    <>
      <OrchidsPresentation orchids={orchids} onViewDetails={setSelectedOrchid} />
      <OrchidModal orchid={selectedOrchid} onClose={() => setSelectedOrchid(null)} />
    </>
  );
}
