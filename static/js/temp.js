document.addEventListener("DOMContentLoaded", function () {
    
    let seatData = {};

    // Function to initialize seat data for each date and time combination
    function initializeSeatData() {
        let dates = document.querySelectorAll("input[name='date']");
        let times = document.querySelectorAll("input[name='time']");

        dates.forEach((date) => {
            times.forEach((time) => {
                let key = `${date.id}-${time.id}`;
                seatData[key] = [];

                for (let i = 0; i < 60; i++) {
                    let randint = Math.floor(Math.random() * 2);
                    seatData[key].push({
                        booked: randint === 1,
                        selected: false
                    });
                }
            });
        });
    }

    // Function to update the seats based on the current selected date and time
    function updateSeats() {
        let currentDate = document.querySelector("input[name='date']:checked").id;
        let currentTime = document.querySelector("input[name='time']:checked").id;
        let key = `${currentDate}-${currentTime}`;
        let seats = document.querySelector(".all-seats");

        // Clear all existing seats
        seats.innerHTML = "";

        // Add seats based on the current state in seatData
        seatData[key].forEach((seat, index) => {
            let checked = seat.selected ? "checked" : "";
            let disabled = seat.booked ? "disabled" : "";
            let bookedClass = seat.booked ? "booked" : "";

            seats.insertAdjacentHTML(
                "beforeend",
                `<input type="checkbox" name="tickets" id="s${index + 1}" ${disabled} ${checked} />
                  <label for="s${index + 1}" class="seat ${bookedClass}"></label>`
            );
        });

        // Add event listeners to the newly created seats
        addSeatEventListeners();
        loadBookingInformation();
    }

    // Function to add event listeners to seats
    function addSeatEventListeners() {
        let tickets = document.querySelectorAll(".all-seats input");

        tickets.forEach((ticket, index) => {
            ticket.addEventListener("change", () => {
                let currentDate = document.querySelector("input[name='date']:checked").id;
                let currentTime = document.querySelector("input[name='time']:checked").id;
                let key = `${currentDate}-${currentTime}`;

                // Update the seat selection state in seatData
                seatData[key][index].selected = ticket.checked;

                // Calculate total and count
                let count = 0;
                let amount = 0;

                seatData[key].forEach((seat) => {
                    if (seat.selected) {
                        count++;
                        amount += 200; // Adjust ticket price as needed
                    }
                });

                // Update the displayed count and amount
                document.querySelector(".amount").textContent = amount;
                document.querySelector(".count").textContent = count;
            });
        });
    }

    // Function to store booking information in local storage
    function storeBookingInformation() {
        let currentDate = document.querySelector("input[name='date']:checked").id;
        let currentTime = document.querySelector("input[name='time']:checked").id;
        let key = `${currentDate}-${currentTime}`;

        let movieName = document.querySelector(".title").textContent;
        let seats = seatData[key];
        let selectedSeats = seats.map((seat, index) => seat.selected ? `s${index + 1}` : null).filter(seat => seat !== null);
        let count = document.querySelector(".count").textContent;
        let amount = document.querySelector(".amount").textContent;

        let bookingInfo = {
            date: currentDate,
            time: currentTime,
            movie: movieName,
            count: count,
            amount: amount,
            seats: selectedSeats
        };
        let seat = '';
        for (let i = 0; i < selectedSeats.length; i++) {
            if (i == selectedSeats.length - 1) seat += `${selectedSeats[i]}`;
            else seat += `${selectedSeats[i]}, `;
        }

        const temp = localStorage.getItem('details');
        const temp2 = JSON.parse(temp);

        const finaldata = {
            username: temp2['currentUserName'],
            moviename: temp2['movieName'],
            movieyear: temp2['movieYear'],
            amount: amount,
            count: count,
            seats: seat,
        };
        // ------------
        // alert(temp2['movieYear']);

        let Da = JSON.stringify(finaldata);
        fetch('http://127.0.0.1:8000/saveFinalData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: Da
        }).then(data => {
                if (response.ok) {
                    console.log(data.message);
                } else {
                    console.error(data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

        // ------------
        // Store booking information in local storage
        localStorage.setItem("bookingInfo", JSON.stringify(bookingInfo));
    }
    function loadBookingInformation() {
        // Retrieve booking information from local storage
        let bookingInfo = JSON.parse(localStorage.getItem("bookingInfo"));

        if (bookingInfo) {
            // Retrieve current selected date and time
            let currentDate = document.querySelector("input[name='date']:checked").id;
            let currentTime = document.querySelector("input[name='time']:checked").id;

            // Compare current date and time with booking information
            if (currentDate === bookingInfo.date && currentTime === bookingInfo.time) {
                // Apply green disabled color and disable seats if the date and time match
                let bookedSeats = bookingInfo.seats;

                bookedSeats.forEach((seatId) => {
                    // Get the seat element
                    let seatElement = document.getElementById(seatId);

                    if (seatElement) {
                        // Disable the seat and add green color
                        seatElement.disabled = true;
                        seatElement.nextElementSibling.classList.add("your_seats");
                    }
                });
            }
        }
    }

    // Initialize seat data for each date and time combination
    initializeSeatData();

    // Add event listeners to date and time radio buttons
    document.querySelectorAll("input[name='date'], input[name='time']").forEach((input) => {
        input.addEventListener("change", updateSeats);
    });

    // Add event listener to the book button
    document.querySelector(".price button").addEventListener("click", () => {
        storeBookingInformation();
        location.href = '/ticket';
    });

    // Update seats for the initial selection
    updateSeats();

});