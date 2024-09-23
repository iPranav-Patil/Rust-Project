import React, { useEffect, useState } from "react";
import axios from "axios";
import Products from "../components/Products";
import { API_URL } from "../context/Config";

const Appliances = () => {
  const [res, setRes] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/appliance`);
        setRes(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div>
      {res.length > 0 ? (
        <Products product={res} title={"Appliances"} />
      ) : (
        <div>Incoming.....</div>
      )}
    </div>
  );
};

export default Appliances;
