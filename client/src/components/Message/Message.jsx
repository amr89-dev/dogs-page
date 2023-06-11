import React, { useState } from "react";
import styles from "./Message.module.css";
import { useNavigate } from "react-router-dom";

const Message = ({ msg, bgColor, dogError }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (dogError) navigate(-1);
  };

  let bgCol = {
    color: bgColor,
  };

  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div style={bgCol} className={styles.message}>
            <p>{msg}</p>
            <button onClick={toggleModal}>Aceptar</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
