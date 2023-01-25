///<reference path="../db/db.js"/>

// import { Chart } from "./chart";

let db=null;

var carNames=[];
var quantityData=[];
// function updateDataBaseUsers(user){
//     key=user.key;
//     console.log(user,key);
    // var idb=indexedDB.open("carRentalDataBase");

    // idb.onsuccess=function(){
    //     var db=idb.result;
    //     var tx=db.transaction("users","readwrite");
    //     var store=tx.objectStore("users");

    //     store.put(user,key);
    // }

// }
function createDataBase(){

    let idb=indexedDB.open("carRentDatabase",7);
    let db=null;
    idb.onupgradeneeded=function (e){
        
        db=idb.result;
        db.createObjectStore("users",{autoIncrement:true});
        db.createObjectStore("carData",{autoIncrement:true});
        

        
    }
    idb.onsuccess=function (e){
        
        db=idb.result;
        var tx=db.transaction("carData","readwrite");
        tx.onerror=function(e){
           
            console.log(e.target.error);
        }
       
        var store=tx.objectStore("carData");

        var request=store.openCursor();
        request.onsuccess=function(){
            let cursor=request.result;
            if(cursor){
                console.log(cursor.value);
                carNames.push(cursor.value.name);
                quantityData.push(10-cursor.value.quantity);
                var data={
                    key:cursor.key,
                    ...cursor.value
                }
                let mainDiv=document.getElementById("cars__container");
        
                let div1=document.createElement("div");
                let img=document.createElement("img");
                let div2=document.createElement("div");
                let p1=document.createElement("p");
                let p2=document.createElement("p");
                let h5=document.createElement("h5");
                let p3=document.createElement("p");
                let p4=document.createElement("p");
                let p5=document.createElement("p");
                let rentBtn=document.createElement("button");
                div1.classList.add("card");
                div1.style.minWidth="274px"

                h5.className+="card-header"
                img.className+="card-img-top";
                img.style.objectFit="contain";
                img.style.maxWidth="200px";
                img.style.maxHeight="200px";
                img.alt="loading..."
                img.src=`${data.img}`;
                mainDiv.appendChild(div1);
                div1.appendChild(img);
                div2.classList.add("card-body");
                h5.innerText=data.header;
                img.insertAdjacentElement("afterend",h5);
                h5.insertAdjacentElement("afterend",div2);
                img.style.objectFit="contain";
                p1.className+="card-text";
                p1.innerText=(data.name);
                p2.className+="card-text";
                p2.innerText="Rs. "+(data.price)+"/hr";
                p3.className+="card-text";
                p3.style.fontWeight="300";
                p3.innerText=data.pickupLocation;
                div2.appendChild(p3);

                div2.appendChild(p1);
                p4.className+="card-text"
                p4.innerText="persons "+data.totalPerson;
                div2.appendChild(p4)
                div2.appendChild(p2);
                p5.className+="card-text"
                p5.innerText="Type: "+data.type;
                div2.appendChild(p5)
                rentBtn.className+="btn btn-warning"
                rentBtn.innerText="Book Now";
                div2.appendChild(rentBtn);

                rentBtn.addEventListener("click",function(){
                    
                    user=JSON.parse(window.sessionStorage.getItem("currentUser"));
                   
                    user={
                        ...user,
                        bookingData:data,
                        booked:false,
                        key:data.key,
                        
                    }
                    // updateDataBaseUsers(user);
                    
                    console.log(user,data.key);
                    
                    window.sessionStorage.setItem("currentUser",JSON.stringify(user));
                    window.location.href="./booking.html"
                })
                cursor.continue();

            }else{
                var ctx=document.getElementById("myChart").getContext("2d");
                var myChart=new Chart(ctx,{
                    type:"bar",
                    data:{
                        labels:carNames,
                        datasets:[
                            {
                                data:quantityData,
                                label:"Car Rent",
                                backgroundColor:["red","yellow","blue","grey","brown","violet"]
            
                            },
                        ],
                    },
                });

            }
        }

        
       
    }
    
    idb.onerror=function (e){
        alert("error",e)
    }
}

createDataBase();



if((JSON.parse(window.sessionStorage.getItem("currentUser")))){
    document.getElementById("signIn").style.display="none";
    document.getElementById("signUp").style.display="none";

   

}else{
    window.location.href="./login.html";
}


function logOutHandler(){
    console.log("hi")
    window.sessionStorage.removeItem("currentUser");
    window.location.href="./login.html";
}
