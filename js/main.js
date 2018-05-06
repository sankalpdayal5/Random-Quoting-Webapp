var category = document.getElementById('category');
var quote = document.getElementById('quote');
var author = document.getElementById('author');
var btn = document.getElementById('btn');
var col;

function newQuote() {

    document.getElementById('btn').disabled = true;
    //document.getElementById('btn').style.cssText = '#btn{cursor:not-allowed}';
    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://talaikis.com/api/quotes/random/');
    ourRequest.onload = function () {
        if (ourRequest.status >= 200 && ourRequest.status <= 400) {
            var ourData = JSON.parse(ourRequest.responseText);
            renderHTML(ourData);
        } else {
            alert("We connected to the server but it returned an error.");
        }
    };

    ourRequest.onerror = function () {
        alert("Connection error");
    }

    ourRequest.send();

};

function renderHTML(data) {
    var squote = "";
    var scategory = "";
    var sauthor = "";
    scategory += "<p>Category: " + data.cat + "</p>";
    squote += '<p>"' + data.quote + '"</p>';
    sauthor += "<p> - " + data.author + "</p><br>";


    quote.innerHTML = squote;
    category.innerHTML = scategory;
    author.innerHTML = sauthor;

    col = getRandomColor();
    document.getElementById("btn").style.backgroundColor = col;
    document.getElementById("quote-board").style.color = col;
    document.getElementById("body").style.backgroundColor = col;

    document.getElementById('btn').disabled = false;
}

function tweet() {
    window.open("https://twitter.com/intent/tweet?text=" + "Quotes: " + (document.getElementById('quote').textContent) + " " + (document.getElementById('author').textContent));
    console.log(document.getElementById('quote').textContent);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}