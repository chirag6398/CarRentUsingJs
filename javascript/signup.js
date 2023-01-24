///<reference path="../db/db.js"/>

let signUpBtn=document.getElementById("signUp");
let Name=document.getElementById("name");
let Email=document.getElementById("email");
let Password=document.getElementById("password");
let passwordValidateBox=document.getElementById("passwordValidateBox");
let PhnNumber=document.getElementById("number");
let Cpassword=document.getElementById("cpassword");
let checkIcon=document.getElementsByClassName("checkIcon");


function HideBox(){
    passwordValidateBox.style.display="none";
}

Password.onfocus=()=>{
    passwordValidateBox.style.display="flex";

}

Password.onkeyup=()=>{
    let regExLowerCase=/[a-z]/g;

    if(Password.value.match(regExLowerCase)){
        checkIcon[0].classList.remove("invalid")
        checkIcon[0].classList.add("valid");
    }else{
        checkIcon[0].classList.remove("valid")
        checkIcon[0].classList.add("invalid");
    }

    let regExUpperCase=/[A-Z]/g;

    if(Password.value.match(regExUpperCase)){
        checkIcon[1].classList.remove("invalid")
        checkIcon[1].classList.add("valid");
    }else{
        checkIcon[1].classList.remove("valid")
        checkIcon[1].classList.add("invalid");
    }

    let regExNumber=/[0-9]/g;

    if(Password.value.match(regExNumber)){
        checkIcon[2].classList.remove("invalid")
        checkIcon[2].classList.add("valid");
    }else{
        checkIcon[2].classList.remove("valid")
        checkIcon[2].classList.add("invalid");
    }

    

    if(Password.value.length>=5 && Password.value.length<=8){
        checkIcon[3].classList.remove("invalid")
        checkIcon[3].classList.add("valid");
    }else{
        checkIcon[3].classList.remove("valid")
        checkIcon[3].classList.add("invalid");
    }

}

function passwordValidate(){
    let check=true;
    
    for(let i=0;i<checkIcon.length;i++){
        if(checkIcon[i].classList.contains("invalid")==true){
            check=false;
            break;
        }
    };
    return check;
}

let db=null;


function checkUserExist(store,user,cb){
   
    let requests = store.openCursor();
    
    requests.onsuccess = function () {
        let cursor = requests.result;

        if (cursor) {
            console.log(cursor.value)

            if(cursor.value.name===user.name || cursor.value.email===user.email){
                alert("user exits");
                cb(true)
            }else{
                cursor.continue();
            }
            
        } else {
            cb(false);
            console.log("No more cursor");
        }
    };
}

function saveUserData(user){
    let idb=indexedDB.open("carRentDatabase",7);
    idb.onsuccess=function (){
        db=idb.result;
        let tx=db.transaction("users","readwrite");

        tx.onerror=function(e){
           
            console.log(e.target.error);
        }

        let store=tx.objectStore("users");

        checkUserExist(store,user,function(exist){

            if(!exist){
                store.add(user);
                console.log("new user")
                window.location.href="./login.html";
            }
            else{
                // alert("user exist already");
                console.log("already exist")
            }
        });   
    }
    
    idb.onerror=function (e){
        alert("error",e.target.error)
    }

}




signUpBtn.addEventListener("click",function(e){
    e.preventDefault();
    let name=Name.value.trim();
    let email=Email.value.trim();
    let password=Password.value.trim();
    let number=PhnNumber.value.trim();
    let cpassword=Cpassword.value.trim();
    let regEx=/^([a-z0-9\.-]+)@([a-z0-9]+).([a-z]{2,8})?$/;
    let regExNumer=/^\d{10}$/;
    if(name.length===0){ 
        document.getElementById("1").style.visibility="visible";  
        return;
    }
    if(email.length===0 || !regEx.test(email)){
        document.getElementById("2").style.visibility="visible";
        return;
    }
    if(!regExNumer.test(number)){
        document.getElementById("3").style.visibility="visible";
        return;
    }
    if(!passwordValidate() || password!==cpassword){
        alert("invalid password")
        return;
    }
    saveUserData({ name,email,password,number,});
});

