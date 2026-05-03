// ─── Auth / Form Validators ─────────────────────────────────────────────────

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validatePhone = (phone) => {
  const re = /^[0-9]{10,13}$/;
  return re.test(phone);
};

export const validateRegisterForm = ({ name, email, password, phone }) => {
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
  if (!email || !validateEmail(email)) errors.email = 'Enter a valid email address';
  if (!password || !validatePassword(password)) errors.password = 'Password must be at least 6 characters';
  if (phone && !validatePhone(phone)) errors.phone = 'Enter a valid phone number';
  return errors;
};

export const validateLoginForm = ({ email, password }) => {
  const errors = {};
  if (!email || !validateEmail(email)) errors.email = 'Enter a valid email address';
  if (!password) errors.password = 'Password is required';
  return errors;
};

export const validateMedicineForm = ({ name, price, stock, category }) => {
  const errors = {};
  if (!name || name.trim().length < 2) errors.name = 'Medicine name is required';
  if (!price || isNaN(price) || Number(price) <= 0) errors.price = 'Enter a valid price';
  if (stock === undefined || stock === '' || isNaN(stock) || Number(stock) < 0)
    errors.stock = 'Enter a valid stock quantity';
  if (!category) errors.category = 'Category is required';
  return errors;
};

// ─── Format Helpers ─────────────────────────────────────────────────────────

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', minimumFractionDigits: 0 }).format(amount);

export const formatDate = (dateStr) =>
  new Intl.DateTimeFormat('en-PK', { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(dateStr));

export const truncate = (str, maxLen = 50) =>
  str?.length > maxLen ? str.slice(0, maxLen) + '…' : str;

// ─── Status Helpers ──────────────────────────────────────────────────────────

export const STATUS_COLORS = {
  pending: '#f59e0b',
  confirmed: '#3b82f6',
  processing: '#8b5cf6',
  shipped: '#06b6d4',
  delivered: '#10b981',
  cancelled: '#ef4444',
};

export const getStatusColor = (status) => STATUS_COLORS[status] || '#6b7280';

export const MEDICINE_CATEGORIES = [
  'Antibiotics',
  'Analgesics',
  'Antipyretics',
  'Antihistamines',
  'Vitamins & Supplements',
  'Cardiovascular',
  'Diabetes',
  'Respiratory',
  'Dermatology',
  'Gastrointestinal',
  'Other',
];
