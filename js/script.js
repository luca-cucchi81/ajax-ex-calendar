$(document).ready(function(){

   
var weekDays = [
        'Lunedì',
        'Martedì',
        'Mercoledì',
        'Giovedì',
        'Venerdì',
        'Sabato',
        'Domenica'
    ]

    for (var i = 0; i < 7; i++) {
        var source = $('#square-template').html();
        var template = Handlebars.compile(source);

        var context = {
            weekDay: weekDays[i],
        };
        var num = template(context);
        $('.week-days').append(num);
    }


var dataAttuale = moment('2018-01-01');
var stopIniziale = moment('2018-01-01');
var stopFinale = moment('2018-12-01');
$('.prec').prop('disabled', true);
$('.succ').prop('disabled', false);
getGiorni(dataAttuale);
getFeste(dataAttuale);


// al click su precedente --> passa a mese precedente
$('.prec').click(function(){
    $('.succ').prop('disabled', false);
    dataAttuale.subtract(1, 'month');
    getGiorni(dataAttuale);
    getFeste(dataAttuale);
    if (dataAttuale.isSameOrBefore(stopIniziale)) {
        $('.prec').prop('disabled', true);
    }
});


// al click su successivo --> passa a mese successivo
$('.succ').click(function(){
    $('.prec').prop('disabled', false);
    dataAttuale.add(1, 'month');
    getGiorni(dataAttuale);
    getFeste(dataAttuale);
    if (dataAttuale.isSameOrAfter(stopFinale)) {
        $('.succ').prop('disabled', true);
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