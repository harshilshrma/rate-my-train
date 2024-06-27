"use client";

// pages/check-reviews.js

import { useState } from 'react';
import { supabase } from '../../utils/supabase';

export default function CheckReviews() {
    const [trainId, setTrainId] = useState('');
    const [trainInfo, setTrainInfo] = useState(null);

    const [errorMessage, setErrorMessage] = useState('');

    const handleTrainSearch = async () => {
        setErrorMessage('');

        // Fetch train details from train_ratings table based on trainId
        const { data, error } = await supabase
            .from('train_ratings')
            .select('average_rating, total_reviews')
            .eq('train_id', trainId)
            .single();

        if (error) {
            console.error('Error fetching train details:', error);
            setTrainInfo(null);
            setErrorMessage('Error fetching train details. Please try again.');
            return;
        }

        if (!data) {
            setTrainInfo(null);
            setErrorMessage('Train not found. Please enter a valid train number.');
            return;
        }

        setTrainInfo(data);
    };

    return (
        <div className="container mt-4">
            <main>
                <h1 className="text-center mb-4">Check Reviews</h1>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Train Number"
                                value={trainId}
                                onChange={(e) => setTrainId(e.target.value)}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button" onClick={handleTrainSearch}>
                                    Search
                                </button>
                            </div>
                        </div>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        {trainInfo && (
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">{`${trainInfo.train_id} - ${trainInfo.train_name}`}</h5>
                                    <p className="card-text">From: {trainInfo.from_station} | To: {trainInfo.to_station}</p>
                                    <p className="card-text">
                                        Average Rating: <strong>{trainInfo.average_rating.toFixed(1)}</strong> | Total Reviews: <strong>{trainInfo.total_reviews}</strong>
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
