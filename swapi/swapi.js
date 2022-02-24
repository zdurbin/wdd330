//function to fetch the data
function getJSON(url) {
    return fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                return response.json();
            }
        })
        .catch(function (error) {
            console.log(error);
        });
}

// model code
function getShips(url) {
    return getJSON(url);
}
//  View code
function renderShipList(ships, shipListElement) {
    const list = shipListElement.children[1];
    list.innerHTML = "";
    //loop through the ships
    ships.forEach(function (ship) {
        let listItem = document.createElement("tr");
        listItem.innerHTML = `
        <td><a href="${ship.url}">${ship.name}</a></td>
        <td>${ship.length}</td>
        <td>${ship.crew}</td>
        `;
        list.appendChild(listItem);
    });
}

function showShips(url = "https://swapi.dev/api/starships/") {
    getShips(url).then(function (data) {
       // console.log(data);
        const results = data.results;

        //get the list element
        const shipListElement = document.getElementById("shiplist");
        renderShipList(results, shipListElement);

    });
}
showShips();


