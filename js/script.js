$(document).ready(function(){

var dataAttuale = moment('2018-01-01');


// al click su precedente --> attiva mese precedente
$('.prec').click(function(){
    dataAttuale.subtract(1, 'month');
    getGiorni(dataAttuale);
});

// al click su successivo --> attiva mese successivo
$('.succ').click(function(){
    dataAttuale.add(1, 'month');
    getGiorni(dataAttuale);
});

// FUNZIONI

function getGiorni(target){
    $('#calendar').empty();
    var meseTarget = target.clone();  //clono il mese attuale
    var giorniTarget = meseTarget.daysInMonth(); //dal mese attuale estrapolo il numero di giorni 
    var nomeMese = target.format('MMMM'); //cambio nome mese dopo click
    $('#nome-mese').text(nomeMese); //
}
















});