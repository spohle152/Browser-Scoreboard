//User Variables
var num_music = 0;

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
var total_per = document.getElementById('total_per');
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
var r_poss = document.getElementById('right_possession');
var l_poss = document.getElementById('left_possession');
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
var h_name = document.getElementById('h_name');
var v_name = document.getElementById('v_name');
var open_display = document.getElementById('display_open');
var visitor = document.getElementById('visitor');
var home = document.getElementById('home');
//Time
var time_display = document.getElementById('time_display');
var min_enter = document.getElementById('min');
var sec_enter = document.getElementById('sec');
var tenth_enter = document.getElementById('tenth');
var update_time = document.getElementById('update_time');
var time_in = document.getElementById('time_in');
var open_display = document.getElementById('open_display');
var now_time = new Date();
var previous_time = new Date();
//Colors
var h_r_color = document.getElementById('h_r_color');
var h_g_color = document.getElementById('h_g_color');
var h_b_color = document.getElementById('h_b_color');
var v_r_color = document.getElementById('v_r_color');
var v_g_color = document.getElementById('v_g_color');
var v_b_color = document.getElementById('v_b_color');
//Initial Values
var period = 1;
var home_score = 0;
var visitor_score = 0;
var home_fouls = 0;
var visitor_fouls = 0;
var home_tol = 0;
var visitor_tol = 0;
var home_poss = 0;
var visitor_poss = 0;
var num_periods = 4;
var min = 8;
var sec = 0;
var tenth = 0;
var h_color = [0, 255, 0];
var v_color = [255, 255, 255];
var player_foul = null;
var clock_interval;
var audio = new Audio('assets/Music/audio-1.mp3');
var intro = new Audio ('assets/intros.mp3');
var anthem_music = new Audio ('assets/anthem.mp3');
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
        long_buzzer_audio.currentTime = 0;
        long_buzzer_audio.play();
        cover.classList.add("active_button");
        bc.postMessage("Cover");
        setTimeout(function(){
            countdown.classList.remove("active_button");
            bc.postMessage("countdown_off");
        }, 4000);
        clearInterval(clear_audio_interval);
        clear_audio_interval = setInterval (function() {
            if (audio.volume - 0.1 > 0) {
                audio.volume -= 0.1;
                intro.volume -= 0.1;
                anthem_music.volume -= 0.1;
            } else {
                audio.pause();
                intro.pause();
                anthem_music.pause();
                audio.volume = 1;
                intro.volume = 1;
                anthem_music.volume = 1;
                clearInterval(clear_audio_interval);
                flag.classList.remove("active_button");
                bc.postMessage("flag_off");
            }
        }, 200);
    }
};
window.addEventListener("load", (event) => {
    load_data();
});
let keysPressed = {};
document.addEventListener('keydown', (event) => {
    keysPressed[event.key] = true;
    if (event.key == ' ') {
        document.activeElement.blur();
        if (min != 0 || sec != 0 || tenth != 0) {
            time_in_time_out();
        }
    } else if (event.key == 'Enter') {
        if (document.activeElement == countdown_time) {
            countdown.classList.add("active_button");
            bc.postMessage("countdown_on");
            bc.postMessage("countdown_time&"+countdown_time.value);
        }
        if (document.activeElement == min_enter || document.activeElement == sec_enter || document.activeElement == tenth_enter) {
            min = min_enter.value;
            sec = sec_enter.value;
            tenth = tenth_enter.value;
            update_data();
        }
        document.activeElement.blur();
        update_data();
    }

    if (document.activeElement != h_name && document.activeElement != v_name) {
        if (event.key == 'Shift' && event.location == '2') {
            if (r_poss.classList.contains("active_button")) {
                r_poss.classList.remove("active_button");
            } else {
                r_poss.classList.add("active_button");
                l_poss.classList.remove("active_button");
            }
            document.activeElement.blur();
            update_data();
        } else if (event.key == 'Shift' && event.location == '1') {
            if (l_poss.classList.contains("active_button")) {
                l_poss.classList.remove("active_button");
            } else {
                l_poss.classList.add("active_button");
                r_poss.classList.remove("active_button");
            }
            document.activeElement.blur();
            update_data();
        } else if (event.key == 'ArrowUp') {
            period++; //Go to next period
            update_data(); //Update the content on the screen and in the file
            if ((num_periods / 2 + 1) == period) {
                if (confirm("HALFTIME: Do you need to reset fouls?")) {
                    home_fouls = 0;
                    visitor_fouls = 0;
                    update_data();
                };
            }
            document.activeElement.blur();
        } else if (event.key == 'ArrowDown') {
            if(period != 1) {
                period--; //Go to previous period
            }
            document.activeElement.blur();
            update_data(); //Update the content on the screen and in the file
        }
        else if (keysPressed['ArrowRight'] && event.key == '3') {
            visitor_score += 3;
            v_p3.classList.add("active_button");
            update_data();
            document.activeElement.blur();
        }
        else if (keysPressed['ArrowRight'] && event.key == '2') {
            visitor_score += 2;
            v_p2.classList.add("active_button");
            update_data();
            document.activeElement.blur();
        }
        else if (keysPressed['ArrowRight'] && event.key == '1') {
            visitor_score += 1;
            v_p1.classList.add("active_button");
            update_data();
            document.activeElement.blur();
        }
        else if (keysPressed['ArrowLeft'] && event.key == '3') {
            home_score += 3;
            h_p3.classList.add("active_button");
            update_data();
            document.activeElement.blur();
        }
        else if (keysPressed['ArrowLeft'] && event.key == '2') {
            home_score += 2;
            h_p2.classList.add("active_button");
            update_data();
            document.activeElement.blur();
        }
        else if (keysPressed['ArrowLeft'] && event.key == '1') {
            home_score += 1;
            h_p1.classList.add("active_button");
            update_data();
            document.activeElement.blur();
        }
        else if (event.key == 't') {
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
                buzzer_audio.currentTime = 0;
                buzzer_audio.play();
                timeout.classList.remove("active_button");
            }
        }
    }
});
h_name.addEventListener("input", (event) => {
    update_data();
});
v_name.addEventListener("input", (event) => {
    update_data();
});
h_r_color.addEventListener("input", (event) => {
    localStorage.setItem("h_r_color", h_r_color.value);
    h_color[0] = parseInt(h_r_color.value, 10);
    bc.postMessage("h_r_color&"+h_color[0]);
    update_data();

});
h_g_color.addEventListener("input", (event) => {
    localStorage.setItem("h_g_color", h_g_color.value);
    h_color[1] = parseInt(h_g_color.value, 10);
    bc.postMessage("h_g_color&"+h_color[1]);
    update_data();
});
h_b_color.addEventListener("input", (event) => {
    localStorage.setItem("h_b_color", h_b_color.value);
    h_color[2] = parseInt(h_b_color.value, 10);
    bc.postMessage("h_b_color&"+h_color[2]);
    update_data();
});
v_r_color.addEventListener("input", (event) => {
    localStorage.setItem("v_r_color", v_r_color.value);
    v_color[0] = parseInt(v_r_color.value, 10);
    bc.postMessage("v_r_color&"+v_color[0]);
    update_data();
});
v_g_color.addEventListener("input", (event) => {
    localStorage.setItem("v_g_color", v_g_color.value);
    v_color[1] = parseInt(v_g_color.value, 10);
    bc.postMessage("v_g_color&"+v_color[1]);
    update_data();
});
v_b_color.addEventListener("input", (event) => {
    localStorage.setItem("v_b_color", v_b_color.value);
    v_color[2] = parseInt(v_b_color.value, 10);
    bc.postMessage("v_b_color&"+v_color[2]);
    update_data();
});
total_per.addEventListener("input", (event) => {
    if(parseInt(total_per.value, 10) <= 0) {
        total_per.value = 0;
    }
    localStorage.setItem("total_per", total_per.value);
    num_periods = parseInt(total_per.value, 10)
});
countdown_time.addEventListener("input", (event) => {
    localStorage.setItem("countdown_time", countdown_time.value);
});
min_enter.addEventListener(`focus`, () => min_enter.select());
sec_enter.addEventListener(`focus`, () => sec_enter.select());
tenth_enter.addEventListener(`focus`, () => tenth_enter.select());
h_name.addEventListener(`focus`, () => h_name.select());
v_name.addEventListener(`focus`, () => v_name.select());
min_enter.addEventListener("input", (event) => {
    if (min_enter.value <= -1) {
        min_enter.value = "0";
        sec_enter.value = "00";
        tenth_enter.value = "0";
    }
    localStorage.setItem("min_enter", min_enter.value);
    localStorage.setItem("sec_enter", sec_enter.value);
    localStorage.setItem("tenth_enter", tenth_enter.value);
});
sec_enter.addEventListener("input", (event) => {
    sec_enter.value = parseFloat(sec_enter.value);
    if (sec_enter.value == 60) {
        min_enter.value = (parseInt(min_enter.value) + 1);
        sec_enter.value = "00"
    }
    if (sec_enter.value > 60) {
        sec_enter.value = "59";
    }
    if (sec_enter.value == -1) {
        if (min_enter.value != 0) {
            min_enter.value = (parseInt(min_enter.value) - 1);
            sec_enter.value = "59";
        }
        else {
            tenth_enter.value = 0;
            sec_enter.value = "00";
        }
    }
    if (sec_enter.value < -1) {
        sec_enter.value = "00";
    }
    localStorage.setItem("min_enter", min_enter.value);
    localStorage.setItem("sec_enter", sec_enter.value);
    localStorage.setItem("tenth_enter", tenth_enter.value);
});
tenth_enter.addEventListener("input", (event) => {
    if (tenth_enter.value == 10) {
        if (sec_enter.value == 59) {
            min_enter.value = (parseInt(min_enter.value) + 1);
            sec_enter.value = "00";
        } else {
            sec_enter.value = (parseInt(sec_enter.value) + 1);
        }
        tenth_enter.value = 0;
    }
    if (tenth_enter.value == -1) {
        if (sec_enter.value == 0 && min_enter.value == 0) {
            tenth_enter.value = 0;
        }
        else if (sec_enter.value == 0) {
            if (min_enter.value != 0) {
                min_enter.value = (parseInt(min_enter.value) - 1);
                sec_enter.value = "59";
                tenth_enter.value = 9;
            }
        } else {
            sec_enter.value = (parseInt(sec_enter.value) - 1);
            tenth_enter.value = 9;
        }
    }
    localStorage.setItem("min_enter", min_enter.value);
    localStorage.setItem("sec_enter", sec_enter.value);
    localStorage.setItem("tenth_enter", tenth_enter.value);
});
document.addEventListener('keyup', (event) => {
    keysPressed[event.key] = false;
    v_p3.classList.remove("active_button");
    v_p2.classList.remove("active_button");
    v_p1.classList.remove("active_button");
    h_p3.classList.remove("active_button");
    h_p2.classList.remove("active_button");
    h_p1.classList.remove("active_button");
 });
music.addEventListener("click", function() {
    play_music();
});
intros.addEventListener("click", function() {
    try {
        intro.pause();
    }
    catch (e) {
        console.log(e);
    }
    intro.currentTime = 0;
    intro.play();
    intro.onended = function() {
        intro.pause(); 
    };
});
anthem.addEventListener("click", function() {
    try {
        anthem_music.pause();
    }
    catch (e) {
        console.log(e);
    }
    anthem_music.currentTime = 0;
    anthem_music.play();
    anthem_music.onended = function() {
        anthem_music.pause(); 
    };
    flag.classList.add("active_button");
    bc.postMessage("flag_on");
    anthem_music.onended = function() {
        flag.classList.remove("active_button");
        bc.postMessage("flag_off");
    };
});
clear.addEventListener("click", function() {
    clearInterval(clear_audio_interval);
    clear_audio_interval = setInterval (function() {
        if (audio.volume - 0.1 > 0){
            audio.volume -= 0.1;
            intro.volume -= 0.1;
            anthem_music.volume -= 0.1;
        } else {
            audio.pause();
            intro.pause();
            anthem_music.pause();
            audio.volume = 1;
            intro.volume = 1;
            anthem_music.volume = 1;
            clearInterval(clear_audio_interval);
            flag.classList.remove("active_button");
            bc.postMessage("flag_off");
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
    buzzer_audio.currentTime = 0;
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
        buzzer_audio.currentTime = 0;
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
    if ((num_periods / 2 + 1) == period) {
        if (confirm("HALFTIME: Do you need to reset fouls?")) {
            home_fouls = 0;
            visitor_fouls = 0;
            update_data();
        }
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
        setTimeout(clear_player_foul, 30000);
    }
    home_fouls++;
    update_data();
});
h_foul_m1.addEventListener("click", function() {
    clear_player_foul();
    home_fouls--;
    update_data();
});
v_foul_p1.addEventListener("click", function() {
    player_foul = window.prompt("Player#-#Fouls","00-0");
    if (player_foul != null && player_foul != "") {
        setTimeout(clear_player_foul, 30000);
    }
    visitor_fouls++;
    update_data();
});
v_foul_m1.addEventListener("click", function() {
    clear_player_foul();
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
    if (min == 0 && sec == 0 && tenth == 0) {
        if (confirm("Should we increment the period?\nOK=Increment Period and Reset Time; Cancel=Reset Time only")) {
            period++; //Go to next period
            if ((num_periods / 2 + 1) == period) {
                alert("HALFTIME: Do you need to reset fouls?");
            }
        }
    }
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
    home_tol = 0;
    visitor_tol = 0;
    h_name.value = "Home";
    v_name.value = "Away";
    r_poss.classList.remove("active_button");
    l_poss.classList.remove("active_button");
    min = min_enter.value;
    sec = sec_enter.value;
    tenth = tenth_enter.value;
    alert("Don't forget to update time and timeouts left")
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
        update_data();
        localStorage.setItem("cover", "false");
    } else {
        cover.classList.add("active_button");
        bc.postMessage("Cover");
        localStorage.setItem("cover", "true");
    }
});
flag.addEventListener("click", function() {
    if (flag.classList.contains("active_button")) {
        flag.classList.remove("active_button");
        bc.postMessage("flag_off");
        localStorage.setItem("flag", "false");
    } else {
        flag.classList.add("active_button");
        bc.postMessage("flag_on");
        localStorage.setItem("flag", "true");
    }
});
countdown.addEventListener("click", function() {
    if (countdown.classList.contains("active_button")) {
        countdown.classList.remove("active_button");
        bc.postMessage("countdown_off");
        localStorage.setItem("countdown", "false");
    } else {
        countdown.classList.add("active_button");
        bc.postMessage("countdown_on");
        bc.postMessage("countdown_time&"+countdown_time.value);
        localStorage.setItem("countdown", "true");
    }
});
freeze.addEventListener("click", function() {
    if (freeze.classList.contains("active_button")) {
        freeze.classList.remove("active_button");
        update_data();
        localStorage.setItem("freeze", "false");
    } else {
        freeze.classList.add("active_button");
        localStorage.setItem("freeze", "true");
    }
});
switch_sides.addEventListener("click", function() {
    if (switch_sides.classList.contains("active_button")) {
        switch_sides.classList.remove("active_button");
        localStorage.setItem("sides", "false");
    } else {
        switch_sides.classList.add("active_button");
        localStorage.setItem("sides", "true");
    }
    if (r_poss.classList.contains("active_button")) {
        r_poss.classList.remove("active_button");
        l_poss.classList.add("active_button");
    } else if (l_poss.classList.contains("active_button")) {
        r_poss.classList.add("active_button");
        l_poss.classList.remove("active_button");
    }
    update_data();
    window.location.reload();
});
time_in.addEventListener("click", function() {
    if (sec != 0 || min != 0 || tenth != 0) {
        time_in_time_out();
    }
});
r_poss.addEventListener("click", function() {
    if (r_poss.classList.contains("active_button")) {
        r_poss.classList.remove("active_button");
    } else {
        r_poss.classList.add("active_button");
        l_poss.classList.remove("active_button");
    }
    update_data();
});
l_poss.addEventListener("click", function() {
    if (l_poss.classList.contains("active_button")) {
        l_poss.classList.remove("active_button");
    } else {
        l_poss.classList.add("active_button");
        r_poss.classList.remove("active_button");
    }
    update_data();
});
open_display.addEventListener("click", function() {
    setTimeout(function(){
        update_data();
    }, 500);
});
function update_data() {
    h_score.innerHTML = "Score: "+home_score;
    v_score.innerHTML = "Score: "+visitor_score;
    h_foul.innerHTML = "Fouls: "+home_fouls;
    v_foul.innerHTML = "Fouls: "+visitor_fouls;
    h_tol.innerHTML = "TOL: "+home_tol;
    v_tol.innerHTML = "TOL: "+visitor_tol;
    num_per.innerHTML = "Period: "+period;
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
    if (r_poss.classList.contains("active_button")) {
        localStorage.setItem("possession", "visitor");
    } else if (l_poss.classList.contains("active_button")) {
        localStorage.setItem("possession", "home");
    } else {
        localStorage.setItem("possession", null);
    }
    if (!(freeze.classList.contains("active_button"))) {
        bc.postMessage("sides&"+(switch_sides.classList.contains("active_button")));
        bc.postMessage("left_poss&"+(l_poss.classList.contains("active_button")));
        bc.postMessage("right_poss&"+(r_poss.classList.contains("active_button")));
        if (min != 0) {
            bc.postMessage("Clock&"+min+":"+parseInt(sec).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}));
        } else {
            bc.postMessage("Clock&"+sec+"."+tenth);
        }
        bc.postMessage("home_name&"+h_name.value);
        localStorage.setItem("home_name", h_name.value);
        bc.postMessage("visitor_name&"+v_name.value);
        localStorage.setItem("visitor_name", v_name.value);
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
    if (localStorage.getItem("l_poss") != null){
        home_poss = parseInt(localStorage.getItem("l_poss"));
    }
    else {
        home_poss = 0;
    }
    if (localStorage.getItem("h_tol") != null){
        visitor_poss = parseInt(localStorage.getItem("r_poss"));
    }
    else {
        visitor_poss_tol = 0;
    }
    if (localStorage.getItem("min") != null){
        min = parseInt(localStorage.getItem("min"));
    }
    else {
        min = 8;
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
    if (localStorage.getItem("min_enter") != null){
        min_enter.value = parseInt(localStorage.getItem("min_enter"));
    }
    else {
        min_enter = "4";
    }
    if (localStorage.getItem("sec_enter") != null){
        sec_enter.value = parseInt(localStorage.getItem("sec_enter"));
    }
    else {
        sec_enter = "00";
    }
    if (localStorage.getItem("tenth_enter") != null){
        tenth_enter.value = parseInt(localStorage.getItem("tenth_enter"));
    }
    else {
        tenth_enter = "0";
    }
    if (localStorage.getItem("total_per") != null){
        total_per.value = parseInt(localStorage.getItem("total_per"));
    }
    else {
        min_enter = "4";
    }
    if (localStorage.getItem("possession") == "home") {
        l_poss.classList.add("active_button");
        r_poss.classList.remove("active_button");
    } else if (localStorage.getItem("possession") == "visitor") {
        r_poss.classList.add("active_button");
        l_poss.classList.remove("active_button");
    } else {
        r_poss.classList.remove("active_button");
        l_poss.classList.remove("active_button");
    }
    if (localStorage.getItem("home_name") != null){
        h_name.value = localStorage.getItem("home_name");
        v_name.value = localStorage.getItem("visitor_name");
    }
    else {
        h_name.value = "Home";
        v_name.value = "Away";
    }
    if (localStorage.getItem("countdown_time") != null){
        countdown_time.value = localStorage.getItem("countdown_time");
    }
    if (localStorage.getItem("cover") == "true") {
        bc.postMessage("Cover");
        cover.classList.add("active_button");
    }
    else {
        bc.postMessage("Uncover");
        cover.classList.remove("active_button");
    }
    if (localStorage.getItem("flag") == "true") {
        bc.postMessage("flag_on");
        flag.classList.add("active_button");
    }
    else {
        bc.postMessage("flag_off");
        flag.classList.remove("active_button");
    }
    if (localStorage.getItem("countdown") == "true") {
        bc.postMessage("countdown_on");
        countdown.classList.add("active_button");
    }
    else {
        bc.postMessage("countdown_off");
        countdown.classList.remove("active_button");
    }
    if (localStorage.getItem("freeze") == "true") {
        freeze.classList.add("active_button");
    }
    else {
        freeze.classList.remove("active_button");
    }
    if (localStorage.getItem("sides") == "true") {
        switch_sides.classList.add("active_button");
    }
    else {
        switch_sides.classList.remove("active_button");
    }
    if (localStorage.getItem("h_r_color") != null) {
        h_color[0] = parseInt(localStorage.getItem("h_r_color"));
        h_r_color.value = parseInt(localStorage.getItem("h_r_color"));
        bc.postMessage("h_r_color&"+h_color[0]);
    }
    else {
        h_color[0] = 0;
        h_r_color.value = 0;
        bc.postMessage("h_r_color&"+h_color[0]);
    }
    if (localStorage.getItem("h_g_color") != null) {
        h_color[1] = parseInt(localStorage.getItem("h_g_color"));
        h_g_color.value = parseInt(localStorage.getItem("h_g_color"));
        bc.postMessage("h_g_color&"+h_color[1]);
    }
    else {
        h_color[1] = 255;
        h_g_color.value = 255;
        bc.postMessage("h_g_color&"+h_color[1]);
    }
    if (localStorage.getItem("h_b_color") != null) {
        h_color[2] = parseInt(localStorage.getItem("h_b_color"));
        h_b_color.value = parseInt(localStorage.getItem("h_b_color"));
        bc.postMessage("h_b_color&"+h_color[2]);
    }
    else {
        h_color[2] = 0;
        h_b_color.value = 0;
        bc.postMessage("h_b_color&"+h_color[2]);
    }
    if (localStorage.getItem("v_r_color") != null) {
        v_color[0] = parseInt(localStorage.getItem("v_r_color"));
        v_r_color.value = parseInt(localStorage.getItem("v_r_color"));
        bc.postMessage("v_r_color&"+v_color[0]);
    }
    else {
        v_color[0] = 255;
        v_r_color.value = 255;
        bc.postMessage("v_r_color&"+v_color[0]);
    }
    if (localStorage.getItem("h_g_color") != null) {
        v_color[1] = parseInt(localStorage.getItem("v_g_color"));
        v_g_color.value = parseInt(localStorage.getItem("v_g_color"));
        bc.postMessage("v_g_color&"+v_color[1]);
    }
    else {
        v_color[1] = 255;
        v_g_color.value = 255;
        bc.postMessage("v_g_color&"+v_color[1]);
    }
    if (localStorage.getItem("h_b_color") != null) {
        v_color[2] = parseInt(localStorage.getItem("v_b_color"));
        v_b_color.value = parseInt(localStorage.getItem("v_b_color"));
        bc.postMessage("v_b_color&"+v_color[2]);
    }
    else {
        v_color[2] = 255;
        v_b_color.value = 255;
        bc.postMessage("v_b_color&"+v_color[2]);
    }
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
    var r = Math.floor((Math.random() * (num_music - 1))+ 1);
    try {
        audio.pause();
    }
    catch (e) {
        console.log(e);
    }
    audio.setAttribute('src', 'assets/Music/audio-'+r+'.mp3');
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
            long_buzzer_audio.currentTime = 0;
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
function clear_player_foul() {
    player_foul = null;
    update_data();
}