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
    var store=tx.objectStore("carData")

    var request=store.openCursor();
    var carNames=[];
    var quantityData=[];
    request.onsuccess=function(){
        var  cursor=request.result;
        if(cursor){
            carNames.push(cursor.value.name);
            quantityData.push(10-cursor.value.quantity);
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