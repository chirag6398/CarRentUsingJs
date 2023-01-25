var user=(JSON.parse(window.sessionStorage.getItem("currentUser")));

if(user){
    document.getElementById("signIn").style.display="none";
    document.getElementById("signUp").style.display="none";

    var data=user.carData;
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

}else{
    window.location.href="./login.html";
}