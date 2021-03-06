var grid_division=180


var onSuccess = function(position) {
    updateGPS(position.coords.latitude,position.coords.longitude)
    alert( 'Longitude: '         + position.coords.longitude         + '\n' +
           'Latitude: '          + position.coords.latitude          + '\n' +
/*          'Altitude: '        + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +*/
          'Timestamp: '         + position.timestamp                + '\n');

};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}


function getGPS(){
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}

function getGridPostition(longitude,latitude){
  x=Math.floor( (longitude/180)*grid_division );
  y=Math.floor( (latitude/90)*grid_division );
  //console.log(x,y);
  return [x,y]
}

function updateGPS(lat,long,user='mroguljic'){
  var userRef=db.collection("users").doc(user);
  userRef.update({
    latitude:lat,
    longitude:long
  }).then(function() {
    console.log("Coordinates successfully updated!");
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});
}