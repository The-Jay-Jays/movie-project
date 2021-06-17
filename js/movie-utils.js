let movieAPICall = () => {
    fetch("https://stupendous-extreme-slug.glitch.me/movies")
        .then(res => res.json()).then(data => {
        console.log(data);
        let movies = [];
        data.forEach((movie, index) => {
            console.log(data[0].actors);
            movies.push({
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
        domMovieBuilder(movies);
    }).catch(err => {
        console.log(`There was an API error of the following: ${err}`);
        alert(`Sorry, there was an error retrieving movie data.  Please try again later.`)
    });
}

$(document).ready(() => {
    movieAPICall();

    $("#add-movie").click(function () {
        let title = $("#Title").val();
        let rating = $("#Rating").val();
        let addMovie = {
            title: title,
            rating: rating
        }
        fetch("https://stupendous-extreme-slug.glitch.me/movies",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addMovie)
        })
            .then(res => res.json()).then(data => {
            console.log(data);

        }).catch(err => {
            console.log(`There was an API error of the following: ${err}`);
            alert(`Sorry, there was an error retrieving movie data.  Please try again later.`)
        });
    })
});

















