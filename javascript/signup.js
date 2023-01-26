///<reference path="../db/db.js"/>

var  signUpBtn=document.getElementById("signUp");
var  Name=document.getElementById("name");
var  Email=document.getElementById("email");
var  Password=document.getElementById("password");
var  passwordValidateBox=document.getElementById("passwordValidateBox");
var  PhnNumber=document.getElementById("number");
var  Cpassword=document.getElementById("cpassword");
var  checkIcon=document.getElementsByClassName("checkIcon");

function addUserLogIn(user){
    var idb=indexedDB.open("carRentDatabase");
    idb.onsuccess=function(){
        var db=idb.result;
        var tx1=db.transaction("userSignUpDate","readwrite");
        tx1.onerror=function(e){
           
            console.log(e.target.error);
        }
        var store1=tx1.objectStore("userSignUpDate");

        var key=new Date().toDateString();

        
        
        
        var req=store1.openCursor();
        // var req1=store1.get(key);
        // req1.onsuccess=function(){
        //     console.log(req1.result);

        // }
        req.onsuccess=function(){
            var cursor=req.result;
            if(cursor){
                if(cursor.value.date==key){
                    console.log(cursor.value);
                    cursor.value.user.push(user);
                    console.log(cursor.value,key);
                    store1.put(cursor.value);

                }else{
                    cursor.continue();
                }
            }else{
                // console.log(nuser)
                var nuser={
                    user:[user],
                    date:key
                }
                store1.put(nuser)
            }
        }
    }
    
}


function HideBox(){
    passwordValidateBox.style.display="none";
}

Password.onfocus=()=>{
    passwordValidateBox.style.display="flex";

}

Password.onkeyup=()=>{
    var  regExLowerCase=/[a-z]/g;

    if(Password.value.match(regExLowerCase)){
        checkIcon[0].classList.remove("invalid")
        checkIcon[0].classList.add("valid");
    }else{
        checkIcon[0].classList.remove("valid")
        checkIcon[0].classList.add("invalid");
    }

    var  regExUpperCase=/[A-Z]/g;

    if(Password.value.match(regExUpperCase)){
        checkIcon[1].classList.remove("invalid")
        checkIcon[1].classList.add("valid");
    }else{
        checkIcon[1].classList.remove("valid")
        checkIcon[1].classList.add("invalid");
    }

    var  regExNumber=/[0-9]/g;

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
    var  check=true;
    
    for(var  i=0;i<checkIcon.length;i++){
        if(checkIcon[i].classList.contains("invalid")==true){
            check=false;
            break;
        }
    };
    return check;
}

var  db=null;


function checkUserExist(store,user,cb){
   
    var  requests = store.openCursor();
    
    requests.onsuccess = function () {
        var  cursor = requests.result;

        if (cursor) {
            // console.log(cursor.value)

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
    var  idb=indexedDB.open("carRentDatabase");
    idb.onsuccess=function (){
        db=idb.result;
        var  tx=db.transaction("users","readwrite");

        tx.onerror=function(e){
           
            console.log(e.target.error);
        }

        var  store=tx.objectStore("users");
        

        checkUserExist(store,user,function(exist){

            if(!exist){

                store.add(user);
                addUserLogIn(user);
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
    var  name=Name.value.trim();
    var  email=Email.value.trim();
    var  password=Password.value.trim();
    var  number=PhnNumber.value.trim();
    var  cpassword=Cpassword.value.trim();
    var  regEx=/^([a-z0-9\.-]+)@([a-z0-9]+).([a-z]{2,8})?$/;
    var  regExNumer=/^\d{10}$/;
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

