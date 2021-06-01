document.addEventListener("DOMContentLoaded", () => {
    getMovies();
})

const searchBar = document.querySelector("form").querySelector("textarea")
searchBar.textContent = document.querySelector("form").querySelector("textarea").value

let getMovies = () => {
    fetch(`https://imdb8.p.rapidapi.com/auto-complete?q=${searchBar}`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "7022a16defmsh1d5202114094ee0p128749jsnd8e087308d39",
		"x-rapidapi-host": "imdb8.p.rapidapi.com"
	}
})
.then(res => res.json())
.then(data => console.log(data))
}
