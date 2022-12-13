//Grab the form

//let formInput = document.querySelector("#github-form")
//Fetch data entered into the form

//Add event listener to the submit button

//Display Information about the users to the page (username,avatar,and link to their profile)

//Clicking  on one of the users should send a request to the user repos endpoint 
// & return data about all the repositories for that user

//Display all the repositories for that user on the page

//Toggle the search bar between searching for users by keyword and searching by adding an extra button


document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("form").addEventListener("submit", event => {
        event.preventDefault()
        searchUsers()
    })
});

function searchUsers() {
    const search = document.getElementById("search")
    fetch(`https://api.github.com/search/users?q=${search.value}`)
    .then(resp => resp.json())
    .then(json => {
        for (const users of json.items) {
            const reposList = document.createElement("li")
            reposList.innerHTML = `
            <h3>Username: ${users.login}</h3>
            <img src= ${users.avatar_url} alt=${users.login}'s avatar>
            <a href=${users.url}>${users.login}'s Github</a>
            `
            reposList.id = users.login
            reposList.addEventListener("click", () => searchUserRepos(users.login))
            document.getElementById("user-list").appendChild(reposList)
        }
    })
};

function searchUserRepos(username) {
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(resp => resp.json())
    .then(json => {
        const repositoriesList = document.getElementById("repos-list")
        repositoriesList.innerHTML=" "
        for(const username of json) {
            const repoListAppend = document.createElement("li")
            repoListAppend.innerHTML = `<a href=${username["html_url"]}>${username["html_url"]}</a>`
            repositoriesList.appendChild(repoListAppend)
        }
    })
};
