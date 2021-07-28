let myTasks = new Tasks();

//Selectores del HTML
const checklistInput = document.querySelector ('.checklist-input');
const checklistButton = document.querySelector ('.checklist-button');
const checklistList = document.querySelector ('.checklist-list');
const filterChecklist = document.querySelector('.filter-checklist');

//Chequear storage
myTasks.loadStorage();

//Event listeners
checklistButton.addEventListener("click" , myTasks.newTask);

//Placeholder
let date = new Date();
let currentHour = date.getHours();
let msg = '';
if(currentHour >= 6 && currentHour < 12){
    msg = '¿Qué vamos a hacer hoy?';
} else if(currentHour >= 12 && currentHour < 22) {
    msg = '¿Qué nos falta hacer?'
} else {
    msg = '¿Qué hacemos mañana?'
}
let placeholder = document.getElementById('placeholder').placeholder = msg;

//Jquery
$('.checkbox').click(function(){
    if($('input.checkbox').is(':checked')){
        $('.theme').attr('href', './Estilos/dark.css');
    }else{
        $('.theme').attr('href', './Estilos/light.css');
    }
});

//AJAX - Tarjetas
let HTMLCard = "";
let contenidoJSON = [];

function cargoTarjetasNoticias(){
    $.ajax({
        url:"./JS/lista.json",
        dataType: "json",
        success: function(data){
            contenidoJson = data
            $("#noticias").html(`<div class="noticias-h4">
                                    <h4>Articulos Relacionados</h4>
                                </div>
                                            `)
            $.each(contenidoJson, function(i, card){                
                const HTMLCard = `
                                <div class="card-container">
                                <a href="${card.link}" class="${card.clase}">
                                <h4>${card.titulo}</h4>
                                <img class="imagenes-cards" src="${card.imagen}">
                                </a>
                                </div>
                            `
                $("#noticias").append(HTMLCard);
            })
            $('#noticias').fadeIn("fast", function() {
                $("#cargando-noticias").fadeOut("fast")
            })            
        }
    })
}
setTimeout( () => cargoTarjetasNoticias(), 2500)