import React, { useEffect, useState } from "react";
import axios from "axios";
import Products from "../components/Products";

const Appliances = () => {
  const [res, setRes] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/appliance");
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
