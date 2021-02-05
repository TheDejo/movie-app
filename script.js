const { API_URL, IMG_PATH, SEARCH_API } = URL;

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

// Get intial result
getMovies(API_URL);

async function getMovies(url) {
  const response = await fetch(url);
  const data = await response.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');
    movieElement.innerHTML = `<div class="movie">
        <img
          src="${IMG_PATH + poster_path}"
          alt="${title}"
        />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
      </div>`;
    main.appendChild(movieElement);
  });
}

function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

function searchMovie(e) {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm);

    // search.value = '';

    console.log(searchTerm);
  } else {
    window.location.reload();
  }
}
form.addEventListener('input', searchMovie);

form.addEventListener('submit', searchMovie);
