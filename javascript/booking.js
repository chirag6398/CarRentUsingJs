var user=(JSON.parse(window.localStorage.getItem("currentUser")));

var totalPrice=0;

function diff_hours(dt2, dt1) 
{

    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
  
    if(diff<0){
        return -100;
    }
    return  (Math.round(diff));
    
}

function checkCarAvailability(data,d1,d2){
    var available=true;
    
    if(data.BookedSlot && data.BookedSlot.length!=0){
        
        data.BookedSlot.forEach(function(slot){
            if(((new Date(d1))>=(new Date(slot.pdate)) && (new Date(slot.ddate))>=(new Date(d1))) || (new Date(d2))>=(new Date(slot.pdate)) && (new Date(slot.ddate))>=new Date(d2) ){
                console.log("first",d1.toDateString()>=(new Date(slot.pdate).toDateString()) && (new Date(slot.ddate).toDateString())>=d1.toDateString());
                console.log("second",d2.toDateString()>=(new Date(slot.pdate).toDateString()),(new Date(slot.ddate))>=new Date(d2),d2.toDateString(),(new Date(slot.ddate).toDateString()))
                available=false;
                return false;
            }
        })
    }else{
        return true;
    }

    return available;

}

if(user){
    document.getElementById("signIn").style.display="none";
    document.getElementById("signUp").style.display="none";
    if(user.email==="admin1@gmail.com"){
        document.getElementById("admin").style.display="block";
    }else{
        document.getElementById("admin").style.display="none";
    }

    var bookingCar=user.bookingData;
//    console.log(bookingCar)
    if(!bookingCar || bookingCar.length===0){
        document.getElementById("cars__container").innerText="Please select car for booking";
    }

    bookingCar.forEach(function(data){
       
            var mainDiv=document.getElementById("cars__container");
            
            var div1=document.createElement("div");
            var img=document.createElement("img");
            var div2=document.createElement("div");
            var p1=document.createElement("p");
            var p2=document.createElement("p");
            var h5=document.createElement("h5");
            var p3=document.createElement("p");
            var p4=document.createElement("p");
            var p5=document.createElement("p");
            var rentBtn=document.createElement("button");
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
            img.style.alignSelf="center"
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

            document.getElementById("search").addEventListener("click",function(){
                var pdate=document.getElementById("pdate").value;
                var ddate=document.getElementById("ddate").value;
                if(!pdate || !ddate ){
                    alert("please select date and time from both fields");
                    return ;
                }
                var d1=new Date(pdate);
                var d2=new Date(ddate);
                var d0=new Date();
                
                
                
                var check=diff_hours(d1,d0);
                var check1=diff_hours(d2,d0);
                var hrs=diff_hours(d2,d1);

                if(check<0){
                    alert("please pick correct date and time");
                    return;
                }
                if(check1<0){
                    alert("please pick correct date and time");
                    return;
                }
                if(hrs<0){
                    alert("enter valid dates");
                    return;
                    
                }
                

                if(checkCarAvailability(data,d1,d2)){
                    data.pickupTime=d1;
                    data.dropOffTime=d2;
                    data.charge=(+data.price)*(+hrs);
                    totalPrice+=data.charge;
                    
                    document.getElementById("buyBox").style.display="flex";
                    document.getElementById("buyBox").style.width="100%";
                    document.getElementById("pricing").innerText="Rs. "+ totalPrice;
                }else{
                    alert("car is not available in this time slot");
                }
                
                window.scrollBy(0,window.innerHeight)
                
            });
          
        
    });
}else{
    window.location.href="./login.html";
}

function bookingDate(car){
    var idb=indexedDB.open("carRentDatabase");
    idb.onsuccess=function(){
        var db=idb.result;
        var tx1=db.transaction("bookingDate","readwrite");
        tx1.onerror=function(e){
            console.log(e.target.error);
        }
        var store1=tx1.objectStore("bookingDate");

        var key=new Date().toDateString();
        var req=store1.openCursor();
        
        req.onsuccess=function(){
            var cursor=req.result;
            if(cursor){
                if(cursor.value.date==key){
                    
                    cursor.value.car.push(car);
                    
                    store1.put(cursor.value);

                }else{
                    cursor.continue();
                }
            }else{
               
                var ncar={
                    car:[car],
                    date:key
                }
                store1.add(ncar)
            }
        }
    }
    
}

function logOutHandler(){
    console.log("hi")
    window.localStorage.removeItem("currentUser");
    window.location.href="./login.html";
}



function payHandler(){
   
    var nCarData;
    if(user.carData){
        nCarData=user.bookingData.concat(user.carData);
    }else{
        nCarData=user.bookingData;
    }
    
    
    

   

    var idb=indexedDB.open("carRentDatabase");

    idb.onsuccess=function(){
        var db=idb.result;
        // var tx=db.transaction("carData","readwrite");
        // var store=tx.objectStore("carData");

        user.bookingData.forEach(function(data){
            
           
            var slot={
                pdate:data.pickupTime,
                ddate:data.dropOffTime
            }
            if(data.BookedSlot)
                data.BookedSlot.push(slot);
            else
                data.BookedSlot=[slot];
          
            
            var key=data.key;
            console.log(data);
            // store.put(data,key);
            bookingDate(data);

               
            
            
    
        });

        user={
            ...user,
            carData:nCarData,
            totalPrice,
            
        }

        var tx2=db.transaction("users","readwrite");
        var store2=tx2.objectStore("users");
        user.bookingData=[];
        store2.put(user,user.key);
        window.localStorage.setItem("currentUser",JSON.stringify(user));

        window.location.href="./booked.html";
    }   
    
}