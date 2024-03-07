import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SingleBook() {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`https://localhost:7017/Konyv/${id}`);
                setBook(response.data);
            } catch (error) {
                console.error("Nem sikerült a könyv adatait betölteni", error);
            }
        };

        fetchBook();
    }, [id]);

    if (!book) return <div>Betöltés...</div>;

    return (
        <div className="book-detail-container">
            <h2 className='d-flex justify-content-center'>{book.nev}</h2>
            <p className='d-flex justify-content-center'><strong>Kiadás éve:</strong> {book.kiadasEve}</p>
            <p className='d-flex justify-content-center'><strong>Értékelés:</strong> {book.ertekeles}⭐</p>
            <p className='d-flex justify-content-center'><strong>Kép URL:</strong> {book.kepneve}</p>
            <div className=' d-flex justify-content-center'>
            {book.kepneve && <img  src={book.kepneve} alt={book.nev} style={{ maxWidth: '100%', maxHeight: '500px' }} />}

            </div>
           
        </div>
    );
}

export default SingleBook;
