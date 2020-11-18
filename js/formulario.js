function compruebaFormulario(){
    
    if(comprobarDNI() && comprobarEMAIL() && comprobarTLF() && comprobarSEXO() && comprobarFecha()){
        //Si ha pasado todos los filtros, podemos enviar el formulario y borramos los errores
        document.getElementById("errorFecha").style.display = "none";
        let mandarFormulario = window.confirm("Revise los datos antes de enviar el formulario. \n ¿Seguro que desea enviarlo?");
        if(mandarFormulario){
            alert("True");
            // enviarFormulario();
        }
    }else{                  
        document.getElementById("Errores").style.display = "block";  
    }
}


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

function comprobarFecha(){
    let fecha = new String();
    fecha = document.getElementById("fechNacimiento").value;
    let fechaIntroducida = fecha.split("-");
    let fechaActual = new Date();
    let bool = true;
    if(fechaIntroducida[0] > fechaActual.getFullYear() || fechaIntroducida[1] > fechaActual.getMonth()+1  || fechaIntroducida[2] > fechaActual.getDate()){
        document.getElementById("errorFecha").style.display = "block";  
        bool = false;
    }

    if(bool){
        document.getElementById("errorFecha").style.display = "none";  
    }

    return bool;
}

function enviarFormulario(){
    alert("Formulario enviado con éxito!");
}

function resetearFormulario(){
    alert("El formulario se va ha reiniciar");
}

function logoMSI(){
    let opcion = confirm("¿Desea salir de este formulario?");
    if(opcion){
        window.location.href = "https://robertsspaceindustries.com/";
    }   
}

//Ocultamos los posibles errores

document.getElementById("Errores").style.display = "none";
/*
document.getElementById("errorDNI").style.display = "none";  
document.getElementById("errorEMAIL").style.display = "none";
document.getElementById("errorTLF").style.display = "none";
document.getElementById("errorSEXO").style.display = "none";
document.getElementById("errorFecha").style.display = "none";
*/