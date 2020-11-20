function compruebaFormulario(){
    
    if(todasCorrectas()){
        //Si ha pasado todos los filtros, podemos enviar el formulario y borramos los errores
        document.getElementById("errorFechaPosterior").style.display = "none";
        if(window.confirm("Revise los datos antes de enviar el formulario. \n ¿Seguro que desea enviarlo?")){
            enviarFormulario();
        }
    }else{                  
        document.getElementById("Errores").style.display = "block";  
    }
    return 0; //¿Eliminar?
}

//Función que comprueba que todas los datos obligatorios son correctos
function todasCorrectas(){
    let dniBol = comprobarDNI();
    let emailBol = comprobarEMAIL();
    let tlfBol = comprobarTLF();
    let sexoBol = comprobarSEXO();
    let fechaBol = comprobarFecha();
    
    let resultado = new Boolean();
    
    resultado = dniBol && emailBol && tlfBol && sexoBol && fechaBol;
    
    return resultado;
    
}

//Función que comprueba que se ha introducido un DNI correcto (8 dígitos, 1 caracter) en el formulario
function comprobarDNI(){
    const DNI_REGEX = /^(\d{8})([A-Z])$/;  //Expresión regular del DNI (8 dígitos, 1 letra al final)
    let dni = document.getElementById("dni*").value;
    let bool = true;
    if(!DNI_REGEX.test(dni)){
        document.getElementById("errorDNI").style.display = "block";
        bool = false;
    }
    
    if(bool){
        document.getElementById("errorDNI").style.display = "none";   
    }
    
    return bool;
}

//Función que comprueba que el email es correcto en el formulario
function comprobarEMAIL(){
    const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  //Expresión regular del EMAIL (funciona al 99%, el 1% falla porque falta validación por parte del servidor)
    let email = document.getElementById("email").value;
    let bool = true;
    if(!EMAIL_REGEX.test(email)){
        document.getElementById("errorEMAIL").style.display = "block";
        bool = false;
    }
    
    if(bool){
        document.getElementById("errorEMAIL").style.display = "none";
    }
    return bool;
}

//Función que comprueba que se ha seleccionado un teléfono (9 dígitos) en el formulario
function comprobarTLF() {
    const TLF_REGEX = /^(\d{9})$/;
    let tlf = document.getElementById("telefono").value;
    let bool = true;
    if(!TLF_REGEX.test(tlf)){
        document.getElementById("errorTLF").style.display = "block";
        bool = false;
    }
    
    if(bool){
        document.getElementById("errorTLF").style.display = "none";
    }
    return bool;
}

//Función que comprueba que se ha seleccionado un sexo en el formulario
function comprobarSEXO(){    
    let sexo = new String();
    sexo = document.getElementById("opcionSexo").value;
    let bool = true;
    if(sexo == ""){
        document.getElementById("errorSEXO").style.display = "block";
        bool = false;
    }
    
    if(bool){
        document.getElementById("errorSEXO").style.display = "none";
    }
    return bool;
}

//Función que comprueba que la fecha de nacimiento cumple ciertas normas para ser correcta
function comprobarFecha(){
    let fecha = new String();
    fecha = document.getElementById("fechNacimiento").value;
    let fechaIntroducida = fecha.split("-");
    let fechaActual = new Date();
    let bool = false; 
    
    //Si la fecha no se ha introducido
    if(fecha == ""){
        document.getElementById("errorFechaDefault").style.display = "block";
        document.getElementById("errorFechaPosterior").style.display = "none";
    }else{
        document.getElementById("errorFechaDefault").style.display = "none";
        //Si el año es superior
        if(fechaIntroducida[0] > fechaActual.getFullYear()){ 
            document.getElementById("errorFechaPosterior").style.display = "block"; 
        }else{
            //Si el año es igual miro mes y día
            if(fechaIntroducida[0] == fechaActual.getFullYear() && fechaIntroducida[1] > fechaActual.getMonth()+1  && fechaIntroducida[2] > fechaActual.getDate()){
                document.getElementById("errorFechaPosterior").style.display = "block"; 
            }else{
                //Si el año y el mes es igual miro el día
                if(fechaIntroducida[0] == fechaActual.getFullYear() && fechaIntroducida[1] == fechaActual.getMonth()+1  && fechaIntroducida[2] > fechaActual.getDate()){
                    document.getElementById("errorFechaPosterior").style.display = "block"; 
                }else{
                    bool = true;
                }
            } 
        }
    }
    
    if(bool){
        document.getElementById("errorFechaPosterior").style.display = "none";  
    }
    
    return bool;
}

//Función que muestra el mensaje de que ha sido enviado
function enviarFormulario(){
    alert("Formulario enviado con éxito!");
}

//Función que resetea el formulario
function resetearFormulario(){
    alert("El formulario se va a reiniciar");
    document.getElementById("Errores").style.display = "none"; 
}

//Función que controla la redicción a la web oficial de RSI al hacer click sobre el logo
function logoRSI(){
    let opcion = confirm("¿Desea salir de este formulario?");
    if(opcion){
        window.location.href = "https://robertsspaceindustries.com/";
    }   
}

//Ocultamos los posibles errores

document.getElementById("Errores").style.display = "none";