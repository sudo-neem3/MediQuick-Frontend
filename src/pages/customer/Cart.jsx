import useCartStore from '../../store/useCartStore';
import { formatCurrency } from '../../utils/validators';
import { MdLocalPharmacy, MdDelete } from 'react-icons/md';
import { FiShoppingCart, FiPlus, FiMinus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import './Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCartStore();

  if (items.length === 0) return (
    <div className="cart-empty">
      <FiShoppingCart />
      <h2>Your cart is empty</h2>
      <p>Browse medicines and add them to your cart</p>
      <Link to="/medicines" className="btn btn--primary">Browse Medicines</Link>
    </div>
  );

  const handleRemove = (id, name) => {
    removeFromCart(id);
    toast.success(`${name} removed from cart`);
  };

  const handleCheckout = () => {
    toast.success('Order placed successfully! (Demo)');
    clearCart();
  };

  return (
    <div className="cart-page">
      <div className="cart-page__header">
        <h1>My Cart</h1>
        <button className="btn-text-danger" onClick={() => { clearCart(); toast('Cart cleared'); }}>
          Clear all
        </button>
      </div>
      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.medicine._id || item.medicine.id} className="cart-item">
              <div className="cart-item__icon"><MdLocalPharmacy /></div>
              <div className="cart-item__info">
                <h3>{item.medicine.name}</h3>
                <p>{item.medicine.category}</p>
                <span>{formatCurrency(item.medicine.price)} each</span>
              </div>
              <div className="cart-item__qty">
                <button onClick={() => updateQuantity(item.medicine._id || item.medicine.id, item.quantity - 1)}>
                  <FiMinus />
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.medicine._id || item.medicine.id, item.quantity + 1)}>
                  <FiPlus />
                </button>
              </div>
              <div className="cart-item__total">{formatCurrency(item.medicine.price * item.quantity)}</div>
              <button className="cart-item__remove"
                onClick={() => handleRemove(item.medicine._id || item.medicine.id, item.medicine.name)}>
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="cart-summary__row"><span>Subtotal</span><span>{formatCurrency(totalPrice())}</span></div>
          <div className="cart-summary__row"><span>Delivery</span><span className="free">Free</span></div>
          <div className="cart-summary__row cart-summary__total">
            <span>Total</span><strong>{formatCurrency(totalPrice())}</strong>
          </div>
          <button className="btn btn--primary btn--full" onClick={handleCheckout}>
            Place Order
          </button>
          <Link to="/medicines" className="btn btn--ghost btn--full" style={{ marginTop: '0.5rem', textAlign: 'center' }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Cart;
