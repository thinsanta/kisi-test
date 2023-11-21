import './App.css';
import {useState, useEffect} from 'react'
import postImage from './apiCall/postImage';

function App() {

  const [serverInfo, setServerInfo] = useState()
  // The file that you upload from client side is stored here
  const [fileUpload, setFileUpload] = useState()

  const getInfo = async() =>{
    console.log(serverInfo)
    try{
      // Notice we only use "/files" without the full URL.
      // The URL is in package.json file, with the key "proxy".
      // This also removes CORS errors!
      const response = await fetch('https://kisi-test-production-98a5.up.railway.app/files')
      //check if the response is not OK!
      if(!response.ok){
        console.log("Respsonse is not ok! " + response)
      }
      // If response is OK then we want that data to be stored in "setBack"
      const data = await response.json()
      setServerInfo(data)

    }catch(err){
      console.log("error occured: " + err)
    }

  }

    // Handles the file so that it gets stored to setFileUpload
    const fileHandler = (e) => {
      //setFileUpload(e.target.files[0])
      const selectedFile = e.target.files[0];
      const fileExtension = selectedFile.name.split('.').pop();

      if (['png', 'jpg'].includes(fileExtension)) {
        setFileUpload(selectedFile);
      } else {
        alert('Only .png and .jpg images are allowed');
        setFileUpload(selectedFile);
      }
    }
  

  useEffect(() => {
    getInfo()
  }, [])
  
/*{data.title}*/

  return (
    <div className="App">
      <div className='container'>
        <div className='message'>Connect people & spaces</div>
      {serverInfo?.map((data, index) =>{
        return <div key={index} className={`item item-${index}`}>
          <img  src={`http://localhost:3000/images/${data.image}`}/>
          <div class="top-left">{data.title}</div>
          <i className='bottom-right'></i>
          <div class="overlay">
            <div class="title-text">{data.title}</div>
            <div class="desc-text">{data.desc}</div>
          </div>
        </div> 
      })}
      <div className='upload'>
        <input type="file" name="fileToUpload" onChange={fileHandler}/>
        <button className='button' onClick={() => postImage(fileUpload, getInfo)}>Button</button>
      </div>
      
      </div>
    </div>
  );
}

export default App;
