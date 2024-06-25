export const metadata = {
    title: 'Submit a Review',
};

export default function SubmitReview() {
    return (
        <div>
            <main>
                <h1>Submit a Review</h1>
                <form>
                    <div>
                        <label htmlFor="trainId">Train ID:</label>
                        <input type="text" id="trainId" name="trainId" required />
                    </div>
                    <div>
                        <label htmlFor="rating">Rating:</label>
                        <input type="number" id="rating" name="rating" min="1" max="5" required />
                    </div>
                    <div>
                        <label htmlFor="reviewText">Review:</label>
                        <textarea id="reviewText" name="reviewText" required></textarea>
                    </div>
                    <button type="submit">Submit Review</button>
                </form>
            </main>
        </div>
    );
}
