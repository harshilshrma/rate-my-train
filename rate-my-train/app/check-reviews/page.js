"use client";

import { useState, useEffect } from 'react';
import { supabase } from '../../utils/supabase';

export default function CheckReviews() {
    const [trainId, setTrainId] = useState('');
    const [trainInfo, setTrainInfo] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                setAuthenticated(false); // User is not authenticated
                // Redirect to home page after a delay
                setTimeout(() => {
                    window.location.href = '/';
                }, 500);
            } else {
                setAuthenticated(true); // User is authenticated
            }
        };

        checkAuth();
    }, []);

    const fetchTrainDetails = async () => {
        setErrorMessage('');

        // Fetch train details from valid_trains table based on trainId
        const { data: trainDetails, error: detailsError } = await supabase
            .from('valid_trains')
            .select('train_id, train_name, from_station, to_station')
            .eq('train_id', trainId)
            .single();

        if (detailsError) {
            console.error('Error fetching train details:', detailsError);
            setTrainInfo(null);
            setErrorMessage('Train not found. Please enter a valid train number.');
            return;
        }

        if (!trainDetails) {
            setTrainInfo(null);
            setErrorMessage('Train not found. Please enter a valid train number.');
            return;
        }

        // Fetch station names from station_codes table
        const { data: fromStationData, error: fromStationError } = await supabase
            .from('station_codes')
            .select('station_name')
            .eq('station_code', trainDetails.from_station)
            .single();

        if (fromStationError) {
            console.error('Error fetching from station name:', fromStationError);
            setTrainInfo(null);
            setErrorMessage('Error fetching from station details. Please try again.');
            return;
        }

        const fromStationName = fromStationData?.station_name || 'Unknown';

        const { data: toStationData, error: toStationError } = await supabase
            .from('station_codes')
            .select('station_name')
            .eq('station_code', trainDetails.to_station)
            .single();

        if (toStationError) {
            console.error('Error fetching to station name:', toStationError);
            setTrainInfo(null);
            setErrorMessage('Error fetching to station details. Please try again.');
            return;
        }

        const toStationName = toStationData?.station_name || 'Unknown';

        // Fetch train ratings from train_ratings table based on trainId
        const { data: ratingsData, error: ratingsError } = await supabase
            .from('train_ratings')
            .select('average_rating, total_reviews')
            .eq('train_id', trainId)
            .single();

        if (ratingsError) {
            console.error('Error fetching train ratings:', ratingsError);
            setTrainInfo(null);
            setErrorMessage('Error fetching train ratings. Please try again.');
            return;
        }

        const trainInfo = {
            ...trainDetails,
            from_station_name: fromStationName,
            to_station_name: toStationName,
            ...ratingsData,
        };

        setTrainInfo(trainInfo);
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
                                <button className="btn btn-primary" type="button" onClick={fetchTrainDetails}>
                                    Search
                                </button>
                            </div>
                        </div>
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        {trainInfo && (
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">{`${trainInfo.train_id} - ${trainInfo.train_name}`}</h5>
                                    <p className="card-text"><strong>From:</strong> {trainInfo.from_station_name} | <strong>To:</strong>     {trainInfo.to_station_name}</p>
                                    <p className="card-text">
                                        Average Rating: <strong>{trainInfo.average_rating.toFixed(1)} / 5</strong> | Total Reviews: <strong>{trainInfo.total_reviews}</strong>
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
