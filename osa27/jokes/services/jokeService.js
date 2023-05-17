const fetchRandomJoke = async () => {
    // implement functionality here
    const data = {
        "country": "fi",
      };
    
      const response = await fetch("https://simple-joke-api.deno.dev/random", 
      {
        method: "GET",
      }
      );
    
    
      const jsonData = await response.json();
      console.log(jsonData);
      return jsonData;
  };
  
  export { fetchRandomJoke };
  