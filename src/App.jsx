import { useCallback, useEffect,useRef } from "react";
import { useState } from "react"


function App() {
  const [length,setLength]=useState(8);
  const [numbers,setNumbers]=useState(false);
  const [characters,setCharacters]=useState(false);
  const [Password,setPassword]=useState("");
  let passRef=useRef(null)
  //password generator ------
  const copyToClipboard=useCallback(()=>{
    passRef.current?.select();
    passRef.current?.setSelectionRange(0,99);
       window.navigator.clipboard.writeText(Password)
  },[Password])
  const passwordGen = useCallback(()=>{
    let pass="";
       let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
       if(numbers) str+="0123456789";
       if(characters)str+="?@,-_.|";
       for(let i=0;i<length;i++){
        let char=Math.floor(Math.random()*str.length+1);
        pass+=str.charAt(char)
       }
       setPassword(pass)
  },[length,numbers,characters,setPassword])

  const called=useEffect(()=>{
     passwordGen()
  },[length,numbers,characters])
  return (
    <>
    <div className="background flex flex-col items-center w-full h-screen bg-black ">
    <h1 className="text-white text-4xl m-12 ">Password Generator</h1>
    <div className="boxMain w-2/5 h-40 bg-slate-300 flex flex-col rounded-2xl justify-center items-center">
      <div className="textBox flex ">
         <input type="text" value={Password} ref={passRef} className="rounded-l shadow-md w-96 px-3 h-11 outline-none " />
         <button className="bg-blue-800 shadow-lg px-3 text-white rounded-r" onClick={copyToClipboard}>Copy</button>
      </div>
   <div className="sliderCheckboxes flex mt-5">
   <input type="range" value={length} onChange={(e)=>setLength(e.target.value)} min={6} max={100} class="slider" id="myRange"/>
   <div className="lengthCheckbox1 px-3">
   
   <label className="px-1">Length({length})</label></div>
   <div className="lengthCheckbox2 px-3">
   <input type="checkbox" onChange={()=>setNumbers((prev)=>!prev)}  name="" id="" />
   <label className="px-1">Numbers</label></div>
   <div className="lengthCheckbox3 px-3">
   <input type="checkbox" onChange={()=>setCharacters((prev)=>!prev)} name="" id="" />
   <label className="px-1">Characters</label></div>
   </div>
    </div>
    </div>
    
    </>
  )
}

export default App
