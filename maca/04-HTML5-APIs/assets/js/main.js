window.onload = function(){
  document.getElementById("saveLocal").addEventListener("click", saveInfoLocal);
  document.getElementById("showMeLocal").addEventListener("click", showUsername);
  document.getElementById("indexedDB").addEventListener("click", database.addInfo);
  document.getElementById("showMeIDB").addEventListener("click", database.read);
  document.getElementById("clear").addEventListener("click", clear);
  document.getElementById("dropzone").addEventListener("dragover", dragover);
  document.getElementById("dropzone").addEventListener("dragleave", dragleave);
  document.getElementById("dropzone").addEventListener("drop", drop);
  document.getElementById("openConnection").addEventListener("click", openCon);
  document.getElementById("closeConnection").addEventListener("click", closeCon);
  document.getElementById("sendMessage").addEventListener("click", sendMsg);

}
// Excercises 1-2
// Local storage

/*
 * Saves info from textarea to localstorage as userName 
 */
let saveInfoLocal = function saveInfoLocal(){
  let info = document.getElementById("userName").value
  // Save data to the current local store
  localStorage.setItem("username", info);   
  alert("Username saved!");
}

/*
 * Shows userName value from local storage
 */
let showUsername = function showUsername(){
  // Access stored data
  let wrapper = document.getElementById("localData");
  wrapper.innerHTML = localStorage.getItem("username");

}

/*
 * Deletes userName value from local storage AND all data from user objectStore in indexedDB
 */
let clear = function clear() {
  //Delete locally stored data
  localStorage.removeItem("username");
  console.log("Local data deleted");

  //Delete IDB stored data
  db.transaction(["user"], "readwrite").objectStore("user").clear();
  console.log("IDB data deleted");

}

// Create indexed DB
 
let request = window.indexedDB.open("newDatabase", 1);
let db;

request.onerror = function(event) {
  console.log("error: ");
};
                    
request.onsuccess = function(event) {
  db = event.target.result;
  console.log("success" + db);
};
                 
request.onupgradeneeded = function(event) {
  db = event.target.result;
  if(!db.objectStoreNames.contains("user")) {
    console.log("making a new object store");
    let objectStore = db.createObjectStore("user", {autoIncrement: true}); 
  }               
}

class DB {
  constructor(){    
  }

/*
 * Saves info from textarea to user objectStore in indexedDB
 */ 

  addInfo() {
    let name = document.getElementById("userName").value;
    let request = db.transaction(["user"], "readwrite")
                 .objectStore("user")
                 .add({name: name});
              
    request.onsuccess = function(event) {
      alert(name + " has been added to your database.");
    };
              
    request.onerror = function(event) {
      alert("Error");
    }
  }

  /*
 * Shows all data from user objectStore in indexedDB
 */
  read() {       
    let request = db.transaction(["user"], "readonly").objectStore("user").openCursor();
              
    request.onerror = function(event) {
      alert("Unable to retrieve data from database!");
    };              

    request.onsuccess = function(event) {
      var cursor = event.target.result;
          
      if(cursor) {
        console.log(cursor.value.name);
        cursor.continue();
      }
                 
      else {
        alert("End of data");
      }
    };
  }
}

let database = new DB();

//Excercise 3

/*
 * Handles dragover event, changing classList of dropzone for styling
 */
let dragover = function dragover(e){
  e.stopPropagation();
  e.preventDefault();
  let dropzone = document.getElementById("dropzone");
  dropzone.classList.add('dragover')
  return false;
}

/*
 * Handles dragleave event, changing classList of dropzone for styling
 */
let dragleave = function dragleave(e){
  e.stopPropagation();
  e.preventDefault();
  let dropzone = document.getElementById("dropzone");
  dropzone.classList.remove('dragover');
  return false;
}

/*
 * Handles drop event, changing classList of dropzone for styling, showing title of dropped files and loading text content in textarea
 */
let drop = function drop(e){
  e.stopPropagation();
  e.preventDefault();
  let txtArea = document.getElementById("userName");
  let dropzone = document.getElementById("dropzone");
  dropzone.classList.remove('dragover');

  var file = e.dataTransfer.files[0],
  reader = new FileReader();
  reader.onload = function(event) {
    txtArea.innerText = event.target.result;
  };
  reader.readAsText(file);

  let fileTitle = document.getElementById("fileTitle");
  for (var i = 0; file = e.dataTransfer.files[i]; i++) {
    let title = document.createElement("div");
    title.innerHTML = file.name;
    fileTitle.appendChild(title);
  }
}

//Excercise 4

let socket;

let openCon = function openCon(){                       // Create WebSocket connection.
  socket = new WebSocket('ws://echo.websocket.org/');
  let info = document.createElement("div");
  info.innerHTML = "Opening connection. Ready state = " + socket.readyState;
  document.getElementById("WebSockInfo").appendChild(info);
  socket.addEventListener('open', handleOpen);
  socket.addEventListener('message', handleMessage);
  socket.addEventListener('close', handleClose);
}

let closeCon = function closeCon(){
  socket.close();
  let info = document.createElement("div");
  info.innerHTML = "Closing connection. Ready state = " + socket.readyState;
  document.getElementById("WebSockInfo").appendChild(info);
}

let handleOpen = function handleOpen(){
  let info = document.createElement("div");
  info.innerHTML = "Connection opened. Ready state = " + socket.readyState;
  document.getElementById("WebSockInfo").appendChild(info);
  socket.send('Hello Server!');
}

let handleMessage = function handleMessage(){
  let info = document.createElement("div");
  info.innerHTML = "Message received. Ready state = " + socket.readyState;
  document.getElementById("WebSockInfo").appendChild(info);
  let info2 = document.createElement("div");
  info2.innerHTML = "Message: " + event.data;
  document.getElementById("WebSockInfo").appendChild(info2);
}

let handleClose = function handleClose(){
  let info = document.createElement("div");
  info.innerHTML = "Connection closed. Ready state = " + socket.readyState;
  document.getElementById("WebSockInfo").appendChild(info);
}

let sendMsg = function sendMsg(){
  let info = document.getElementById("msgForWS").value;
  socket.send(info);
}
