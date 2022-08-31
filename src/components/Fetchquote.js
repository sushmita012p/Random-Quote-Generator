import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

function App() {
  const [quotesPerPage] = useState(5);
  const [offset, setOffset] = useState(1);
  const [quotes, setQuotes] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  const getQuoteData = (data) => {
    return data.map((quote) => (
      <div
        className="card mx-5"
        style={{ margin: "2px", border: "1px solid #5f9267" }}
      >
        <div className="card-body">
          <h5 className="card-title">{quote.text}</h5>
          <p className="card-text"> - {quote.author}</p>
        </div>
      </div>
    ));
  };

  const getQuotes = async () => {
    const result = await axios.get(`https://type.fit/api/quotes`);
    const data = result.data;
    const res = data.slice(offset - 1, offset - 1 + quotesPerPage);

    // For displaying Data and using hooks to set value
    const quoteData = getQuoteData(res);
    setQuotes(quoteData);
    setPageCount(Math.ceil(data.length / quotesPerPage));
  };

  const handlePageClick = (event) => {
    const selectedPage = event.selected;
    setOffset(selectedPage + 1);
  };

  useEffect(() => {
    getQuotes();
  }, [offset]);

  return (
    <div className="container">
      <h3 className="text-center my-3 fw-bold">Some Inspirational Quotes</h3>
      {/* Display all the quotes */}
      {quotes}

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;
