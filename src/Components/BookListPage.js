import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function BookListPage() {
  const [books, setBooks] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);
  const [nums, setNums] = useState(0);

  useEffect(() => {
    setFetchPending(true);
    axios
      .get("https://localhost:7017/Konyv")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setFetchPending(false);
      });
  }, []);

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await axios.delete(
        `https://localhost:7017/Konyv/${bookId}`
      );

      setNums(nums + 1);
      setBooks(books.filter((book) => book.id !== bookId));
    } catch (error) {
      console.error("A könyv törlése közben hiba történt", error);
    }
  };

  return (
    <div className="p-5 m-auto text-center content bg-ivory">
      {isFetchPending ? (
        <div className="spinner-border"></div>
      ) : (
        <div>
          <h2>Könyvek</h2>
          {books.map((book) => (
            <div key={book.id} className="card col-sm-3 d-inline-block m-1 p-2">
              <h6 className="text-muted">{book.id}</h6>
              <h5 className="text-muted">{book.nev}</h5>
              <div>{book.kiadasEve}</div>
              <div className="small">értékelés: {book.ertekeles} ⭐</div>
              <a href={"/book/" + book.id}>
                <div className="card-body">
                  <img
                    className="img-fluid"
                    style={{ maxHeight: 200 }}
                    alt="hiányzik a képed innen!"
                    src={
                      book.kepneve
                        ? book.kepneve
                        : "https://via.placeholder.com/400x800"
                    }
                  />
                </div>
              </a>
              <br />
              <a href={"/modify-book/" + book.id}>
                <i className="bi bi-pencil-square mx-1">Módosítás</i>
              </a>
              <button
                className="text-danger"
                onClick={() => handleDeleteBook(book.id)}
              >
                Törlés
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
