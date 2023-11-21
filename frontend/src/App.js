import './App.css';
import {useState, useEffect} from 'react'
function App() {

  const [serverInfo, setServerInfo] = useState()

  const getInfo = async() =>{
    console.log(serverInfo)
    try{
      // Notice we only use "/files" without the full URL.
      // The URL is in package.json file, with the key "proxy".
      // This also removes CORS errors!
      const response = await fetch('/files')
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

  useEffect(() => {
    getInfo()
  }, [])
  
/*{data.title}*/

  return (
    <div className="App">
      <div className='container'>
        <div className='message'>Connect people & spaces</div>
      {serverInfo?.map((data, index) =>{
        return <img key={index} className={`item-${index}`} src={`http://localhost:3000/images/${data.image}`}>
          
        </img>
      })}
      <button className='button' onClick={getInfo}>Button</button>
      </div>
    </div>
  );
}

export default App;
