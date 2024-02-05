/*
Itt fogjuk generálni a színeket 
Lesz egy ColorGenerator nevű function-unk, ami visszaad egy RGB kódot 
*/

function ColorGenerator() {
    //mindegyik színt random legeneráljuk 
    const r = Math.floor(Math.random() * 256);//mert ugye, kell 255 
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `rgb(${r}, ${g} ${b})`;
    //itt visszaadjuk az elkészített rgb kódot 

}

export default ColorGenerator;