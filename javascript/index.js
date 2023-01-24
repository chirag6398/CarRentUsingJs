///<reference path="../db/db.js"/>

let db=null;


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
                var data=cursor.value;
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
                    // let pdate=document.getElementById("pdate").value;
                    // let ddate=document.getElementById("ddate").value;
                    // if(!pdate || !ddate ){
                    //     alert("please select date and time above");
                    //     return ;
                    // }

                    window.location.href="./booking.html?id="+data.id;
                })
                cursor.continue();

            }
        }

        console.log("success")
       
    }
    
    idb.onerror=function (e){
        alert("error",e)
    }
}

createDataBase();

function diff_hours(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
  

 }



if((JSON.parse(window.sessionStorage.getItem("currentUser")))){
    document.getElementById("signIn").style.display="none";
    document.getElementById("signUp").style.display="none";

    

    



}else{
    window.location.href="./login.html";
}


function searchHandler(){
    
    let pdate=document.getElementById("pdate").value;
    
    let ddate=document.getElementById("ddate").value;
  
       
  
    
    if(!pdate || !ddate ){
        alert("please select all date and time ");
        return ;
    }
    let d1=new Date();
    let d2=new Date(pdate);
    let d3=new Date(ddate);
    if(d2.getFullYear()<d1.getFullYear() || d2.getMonth()<d1.getMonth() || d2.getDate()<d1.getDate() || d2.getTime()<d1.getTime()){

        alert("plz choose valid pickup date and time");
        return;

    }
    if(d2.getFullYear()>d3.getFullYear() || d2.getMonth()>d3.getMonth() || d2.getDate()>=d3.getDate() || d2.getTime()>=d3.getTime()){

        alert("plz choose valid drop date and time");
        return;

    }

    console.log(diff_hours(d3,d2)," ",d2.getFullYear());


    







}

function logOutHandler(){
    console.log("hi")
    window.sessionStorage.removeItem("currentUser");
    window.location.href="./login.html";
}
