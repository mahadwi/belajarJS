const detailMovie = (data) => {
    $.ajax({
        url: `http://www.omdbapi.com/?apikey=c10e3df9&i=${data}`,
        success: function (response) {
            const { Title, Poster, Director, Actors, Writer, Plot, Year } = response;
            const detailMovie = /*html*/`
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
            $('#detailMovie').html(detailMovie);
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });
}

const search = () => {
    $.ajax({
        url: `http://www.omdbapi.com/?apikey=c10e3df9&s=${$('#inputKeyword').val()}`,
        success: results => {
            const movies = results.Search;
            let cards = '';
            $.each(movies, function (idx, value) {
                cards += /*html*/`
                <div class="col-md-4 my-3">
                    <div class="card">
                        <img src="${value.Poster}" alt="img" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title" id="titleCard">${value.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-body-secondary" id="subTitleCard">${value.Year}</h6>
                            <a href="#" class="btn btn-primary" onclick="detailMovie('${value.imdbID}')" data-bs-toggle="modal" data-bs-target="#modalDetail">Show Details</a>
                        </div>
                    </div>
                </div>
                `
            });
            $('#cards').html(cards);
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });
}
