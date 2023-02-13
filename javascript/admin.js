var user=(JSON.parse(window.localStorage.getItem("currentUser")));

if((user)){
    document.getElementById("signIn").style.display="none";
    document.getElementById("signUp").style.display="none";
    
    if(user.email==="admin1@gmail.com"){
        document.getElementById("admin").style.display="block";
    }else{
        document.getElementById("admin").style.display="none";
        window.location.href="./index.html";
    }

   

}else{
    window.location.href="./login.html";
}

function getUpComingBookingDetails(){
    var idb=indexedDB.open("carRentDatabase");
    idb.onsuccess=function(){
        var db=idb.result;
        var tx=db.transaction("bookingDate","readonly");
        var store=tx.objectStore("bookingDate");
        var req=store.openCursor();
        var countBooking=0;
        var advancedMoney=0;
        
        req.onsuccess=function(){
            var cursor=req.result;
           
            if(cursor){
                cursor.value.car.forEach(car => {
                    
                    if((new Date(car.pickupTime))>=(new Date())){
                        countBooking+=1;
                        if(car.charge){
                            advancedMoney+=car.charge;
                        }
                    }
                });
                
                cursor.continue();
            }else{
                document.getElementById("upComingData").innerText="UpComingBooking: "+countBooking;
                document.getElementById("totalPay").innerText="Advanced Money: "+advancedMoney;
            }
        }
    }
}
getUpComingBookingDetails();

var carNames=[];

function carAnalysis(){
    var  idb=indexedDB.open("carRentDatabase");
    var  db=null;
    idb.onsuccess=function (e){

    db=idb.result;
    var tx=db.transaction("carData","readwrite");
    tx.onerror=function(e){
        console.log(e.target.error);
    }
    var store=tx.objectStore("carData");
    var request=store.openCursor();
    request.onsuccess=function(){
        var cursor=request.result;
        if(cursor){
            carNames.push(cursor.value.name);
            cursor.continue();
        }else{
            console.log(carNames)
            var tx=db.transaction("bookingDate","readwrite");
            tx.onerror=function(e){
                console.log(e.target.error);
            }
            var store=tx.objectStore("bookingDate");
            var req=store.openCursor();
            var quantityData=new Array(carNames.length).fill(0);
        
            req.onsuccess=function(){
                var  cursor=req.result;
                if(cursor){
                    cursor.value.car.forEach(function(car){
                        quantityData[car.key-1]+=1;
                        
                    })
                    cursor.continue();
                }else{
                    console.log(carNames,"  ",quantityData)
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
    }

    }
}
carAnalysis();
function userAnalysis(){
    var  idb=indexedDB.open("carRentDatabase");
    var  db=null;
    idb.onsuccess=function (e){
    
        db=idb.result;
       
        var tx2=db.transaction("users","readwrite");
        tx2.onerror=function(e){
            console.log(e.target.error);
        }
        var store2=tx2.objectStore("users")
    
       
        var request2=store2.openCursor();
    
        
        
        
        var userEmails=[];
        var userNoOfBookings=[];
        var userExpenditure=[];

        request2.onsuccess=function(){
            var cursor2=request2.result;
            if(cursor2){
                userEmails.push(cursor2.value.email);
                // console.log(cursor2.value.carData)
                if(cursor2.value.carData!==undefined){
                    userNoOfBookings.push(cursor2.value.carData.length);
                    var expenditure=0;
                    cursor2.value.carData.forEach(function(data){
                        expenditure+=data.charge;
                    });
                    userExpenditure.push(expenditure);
                }
                else{
                    userNoOfBookings.push(0);
                    userExpenditure.push(0);
                }

                cursor2.continue();
            }else{
                console.log(userEmails,userNoOfBookings,"    ",userExpenditure);

                var ctx1=document.getElementById("myChart1").getContext("2d");
                var myChart1=new Chart(ctx1,{
                    type:"pie",
                    data:{
                        labels:userEmails,
                        datasets:[
                            {
                                data:userNoOfBookings,
                                label:"User Activity",
                                backgroundColor:["red","yellow","blue","grey","brown","violet"]
            
                            },
                        ],
                    },
                });
                var ctx2=document.getElementById("myChart3").getContext("2d");
                var myChart3=new Chart(ctx2,{
                    type:"bar",
                    data:{
                        labels:userEmails,
                        datasets:[
                            {
                                data:userExpenditure,
                                label:"User Activity",
                                backgroundColor:["red","yellow","blue","grey","brown","violet"]
            
                            },
                        ],
                    },
                });

                document.getElementById("noOfCustomer").innerText="Customers: "+userEmails.length
    
            }
        }

        
        
    }

}
userAnalysis();

var myChart=null;
function showHandler(){
   
    if(myChart!=null){
        myChart.destroy();
        document.getElementById("carBookGraph").style.display="none";

    }
    var sdate=document.getElementById("sdate").value;
    var edate=document.getElementById("edate").value;
    if(!sdate || !edate ){
        alert("please select date and time from both fields");
        return ;
    }
    var d1=new Date(sdate).toDateString();
    var d2=new Date(edate).toDateString();
    var idb=indexedDB.open("carRentDatabase");
    idb.onsuccess=function(){

        var db=idb.result;
        var tx=db.transaction("bookingDate","readonly");
        var store=tx.objectStore("bookingDate");
        var req=store.openCursor();
        var carBooked=new Array(carNames.length).fill(0);
        req.onsuccess=function(){
            var cursor=req.result;
            if(cursor){
                console.log("all",cursor.value);
                if((new Date(cursor.key))>=(new Date(d1)) &&(new Date(cursor.key))<=(new Date(d2))){
                    console.log("valid",cursor.value);
                    cursor.value.car.forEach(function(car){
                        carBooked[car.key-1]+=1;
                        
                    })


                }
                cursor.continue();
            }else{
                console.log(carNames,carBooked);
                
                document.getElementById("carBookGraph").style.display="flex";
                var ctx=document.getElementById("myChart2").getContext("2d");

                myChart=new Chart(ctx,{
                    type:"bar",
                    data:{
                        labels:carNames,
                        datasets:[
                            {
                                data:carBooked,
                                label:"Car Booked",
                                backgroundColor:["red","yellow","blue","grey","brown","violet"]
            
                            },
                        ],
                    },
                });

                // myChart.destroy();
            }
        }
    }

}

function logOutHandler(){
    console.log("hi")
    window.localStorage.removeItem("currentUser");
    window.location.href="./login.html";
}
function userSignUpDateAnalysis(){
    var  idb=indexedDB.open("carRentDatabase");

    idb.onsuccess=function(){
        var db=idb.result;
        var tx=db.transaction("userSignUpDate","readonly");
        var store=tx.objectStore("userSignUpDate");
        var req=store.openCursor();
        var dates=[];
        var userCount=[];
        req.onsuccess=function(){
            var cursor=req.result;
            if(cursor){
                userCount.push(cursor.value.user.length);
                dates.push(cursor.value.date);
                cursor.continue();
            }
            else{
                var ctx=document.getElementById("myChart4").getContext("2d");

                myChart=new Chart(ctx,{
                    type:"line",
                    data:{
                        labels:dates,
                        datasets:[
                            {
                                data:userCount,
                                label:"Car Booked",
                                backgroundColor:["red","yellow","blue","grey","brown","violet"]
            
                            },
                        ],
                    },
                });

            }
        }

    }

}

userSignUpDateAnalysis();