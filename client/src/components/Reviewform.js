// frontend/src/components/Features/ReviewForm.js

import React, { useState } from 'react';

const ReviewForm = ({ onSubmit }) => {
    const [review, setReview] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(review);
        setReview('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea value={review} onChange={(e) => setReview(e.target.value)} />
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default ReviewForm;
