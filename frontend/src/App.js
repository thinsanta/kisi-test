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
  


  return (
    <div className="App">
      <button onClick={getInfo}>click</button>

      {serverInfo?.map((data, index) =>{
        return <div key={index}>{data.title}</div>
      })}
    </div>
  );
}

export default App;
