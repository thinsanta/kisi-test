const postImage = async (fileUpload, getInfo) => {
    // Creates FormData from the file so it can be used to send
    const formData = new FormData()
    formData.append('image', fileUpload)
    // A try catch block to handle errors
    try{
      // Notice we only use "/process" without the full URL.
      // The URL is in package.json file, with the key "proxy".
      // This also removes CORS errors!
      const response = await fetch('https://kisi-test-production-98a5.up.railway.app/upload', {
        
        method: 'POST',
        body: formData
  
      })
      //check if the response is not OK!
      if(!response.ok){
        console.log("Respsonse is not ok! " + JSON.stringify(response))
      }

      getInfo()

    }catch(err){
      console.log(err)
    }


}

export default postImage