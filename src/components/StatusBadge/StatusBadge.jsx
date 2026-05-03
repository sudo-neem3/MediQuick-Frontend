import { getStatusColor } from '../../utils/validators';
import './StatusBadge.css';

const StatusBadge = ({ status }) => (
  <span
    className="status-badge"
    style={{ '--badge-color': getStatusColor(status) }}
  >
    {status}
  </span>
);

export default StatusBadge;
