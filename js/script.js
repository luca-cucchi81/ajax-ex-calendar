$(document).ready(function(){


var dataAttuale = moment('2018-01-01');
getGiorni(dataAttuale);
getFeste(dataAttuale);

// al click su precedente --> passa a mese precedente
$('.prec').click(function(){
    dataAttuale.subtract(1, 'month');
    getGiorni(dataAttuale);
    getFeste(dataAttuale);
    if (dataAttuale.format('YYYY') == 2017){    /* check validazione anno precedente al 2018 */
        $('html').empty(); /* svuoto la pagina */
        alert('ATTENZIONE NON SEI PIU\' NEL 2018'); /* avvio l'allert */
        location.reload(); /* ricarico la pagina iniziale (Gennaio 2018) */
    }
});


// al click su successivo --> passa a mese successivo
$('.succ').click(function(){
    dataAttuale.add(1, 'month');
    
    getGiorni(dataAttuale);
    getFeste(dataAttuale);
    if (dataAttuale.format('YYYY') == 2019){  /* check validazione anno successivo al 2018 */
        $('html').empty(); /* svuoto la pagina */
        alert('ATTENZIONE NON SEI PIU\' NEL 2018'); /* avvio l'allert */
        location.reload(); /* ricarico la pagina iniziale (Gennaio 2018) */
    }
});

  
// FUNZIONI

/* funzione estrapola giorni mese */
function getGiorni(target){
    $('#calendar').empty();
    var giornoMeseIniziale = dataAttuale.isoWeekday();
    stampaFittizzi(giornoMeseIniziale);
    var meseTarget = target.clone();  //clono il mese attuale
    var giorniTarget = meseTarget.daysInMonth(); //dal mese attuale estrapolo il numero di giorni 
    var nomeMese = target.format('MMMM'); //cambio nome mese dopo click
    $('#nome-mese').text(nomeMese); // combio nome mese dopo click
    
    for (i= 1; i <= giorniTarget; i++) {
      
        var htmlGiorno = $('#calendar-template').html();
        var templateGiorno = Handlebars.compile(htmlGiorno);

        var giornoInserito = {
            day: i,
            dataDay: meseTarget.format('YYYY-MM-DD')
        };

        var finale = templateGiorno(giornoInserito);
        $('#calendar').append(finale);
        meseTarget.add(1, 'day');
    }
}

/* funzione estrapola festività */
function getFeste(festa) {
    $.ajax({
        url: 'https://flynn.boolean.careers/exercises/api/holidays',
        method: 'GET',
        data:{
            year: festa.year(), /* per leggere l'anno prima e dopo il 2018 --> permette il check validazione anno (vedi sopra) */
            month: festa.month() /* restituisce il mese di riferimento secondo un intero (es: 0 per gen, 1 per feb etc.) visto in documentazione moment.js */
        },
        success: function (data) {
            var giorniFestivi = data.response;
            for (var i = 0; i < giorniFestivi.length; i++) {
                var giornoFestivo = giorniFestivi[i];
                var nomeFestivo = giornoFestivo.name;
                var dataFestivo = giornoFestivo.date;
                $('#calendar li[data-day="' + dataFestivo + '"]').addClass('festivo').append(nomeFestivo); 
                $('.feste-container li[data-day="' + dataFestivo + '"]').addClass('festa');  /* some extra CSS */
            }
        },
        
    });
}

function stampaFittizzi(check) {
    for (i= 0; i < check - 1 ; i++) {
        var contenitore = '<div class="feste-container"></div>';
        $('#calendar').append(contenitore);
    }
}
});