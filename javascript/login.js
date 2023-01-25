let signInBtn=document.getElementById("signIn");
let UserName=document.getElementById("username");
let Password=document.getElementById("password");

function checkUserExist(users,user,cb){
   
    let requests = users.openCursor();
    
    requests.onsuccess = function () {
        let cursor = requests.result;

        if (cursor) {
            console.log(cursor.value)

            if((cursor.value.name===user.userName || cursor.value.email===user.userName)&& cursor.value.password===user.password){
                cb(true,cursor.value,cursor.key);
            }else{
                cursor.continue();
            }
            
        } else {
            cb(false,{message:"user not found"});
            
        }
    };
}

                

signInBtn.addEventListener("click",function(e){
    e.preventDefault();
    let userName=UserName.value.trim();
    let password=Password.value.trim();
    

    if(userName.length===0){
        
        document.getElementById("2").style.visibility="visible";
        
        return;
    }
    

    if(password===undefined || password.length<5 || password.length>8){
        
        document.getElementById("3").style.visibility="visible";
        
        return;

    }

    let idb=indexedDB.open("carRentDatabase",7);

    idb.onsuccess=function(){
        let db=idb.result;
        let tx=db.transaction("users","readwrite");
        let users=tx.objectStore("users");
        checkUserExist(users,{userName,password},function(check,obj,key=-1){
            if(check){

                obj={
                    ...obj,
                    key
                }

                window.localStorage.setItem("currentUser",JSON.stringify(obj));
                window.location.href="./index.html";
            }else{
                alert(obj.message);
            }
        })
    }

    
                



})