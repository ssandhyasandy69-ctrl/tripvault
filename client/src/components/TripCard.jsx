const formatDate = (isoString) => {
  if (!isoString) return null;
  return new Date(isoString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export default function TripCard({ trip, onEdit, onDelete }) {
  return (
    <div className="trip-card">
      <div className="trip-card-header">
        <h3>{trip.title}</h3>
        {trip.rating ? <span className="trip-rating">⭐ {trip.rating}/5</span> : null}
      </div>
      <p className="trip-destination">📍 {trip.destination}</p>
      {(trip.startDate || trip.endDate) && (
        <p className="trip-dates">
          🗓️ {formatDate(trip.startDate) || '—'} → {formatDate(trip.endDate) || '—'}
        </p>
      )}
      {trip.description && <p className="trip-description">{trip.description}</p>}
      <div className="trip-card-actions">
        <button className="btn-secondary" onClick={() => onEdit(trip)}>
          Edit
        </button>
        <button className="btn-danger" onClick={() => onDelete(trip)}>
          Delete
        </button>
      </div>
    </div>
  );
}
