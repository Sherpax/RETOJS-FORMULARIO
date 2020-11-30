"use strict"; //Usamos esto para obligar a utilizar el JS más moderno posible, y evitar errores 'silenciosos' de versiones antiguas

function compruebaFormulario(){
    
    if(todasCorrectas()){
        //Si ha pasado todos los filtros, podemos enviar el formulario y borramos los errores
        document.getElementById("Errores").style.display = "none";
        if(window.confirm("Revise los datos antes de enviar el formulario. \n ¿Seguro que desea enviarlo?")){
            enviarFormulario();
        }
    }else{                  
        document.getElementById("Errores").style.display = "block";  
    }
    
    return 0; 
}

//Función que comprueba que todas los datos obligatorios son correctos
function todasCorrectas(){
    let nickname = comprobarNickName();
    let dniBol = comprobarDNI();
    let nombre = compruebaNombre();
    let apellidos = compruebaApellido();
    let emailBol = comprobarEMAIL();
    let tlfBol = comprobarTLF();
    let direccion = comprobarDireccion();
    let sexoBol = comprobarSEXO();
    let estadoCivil = comprobarEstadoCivil();
    let fechaBol = comprobarFecha();
    
    
    let resultado = new Boolean();
    
    resultado = nickname && nombre && apellidos && dniBol && emailBol && 
    tlfBol && direccion && sexoBol && estadoCivil && fechaBol;
    
    return resultado;
    
}

//Función que comprueba el nombre de usuario
function comprobarNickName(){
    let nickname = new String();
    nickname = document.getElementById("nickname").value;
    //Comprobamos si el campo está vacío
    if(nickname.trim() == ""){
        document.getElementById("errorNickname").style.display = "block";
    }else{
        document.getElementById("errorNickname").style.display = "none";
    }
    
    return !nickname.trim() == "";
}

//Función que comprueba el nombre real de la persona
function compruebaNombre(){
    
    let nombre = new String();
    nombre = document.getElementById("nombre").value;
    let esCorrecto = new Boolean();
    esCorrecto = false;
    
    if(nombre.length > 15){ 
        document.getElementById("errorNombreLongitud").style.display = "block";
    }else{
        document.getElementById("errorNombreLongitud").style.display = "none";
        esCorrecto = true;
        
    }
    return esCorrecto;
}

//Función que comprueba el apellido real de la persona
function compruebaApellido(){
    
    let apellidos = new String();
    apellidos = document.getElementById("apellidos").value;
    let esCorrecto = new Boolean();
    esCorrecto = false;
    
    if(apellidos.length > 25){ 
        document.getElementById("errorApellidoLongitud").style.display = "block";
    }else{
        document.getElementById("errorApellidoLongitud").style.display = "none";
        esCorrecto = true;
    }
    return esCorrecto;
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

function comprobarDireccion(){
    
    let direccion = new String();
    direccion = document.getElementById("direccion").value;
    let esCorrecto = new Boolean();
    esCorrecto = false;
    
    if(direccion.length > 40){ 
        document.getElementById("errorDireccion").style.display = "block";
    }else{
        document.getElementById("errorDireccion").style.display = "none";
        esCorrecto = true;
    }
    return esCorrecto;
    
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

function comprobarEstadoCivil(){
    
    let sexo = new String();
    sexo = document.getElementById("estCivil").value;
    let bool = true;
    if(sexo == ""){
        document.getElementById("errorCivil").style.display = "block";
        bool = false;
    }
    
    if(bool){
        document.getElementById("errorCivil").style.display = "none";
    }
    return bool;
    
}

//Función que comprueba que la fecha de nacimiento cumple ciertas normas para ser correcta
function comprobarFecha(){
    let fecha = new String();
    fecha = document.getElementById("fechNacimiento").value;
    let fechaIntroducida = fecha.split("-"); //Hacemos un split para crear el constructor con los datos introducidos en la fecha
    fechaIntroducida = new Date(fechaIntroducida[0],fechaIntroducida[1]-1,fechaIntroducida[2]); //Le restamos 1 al mes, ya que va de 0-11 y no de 1-12
    let fechaActual = new Date();
    let bool = false; 
    
    //Si la fecha no se ha introducido
    if(fecha == ""){
        document.getElementById("errorFechaDefault").style.display = "block";
        document.getElementById("errorFechaPosterior").style.display = "none";
    }else{
        //Comprobamos que las fecha introducida no sea superior a la actual (no puede haber nacido mañana)
        document.getElementById("errorFechaDefault").style.display = "none";
        //Si la fecha introducida es superior a la actual
        if(fechaIntroducida > fechaActual){ 
            document.getElementById("errorFechaPosterior").style.display = "block"; 
        }else{
            document.getElementById("errorFechaPosterior").style.display = "none"; 
            bool = true;
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