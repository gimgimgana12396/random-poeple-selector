import React, { useState } from 'react';
import '../../styles/Header.scss';

const Header = () => {
  const [input, setInput] = useState('랜덤 뽑기');

  const InputHandler = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  return (
    <div className="header">
      <input value={input} onChange={InputHandler} />
    </div>
  );
};

export default Header;
