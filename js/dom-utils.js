let domMovieBuilder = movieArr => {
    let main = $("#main");
    main.empty();
    movieArr.forEach(movie => {
        main.append(`
        <div class="card">
          <img class="card-img-top" src="${movie.image}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">${movie.plot}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Director: ${movie.director}</li>
            <li class="list-group-item">Actors: ${movie.actors}</li>
            <li class="list-group-item">Genre: ${movie.genre}</li>
            <li class="list-group-item">Year: ${movie.year}</li>
          </ul>
          <!-- <div class="card-body">
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div> -->
        </div>
    `)
    })


}