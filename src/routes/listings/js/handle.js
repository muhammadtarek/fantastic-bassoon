export class MyClass {

  constructor() {

  }}

  let style = require('./../css/base.css');
  let style1 = require('./../css/screen.css');

 
  let style3 = require('./../css/skeleton.css');



let url = 'http://127.0.0.1:3006/api/reservation';

function loaduser(){

    let xmlhttp = new XMLHttpRequest();    
    xmlhttp.open("GET",url,true);
    xmlhttp.onreadystatechange = function(){
        console.log(xmlhttp.readyState);
        
        if(xmlhttp.readyState === 4 && xmlhttp.status ===200){
            let reservations = JSON.parse(xmlhttp.responseText);
            let marketplace = document.getElementById('market');
            console.log(reservations);

           
            for(let i=0 ;i<reservations.data.length;i++){
                let itemInnerHtml = `<div class="one_third lastcolumn">
            <figure class="shadow"><img src="http://localhost:3006/${reservations.data[i].carId.images[0]}" alt="alt" class="itempic" />
              <figcaption> <a href="#">
               <h2 class="heading">${reservations.data[i].carId.name}</h2>
                <h3 class="heading">Start time :${reservations.data[i].startTime}</h3>
                <h3 class="heading">End time :${reservations.data[i].endTime}</h3>
                </a>
                <p class="bioquote">${reservations.data[i].carId.description} </p>
              </figcaption>
            </figure>
          </div>`;
          marketplace.innerHTML += itemInnerHtml;
                
            }
           
            //console.log(users);

            
        }
        
    };
    xmlhttp.send();
}
loaduser();