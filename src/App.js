import './App.css';
import * as tf from '@tensorflow/tfjs';
import Resizer from "react-image-file-resizer";
import {useEffect,useState} from 'react'
import {Image} from 'image-js'
let model;
function App() {
  const [img, setImg]=useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5RWxXNbo4lrfDxEDikvPYrY_qzY8Zpg1AZBhj0ANvjaW5B3NkEP6grHRb&s=10')
  const [animel, setAnimel]=useState('cat|dog')
  useEffect(()=>{
    (async()=>{
      model = await tf.loadLayersModel('https://raw.githubusercontent.com/Mbittu00/cat_vs_dog_tfjs/main/model.json')
    })()
  },[])
  
  
  
  let fileUpload=async(e)=>{
  //  let image = await Image.load(e.target.value);
  let file=e.target.files[0]
  let reader=await new FileReader()
  reader.onload=async(p)=>{
   let ppp=p.target.result
   let img=await Image.load(ppp)
   let size=img.resize({width:256,height:256})
    let ten=tf.browser.fromPixels(size)
   ten=ten.reshape([1,256,256,3])
   let tff=tf.div(ten,255)
   let pre=model.predict(ten)
   let val=pre.dataSync()[0]
   if(val>0.5){
     setAnimel('dog')
   }else{
     setAnimel('cat')
   }
  }
  reader.readAsArrayBuffer(file);
  let show = new FileReader();
    show.readAsDataURL(file);
    show.onload = function () {
        setImg(show.result)
    };
  }
  
  return (
    <div className="App">
     <input type="file" onChange={fileUpload}/>
     <span>{animel}</span>
     <img src={img} alt='image'/>
    </div>
  );
}

export default App;
