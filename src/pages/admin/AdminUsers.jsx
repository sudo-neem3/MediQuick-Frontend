import { useEffect } from 'react';
import useAdminStore from '../../store/useAdminStore';
import Spinner from '../../components/Spinner/Spinner';
import { MdDelete, MdPerson } from 'react-icons/md';
import { formatDate } from '../../utils/validators';
import toast from 'react-hot-toast';
import './AdminUsers.css';

const AdminUsers = () => {
  const { users, isLoading, fetchUsers, deleteUser } = useAdminStore();

  useEffect(() => { fetchUsers(); }, []);

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete user "${user.name}"?`)) return;
    const result = await deleteUser(user._id);
    if (result.success) toast.success('User deleted');
    else toast.error('Failed to delete user');
  };

  if (isLoading && users.length === 0) return <Spinner text="Loading users..." />;

  return (
    <div className="admin-users">
      <div className="dash-page-header">
        <h1>Users</h1>
        <p>{users.length} registered users</p>
      </div>
      <div className="simple-table-wrap">
        <table className="simple-table">
          <thead>
            <tr><th>Avatar</th><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Action</th></tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'rgba(255,255,255,0.3)' }}>No users found</td></tr>
            ) : users.map((u) => (
              <tr key={u._id}>
                <td>
                  <div className="user-avatar">{u.name?.[0]?.toUpperCase() || <MdPerson />}</div>
                </td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td><span className="status-pill">{u.role}</span></td>
                <td>{u.createdAt ? formatDate(u.createdAt) : '—'}</td>
                <td>
                  <button className="icon-btn danger" onClick={() => handleDelete(u)} title="Delete user">
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AdminUsers;
