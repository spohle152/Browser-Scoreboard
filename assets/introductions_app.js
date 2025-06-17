//Load team information
var teamsFile = JSON.parse(teams);
var teams = [];
var firstNames = [];
var lastNames = [];
var cards = [];

const bc = new BroadcastChannel("channel");
var body = document.getElementById('body');

for (player = 0; player < teamsFile.length; player += 1) {
    if (teams.find((element) => element == teamsFile[player].TeamName) == null) {
        teams.push(teamsFile[player].TeamName);
        firstNames.push([]);
        lastNames.push([]);
        cards.push([]);
    }
    index = teams.indexOf(teamsFile[player].TeamName);
    firstNames[index].push(teamsFile[player].FirstName);
    lastNames[index].push(teamsFile[player].LastName);
    cards[index].push(document.createElement('button'));
}
for (i=0; i < teams.length; i+=1) {
    var card = document.createElement('h2');
    card.innerHTML = teams[i];
    body.appendChild(card)
    for (j=0; j < firstNames[i].length; j+=1) {
        cards[i][j].innerHTML = firstNames[i][j] + " " + lastNames[i][j];
        cards[i][j].classList.add('button');
        body.appendChild(cards[i][j]);
        cards[i][j].addEventListener("click", function() {
            var a;
            var b;
            for (k=0; k<cards.length; k+=1) {
                if(cards[k].indexOf(this)!=(-1)) {
                    a = k;
                    b = cards[k].indexOf(this);
                }
            }
            if(cards[a][b].classList.contains("active_button")) {
                cards[a][b].classList.remove("active_button");
                bc.postMessage("intro_off");
            } else {
                cards[a][b].classList.add("active_button");
                bc.postMessage("intro_on&" + firstNames[a][b] + "&" + lastNames[a][b] + "&" + teams[a]);
            }
            for (k=0; k<cards.length; k+=1) {
                for (l=0; l<cards[k].length; l+=1) {
                    if (!(k == a && l == b)) {
                        cards[k][l].classList.remove("active_button");
                    }
                }
            }
        });
    }
}

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    bc.postMessage("intro_off");
    for (k=0; k<cards.length; k+=1) {
        for (l=0; l<cards[k].length; l+=1) {
            cards[k][l].classList.remove("active_button");
        }
    }
});
