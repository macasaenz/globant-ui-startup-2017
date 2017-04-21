window.onload = function(){
	document.getElementById("saveLocal").addEventListener("click", saveInfoLocal);
	document.getElementById("showMeLocal").addEventListener("click", showUsername);
	document.getElementById("indexedDB").addEventListener("click", addInfo);
  document.getElementById("showMeIDB").addEventListener("click", read);
	document.getElementById("clear").addEventListener("click", clear);
  document.getElementById("dropzone").addEventListener("dragover", dragover);
  document.getElementById("dropzone").addEventListener("dragleave", dragleave);
  document.getElementById("dropzone").addEventListener("drop", drop);



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
 * Deletes userName value from local storage and all data from user objectStore in indexedDB
 */
let clear = function clear() {
	//Delete locally stored data
	localStorage.removeItem("username");
	console.log("Local data deleted");

  //Delete IDB stored data
  db.transaction(["user"], "readwrite").objectStore("user").clear();
  console.log("IDB data deleted");

}

// Indexed DB

let db;
let request = window.indexedDB.open("newDatabase", 1);
         
request.onerror = function(event) {
    console.log("error: ");
};
         
request.onsuccess = function(event) {
    db = event.target.result;
    console.log("success: "+ db);
};
      
request.onupgradeneeded = function(event) {
    let db = event.target.result;
    if(!db.objectStoreNames.contains("user")) {
            console.log("making a new object store");
            let objectStore = db.createObjectStore("user", {autoIncrement: true}); 
        }
             
}	

/*
 * Saves info from textarea to user objectStore in indexedDB
 */         

let addInfo = function addInfo() {
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
function read() {         
  let request = db.transaction(["user"], "readonly")
           			.objectStore("user")
           			.openCursor();
            
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
 * Handles drop event, changing classList of dropzone for styling and showing title of dropped files
 */
let drop = function drop(e){
  e.stopPropagation();
  e.preventDefault();
  let dropzone = document.getElementById("dropzone");
  dropzone.classList.remove('dragover');
  let fileTitle = document.getElementById("fileTitle");
  for (var i = 0, file; file = e.dataTransfer.files[i]; i++) {
    let title = document.createElement("div");
    title.innerHTML = file.name;
    fileTitle.appendChild(title);
  }

}




















