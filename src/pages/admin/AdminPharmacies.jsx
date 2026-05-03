import { useEffect } from 'react';
import useAdminStore from '../../store/useAdminStore';
import Spinner from '../../components/Spinner/Spinner';
import { MdCheckCircle, MdCancel, MdLocalPharmacy } from 'react-icons/md';
import toast from 'react-hot-toast';
import './AdminPharmacies.css';

const AdminPharmacies = () => {
  const { pharmacies, isLoading, fetchPharmacies, approvePharmacy } = useAdminStore();

  useEffect(() => { fetchPharmacies(); }, []);

  const handleApprove = async (ph) => {
    const result = await approvePharmacy(ph._id);
    if (result.success) toast.success(`${ph.name} approved!`);
    else toast.error('Approval failed');
  };

  if (isLoading && pharmacies.length === 0) return <Spinner text="Loading pharmacies..." />;

  return (
    <div className="admin-pharmacies">
      <div className="dash-page-header">
        <h1>Pharmacies</h1>
        <p>{pharmacies.length} registered pharmacies</p>
      </div>
      <div className="pharmacies-grid">
        {pharmacies.length === 0 ? (
          <div className="empty-state"><MdLocalPharmacy /><p>No pharmacies registered</p></div>
        ) : pharmacies.map((ph) => (
          <div key={ph._id} className={`ph-card ${ph.isApproved ? 'approved' : 'pending'}`}>
            <div className="ph-card__top">
              <div className="ph-card__icon"><MdLocalPharmacy /></div>
              <span className={`ph-card__badge ${ph.isApproved ? 'approved' : 'pending'}`}>
                {ph.isApproved ? '✓ Approved' : '⏳ Pending'}
              </span>
            </div>
            <h3>{ph.name || 'Unnamed Pharmacy'}</h3>
            <p>{ph.email}</p>
            <p className="ph-card__address">{ph.address || 'No address provided'}</p>
            {!ph.isApproved && (
              <button className="btn btn--primary btn--full" onClick={() => handleApprove(ph)}>
                <MdCheckCircle /> Approve Pharmacy
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default AdminPharmacies;
