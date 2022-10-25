
const overview = document.querySelector(".overview");
const listOfRepos = document.querySelector(".repo-list");
const username = "Hayley-A";
const allRepos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const goBack = document.querySelector("view-repos");


/**API for fetch user data from GitHub*/
const getData = async function () {
    const usersRequest = await fetch(`https://api.github.com/users/${username}`);
    const data = await usersRequest.json();
    //console.log(data);
    userInfo(data);
};

getData();

/**target div where profile info will appear*/
const userInfo = async function (data) {
    const infoDiv = document.createElement("div");
    infoDiv.classList.add("user-info");
    infoDiv.innerHTML = 
        `<figure>
            <img alt="user avatar" src=${data.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Bio:</strong> ${data.bio}</p>
            <p><strong>Location:</strong> ${data.location}</p>
            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
        </div>`;
        overview.append(infoDiv);
        fetchRepos()
};

/*fetch no more than 100 repos and sort them to display the most recently updated first*/
const fetchRepos = async function (){
    const repoRequest = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoRequest.json();
    //console.log(repoData);
    repoInfo(repoData);
};

/*populate the ul with a class of .repo-list (listOfRepos) with list items containing the name of the repo*/
const repoInfo = function (repos) {
    for (repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        listOfRepos.append(repoItem);
    }
};
 
/**a click event that will match the h3 text of what was clicked to the repoName from the getRepoInfo async function below */
const repoList = document.addEventListener("click", function(e){
    if (e.target.matches("h3")){
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    };
});

/**Get info for each of the repos */
const getRepoInfo = async function (repoName){
    const fetchInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await fetchInfo.json();   
 

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();


/**create an array for the languages */
    const languages = [];
    for (language in languageData) {
        languages.push(language);
    }

    displayInfo(repoInfo, languages);
};

/**display specific repo info*/
const displayInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = 
    `<h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
    repoData.append(div);
    repoData.classList.remove("hide");
    allRepos.classList.add("hide");
    goBack.classList.remove("hide");
};