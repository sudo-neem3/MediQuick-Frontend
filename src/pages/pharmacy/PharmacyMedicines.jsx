import { useEffect, useState } from 'react';
import usePharmacyStore from '../../store/usePharmacyStore';
import Spinner from '../../components/Spinner/Spinner';
import { validateMedicineForm, formatCurrency, MEDICINE_CATEGORIES } from '../../utils/validators';
import { MdMedicalServices, MdEdit, MdDelete, MdAdd, MdClose } from 'react-icons/md';
import toast from 'react-hot-toast';
import './PharmacyMedicines.css';

const EMPTY_FORM = { name: '', price: '', stock: '', category: '', description: '' };

const PharmacyMedicines = () => {
  const { medicines, isLoading, fetchMedicines, addMedicine, updateMedicine, deleteMedicine } = usePharmacyStore();
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null); // medicine being edited
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => { fetchMedicines(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY_FORM); setErrors({}); setShowModal(true); };
  const openEdit = (med) => {
    setEditing(med);
    setForm({ name: med.name, price: med.price, stock: med.stock, category: med.category, description: med.description || '' });
    setErrors({});
    setShowModal(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateMedicineForm(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock) };
    let result;
    if (editing) {
      result = await updateMedicine(editing._id, payload);
      if (result.success) toast.success('Medicine updated!');
    } else {
      result = await addMedicine(payload);
      if (result.success) toast.success('Medicine added!');
    }
    if (result.success) setShowModal(false);
    else toast.error('Something went wrong');
  };

  const handleDelete = async (med) => {
    if (!window.confirm(`Delete "${med.name}"?`)) return;
    const result = await deleteMedicine(med._id);
    if (result.success) toast.success('Medicine deleted');
    else toast.error('Delete failed');
  };

  if (isLoading && medicines.length === 0) return <Spinner text="Loading medicines..." />;

  return (
    <div className="ph-medicines">
      <div className="ph-medicines__header">
        <div className="dash-page-header" style={{ margin: 0 }}>
          <h1>Medicines</h1>
          <p>{medicines.length} total listings</p>
        </div>
        <button className="btn btn--primary" onClick={openAdd}><MdAdd /> Add Medicine</button>
      </div>

      <div className="ph-medicines-grid">
        {medicines.length === 0 ? (
          <div className="empty-state"><MdMedicalServices /><p>No medicines listed yet</p></div>
        ) : medicines.map((med) => (
          <div key={med._id} className="ph-med-card">
            <div className="ph-med-card__top">
              <span className="med-card__cat">{med.category}</span>
              <div className="ph-med-card__actions">
                <button onClick={() => openEdit(med)} title="Edit"><MdEdit /></button>
                <button onClick={() => handleDelete(med)} title="Delete" className="danger"><MdDelete /></button>
              </div>
            </div>
            <MdMedicalServices className="ph-med-card__icon" />
            <h3>{med.name}</h3>
            <p>{med.description}</p>
            <div className="ph-med-card__footer">
              <strong>{formatCurrency(med.price)}</strong>
              <span className={med.stock > 0 ? 'in' : 'out'}>{med.stock} in stock</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h2>{editing ? 'Edit Medicine' : 'Add Medicine'}</h2>
              <button onClick={() => setShowModal(false)}><MdClose /></button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Medicine Name</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Paracetamol 500mg" />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select name="category" value={form.category} onChange={handleChange}>
                    <option value="">Select category</option>
                    {MEDICINE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.category && <span className="form-error">{errors.category}</span>}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Price (PKR)</label>
                  <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="0" min="0" />
                  {errors.price && <span className="form-error">{errors.price}</span>}
                </div>
                <div className="form-group">
                  <label>Stock</label>
                  <input name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="0" min="0" />
                  {errors.stock && <span className="form-error">{errors.stock}</span>}
                </div>
              </div>
              <div className="form-group">
                <label>Description (optional)</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Brief description..." />
              </div>
              <div className="modal__actions">
                <button type="button" className="btn btn--ghost" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn--primary" disabled={isLoading}>
                  {isLoading ? 'Saving…' : editing ? 'Update' : 'Add Medicine'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default PharmacyMedicines;
