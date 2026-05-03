import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getMedicines } from '../../../api/medicines.api';
import useCartStore from '../../../store/useCartStore';
import useAuthStore from '../../../store/useAuthStore';
import Spinner from '../../../components/Spinner/Spinner';
import { MEDICINE_CATEGORIES, formatCurrency } from '../../../utils/validators';
import { FiSearch, FiShoppingCart, FiFilter } from 'react-icons/fi';
import { MdLocalPharmacy } from 'react-icons/md';
import toast from 'react-hot-toast';
import './Medicines.css';

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(searchParams.get('category') || '');
  const addToCart = useCartStore((s) => s.addToCart);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await getMedicines({ search, category });
        setMedicines(data.medicines || data);
      } catch {
        // use mock data when API not connected
        setMedicines(MOCK_MEDICINES);
      } finally { setLoading(false); }
    };
    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer);
  }, [search, category]);

  const handleAddToCart = (med) => {
    if (!user) { toast.error('Please login to add to cart'); return; }
    if (user.role !== 'customer') { toast.error('Only customers can add to cart'); return; }
    addToCart(med);
    toast.success(`${med.name} added to cart!`);
  };

  return (
    <div className="medicines-page">
      <div className="medicines-page__header">
        <h1>Browse Medicines</h1>
        <p>Find genuine medicines from verified pharmacies</p>
      </div>

      {/* Filters */}
      <div className="medicines-filters">
        <div className="search-wrap">
          <FiSearch />
          <input value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medicines..." id="medicine-search" />
        </div>
        <div className="filter-wrap">
          <FiFilter />
          <select value={category} onChange={(e) => setCategory(e.target.value)} id="category-filter">
            <option value="">All Categories</option>
            {MEDICINE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {loading ? <Spinner text="Loading medicines..." /> : (
        <>
          <p className="medicines-count">{medicines.length} medicines found</p>
          <div className="medicines-grid">
            {medicines.length === 0 ? (
              <div className="empty-state">
                <MdLocalPharmacy />
                <p>No medicines found</p>
              </div>
            ) : medicines.map((med) => (
              <div key={med._id || med.id} className="med-card">
                <div className="med-card__cat">{med.category}</div>
                <div className="med-card__icon"><MdLocalPharmacy /></div>
                <h3 className="med-card__name">{med.name}</h3>
                <p className="med-card__desc">{med.description}</p>
                <div className="med-card__footer">
                  <span className="med-card__price">{formatCurrency(med.price)}</span>
                  <span className={`med-card__stock ${med.stock > 0 ? 'in' : 'out'}`}>
                    {med.stock > 0 ? `${med.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
                <button className="btn btn--primary btn--full"
                  disabled={med.stock === 0}
                  onClick={() => handleAddToCart(med)}>
                  <FiShoppingCart /> Add to Cart
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const MOCK_MEDICINES = [
  { id: '1', name: 'Paracetamol 500mg', category: 'Analgesics', price: 50, stock: 100, description: 'Pain relief & fever reducer' },
  { id: '2', name: 'Amoxicillin 250mg', category: 'Antibiotics', price: 180, stock: 60, description: 'Broad-spectrum antibiotic' },
  { id: '3', name: 'Vitamin C 1000mg', category: 'Vitamins & Supplements', price: 250, stock: 200, description: 'Immune booster' },
  { id: '4', name: 'Metformin 500mg', category: 'Diabetes', price: 120, stock: 80, description: 'Blood sugar control' },
  { id: '5', name: 'Cetirizine 10mg', category: 'Antihistamines', price: 90, stock: 150, description: 'Allergy relief' },
  { id: '6', name: 'Atorvastatin 20mg', category: 'Cardiovascular', price: 350, stock: 45, description: 'Cholesterol management' },
];

export default Medicines;
