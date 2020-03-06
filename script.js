const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const mcount = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

//+ same as parseint
let ticketPrice = +movieSelect.value;

//console.log(ticketPrice);

//update end count to multiply by
function updateCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    //console.log(selectedSeats);


    //copy selected seats into arr
    //map through arr
    //return a new arr indexes
    
    //spread opp ... on arr
    //spread opp eg const arr = [1,2]; const arr2 = [...,3,4] = arr2 is now 1,2,3,4 ,spread copies in an array
    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    });

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    //console.log(selectedSeatsCount);

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice; 
    
}

//save to local storage movie and price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

//Movie selection
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateCount();
})


//Seat click

container.addEventListener('click', (e) => {
    //console.log(e.target);
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        //console.log(e.target);
        e.target.classList.toggle('selected');

        updateCount();
    }
})

//grab from local storage any information and populate the UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat,index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }

}

//initial count and total
updateCount();