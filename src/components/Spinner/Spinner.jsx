import './Spinner.css';

const Spinner = ({ size = 'md', text = '' }) => (
  <div className={`spinner-wrap spinner-wrap--${size}`}>
    <div className={`spinner spinner--${size}`} />
    {text && <p className="spinner-text">{text}</p>}
  </div>
);

export default Spinner;
