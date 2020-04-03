$(document).ready(function(){

var dataAttuale = moment('2018-01-01');
getGiorni(dataAttuale);

// al click su precedente --> passa a mese precedente
$('.prec').click(function(){
    dataAttuale.subtract(1, 'month');
    getGiorni(dataAttuale);
});


// al click su successivo --> passa a mese successivo
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
    $('#nome-mese').text(nomeMese); // combio nome mese dopo click
    for (i= 1; i <= giorniTarget; i++) {

        var htmlGiorno = $('#calendar-template').html();
        var templateGiorno = Handlebars.compile(htmlGiorno);

        var giornoInserito = {
            day: i + ' - ' + nomeMese,
            dataDay: meseTarget.format('YYYY-MM-DD')
        };

        var finale = templateGiorno(giornoInserito);
        $('#calendar').append(finale);
        meseTarget.add(1, 'day');
    }
}

function getFeste() {
    $.ajax({
        url: 'https://flynn.boolean.careers/exercises/api/holidays',
        method: 'GET',
    });
}

});