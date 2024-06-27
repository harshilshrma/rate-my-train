"use client";

import { useState } from 'react';
import { supabase } from '../../utils/supabase';

const metadata = {
    title: 'Submit a Review',
};

export default function SubmitReview() {
    const [trainId, setTrainId] = useState('');
    const [rating, setRating] = useState(1);
    const [reviewText, setReviewText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isValid, setIsValid] = useState(true);

    const handleRatingChange = (e) => {
        const value = e.target.value;
        if (value >= 1 && value <= 5) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
        setRating(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        // Get the user
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) {
            setErrorMessage('You need to be logged in to submit a review.');
            return;
        }

        const userId = user.id;

        // Check if the user has already submitted a review for this train
        const { data: existingReview, error: checkError } = await supabase
            .from('reviews')
            .select('id')
            .eq('user_id', userId)
            .eq('train_id', trainId)
            .single();

        if (checkError && checkError.code !== 'PGRST116') { // PGRST116: Row not found
            setErrorMessage('Error checking existing review.');
            return;
        }

        if (existingReview) {
            setErrorMessage('You have already submitted a review for this train.');
            setTrainId('');
            setRating(0);
            setReviewText('');
            return;
        }

        // Insert the new review
        const { error: insertError } = await supabase
            .from('reviews')
            .insert([
                {
                    user_id: userId,
                    train_id: trainId,
                    rating: parseInt(rating),
                    review_text: reviewText,
                }
            ]);

        if (insertError) {
            setErrorMessage('Error submitting review.');
        } else {
            // Update train ratings
            const { data: trainRatingData, error: trainRatingError } = await supabase
                .from('train_ratings')
                .select('average_rating, total_reviews')
                .eq('train_id', trainId)
                .single();

            let newAverageRating;
            let newTotalReviews;

            if (trainRatingError && trainRatingError.code !== 'PGRST116') { // PGRST116: Row not found
                setErrorMessage('Error fetching train rating data.');
                console.error('Error fetching train rating data:', trainRatingError);
                return;
            }

            if (trainRatingData) {
                // Train rating record exists
                const { average_rating, total_reviews } = trainRatingData;
                newTotalReviews = total_reviews + 1;
                newAverageRating = ((average_rating * total_reviews) + parseInt(rating)) / newTotalReviews;

                const { error: updateError } = await supabase
                    .from('train_ratings')
                    .update({ average_rating: newAverageRating, total_reviews: newTotalReviews })
                    .eq('train_id', trainId);

                if (updateError) {
                    setErrorMessage('Error updating train rating.');
                    console.error('Error updating train rating:', updateError);
                    return;
                }
            } else {
                // Train rating record does not exist
                newAverageRating = parseInt(rating);
                newTotalReviews = 1;

                const { error: insertRatingError } = await supabase
                    .from('train_ratings')
                    .insert([{ train_id: trainId, average_rating: newAverageRating, total_reviews: newTotalReviews }]);

                if (insertRatingError) {
                    setErrorMessage('Error inserting train rating.');
                    console.error('Error inserting train rating:', insertRatingError);
                    return;
                }
            }

            setSuccessMessage('Review submitted successfully!');
            setTrainId('');
            setRating(0);
            setReviewText('');
        }
    };

    return (
        <div className="container mt-4">
            <main>
                <h1>Submit a Review</h1>
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                <form onSubmit={handleSubmit}>
                    <div class="form-row">
                        <div class="form-group col-md-3 mb-3">
                            <label htmlFor="trainId">Train Number:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="trainId"
                                name="trainId"
                                value={trainId}
                                onChange={(e) => setTrainId(e.target.value)}
                                required
                            />
                        </div>
                        <div class="form-group col-md-3 mb-3">
                            <label htmlFor="rating">Rating:</label>
                            <input
                                type="number"
                                className={`form-control ${isValid ? 'is-valid' : 'is-invalid'}`}
                                id="rating"
                                name="rating"
                                min="1"
                                max="5"
                                value={rating}
                                onChange={handleRatingChange}
                                required
                            />
                            {!isValid && (
                                <div className="invalid-feedback">
                                    Please enter a rating between 1 and 5.
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reviewText">Review:</label>
                        <textarea
                            className="form-control"
                            id="reviewText"
                            name="reviewText"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit Review</button>

                </form>
            </main>
        </div>
    );
}
