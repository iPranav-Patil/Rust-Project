import React, { useEffect, useState } from "react";

const Toast = ({ message, type }) => {
  const [success, setSuccess] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setSuccess(type);
  });
  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 5000);
  });
  return (
    <div
      className={` ${
        success
          ? "text-green-950 bg-green-400/70"
          : "text-red-950 bg-red-400/60"
      }${
        visible ? " flex" : "hidden"
      } fixed backdrop-blur-lg justify-center items-center rounded-lg z-10 top-6 left-[40%] font-semibold text-3xl p-4 py-8 `}
    >
      {message}
    </div>
  );
};

export default Toast;
