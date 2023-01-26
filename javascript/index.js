
if((JSON.parse(window.localStorage.getItem("currentUser")))){
    document.getElementById("signIn").style.display="none";
    document.getElementById("signUp").style.display="none";
    var user=(JSON.parse(window.localStorage.getItem("currentUser")));
    if(user.email==="admin1@gmail.com"){
        document.getElementById("admin").style.display="block";
    }else{
        document.getElementById("admin").style.display="none";
    }

   

}else{
    window.location.href="./login.html";
}



var  db=null;

var carNames=[];
var quantityData=[];
let carData=[{

    id:1,
    img:"https://mediaim.expedia.com/cars/14/a0f1abba-78ff-4a1a-a8fe-356dd588ab7d.jpg?impolicy=resizecrop&ra=fit&rh=165&rw=165",
    name:"Maruti Baleno 1.2",
    totalPerson:5,
    pickupLocation:"Ghaziabad, Uttar Pradesh, IND",
    type:"Manual",
    price:85,
    header:"Economic",
    quantity:10

},
{
    id:2,
    img:"https://mediaim.expedia.com/cars/14/9180d2c1-ba15-42db-b0f4-4e88ab972bda.jpg?impolicy=resizecrop&ra=fit&rh=165&rw=165",
    name:"Hyundai I10 Grand",
    totalPerson:4,
    pickupLocation:"New Delhi-kirti Nagar",
    type:"Manual",
    price:71,
    header:"Economic",
    quantity:10

},
{
    id:3,
    img:"https://mediaim.expedia.com/cars/14/4109290a-f688-47e4-b97f-d67315c629f0.jpg?impolicy=resizecrop&ra=fit&rh=165&rw=165",
    name:"Toyota Etios",
    totalPerson:5,
    pickupLocation:"Ghaziabad, Uttar Pradesh, IND",
    type:"Manual",
    price:74,
    header:"Compact Monospace",
    quantity:10

},
{
    id:4,
    img:"https://mediaim.expedia.com/cars/14/457aae52-f12b-40d4-ba04-35e3c79234a5.jpg?impolicy=resizecrop&ra=fit&rh=165&rw=165",
    name:"Ford Ecosport",
    totalPerson:5,
    pickupLocation:"Greet - Igi Terminal 1, New Delhi",
    type:"Manual",
    price:89,
    header:"Economic",
    quantity:10

},
{
    id:5,
    img:"https://mediaim.expedia.com/cars/14/31cac5dc-bcfb-4c6d-88ec-2c3cfcd9807f.jpg?impolicy=resizecrop&ra=fit&rh=165&rw=165",
    name:"Maruti Ciaz",
    totalPerson:5,
    pickupLocation:"Ghaziabad, Uttar Pradesh, IND",
    type:"Manual",
    price:102,
    header:"MidSize",
    quantity:10

},{

    id:6,
    img:"https://imgd-ct.aeplcdn.com/320x200/n/cw/ec/131179/bolero-exterior-right-front-three-quarter.jpeg?isig=0&q=75",
    name:"Bolero",
    totalPerson:7,
    pickupLocation:"Ghaziabad, Uttar Pradesh, IND",
    type:"Manual",
    price:85,
    header:"Economic",
    quantity:10

},
{
    id:7,
    img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8uDKp-XB2xYIIrpzFW3ixB7dfK1swiJbQcA&usqp=CAU",
    name:"White Range Rover",
    totalPerson:7,
    pickupLocation:"New Delhi-kirti Nagar",
    type:"Automatic",
    price:71,
    header:"Luxury",
    quantity:10

},
{
    id:8,
    img:"https://media.zigcdn.com/media/model/2022/Jun/kia-ev6-2_270x180.jpg",
    name:"Fz5",
    totalPerson:5,
    pickupLocation:"Ghaziabad, Uttar Pradesh, IND",
    type:"Automatic",
    price:74,
    header:"Compact Monospace",
    quantity:10

},
{
    id:9,
    img:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2018-rolls-royce-phantom-1536152159.png?crop=0.888888888888889xw:1xh;center,top&resize=1200:*",
    name:"Ordor",
    totalPerson:4,
    pickupLocation:"Greet - Igi Terminal 1, New Delhi",
    type:"Manual",
    price:89,
    header:"Economic",
    quantity:10

},
{
    id:10,
    img:"https://english.cdn.zeenews.com/sites/default/files/2022/08/30/1084010-brezza-modified.jpg",
    name:"Brezza",
    totalPerson:5,
    pickupLocation:"Ghaziabad, Uttar Pradesh, IND",
    type:"Manual",
    price:102,
    header:"Economic",
    quantity:10

}
]

function addJsonData(store){
    var req=store.openCursor();
    req.onsuccess=function(){
        var cursor=req.result;
        if(cursor){}
        else{
            carData.forEach(element => {
                store.put(element);
            });
        }
    }
}
function updateDataBaseUsers(user){
    key=user.key;
    console.log(user,key);
    var idb=indexedDB.open("carRentDatabase");

    idb.onsuccess=function(){
        var db=idb.result;
        var tx=db.transaction("users","readwrite");
        var store=tx.objectStore("users");

        store.put(user,key);
    }

}
function createDataBase(){

    var  idb=indexedDB.open("carRentDatabase",7);
    var  db=null;
    idb.onupgradeneeded=function (e){
        
        db=idb.result;
        db.createObjectStore("users",{autoIncrement:true});
        db.createObjectStore("carData",{autoIncrement:true});
        db.createObjectStore("userSignUpDate",{keyPath:"date"});
        db.createObjectStore("bookingDate",{keyPath:"date"});
        

        
    }
    idb.onsuccess=function (e){
        
        db=idb.result;
        var tx=db.transaction("carData","readwrite");
        tx.onerror=function(e){
           
            console.log(e.target.error);
        }
       
        var store=tx.objectStore("carData");

        addJsonData(store);

        var request=store.openCursor();
        carNames=[];
        quantityData=[];
        request.onsuccess=function(){
            var  cursor=request.result;
            
            if(cursor){
                // cursor.value.booked=false;
                // store.put(cursor.value,cursor.key);
                // console.log(cursor.value.quantity);
                carNames.push(cursor.value.name);
                quantityData.push(10-cursor.value.quantity);
                var data={
                    key:cursor.key,
                    booked:false,
                    ...cursor.value
                }
                var  mainDiv=document.getElementById("cars__container");
        
                var  div1=document.createElement("div");
                var  img=document.createElement("img");
                var  div2=document.createElement("div");
                var  p1=document.createElement("p");
                var  p2=document.createElement("p");
                var  h5=document.createElement("h5");
                var  p3=document.createElement("p");
                var  p4=document.createElement("p");
                var  p5=document.createElement("p");
                var  rentBtn=document.createElement("button");
                div1.classList.add("card");
                div1.style.minWidth="274px"

                h5.className+="card-header"
                img.className+="card-img-top";
                img.style.objectFit="contain";
                img.style.maxWidth="200px";
                img.style.maxHeight="200px";
                img.style.alignSelf="center"
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
                rentBtn.type="button";
                rentBtn.innerText="Book Now";
                div2.appendChild(rentBtn);

                rentBtn.addEventListener("click",function(){
                    
                    user=JSON.parse(window.localStorage.getItem("currentUser"));

                    
                   if(user.bookingData){
                        var ndata=user.bookingData;
                        ndata.push(data);
                        user={
                            ...user,
                            bookingData:ndata
                        }
                   }else{
                        user={
                            ...user,
                            bookingData:[data],
                            
                        }

                   }
                    console.log(user);
                    updateDataBaseUsers(user);
                    
                   
                    
                    window.localStorage.setItem("currentUser",JSON.stringify(user));
                    window.location.href="./booking.html";
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
        alert("error")
        console.log(e);
    }
}

createDataBase();





function logOutHandler(){
    console.log("hi")
    window.localStorage.removeItem("currentUser");
    window.location.href="./login.html";
}
