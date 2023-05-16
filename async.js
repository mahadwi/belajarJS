const showCards = (data) => {
    return /*html*/`
    <div class="col-md-4 my-3">
        <div class="card">
            <img src="${data.Poster}" alt="img" class="card-img-top">
            <div class="card-body">
                <h5 class="card-title" id="titleCard">${data.Title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary" id="subTitleCard">${data.Year}</h6>
                <a href="#" class="btn btn-primary" onclick="detailMovie('${data.imdbID}')" data-bs-toggle="modal" data-bs-target="#modalDetail">Show Details</a>
            </div>
        </div>
    </div>
    `
}

const movieDetail = (data) => {
    const {Poster, Title, Year, Director, Actors, Writer, Plot} = data;
    return /*html*/`
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-3">
                <img src="${Poster}" alt="img" class="img-fluid">
            </div>
            <div class="col-md">
                <ul class="list-group">
                    <li class="list-group-item"><h4>${Title} ${Year}</h4></li>
                    <li class="list-group-item"><strong>Director : </strong>${Director}</li>
                    <li class="list-group-item"><strong>Actors : </strong>${Actors}</li>
                    <li class="list-group-item"><strong>Writer : </strong>${Writer}</li>
                    <li class="list-group-item"><strong>Plot : </strong><br>${Plot}</li>
                </ul>
            </div>
        </div>
    </div>
    `
}

const getMovies = (key) => {
    const data =  fetch(`http://www.omdbapi.com/?apikey=c10e3df9&s=${key}`)
        .then(response => response.json())
        .then(response => response.Search);
    return data;
}

const getDetailMovie = (imdbId) => {
    const data = fetch(`http://www.omdbapi.com/?apikey=c10e3df9&i=${imdbId}`)
    .then(response => response.json())
    .then(response => response);
    return data;
}

const updateUI = (movies) => {
    let cards = '';
    movies.forEach(m => cards += showCards(m));
    const movieContainer = document.querySelector('#cards');
    movieContainer.innerHTML = cards;
}

const search = async () => {
    const inputKeyword = document.querySelector('#inputKeyword');
    const movie = await getMovies(inputKeyword.value);
    updateUI(movie);
}

const detailMovie = async (imdbId) => {
    const data = await getDetailMovie(imdbId);
    const modal = movieDetail(data);
    const detailModal = document.querySelector('#detailMovie');
    detailModal.innerHTML = modal;
}