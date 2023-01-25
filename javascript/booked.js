var user=(JSON.parse(window.localStorage.getItem("currentUser")));

if(user){
    document.getElementById("signIn").style.display="none";
    document.getElementById("signUp").style.display="none";
    if(user.email==="admin1@gmail.com"){
        document.getElementById("admin").style.display="block";
    }else{
        document.getElementById("admin").style.display="none";
    }
    var bookedCar=user.carData;
    bookedCar.forEach(data => {
        
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
        var  p6=document.createElement("p");

        var  rentBtn=document.createElement("button");
        div1.classList.add("card");
        div1.style.width="274px"

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
        rentBtn.innerText="Book Now";

        var d1=new Date(data.pickupTime);
        var d2=new Date();
        var d3=new Date(data.dropOffTime);
        p6.className+="card-text"
        p6.innerText="pickUp: "+d1.toLocaleString("en-GB") + " & " + "drop-Off: "+d3.toLocaleString("en-GB");
        div2.appendChild(p6)
        if(d1>d2){
            div1.style.border="1px solid rgb(167, 235, 167)";
            
        }else{
            div1.style.border="1px solid orange";
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

