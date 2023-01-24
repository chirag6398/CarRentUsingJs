///<reference path="../db/db.js"/>

let db=null;

function createDataBase(){

    let request=indexedDB.open("carRentDatabase",3);

    request.onupgradeneeded=function (e){
        console.log(e.target.result);
        db=e.target.result;
        db.createObjectStore("users",{autoIncrement:true});
        alert("upgarde");
    }
    request.onsuccess=function (e){
        db=e.target.result;
    
        console.log(e.target.result)
        alert("success");
    }
    
    request.onerror=function (e){
        alert("error")
    }
}

createDataBase();

console.log("hi")
function logoutHandler(){
    console.log("hi")
    window.localStorage.removeItem("currentUser");
    window.location.href="./login.html";
}
