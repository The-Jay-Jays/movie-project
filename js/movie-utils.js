let initMovies = [];
let token = OMDB_TOKEN;

let movieAPICall = () => {
    fetch("https://stupendous-extreme-slug.glitch.me/movies")
        .then(res => res.json()).then(data => {
        // console.log(data);
        data.forEach((movie, index) => {
            initMovies.push({
                actors: data[index].actors,
                director: data[index].director,
                genre: data[index].genre,
                id: data[index].id,
                plot: data[index].plot,
                image: data[index].poster,
                rating: data[index].rating,
                title: data[index].title,
                year: data[index].year
            });
        })
        domMovieBuilder(initMovies);
    }).catch(err => {
        console.log(`There was an API error of the following: ${err}`);
        alert(`Sorry, there was an error retrieving movie data.  Please try again later.`)
    });

}

$(document).ready(() => {

    movieAPICall();

    $("#add-movie").click(function () {
        let title = $("#Title").val().trim();
        let rating = $("#Rating").val();
        let addMovie;
        $(".remove-after-submit").remove();
        if (title) {
            $("#add-movie").toggleClass("disabled");
            let inputTitle = title.replaceAll(" ", "+");

            fetch(`http://www.omdbapi.com/?apikey=${token}&t=${inputTitle}&r=json`)
                .then(res => res.json()).then(data => {
                console.log(data);
                if (data.Response === "False") {
                    $("#Title").val("");
                    $("#Rating").val("");
                    return alert("Could not find a movie by this title");
                } else if (data.Response) {
                    let alreadyExists = initMovies.some(function(movie){
                        return movie.title.toUpperCase() === title.toUpperCase();
                    })
                    if (alreadyExists) {
                        $("#Title").val("");
                        $("#Rating").val("");
                        return alert("This movie is already included");
                    }
                }
                addMovie = {
                    title: data.Title,
                    rating: rating,
                    actors: data.Actors,
                    director: data.Director,
                    genre: data.Genre,
                    plot: data.Plot,
                    poster: data.Poster,
                    year: data.Year
                }
                $("#Title").val("");
                $("#Rating").val("");

                fetch("https://stupendous-extreme-slug.glitch.me/movies",{
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(addMovie)
                })
                    .then(res => res.json()).then(data => {
                    console.log(data);
                    initMovies = [];
                    setTimeout(function (){
                        movieAPICall();
                        $("#add-movie").toggleClass("disabled");
                    }, 500);


                }).catch(err => {
                    console.log(`There was an API error of the following: ${err}`);
                    alert(`Sorry, there was an error adding the movie ${title}.  Please try again later.`)
                });

            }).catch(err => {
                console.log(`There was an API error of the following: ${err}`);
                alert(`Sorry, there was an error finding the movie '${title}'.  Please check your spelling/selection and try again.`);
            });


        } else {
            alert("The title field is empty.  Please enter a title to create a movie");
        }

    });

});













