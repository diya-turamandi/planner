import React, { useState } from 'react';



export default function Form() {
  const [text, setText] = useState('default text');

  const handleUpClick = () => {
    const newText = text.toUpperCase();
    setText(newText);
    
  };
  const handlelowClick = () => {
    const newText = text.toLowerCase();
    setText(newText);
    
  };
  const handleCopy = () => {
  navigator.clipboard.writeText(text);
  alert('Text copied to clipboard!');
};


  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <label htmlFor="username" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
        User text:
      </label>
      <textarea
        type="text"
        id="username"
        value={text}
        onChange={handleChange}
        placeholder="Enter your text here"
        style={{
          width: '10%',
          height: '230px',
          padding: '10px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid green',
        }}
      />
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleUpClick} style={{color:'green',backgroundColor:'white',margin:'3px',padding:'10px' ,border: '1px solid green'}}>Make UpperCase</button>
      
      <button onClick={handlelowClick } style={{color:'green',backgroundColor:'white',margin:'3px',padding:'10px' ,border: '1px solid green'}}>
        Make LowerCase
      </button>
      <button
        onClick={() => setText('this text is just to fill the box and do testing and does not make any sence here ,try converting this text into uppercase or lower case ')} style={{color:'green',backgroundColor:'white',margin:'3px',padding:'10px' ,border: '1px solid green'}}> 
        Fill random text 
        </button></div>
        <div style={{ marginTop: '10px' }}>
        <button onClick={() => setText('')} style={{color:'green',backgroundColor:'white',margin:'3px',padding:'10px' ,border: '1px solid green'}}>
          Clear Box
        </button>
        <button onClick={handleCopy} style={{color:'green',backgroundColor:'white',margin:'3px',padding:'10px' ,border: '1px solid green'}}>
          Copy Text
          </button>
        </div>
        <div className='contain'>
        <p>{text.split(" ").length} words and  { text.length} characters</p>
        <p> {0.008 * text.split(" ").length} min to read the content</p>
    </div>
    </div>
  );
}
