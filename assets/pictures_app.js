var num_pictures = 2
var cards = [];

const bc = new BroadcastChannel("channel");
var body = document.getElementById('body');
for (picture = 1; picture <= num_pictures; picture++) {
    cards.push(document.createElement('button'));
    cards[picture - 1].innerHTML = '<img src="Pictures/pictures-' + picture + '.jpg"width="250" height="auto">';
    body.appendChild(cards[picture - 1]);
}

for (picture = 0; picture < num_pictures; picture++) {
    cards[picture].addEventListener("click", function() {
        picture = cards.indexOf(this);
        if(cards[picture].classList.contains("active_button")) {
            cards[picture].classList.remove("active_button");
            bc.postMessage("picture_off");
        } else {
            cards[picture].classList.add("active_button");
            bc.postMessage("picture_on&" + (picture + 1));
        }
        for (k=0; k<cards.length; k+=1) {
            if (k != picture) {
                cards[k].classList.remove("active_button");
            }
        }
    });
}

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    bc.postMessage("picture_off");
    for (k=0; k<cards.length; k+=1) {
        cards[k].classList.remove("active_button");
    }
});
