import React, { useEffect, useState } from "react";
import axios from "axios";
import Products from "../components/Products";

const Women = () => {
  const [res, setRes] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/women");
        setRes(response.data);
        setError(false);
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      if (error) {
        fetchData();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [error]);

  return (
    <div>
      {res.length > 0 ? (
        <Products product={res} title={"Women"} />
      ) : (
        <div>Incoming.....</div>
      )}
    </div>
  );
};

export default Women;
