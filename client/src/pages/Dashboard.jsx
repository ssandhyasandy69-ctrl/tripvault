import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import TripCard from '../components/TripCard';
import TripForm from '../components/TripForm';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchTrips = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/trips');
      setTrips(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load trips');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const openCreateForm = () => {
    setEditingTrip(null);
    setShowForm(true);
  };

  const openEditForm = (trip) => {
    setEditingTrip(trip);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTrip(null);
  };

  const handleFormSubmit = async (formData) => {
    setSubmitting(true);
    setError('');
    try {
      if (editingTrip) {
        await api.put(`/trips/${editingTrip._id}`, formData);
      } else {
        await api.post('/trips', formData);
      }
      closeForm();
      await fetchTrips();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save trip');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (trip) => {
    const confirmed = window.confirm(`Delete "${trip.title}"? This can't be undone.`);
    if (!confirmed) return;

    try {
      await api.delete(`/trips/${trip._id}`);
      await fetchTrips();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete trip');
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Welcome, {user?.name} 👋</h1>
          <p>Here are your travel memories</p>
        </div>
        <div className="dashboard-header-actions">
          <button onClick={openCreateForm}>+ Create Trip</button>
          <button className="btn-secondary" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      {error && <p className="error-text">{error}</p>}

      {loading ? (
        <p>Loading trips...</p>
      ) : trips.length === 0 ? (
        <div className="empty-state">
          <p>No trips yet. Start logging your travel memories!</p>
          <button onClick={openCreateForm}>Create your first trip</button>
        </div>
      ) : (
        <div className="trip-grid">
          {trips.map((trip) => (
            <TripCard
              key={trip._id}
              trip={trip}
              onEdit={openEditForm}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <TripForm
          initialTrip={editingTrip}
          onSubmit={handleFormSubmit}
          onCancel={closeForm}
          submitting={submitting}
        />
      )}
    </div>
  );
}
