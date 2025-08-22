import React from 'react'

export default function Lights() {
    const [isOn, setIsOn] = React.useState(false);
    const handleOn = () => {
        setIsOn(true);
};
    const handleOff = () => {
        setIsOn(false);
    };
    return (
    <div>
        <h1>Lights Component</h1>
        <div className='lightbox' style={{ padding: '20px', height: '300px', width: '400px', border: '1px solid green',backgroundColor: isOn ? 'yellow' : 'black', borderRadius: '9px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            
        </div>
        <div>
            <button onClick={handleOn} style={{color:'green',backgroundColor:'white',margin:'3px',padding:'10px' ,border: '1px solid green'}}>Turn On</button>
            <button onClick={handleOff} style={{color:'green',backgroundColor:'white',margin:'3px',padding:'10px' ,border: '1px solid green'}}>Turn Off</button>
        </div>
    </div>
  )
}
