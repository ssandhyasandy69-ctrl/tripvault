import { useState, useEffect } from 'react';

const emptyTrip = {
  title: '',
  destination: '',
  startDate: '',
  endDate: '',
  description: '',
  rating: '',
};

// toDateInputValue converts an ISO date string to yyyy-mm-dd for <input type="date">
const toDateInputValue = (isoString) => (isoString ? isoString.slice(0, 10) : '');

export default function TripForm({ initialTrip, onSubmit, onCancel, submitting }) {
  const [form, setForm] = useState(emptyTrip);

  useEffect(() => {
    if (initialTrip) {
      setForm({
        title: initialTrip.title || '',
        destination: initialTrip.destination || '',
        startDate: toDateInputValue(initialTrip.startDate),
        endDate: toDateInputValue(initialTrip.endDate),
        description: initialTrip.description || '',
        rating: initialTrip.rating || '',
      });
    } else {
      setForm(emptyTrip);
    }
  }, [initialTrip]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      rating: form.rating ? Number(form.rating) : undefined,
    });
  };

  return (
    <div className="modal-backdrop">
      <form className="modal-card" onSubmit={handleSubmit}>
        <h2>{initialTrip ? 'Edit Trip' : 'Create Trip'}</h2>

        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>

        <label>
          Destination
          <input
            name="destination"
            value={form.destination}
            onChange={handleChange}
            required
          />
        </label>

        <div className="form-row">
          <label>
            Start Date
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
            />
          </label>
          <label>
            End Date
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />
          </label>
        </div>

        <label>
          Rating (1-5)
          <input
            type="number"
            name="rating"
            min={1}
            max={5}
            value={form.rating}
            onChange={handleChange}
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleChange}
          />
        </label>

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Trip'}
          </button>
        </div>
      </form>
    </div>
  );
}
