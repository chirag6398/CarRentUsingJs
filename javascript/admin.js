var user=(JSON.parse(window.localStorage.getItem("currentUser")));
if((user)){
    document.getElementById("signIn").style.display="none";
    document.getElementById("signUp").style.display="none";
    
    if(user.email==="admin1@gmail.com"){
        document.getElementById("admin").style.display="block";
    }else{
        document.getElementById("admin").style.display="none";
    }

   

}else{
    window.location.href="./login.html";
}
var  idb=indexedDB.open("carRentDatabase");
var  db=null;

idb.onsuccess=function (e){
    
    db=idb.result;
    var tx=db.transaction("carData","readwrite");
    tx.onerror=function(e){
        console.log(e.target.error);
    }
    var store=tx.objectStore("carData");
    var tx2=db.transaction("users","readwrite");
    tx2.onerror=function(e){
        console.log(e.target.error);
    }
    var store2=tx2.objectStore("users")

    var request=store.openCursor();
    var request2=store2.openCursor();

    var carNames=[];
    var quantityData=[];
    var userEmails=[];
    var userNoOfBookings=[];
    request2.onsuccess=function(){
        var cursor2=request2.result;
        if(cursor2){
            userEmails.push(cursor2.value.email);
            // console.log(cursor2.value)
            if(cursor2.value.carData)
                userNoOfBookings.push(cursor2.value.carData.length);
            else{
                userNoOfBookings.push(0);
            }
            cursor2.continue();
        }else{
            var ctx1=document.getElementById("myChart1").getContext("2d");
            var myChart1=new Chart(ctx1,{
                type:"line",
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

        }
    }
    request.onsuccess=function(){
        var  cursor=request.result;
        if(cursor){
            carNames.push(cursor.value.name);
            quantityData.push(10-cursor.value.quantity);
            cursor.continue();
        }else{
            // console.log(carNames,"  ",quantityData)
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