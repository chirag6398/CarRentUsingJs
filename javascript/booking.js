var user=(JSON.parse(window.localStorage.getItem("currentUser")));

var totalPrice=0;
function diff_hours(dt2, dt1) 
{

    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    console.log(diff)
    if(diff<0){
        return -100;
    }
    return  (Math.round(diff));
    
}

if(user){
    document.getElementById("signIn").style.display="none";
    document.getElementById("signUp").style.display="none";

    var bookingCar=user.bookingData;
   
    if(!bookingCar || bookingCar.length===0){
        document.getElementById("cars__container").innerText="Please select car for booking";
    }
    bookingCar.forEach(function(data){
        if(data.booked==false){

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
                
                totalPrice+=(+data.price)*(+hrs);
                document.getElementById("buyBox").style.display="flex";
                document.getElementById("buyBox").style.width="100%";
                document.getElementById("pricing").innerText="Rs. "+ totalPrice;
            });
            
        }

        
        
    });
    

}else{
    window.location.href="./login.html";
}

function logOutHandler(){
    console.log("hi")
    window.localStorage.removeItem("currentUser");
    window.location.href="./login.html";
}




    






function payHandler(){
    
    user={
        ...user,
        carData:user.bookingData,
        
       
        totalPrice,
        
    }

   

    var idb=indexedDB.open("carRentDatabase");

    idb.onsuccess=function(){
        var db=idb.result;
        var tx=db.transaction("carData","readwrite");
        var store=tx.objectStore("carData");

        user.carData.forEach(function(data){
           
            
                data.quantity-=1;
                
                var key=data.key;
                
                store.put(data,key);

               
            
            
    
        });
        var tx2=db.transaction("users","readwrite");
        var store2=tx2.objectStore("users");
        user.bookingData=[];
        store2.put(user,user.key);
        window.localStorage.setItem("currentUser",JSON.stringify(user));

        window.location.href="./booked.html";
    }   
}