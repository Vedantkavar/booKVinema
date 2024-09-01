function searchTheMovie() {

  const searchBtn = document.querySelector('#searchBtn');
  const inp = document.querySelector('#searchInput');
  const movieCardsContainer = document.getElementById('movieCards');

  // Event listener for search button
  searchBtn.addEventListener('click', async () => {
    const searchVal = inp.value.trim();
    if (searchVal === '') return; // Don't search if input is empty

    try { 
      // Fetch movie data
      const moviesData = await getMovies(searchVal);
      if (moviesData && moviesData.length > 0) {
        // Clear previous search results
        movieCardsContainer.innerHTML = '';

        // Display movie cards
        moviesData.forEach(movie => {
          const movieCard = createMovieCard(movie);
          movieCardsContainer.appendChild(movieCard);
        });
      } else {
        // No movies found
        console.log('No movies found.');
      }
    } catch (error) {
      console.error('Error fetching movie data:', error);
    }

  });

  // Function to fetch movies from OMDB API
  async function getMovies(searchQuery) {
    try {
      const apiKey = 'aee46e6f';
      const apiUrl = `https://omdbapi.com/?apikey=${apiKey}&plot=full&s=${encodeURIComponent(searchQuery)}`;
      const response = await axios.get(apiUrl);
      if (response.data.Response === 'True') {
        return response.data.Search;
      } else {
        throw new Error(response.data.Error || 'Movie data not found.');
      }
    } catch (error) {
      throw new Error('Error fetching movie data from API:', error.message);
    }
  }

  // Function to create a movie card element
  function createMovieCard(movieData) {
    if (!movieData.Poster || movieData.Poster === 'N/A') {
      return null;
    }

    // Create a card container
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col-md-3', 'mb-4');

    // Create a card
    const card = document.createElement('div');
    card.classList.add('card', 'movie-card');
    card.style.width = '100%';
    card.style.height = '300px'; // Set fixed height

    // Set cursor style to pointer to indicate that the card is clickable
    card.style.cursor = 'pointer';

    // Create the background container with image
    const bgContainer = document.createElement('div');
    bgContainer.classList.add('bg-container');
    bgContainer.style.width = '100%';
    bgContainer.style.height = '100%';
    bgContainer.style.backgroundImage = `url(${movieData.Poster})`;
    bgContainer.style.backgroundSize = 'contain';
    bgContainer.style.backgroundPosition = 'center';

    // Create the content container with blur effect
    const contentContainer = document.createElement('div');
    contentContainer.classList.add('content-container');
    contentContainer.style.position = 'absolute';
    contentContainer.style.bottom = '0';
    contentContainer.style.width = '100%';
    contentContainer.style.background = 'rgba(255, 255, 255, 0.5)';
    contentContainer.style.backdropFilter = 'blur(5px)';
    contentContainer.style.padding = '10px';

    // Create card title
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = movieData.Title;

    // Create card text
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = `Year: ${movieData.Year}`;

    // Append elements to the content container
    contentContainer.appendChild(cardTitle);
    contentContainer.appendChild(cardText);

    // Append containers to the card
    card.appendChild(bgContainer);
    card.appendChild(contentContainer);
    cardDiv.appendChild(card);

    // Add the click event listener for redirection to 'bookingPage.html'
    card.onclick = function () {
      const name = localStorage.getItem('currentUserName');
      const searchPageDetails = {
        currentUserName : name,
        movieName : movieData.Title,
        movieYear : movieData.Year
      };
      localStorage.setItem('details',JSON.stringify(searchPageDetails));
      const data = JSON.stringify(searchPageDetails);
      fetch('http://127.0.0.1:8000/saveMovieData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
        })
        .then(data => {
            if (response.ok) {
                console.log(data.message);
            } else {
                console.error(data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        location.href='/bookingPage';
    };
    return cardDiv;
  }
}