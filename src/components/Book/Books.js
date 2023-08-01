import { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../../store/GlobalState'
import "./Book.css";
import axios from "axios";
import Book from "./Book";
const URL = "http://localhost:5000/books";
const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};
const Books = () => {
  const navigate = useNavigate();
  const {state, dispatch} = useContext(DataContext)
  const { auth } = state
  const [books, setBooks] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setBooks(data.books));
  }, []);
  useEffect(() => {
    if (!auth.token) navigate("/login");
  }, [auth.token, navigate]);
  return (
    <div>
      <ul>
        {books &&
          books.map((book, i) => (
            <li key={i}>
              <Book book={book} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Books;
