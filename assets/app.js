//User Defined Variables
var num_music = 0; //Number of audio files (audio-1.mp3, ..., audio-"num_music")
var anthem_path = "assets/anthem.mp3"; //Path to the national anthem recording
var intro_path = "assets/intro.mp3"; //Path to Intro Recording

//Music and buzzer buttons
var music = document.getElementById('music');
var intros = document.getElementById('intros');
var anthem = document.getElementById('anthem');
var clear = document.getElementById('clear');
var buzzer = document.getElementById('buzzer');
var timeout = document.getElementById('timeout');
//Period
var m_per = document.getElementById('m_per');
var p_per = document.getElementById('p_per');
var num_per = document.getElementById('num_per');
//Score
var h_score = document.getElementById('h_score');
var v_score = document.getElementById('v_score');
var h_p3 = document.getElementById('h_p3');
var h_p2 = document.getElementById('h_p2');
var h_p1 = document.getElementById('h_p1');
var h_m1 = document.getElementById('h_m1');
var v_p3 = document.getElementById('v_p3');
var v_p2 = document.getElementById('v_p2');
var v_p1 = document.getElementById('v_p1');
var v_m1 = document.getElementById('v_m1');
var differential = document.getElementById('differential');
//Fouls
var h_foul = document.getElementById('h_foul');
var h_foul_p1 = document.getElementById('h_foul_p1');
var h_foul_m1 = document.getElementById('h_foul_m1');
var v_foul = document.getElementById('v_foul');
var v_foul_p1 = document.getElementById('v_foul_p1');
var v_foul_m1 = document.getElementById('v_foul_m1');
//Resets
var reset = document.getElementById('reset');
var reset_fouls = document.getElementById('reset_fouls');
//Possession
var v_poss = document.getElementById('guest_possession');
var h_poss = document.getElementById('home_possession');
//Timeouts Left
var v_tol_p1 = document.getElementById('v_tol_p1');
var v_tol_m1 = document.getElementById('v_tol_m1');
var h_tol_p1 = document.getElementById('h_tol_p1');
var h_tol_m1 = document.getElementById('h_tol_m1');
var v_tol = document.getElementById('v_tol');
var h_tol = document.getElementById('h_tol');
//Display Controls
var freeze = document.getElementById('freeze');
var cover = document.getElementById('cover');
var flag = document.getElementById('flag');
var countdown_time = document.getElementById('countdown_time');
var countdown = document.getElementById('countdown');
var switch_sides = document.getElementById('switch_sides');
var home_name = document.getElementById('h_name');
var open_display = document.getElementById('display_open');
//Time
var time_display = document.getElementById('time_display');
var min_enter = document.getElementById('min');
var sec_enter = document.getElementById('sec');
var tenth_enter = document.getElementById('tenth');
var update_time = document.getElementById('update_time');
var time_in = document.getElementById('time_in');
var now_time = new Date();
var previous_time = new Date();
//Initial Values
var period = 1;
var home_score = 0;
var visitor_score = 0;
var home_fouls = 0;
var visitor_fouls = 0;
var home_tol = 1;
var visitor_tol = 1;
var home_poss = 0;
var visitor_poss = 0;
var min = 4;
var sec = 0;
var tenth = 0;
var player_foul = null;
var clock_interval;
var audio = new Audio('assets/Music/audio-1.mp3');
var buzzer_audio = new Audio('assets/buzzer.mp3');
var long_buzzer_audio = new Audio('assets/long_buzzer.mp3');
var timeoutId;
var clear_audio_interval;
const bc = new BroadcastChannel("channel");
var iframe = document.getElementById("preview");
iframe.muted = true;
bc.onmessage = (event) => {
    if(event.data == "countdown_finished") {
        try {
            long_buzzer_audio.pause();
        }
        catch (e) {
            console.log(e);
        }
        long_buzzer_audio.load();
        long_buzzer_audio.play();
        cover.classList.add("active_button");
        bc.postMessage("Cover");
        setTimeout(function(){
            countdown.classList.remove("active_button");
            bc.postMessage("countdown_off");
        }, 4000);
        clear_audio_interval = setInterval (function() {
            if (audio.volume - 0.1 > 0){
                audio.volume -= 0.1
            } else {
                audio.load();
                audio.pause();
                audio.volume = 1;
                clearInterval(clear_audio_interval);
            }
        }, 200);
    }
};
window.addEventListener("load", (event) => {
    load_data();
  });
document.addEventListener('keydown', (event) => {
    if (event.key == ' ') {
        document.activeElement.blur();
        if (min != 0 || sec != 0 || tenth != 0) {
            time_in_time_out();
        }
    }
    if (event.key == 'Enter') {
        if (document.activeElement == countdown_time) {
            countdown.classList.add("active_button");
            bc.postMessage("countdown_on");
            bc.postMessage("countdown_time&"+countdown_time.value);
        }
        document.activeElement.blur();
        update_data();
    }
});
music.addEventListener("click", function() {
    console.log(audio.volume);
    play_music();
});
intros.addEventListener("click", function() {
    try {
        audio.pause();
    }
    catch (e) {
        console.log(e);
    }
    audio.setAttribute('src', intro_path);
    audio.load();
    audio.play();
    audio.onended = function() {
        audio.load();
        audio.pause(); 
    };
});
anthem.addEventListener("click", function() {
    try {
        audio.pause();
    }
    catch (e) {
        console.log(e);
    }
    audio.setAttribute('src', anthem_path);
    audio.load();
    audio.play();
    audio.onended = function() {
        audio.load();
        audio.pause(); 
    };
    flag.classList.add("active_button");
    bc.postMessage("flag_on");
    audio.onended = function() {
        flag.classList.remove("active_button");
        bc.postMessage("flag_off");
    };
});
clear.addEventListener("click", function() {
    clear_audio_interval = setInterval (function() {
        if (audio.volume - 0.1 > 0){
            audio.volume -= 0.1
        } else {
            audio.load();
            audio.pause();
            audio.volume = 1;
            clearInterval(clear_audio_interval);
        }
    }, 200);
});
buzzer.addEventListener("click", function() {
    try {
        buzzer_audio.pause();
    }
    catch (e) {
        console.log(e);
    }
    buzzer_audio.load();
    buzzer_audio.play();
});
timeout.addEventListener("click", function() {
    if (timeout.classList.contains("active_button")) {
        timeout.classList.remove("active_button");
        clearTimeout(timeoutId);
    } else {
        timeout.classList.add("active_button");
        timeoutId = setTimeout(short_buzzer, 30000);
    }
    function short_buzzer() {
        try {
            buzzer_audio.pause();
        }
        catch (e) {
            console.log(e);
        }
        buzzer_audio.load();
        buzzer_audio.play();
        timeout.classList.remove("active_button");
    }
});
m_per.addEventListener("click", function() {
    if(period != 1) {
        period--; //Go to previous period
    }
    update_data(); //Update the content on the screen and in the file
});
p_per.addEventListener("click", function() {
    period++; //Go to next period
    update_data(); //Update the content on the screen and in the file
    if (period == 3 || period == 4) {
        alert("Do you need to reset fouls?");
    }
});
h_p3.addEventListener("click", function() {
    home_score+=3;
    update_data();
});
h_p2.addEventListener("click", function() {
    home_score+=2;
    update_data();
});
h_p1.addEventListener("click", function() {
    home_score++;
    update_data();
});
h_m1.addEventListener("click", function() {
    home_score--;
    update_data();
});
v_p3.addEventListener("click", function() {
    visitor_score+=3;
    update_data();
});
v_p2.addEventListener("click", function() {
    visitor_score+=2;
    update_data();
});
v_p1.addEventListener("click", function() {
    visitor_score++;
    update_data();
});
v_m1.addEventListener("click", function() {
    visitor_score--;
    update_data();
});
h_foul_p1.addEventListener("click", function() {
    player_foul = window.prompt("Player#-#Fouls","00-0");
    if (player_foul != null && player_foul != "") {
        home_fouls++;
        update_data();
        setTimeout(clear_player_foul, 30000);
    }
    function clear_player_foul() {
        player_foul = null;
        update_data();
    }
});
h_foul_m1.addEventListener("click", function() {
    home_fouls--;
    update_data();
});
v_foul_p1.addEventListener("click", function() {
    player_foul = window.prompt("Player#-#Fouls","00-0");
    if (player_foul != null && player_foul != "") {
        visitor_fouls++;
        update_data();
        setTimeout(clear_player_foul, 30000);
    }
    function clear_player_foul() {
        player_foul = null;
        update_data();
    }
});
v_foul_m1.addEventListener("click", function() {
    visitor_fouls--;
    update_data();
});
h_tol_p1.addEventListener("click", function() {
    home_tol++;
    update_data();
});
h_tol_m1.addEventListener("click", function() {
    home_tol--;
    update_data();
});
v_tol_p1.addEventListener("click", function() {
    visitor_tol++;
    update_data();
});
v_tol_m1.addEventListener("click", function() {
    visitor_tol--;
    update_data();
});
update_time.addEventListener("click", function() {
    min = min_enter.value;
    sec = sec_enter.value;
    tenth = tenth_enter.value;
    update_data();
});
reset.addEventListener("click", function() {
    period = 1;
    home_score = 0;
    visitor_score = 0;
    home_fouls = 0;
    visitor_fouls = 0;
    home_tol = 1;
    visitor_tol = 1;
    v_poss.classList.remove("active_button");
    h_poss.classList.remove("active_button");
    update_data();
});
reset_fouls.addEventListener("click", function() {
    home_fouls = 0;
    visitor_fouls = 0;
    update_data();
});
cover.addEventListener("click", function() {
    if (cover.classList.contains("active_button")) {
        cover.classList.remove("active_button");
        bc.postMessage("Uncover");
    } else {
        cover.classList.add("active_button");
        bc.postMessage("Cover");
    }
});
flag.addEventListener("click", function() {
    if (flag.classList.contains("active_button")) {
        flag.classList.remove("active_button");
        bc.postMessage("flag_off");
    } else {
        flag.classList.add("active_button");
        bc.postMessage("flag_on");
    }
});
countdown.addEventListener("click", function() {
    if (countdown.classList.contains("active_button")) {
        countdown.classList.remove("active_button");
        bc.postMessage("countdown_off");
    } else {
        countdown.classList.add("active_button");
        bc.postMessage("countdown_on");
        bc.postMessage("countdown_time&"+countdown_time.value);
    }
});
freeze.addEventListener("click", function() {
    if (freeze.classList.contains("active_button")) {
        freeze.classList.remove("active_button");
        update_data();
    } else {
        freeze.classList.add("active_button");
    }
});
switch_sides.addEventListener("click", function() {
    if (switch_sides.classList.contains("active_button")) {
        switch_sides.classList.remove("active_button");
    } else {
        switch_sides.classList.add("active_button");
    }
    update_data();
    update_data();
});
time_in.addEventListener("click", function() {
    if (sec != 0 || min != 0 || tenth != 0) {
        time_in_time_out();
    }
});
v_poss.addEventListener("click", function() {
    if (v_poss.classList.contains("active_button")) {
        v_poss.classList.remove("active_button");
    } else {
        v_poss.classList.add("active_button");
        h_poss.classList.remove("active_button");
    }
    update_data();
});
h_poss.addEventListener("click", function() {
    if (h_poss.classList.contains("active_button")) {
        h_poss.classList.remove("active_button");
    } else {
        h_poss.classList.add("active_button");
        v_poss.classList.remove("active_button");
    }
    update_data();
});
function update_data() {
    h_score.innerHTML = "Score: "+home_score;
    v_score.innerHTML = "Score: "+visitor_score;
    h_foul.innerHTML = "Fouls: "+home_fouls;
    v_foul.innerHTML = "Fouls: "+visitor_fouls;
    num_per.innerHTML = "Period: "+period;
    h_tol.innerHTML = "TOL: "+home_tol;
    v_tol.innerHTML = "TOL: "+visitor_tol;
    differential.innerHTML = Math.abs(home_score - visitor_score);
    time_display.innerHTML = min+":"+parseInt(sec).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})+"."+tenth;
    localStorage.setItem("period", period);
    localStorage.setItem("h_score", home_score);
    localStorage.setItem("v_score", visitor_score);
    localStorage.setItem("h_fouls", home_fouls);
    localStorage.setItem("v_fouls", visitor_fouls);
    localStorage.setItem("v_tol", visitor_tol);
    localStorage.setItem("h_tol", home_tol);
    localStorage.setItem("min", min);
    localStorage.setItem("sec", sec);
    localStorage.setItem("tenth", tenth);
    if (v_poss.classList.contains("active_button")) {
        localStorage.setItem("possession", "visitor");
    } else if (h_poss.classList.contains("active_button")) {
        localStorage.setItem("possession", "home");
    } else {
        localStorage.setItem("possession", null);
    }
    if (!(freeze.classList.contains("active_button"))) {
        if (min != 0) {
            bc.postMessage("Clock&"+min+":"+parseInt(sec).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}));
        } else {
            bc.postMessage("Clock&"+sec+"."+tenth);
        }
        bc.postMessage("home_name&"+h_name.value);
        bc.postMessage("visitor_name&"+v_name.value);
        bc.postMessage("home_poss&"+(h_poss.classList.contains("active_button")));
        bc.postMessage("away_poss&"+(v_poss.classList.contains("active_button")));
        bc.postMessage("period&"+period);
        if (home_fouls >= 10) {
            bc.postMessage("away_b&B+");
        } else if (home_fouls >= 7) {
            bc.postMessage("away_b&B");
        } else {
            bc.postMessage("away_b& ")
        }
        if (visitor_fouls >= 10) {
            bc.postMessage("home_b&B+")
        } else if (visitor_fouls >= 7) {
            bc.postMessage("home_b&B");
        } else {
            bc.postMessage("home_b& ");
        }
        bc.postMessage("home_score&"+home_score);
        bc.postMessage("away_score&"+visitor_score);
        bc.postMessage("home_tol&"+home_tol);
        bc.postMessage("away_tol&"+visitor_tol);
        bc.postMessage("home_foul&"+home_fouls);
        bc.postMessage("away_foul&"+visitor_fouls);
        if (player_foul != null) {
            bc.postMessage("player_foul&"+player_foul);
        } else {
            bc.postMessage("player_foul&-");
        }
        bc.postMessage("sides&"+(switch_sides.classList.contains("active_button")));
    }
}
function load_data() {
    if (localStorage.getItem("period") != null){
        period = parseInt(localStorage.getItem("period"));
    }
    else {
        period = 1;
    }
    if (localStorage.getItem("h_score") != null){
        home_score = parseInt(localStorage.getItem("h_score"));
    }
    else {
        home_score = 0;
    }
    if (localStorage.getItem("v_score") != null){
        visitor_score = parseInt(localStorage.getItem("v_score"));
    }
    else {
        visitor_score = 0;
    }
    if (localStorage.getItem("h_fouls") != null){
        home_fouls = parseInt(localStorage.getItem("h_fouls"));
    }
    else {
        home_fouls = 0;
    }
    if (localStorage.getItem("v_fouls") != null){
        visitor_fouls = parseInt(localStorage.getItem("v_fouls"));
    }
    else {
        visitor_fouls = 0;
    }
    if (localStorage.getItem("v_tol") != null){
        visitor_tol = parseInt(localStorage.getItem("v_tol"));
    }
    else {
        visitor_tol = 0;
    }
    if (localStorage.getItem("h_tol") != null){
        home_tol = parseInt(localStorage.getItem("h_tol"));
    }
    else {
        home_tol = 0;
    }
    if (localStorage.getItem("h_poss") != null){
        home_poss = parseInt(localStorage.getItem("h_poss"));
    }
    else {
        home_poss = 0;
    }
    if (localStorage.getItem("h_tol") != null){
        visitor_poss = parseInt(localStorage.getItem("v_poss"));
    }
    else {
        visitor_poss_tol = 0;
    }
    if (localStorage.getItem("min") != null){
        min = parseInt(localStorage.getItem("min"));
    }
    else {
        min = 4;
    }
    if (localStorage.getItem("sec") != null){
        sec = parseInt(localStorage.getItem("sec"));
    }
    else {
        sec = 0;
    }
    if (localStorage.getItem("tenth") != null){
        tenth = parseInt(localStorage.getItem("tenth"));
    }
    else {
        tenth = 0;
    }
    if (localStorage.getItem("possession") == "home") {
        h_poss.classList.add("active_button");
        v_poss.classList.remove("active_button");
    } else if (localStorage.getItem("possession") == "visitor") {
        v_poss.classList.add("active_button");
        h_poss.classList.remove("active_button");
    } else {
        v_poss.classList.remove("active_button");
        h_poss.classList.remove("active_button");
    }
    bc.postMessage("Uncover");
    update_data();
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "N/A";
}
function play_music(){
    var r = Math.floor((Math.random() * (num_music-1))+ 1);
    try {
        audio.pause();
    }
    catch (e) {
        console.log(e);
    }
    audio.setAttribute('src', 'assets/Christian Music/audio-'+r+'.mp3');
    audio.load();
    audio.play();
    audio.onended = function() {
        play_music();
    };
}
function updateTime() {
    now_time = Date.now();
    while (now_time-previous_time >= 100) { 
        previous_time += 100;
        if (sec == 0 && min == 0 && tenth == 0) {
            update_data();
            time_in.classList.remove("active_button");
            try {
                long_buzzer_audio.pause();
            }
            catch (e) {
                console.log(e);
            }
            long_buzzer_audio.load();
            long_buzzer_audio.play();
            clearInterval(clock_interval);
        } else {
            if (sec == 0 && min != 0 && tenth == 0) {
                min-=1;
                sec = 59;
                tenth = 10;
            }
            if (tenth == 0 && sec != 0) {
                sec-=1;
                tenth = 10;
            }
            tenth-=1;
            update_data();
        }
    }
}
function time_in_time_out(){
    if (time_in.classList.contains("active_button")) {
        time_in.classList.remove("active_button");
        clearInterval(clock_interval);
    } else {
        time_in.classList.add("active_button");
        previous_time = Date.now()-100;
        clock_interval = setInterval(updateTime, 25);
    }
}