import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

 function NewBookPage() {
    const [bookName, setBookName] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [rating, setRating] = useState('');
    const [imageURL, setImageURL] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const response = await axios.post('https://localhost:7017/Konyv', {
                nev: bookName,
                kiadasEve: releaseYear,
                ertekeles: rating,
                kepneve: imageURL
            });

            if (response.status === 200 || response.status === 201) {
                navigate('/');
                
            }
        } catch (error) {
            console.error("Hiba történt a könyv hozzáadása közben", error);
            alert('Hiba történt a könyv hozzáadása során. Próbáld újra!');
        }
    };

    return (
        <div className="container">
            <h2>Új Könyv Hozzáadása</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="bookName" className="form-label">Könyv Neve</label>
                    <input
                        type="text"
                        className="form-control"
                        id="bookName"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="releaseYear" className="form-label">Kiadás Éve</label>
                    <input
                        type="text"
                        className="form-control"
                        id="releaseYear"
                        value={releaseYear}
                        onChange={(e) => setReleaseYear(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="rating" className="form-label">Értékelés</label>
                    <input
                        type="text"
                        className="form-control"
                        id="rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="imageURL" className="form-label">Kép URL</label>
                    <input
                        type="text"
                        className="form-control"
                        id="imageURL"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Könyv Hozzáadása</button>
            </form>
        </div>
    );
}
export default NewBookPage;