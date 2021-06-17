let domMovieBuilder = movieArr => {
    let main = $("#main");
    main.empty();
    let movies = [];
    movieArr.forEach(movie => {
        main.append(`
        <div class="card">
          <img class="card-img-top" src="${movie.image||'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Triforce.svg/1024px-Triforce.svg.png'}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${movie.title||"(Not found)"}</h5>
            <p class="card-text">${movie.plot||"(Not found)"}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Director: ${movie.director||"(Not found)"}</li>
            <li class="list-group-item">Actors: ${movie.actors||"(Not found)"}</li>
            <li class="list-group-item">Genre: ${movie.genre||"(Not found)"}</li>
            <li class="list-group-item">Year: ${movie.year||"(Not found)"}</li>
          </ul>
          <div class="card-body" data-attribute="${movie.id}">
            <button type="button" class="btn btn-primary rounded edit-movie">Edit Movie</button>
            <button type="button" class="btn btn-primary rounde delete-movie">Delete</button>
          </div>
        </div>
    `)
        movies.push({
            id: movie.id,
            image: movie.image,
            title: movie.title,
            plot: movie.plot,
            director: movie.director,
            actors: movie.actors,
            genre: movie.genre,
            year: movie.year
        });
    })

    $(".edit-movie").click(function () {
        let currentMovie = $(this).parent().attr("data-attribute");
        console.log(movies[currentMovie - 2]);
        formBuilder(movies[currentMovie - 2]);
    });
}


let formBuilder = formInfo => {
    let main = $("#main");
    $(`
        <h4 class="">Complete change movie form</h4>
        <form>
            <div class="form-group">
                <label for="url">Picture URL</label>
                <input type="text" class="form-control" id="url" value="${formInfo.image}">
            </div>
            <div class="form-group">
                <label for="Title">Title</label>
                <input type="text" class="form-control" id="title" value="${formInfo.title}">
            </div>
            <div class="form-group">
                <label for="post">Plot</label>
                <input type="text" class="form-control" id="plot" value="${formInfo.plot}">
            </div>
            <div class="form-group">
                <label for="director">Director</label>
                <input type="text" class="form-control" id="director" value="${formInfo.director}">
            </div>
            <div class="form-group">
                <label for="actors">Actors</label>
                <input type="text" class="form-control" id="actors" value="${formInfo.actors}">
            </div>
            <div class="form-group">
                <label for="genre">Genre</label>
                <input type="text" class="form-control" id="genre" value="${formInfo.genre}">
            </div>
            <div class="form-group">
                <label for="year">Year</label>
                <input type="text" class="form-control" id="year" value="${formInfo.year}">
            </div>
            
            <button type="button" class="btn btn-primary" id="changes">Submit changes</button>
        </form>
    `).insertAfter(main);

}








