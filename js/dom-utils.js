let movies = [];
let main = $("#main");

function domMovieBuilder(movieArr) {
    main.empty();
    $("#main").attr("class", "row d-flex justify-content-around");

    movieArr.forEach(movie => {
        main.append(`
        <div class="card w3-animate-top my-2 mx-1" style="width: 18rem;">
          <img class="card-img-top" style="max-height: 400px;" src="${movie.image || 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Triforce.svg/1024px-Triforce.svg.png'}" alt="Card image cap">
          <div class="card-body">
            <h3 class="card-title">${movie.title || "(Not found)"}</h3>
            <p class="card-text">${movie.plot || "(Not found)"}</p>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Director: ${movie.director || "(Not found)"}</li>
            <li class="list-group-item">Actors: ${movie.actors || "(Not found)"}</li>
            <li class="list-group-item">Genre: ${movie.genre || "(Not found)"}</li>
            <li class="list-group-item">Year: ${movie.year || "(Not found)"}</li>
            <li class="list-group-item">Rating: ${movie.rating || "(Not rated)"}</li>
          </ul>
          <div class="card-body d-flex" data-attribute="${movie.id}">
            <button type="button" class="myButton edit-movie align-self-end"><a href="#form-container">Edit Movie</a></button>
            <button type="button" class="myButton delete-movie align-self-end">Delete</button>
          </div>
        </div>
    `)
        // movies = [];
        movies.push({
            id: movie.id,
            image: movie.image,
            title: movie.title,
            rating: movie.rating,
            plot: movie.plot,
            director: movie.director,
            actors: movie.actors,
            genre: movie.genre,
            year: movie.year
        });
    })

    $(".edit-movie").click(function () {
        let currentMovie = $(this).parent().attr("data-attribute");
        // console.log(movies[currentMovie - 1]);
        $(".remove-after-submit").remove();
        formBuilder(movies[currentMovie - 1], currentMovie);
    });
    $(".delete-movie").click(function(){
        let currentMovie = $(this).parent().attr("data-attribute");
        // console.log(movies)
        // console.log(movies[currentMovie - 1].title);
        let userConfirm = confirm(`Are you sure you want to delete ${movies[currentMovie - 1].title}?`);
        if(userConfirm){
            fetch(`https://stupendous-extreme-slug.glitch.me/movies/${currentMovie}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
                // body: JSON.stringify(movieObj)
            }).then(res => res.json()).then(data => {
                console.log(data);
                initMovies = [];
                // main.empty();
                setTimeout(function (){
                    movieAPICall();
                }, 500);


            }).catch(err => {
                console.log(`There was an API error of the following: ${err}`);
                alert(`Sorry, there was an error deleting movie data.  Please try again later.`)
            });
        }

    })
}


console.log(movies);

let formBuilder = (formInfo, id) => {
    let main = $("#main");
    $(`
       <div class="container remove-after-submit mt-3" id="form-container"> 
            <h4 class="remove-after-submit">Complete change movie form</h4>
            <form class="remove-after-submit w3-animate-top">
                <div class="form-group">
                    <label for="url">Picture URL</label>
                    <input type="text" class="form-control" id="url" value="${formInfo.image}">
                </div>
                <div class="form-group">
                    <label for="title">Title</label>
                    <input type="text" class="form-control" id="title" value="${formInfo.title}">
                </div>
                <div class="form-group">
                    <label for="plot">Plot</label>
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
                <div class="form-group">
                    <label for="rating">Rating</label>
                    <input type="text" class="form-control" id="rating" value="${formInfo.rating}">
                </div>
                
                <button type="button" class="myButton" id="changes">Submit changes</button>
                <button type="button" class="myButton" id="cancel">Cancel</button>
            </form> 
        </div>
    `).insertAfter(main);
    $("#changes").click(function () {
        let movieObj = {
            id: id,
            poster: $("#url").val() || $("#url").attr("value"),
            title: $("#title").val() || $("#title").attr("value"),
            rating: $("#rating").val() || $("#rating").attr("value"),
            plot: $("#plot").val() || $("#plot").attr("value"),
            director: $("#director").val() || $("#director").attr("value"),
            actors: $("#actors").val() || $("#actors").attr("value"),
            genre: $("#genre").val() || $("#genre").attr("value"),
            year: $("#year").val() || $("#year").attr("value")
        };
        // console.log(movieObj);
        console.log(movieObj);
        fetch(`https://stupendous-extreme-slug.glitch.me/movies/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movieObj)
        }).then(res => res.json()).then(data => {
            console.log(data);
            $(".remove-after-submit").remove();
            initMovies = [];
            // main.empty();
            setTimeout(function (){
                movieAPICall();
            }, 1000);


        }).catch(err => {
            console.log(`There was an API error of the following: ${err}`);
            alert(`Sorry, there was an error changing movie data.  Please try again later.`)
        });
    })
    $("#cancel").click(function(){
        $(".remove-after-submit").remove();
    });
}











