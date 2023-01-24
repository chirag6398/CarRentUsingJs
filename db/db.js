// let db=null;
// // console.log("hi");
// function createDataBase(){
//     let request=indexedDB.open("carRentDatabase",2);
//     request.onupgradeneeded=function (e){
//         console.log(e.target.result)
//         alert("upgarde");
//     }
//     request.onsuccess=function (e){
//         db=e.target.result;
    
//         console.log(e.target.result)
//         alert("success");
//     }
    
//     request.onerror=function (e){
//         alert("error")
//     }
// }