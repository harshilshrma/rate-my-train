export const metadata = {
    title: 'Submit a Review',
};

export default function SubmitReview() {
    return (
        <div className="container mt-4">
            <main>
                <h1>Submit a Review</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="trainId">Train ID:</label>
                        <input type="text" className="form-control" id="trainId" name="trainId" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rating">Rating:</label>
                        <input type="number" className="form-control" id="rating" name="rating" min="1" max="5" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reviewText">Review:</label>
                        <textarea className="form-control" id="reviewText" name="reviewText" required></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit Review</button>
                </form>
            </main>
        </div>
    );
}
