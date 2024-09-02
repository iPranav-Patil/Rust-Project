import { React, useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState("abc");
  const [info, setInfo] = useState({}); 

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/home");
        setData(res.data); // Set data from response
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const infoRes = await axios.get("http://127.0.0.1:8000/user/Elon/Pawar");
        setInfo(infoRes.data); // Set info from response
        console.log(infoRes);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="flex flex-col justify-center h-full w-full items-center ">
      <h1 className="text-5xl text-cyan-700 font-bold">{data}</h1>
      <div className="flex flex-col gap-10 text-xl text-yellow-500">
        <h1 className="text-bold text-yellow-800">BioData</h1>
        <div>First Name: {info.fname}</div>
        <div>Last Name: {info.lname}</div>
        {/* <div>Age: {info.age}</div>  */}
      </div>
    </div>
  );
};

export default Home;
