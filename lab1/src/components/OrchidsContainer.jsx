import { orchids } from '../data/ListOfOrchids';
import OrchidsPresentation from './OrchidsPresentation';

export default function OrchidsContainer() {
  return <OrchidsPresentation orchids={orchids} />;
}
