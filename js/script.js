/*target div where profile info will appear*/
const overview = document.querySelector(".overview");
const username = "Hayley-A";

/*API for fetch user data from GitHub*/
const getData = async function () {
    const usersRequest = await fetch(`https://api.github.com/users/${username}`);
    const data = await usersRequest.json();
    //console.log(data);
    userInfo(data);
};

getData();

const userInfo = async function (data) {
    const infoDiv = document.createElement("div");
    infoDiv.classList.add(".user-info");
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
}
                                                                                                                                                                                                                   