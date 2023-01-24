
let carData=[{

    id:1,
    img:"https://mediaim.expedia.com/cars/14/a0f1abba-78ff-4a1a-a8fe-356dd588ab7d.jpg?impolicy=resizecrop&ra=fit&rh=165&rw=165",
    name:"Maruti Baleno 1.2",
    totalPerson:5,
    pickupLocation:"Ghaziabad, Uttar Pradesh, IND",
    type:"Manual",
    price:85,
    header:"Economic"

},
{
    id:2,
    img:"https://mediaim.expedia.com/cars/14/9180d2c1-ba15-42db-b0f4-4e88ab972bda.jpg?impolicy=resizecrop&ra=fit&rh=165&rw=165",
    name:"Hyundai I10 Grand",
    totalPerson:4,
    pickupLocation:"New Delhi-kirti Nagar",
    type:"Manual",
    price:71,
    header:"Economic"

},
{
    id:3,
    img:"https://mediaim.expedia.com/cars/14/4109290a-f688-47e4-b97f-d67315c629f0.jpg?impolicy=resizecrop&ra=fit&rh=165&rw=165",
    name:"Toyota Etios",
    totalPerson:5,
    pickupLocation:"Ghaziabad, Uttar Pradesh, IND",
    type:"Manual",
    price:74,
    header:"Compact Monospace"

},
{
    id:4,
    img:"https://mediaim.expedia.com/cars/14/457aae52-f12b-40d4-ba04-35e3c79234a5.jpg?impolicy=resizecrop&ra=fit&rh=165&rw=165",
    name:"Ford Ecosport",
    totalPerson:5,
    pickupLocation:"Greet - Igi Terminal 1, New Delhi",
    type:"Manual",
    price:89,
    header:"Economic"

},
{
    id:5,
    img:"https://mediaim.expedia.com/cars/14/31cac5dc-bcfb-4c6d-88ec-2c3cfcd9807f.jpg?impolicy=resizecrop&ra=fit&rh=165&rw=165",
    name:"Maruti Ciaz",
    totalPerson:5,
    pickupLocation:"Ghaziabad, Uttar Pradesh, IND",
    type:"Manual",
    price:102,
    header:"MidSize"

}
]

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
var id = location.search.split('?id=')[1];



var data1=carData.filter(function(e){
    return e.id==id;
})

var data=data1[0];

let mainDiv=document.getElementById("container");
        
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
p2.innerText="Rs. "+(data.price);
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