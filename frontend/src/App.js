import './App.css';
import {useState, useEffect} from 'react'
function App() {

  const [info, setInfo] = useState()

  const getInfo = async() =>{

    try{
      // Notice we only use "/files" without the full URL.
      // The URL is in package.json file, with the key "proxy".
      // This also removes CORS errors!
      const response = await fetch('/files')
      //check if the response is not OK!
      if(!response.ok){
        console.log("Respsonse is not ok! " + response)
      }
      //console.log(response.json())
      // If response is OK then we want that data to be stored in "setBack"
      const data = await response.json()
      console.log(data)
      setInfo(data)
      //console.log(info)

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
    </div>
  );
}

export default App;
