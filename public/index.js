function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position =>{
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const data = {lat, lon};
        const options = {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        }
        fetch('/location', options);  
      });
    } else { 
      alert("Location Needed");
    }
  }
  
 