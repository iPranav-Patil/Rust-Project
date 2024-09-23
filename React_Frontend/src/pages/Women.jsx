import React, { useEffect, useState } from "react";
import axios from "axios";
import Products from "../components/Products";
import { API_URL } from "../context/Config";

const Women = () => {
  const [res, setRes] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/women`);
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
