// Code here
//Function to get first beers details
const getBeer = (id) => {
    return fetch(`http://localhost:3000/beers/${id}`) 
    .then(function (response) {
        return response.json();
    })
    .then(function (beer) {
        //DOM Manipulation here
        document.getElementById("beer-image").src = beer.image_url;
        document.getElementById("beer-name").textContent = beer.name;
        document.getElementById("beer-id").textContent = beer.id;
        document.getElementById("beer-description").textContent = beer.description;
        document.getElementById("review-list").innerHTML = '';
        beer.reviews.forEach(review => {
            let li = document.createElement("li");
            li.textContent = review;
            //Function to temporarily remove review
            li.onclick = function temporarilyRemoveReview() {
                li.remove();
            };
            document.getElementById("review-list").appendChild(li);
        });
    })
    .catch(function (error) {
        console.log(error.message);
        document.getElementById("error").innerHTML = "request to http://localhost:3000/users failed, reason: Unauthorized Access";

    })}   

//Function to list all the beers in navbar
const listBeers = () => {
    return fetch("http://localhost:3000/beers") 
    .then(function (response) {
        return response.json();
    })
    .then(function (allBeers) {
        //DOM Manipulation here
        document.querySelector("ul#beer-list").innerHTML = '';
        allBeers.forEach(beer => {
            let li = document.createElement("li");
            li.id = beer.id;
            li.textContent = beer.name;
            //Function to make <nav> bar functional
            li.onclick = function beerClicked() {
                getBeer(beer.id);
            }
            document.getElementById("beer-list").appendChild(li);
        });
    })
    .catch(function (error) {
        console.log(error.message);
        document.getElementById("error").innerHTML = "request to http://localhost:3000/users failed, reason: Unauthorized Access";

    })}   

//Function to submit form to add new review. With persistence!
const submitNewReview = () => {
    let id = document.getElementById("beer-id").textContent;
    let newReview = document.getElementById("review").value;
    return fetch(`http://localhost:3000/beers/${id}`).then(function (response) {
        return response.json();
    })
    .then(function (beer) {
        beer.reviews.push(newReview)
        console.log(beer)
        return fetch(`http://localhost:3000/beers/${id}`, {
            method: "PUT",
            headers: {
            'content-type': "application/json",
            'accept': "application/json",
            },
            body: JSON.stringify({
                ...beer
            })
        })
    })
}

const updateDescription = () => {
    let id = document.getElementById("beer-id").textContent;
    let newDescription = document.getElementById("description").value;
    fetch(`http://localhost:3000/beers/${id}`, {
    method: "PATCH",
    headers: {
    'content-type': "application/json",
    'accept': "application/json",
    },
    body: JSON.stringify({
        description: `${newDescription}`
    })
})
}
  
document.addEventListener('DOMContentLoaded', function() {
    getBeer(1);
    listBeers();
});

document.getElementsByClassName("submitButton").onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
}
      