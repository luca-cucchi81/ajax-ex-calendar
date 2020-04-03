$(document).ready(function(){

var dataAttuale = moment('2018-01-01');
console.log(dataAttuale);

// al click su precedente --> attiva mese precedente
$('.prec').click(function(){
    dataAttuale.subtract(1, 'month');
    console.log(dataAttuale);
});

// al click su successivo --> attiva mese successivo
$('.succ').click(function(){
    dataAttuale.add(1, 'month');
    console.log(dataAttuale);
});
















});