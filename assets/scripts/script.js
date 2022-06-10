// display todays current date on page
var today = moment().format('MMMM Do, YYYY');
$("#currentDate").html("<i class='fa-style fa-solid fa-calendar-day'></i>" + today);
