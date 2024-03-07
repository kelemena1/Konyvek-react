import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
function ModifyBookPage() {
    const [bookName, setBookName] = useState('');
    const [releaseYear, setReleaseYear] = useState('');
    const [rating, setRating] = useState('');
    const [imageURL, setImageURL] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
      
        const fetchBook = async () => {
            try {
                const response = await axios.get(`https://localhost:7017/Konyv/${id}`);
                const book = response.data;
                setBookName(book.nev);
                setReleaseYear(book.kiadasEve);
                setRating(book.ertekeles);
                setImageURL(book.kepneve);
            } catch (error) {
                console.error("Nem sikerült a könyv adatait betölteni", error);
            }
        };
        fetchBook();
    }, [id]); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`https://localhost:7017/Konyv/${id}`, {
                id: id,
                nev: bookName,
                kiadasEve: releaseYear,
                ertekeles: rating,
                kepneve: imageURL
            });
                navigate('/');
            
        } catch (error) {
            console.error("Hiba történt a könyv szerkesztése közben", error);
            alert('Hiba történt a könyv szerkesztése során. Próbáld újra!');
        }
    };


    return (
        <div className="container">
            <h2>Könyv Szerkesztése</h2>
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

export default ModifyBookPage;
