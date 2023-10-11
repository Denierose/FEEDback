import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    imgUrl: '',
    title: '',
    location: '',
    type: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedReviewId, setSelectedReviewId] = useState(null); // State to store the selected review ID

  useEffect(() => {
    axios
      .get('http://localhost:3001/review/getAllReview')
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post('http://localhost:3001/review/createReview', formData)
      .then((response) => {
        setReviews([...reviews, response.data]);

        setFormData({
          imgUrl: '',
          title: '',
          location: '',
          type: '',
        });
      })
      .catch((error) => {
        console.error('Error creating review:', error);
      });
  };

  const handleDelete = async (reviewId) => {
    alert("are you want to delete this item?")
    await axios
      .delete(`http://localhost:3001/review/delete/${reviewId}`)
      .then(() => {
        const updatedReviews = reviews.filter((review) => review._id !== reviewId);
        setReviews(updatedReviews);
      })
      .catch((error) => {
        console.error('Error deleting review:', error);
      });
  };

  const openEditModal = (reviewId) => {
    setSelectedReviewId(reviewId);
    setIsModalOpen(true);
    const selectedReview = reviews.find((review) => review._id === reviewId);

    setFormData({
      imgUrl: selectedReview.imgUrl,
      title: selectedReview.title,
      location: selectedReview.location,
      type: selectedReview.type,
    });
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedReviewId(null);
  };

  const handleUpdate = async () => {
    const updatedData = {
      imgUrl: formData.imgUrl,
      title: formData.title,
      location: formData.location,
      type: formData.type,
    };
  
    await axios
      .put(`http://localhost:3001/review/update/${selectedReviewId}`, updatedData)
      .then((response) => {
        const updatedReviews = reviews.map((review) =>
          review._id === selectedReviewId ? response.data : review
        );
        setReviews(updatedReviews);
      })
      .catch((error) => {
        console.error('Error updating review:', error);
      });
  
    closeEditModal();
  };
  return (
    <div className="App">
      <header>
        <h1>Feedback Admin Side</h1>
      </header>
      <main>
        <section className="add-review">
          <h2>Add a Place</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="imgUrl"
              placeholder="Enter an img URL"
              value={formData.imgUrl}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="title"
              placeholder="Enter a title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="location"
              placeholder="Enter a location"
              value={formData.location}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="type"
              placeholder="Enter a type"
              value={formData.type}
              onChange={handleInputChange}
            />
            <button type="submit">Add</button>
          </form>
        </section>
        <section className="review-list">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Location</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td>{review._id}</td>
                  <td>{review.title}</td>
                  <td>{review.location}</td>
                  <td>{review.type}</td>
                  <td>{review.status}</td>
                  <td className='button-container'>
                    <button onClick={() => handleDelete(review._id)}>Delete</button>
                    <button onClick={() => openEditModal(review._id)}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
      {isModalOpen && (
        <div className='modal-container'>
          <div className="modal">
            <div className="modal-content">
              <h2>Edit Item</h2>
              <form onSubmit={handleUpdate}>
                <input
                  type="text"
                  name="imgUrl"
                  placeholder="Enter an img URL"
                  value={formData.imgUrl}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="title"
                  placeholder="Enter a title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Enter a location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="type"
                  placeholder="Enter a type"
                  value={formData.type}
                  onChange={handleInputChange}
                />
                <button type="button" onClick={closeEditModal}>Cancel</button>
                <button type="submit">Save</button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
