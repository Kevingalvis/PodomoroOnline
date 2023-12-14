let $nombreTarea = document.getElementById('name');
let $submit = document.getElementById('submit');
let $btnRepts = document.getElementById('repts');
let $detenerPodomoro = document.getElementById('detenerPodomoro');

let $modoTimer = "trabajo";
let $conta = 1;

const $tablalist = document.getElementById('tabla-list');
const listPodomoro = [];

const $contPodomoro = document.getElementById('timePodomoro');
const $titlePodomoro = document.getElementById('titlePodomoro');

$submit.addEventListener('click',(e) =>{
    e.preventDefault();
  
    obtenerTimer();
    obtenerBreak();

    let objPodomoro = {
        title: $nombreTarea.value,
        timerPodo: obtenerTimer(),
        timerBreak: obtenerBreak(),
        cont: $btnRepts.value
    };

    listPodomoro.push(objPodomoro);
   
    mostrarDatos(listPodomoro)

    
});



function obtenerTimer(){
    const $tiempoPodomoro = document.querySelector('input[type=radio][name=checkbox1]:checked');
    return $tiempoPodomoro.value;
}


function obtenerBreak(){
    const $descansoPodomoro = document.querySelector('input[type=radio][name=checkBreak]:checked');
    return $descansoPodomoro.value;
}


function mostrarDatos (){
  limpiar();
    listPodomoro.map(item =>{ 
        const tr = document.createElement("tr"); 
            tr.innerHTML = `
                <td>${item.title}</td>
                <td>${item.timerPodo}</td>
                <td>${item.timerBreak}</td>
                <td>${item.cont}</td>
                <td><button id="btn-iniciar" onclick="iniciar(${item.timerPodo}, '${item.title}',${item.timerBreak}, ${item.cont})" class="btn-iniciar" >Iniciar</button>
                <td><button id="btn-eliminar" onclick="eliminarBtn()" class="btn-eliminar">Eliminar</button>
    
            `;

         

          let newTr = tr;
          $tablalist.appendChild(newTr)


         
   
    });

    

}


function limpiar (){
  while($tablalist.firstChild){
    $tablalist.removeChild($tablalist.firstChild); }
}



function iniciar(data, podomorotitle, dataBreak, dataCont){
 
  let $btnIniciar = document.querySelectorAll('#btn-iniciar');
  let $btnDelete = document.querySelectorAll('#btn-eliminar');

  $detenerPodomoro.style.cursor = "pointer";
  $detenerPodomoro.style.background = "#1C618C";
  $detenerPodomoro.style.borderColor = "#1C618C";
  $detenerPodomoro.style.opacity = "1";

  $detenerPodomoro.addEventListener('click',()=>{
    alert("Tarea Cancelada");
    $btnIniciar.forEach(btnStandar =>{
      btnStandar.textContent = "Iniciar";
      btnStandar.disabled = false;
      btnStandar.style.opacity = 1;
      btnStandar.style.cursor ="pointer"; 

      $contPodomoro.textContent = `00:00`;
      $titlePodomoro.innerHTML = `Sin Tareas`

      $detenerPodomoro.style.cursor = "not-allowed";
      $detenerPodomoro.style.background = "#b32302";
      $detenerPodomoro.style.borderColor = "#b32302";
      $detenerPodomoro.style.opacity = "0.5";


    });
      $btnDelete.forEach(btnDeleteStandar =>{
      
      btnDeleteStandar.disabled = false;
      btnDeleteStandar.style.opacity = 1;
      btnDeleteStandar.style.cursor ="pointer"; 


    });
    clearInterval(finalTimer);
  }); 

  bloquearBtn($btnIniciar, $btnDelete);
    
   
    let segTotales = data * 60;
    let timerBreakPodomoro = dataBreak;


    const cuentaRegresiva =  () => {
    let minutosEnteros = Math.floor(segTotales / 60);
    let segundosEnteros = segTotales % 60;
    
    if(segundosEnteros < 10){
      segundosEnteros = "0" + segundosEnteros;
      
    }



    segTotales--;
  

    if($modoTimer === "trabajo"){
      if(segTotales < 0){
        if($conta < dataCont ){
          $conta++;
          $modoTimer = "descanso";
          segTotales = timerBreakPodomoro * 60;
          $titlePodomoro.innerHTML = `Descanso!!!`
        }else{
            $btnIniciar.forEach(btnStandar =>{
            btnStandar.textContent = "Iniciar";
            btnStandar.disabled = false;
            btnStandar.style.opacity = 1;
            btnStandar.style.cursor ="pointer"; 


          });
            $btnDelete.forEach(btnDeleteStandar =>{
            
            btnDeleteStandar.disabled = false;
            btnDeleteStandar.style.opacity = 1;
            btnDeleteStandar.style.cursor ="pointer"; 


          });




          alert("Tarea Completada");
          clearInterval(finalTimer);
        }
       
      }

      
    }else{
      if(segTotales < 0){
        $modoTimer = "trabajo";
       
        console.log("ingresamos al podo");
        segTotales = data * 60;
        $titlePodomoro.innerHTML = `${podomorotitle}`; 
      }
    }

    $contPodomoro.textContent = `${minutosEnteros}:${segundosEnteros}`;
    
  }

 const finalTimer = setInterval(() => cuentaRegresiva(),1000);

 $titlePodomoro.innerHTML = `${podomorotitle}`; 



 
 
}




function bloquearBtn (botones, botonDelete){
    botones.forEach(btnList =>{

    btnList.textContent = "En Proceso!!!";
    btnList.disabled = true;
    btnList.style.opacity = 0.5;
    btnList.style.cursor ="not-allowed";
  

  }); 
  botonDelete.forEach(btnDelete =>{

     
    btnDelete.disabled = true;
    btnDelete.style.opacity = 0.5;
    btnDelete.style.cursor ="not-allowed";
  

  }); 


 
}
function eliminarBtn (){
  let deleteBtn = document.querySelectorAll('#btn-eliminar');

  deleteBtn.forEach(item =>{
    item.addEventListener('click', (e)=>{
      const list = e.target.parentElement.parentElement;
      $tablalist.removeChild(list);

      listPodomoro.splice(item,1);
      console.log(listPodomoro)

    });
  });
 
  

}
















































//$tiempoPodomoro.forEach(check =>{
//    check.addEventListener('change', ()=>{
//        let selectCheck = check.value
//            $breakPodomoro.forEach(checkBreak =>{
//                checkBreak.addEventListener('change', () =>{
//                    let descanso = checkBreak.value 
                     /** EVENTO SUBMIT */
//                        $submit.addEventListener('click', (e) =>{
                            /**quitamos el evento del btn submit */
//                            e.preventDefault();
                           
                            /**VALIDACION DE LOS INPUTS*/
  //                          if(!$nombreTarea.value) return alert('ESTE CAMPO ESTA VACIO');
                            
    //                        const $objTareas = {
      //                          title: $nombreTarea.value,
        //                        timer:selectCheck,
          //                      podomoroBreak: descanso,
           //                     cont:$btnRepts.value
             //               };

               //             console.log($objTareas, "DENTRO DEL SUBMIT");
                            
                 //       });

                       
                   // });
               // });
            
           // });
        //});

