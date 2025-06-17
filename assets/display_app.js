var right_score = document.getElementById('right_score');
var cover_image = document.getElementById('cover_image');
var flag = document.getElementById('flag');
var clock = document.getElementById('clock');
var left_name = document.getElementById('left_team_name');
var right_name = document.getElementById('right_team_name');
var left_possession = document.getElementById('left_possession');
var right_possession = document.getElementById('right_possession');
var period = document.getElementById('period');
var left_bonus = document.getElementById('left_bonus');
var right_bonus = document.getElementById('right_bonus');
var left_score = document.getElementById('left_score');
var right_score = document.getElementById('right_score');
var left_tol = document.getElementById('left_tol');
var right_tol = document.getElementById('right_tol');
var left_fouls = document.getElementById('left_team_fouls');
var right_fouls = document.getElementById('right_team_fouls');
var player_fouls = document.getElementById('player_fouls');
var top_left = document.getElementById('top_left');
var top_right = document.getElementById('top_right');
var middle_left = document.getElementById('middle_left');
var middle_right = document.getElementById('middle_right');
var bottom_left = document.getElementById('bottom_left');
var bottom_right = document.getElementById('bottom_right');
var countdown_image = document.getElementById('countdown_image');
var time_til_game = document.getElementById('time_til_game');
var team_intros = document.getElementById('team_intros');
var first_name = document.getElementById('first_name');
var last_name = document.getElementById('last_name');
var team_name = document.getElementById('team_name');
var foul_labels = document.getElementsByClassName('foul_label');
var tol_labels = document.getElementsByClassName('tol_label');
var player_fouls_container = document.getElementById('player_fouls_container');
var bottom = document.getElementsByClassName('bottom');
const bc = new BroadcastChannel("channel");
var sides = false;
var show_score = true;
var show_foul = true;
var show_tol = true;
var countdown_interval_id;
var countdown_time = "09:00";
var min = 4;
var sec = 0;
var tenth = 0;
var h_color = [0, 255, 0];
var v_color = [255, 255, 255];
var clock_interval;
var buzzer_audio = new Audio('buzzer.mp3');
var long_buzzer_audio = new Audio('long_buzzer.mp3');
var timeoutId;

bc.onmessage = (event) => {
  if(event.data == "Cover") {
      cover_image.style.transition = "all 2s";
      cover_image.style.opacity = "1"; 
  } else if(event.data == "Uncover") {
      cover_image.style.transition = "all 2s";
      cover_image.style.opacity = "0"; 
  } else if(event.data == "flag_on") {
      flag.style.transition = "all 2s";
      flag.style.opacity = "1"; 
  } else if(event.data == "flag_off") {
      flag.style.transition = "all 2s";
      flag.style.opacity = "0"; 
  } else if(event.data == "countdown_on") {
      countdown_image.style.transition = "all 2s";
      countdown_image.style.opacity = "1"; 
      clearInterval(countdown_interval_id);
  } else if(event.data == "countdown_off") {
      countdown_image.style.transition = "all 2s";
      countdown_image.style.opacity = "0";
      setTimeout(function(){
        if (countdown_image.style.opacity == "0") {
          clearInterval(countdown_interval_id);
        }
      }, 2000);
  } else if(event.data.split("&")[0] == "countdown_time") {
      countdown_time = event.data.split("&")[1];
      update_countdown();
  } else if (event.data.split("&")[0] == "Clock") {
      clock.innerHTML = event.data.split("&")[1];
  } else if (event.data.split("&")[0] == "period") {
      period.innerHTML = "Period: "+event.data.split("&")[1];
  } else if (event.data.split("&")[0] == "left_poss") {
    if (event.data.split("&")[1] == "true") {
      left_possession.src="active_possession.png";
    } else {
      left_possession.src="inactive_possession.png";
    }
  } else if (event.data.split("&")[0] == "right_poss") {
    if (event.data.split("&")[1] == "true") {
      right_possession.src="active_possession.png";
    } else {
      right_possession.src="inactive_possession.png";
    }
  } else if (event.data.split("&")[0] == "home_b") {
    if (!sides) {
      left_bonus.innerHTML = event.data.split("&")[1];
    } else {
      right_bonus.innerHTML = event.data.split("&")[1];
    }
  } else if (event.data.split("&")[0] == "away_b") {
    if (!sides) {
      right_bonus.innerHTML = event.data.split("&")[1];
    } else {
      left_bonus.innerHTML = event.data.split("&")[1];
    }
  } else if (event.data.split("&")[0] == "home_score") {
    if (show_score) {
      if (!sides) {
        left_score.innerHTML = event.data.split("&")[1];
        left_score.style.opacity = 1;
      } else {
        right_score.innerHTML = event.data.split("&")[1];
        right_score.style.opacity = 1;
      }
    } 
    else {
      right_score.style.opacity = 0;
      left_score.style.opacity = 0;
    }
  } else if (event.data.split("&")[0] == "away_score") {
    if (show_score) {
      if (!sides) {
        right_score.innerHTML = event.data.split("&")[1];
        right_score.style.opacity = 1;
      } else {
        left_score.innerHTML = event.data.split("&")[1];
        left_score.style.opacity = 1;
      }
    } 
    else {
      right_score.style.opacity = 0;
      left_score.style.opacity = 0;
    }
  } else if (event.data.split("&")[0] == "home_tol") {
    if (show_tol) {
      tol_labels[0].style.opacity = 1;
      tol_labels[1].style.opacity = 1;
      if (!sides) {
        left_tol.innerHTML = event.data.split("&")[1];
        left_tol.style.opacity = 1;
      } else {
        right_tol.innerHTML = event.data.split("&")[1];
        right_tol.style.opacity = 1;
      }
    }
    else {
      tol_labels[0].style.opacity = 0;
      tol_labels[1].style.opacity = 0;
      left_tol.style.opacity = 0;
      right_tol.style.opacity = 0;
    }
  } else if (event.data.split("&")[0] == "away_tol") {
    if (show_tol) {
      tol_labels[0].style.opacity = 1;
      tol_labels[1].style.opacity = 1;
      if (!sides) {
        right_tol.innerHTML = event.data.split("&")[1];
        right_tol.style.opacity = 1;
      } else {
        left_tol.innerHTML = event.data.split("&")[1];
        left_tol.style.opacity = 1;
      }
    }
    else {
      tol_labels[0].style.opacity = 0;
      tol_labels[1].style.opacity = 0;
      left_tol.style.opacity = 0;
      right_tol.style.opacity = 0;
    }
  } else if (event.data.split("&")[0] == "home_foul") {
    if (show_foul) {
      foul_labels[0].style.opacity = 1;
      foul_labels[1].style.opacity = 1;
      if (!sides) {
        left_fouls.innerHTML = event.data.split("&")[1];
        left_fouls.style.opacity = 1;
      } else {
        right_fouls.innerHTML = event.data.split("&")[1];
        right_fouls.style.opacity = 1;
      }
    }
    else {
      foul_labels[0].style.opacity = 0;
      foul_labels[1].style.opacity = 0;
      left_fouls.style.opacity = 0;
      right_fouls.style.opacity = 0;
    }
  } else if (event.data.split("&")[0] == "away_foul") {
    if (show_foul) {
      foul_labels[0].style.opacity = 1;
      foul_labels[1].style.opacity = 1;
      if (!sides) {
        right_fouls.innerHTML = event.data.split("&")[1];
        right_fouls.style.opacity = 1;
      } else {
        left_fouls.innerHTML = event.data.split("&")[1];
        left_fouls.style.opacity = 1;
      }
    }
    else {
      foul_labels[0].style.opacity = 0;
      foul_labels[1].style.opacity = 0;
      left_fouls.style.opacity = 0;
      right_fouls.style.opacity = 0;
    }
  } else if (event.data.split("&")[0] == "player_foul") {
      player_fouls.innerHTML = event.data.split("&")[1];
  } else if (event.data.split("&")[0] == "h_r_color") {
    h_color[0] = event.data.split("&")[1];
  } else if (event.data.split("&")[0] == "h_g_color") {
    h_color[1] = event.data.split("&")[1];
  } else if (event.data.split("&")[0] == "h_b_color") {
    h_color[2] = event.data.split("&")[1];
  } else if (event.data.split("&")[0] == "v_r_color") {
    v_color[0] = event.data.split("&")[1];
  } else if (event.data.split("&")[0] == "v_g_color") {
    v_color[1] = event.data.split("&")[1];
  } else if (event.data.split("&")[0] == "v_b_color") {
    v_color[2] = event.data.split("&")[1];
  } else if (event.data.split("&")[0] == "sides") {
      if (event.data.split("&")[1] == "true") {
        sides=true;
        top_left.style.backgroundColor='rgba('+v_color[0]+','+v_color[1]+','+v_color[2]+', 0.15)';
        middle_left.style.backgroundColor='rgba('+v_color[0]+','+v_color[1]+','+v_color[2]+', 0.15)';
        bottom_left.style.backgroundColor='rgba('+v_color[0]+','+v_color[1]+','+v_color[2]+', 0.15)';
        top_right.style.backgroundColor='rgba('+h_color[0]+','+h_color[1]+','+h_color[2]+', 0.15)';
        middle_right.style.backgroundColor='rgba('+h_color[0]+','+h_color[1]+','+h_color[2]+', 0.15)';
        bottom_right.style.backgroundColor='rgba('+h_color[0]+','+h_color[1]+','+h_color[2]+', 0.15)';
      } else {
        sides=false;
        top_right.style.backgroundColor='rgba('+v_color[0]+','+v_color[1]+','+v_color[2]+', 0.15)';
        middle_right.style.backgroundColor='rgba('+v_color[0]+','+v_color[1]+','+v_color[2]+', 0.15)';
        bottom_right.style.backgroundColor='rgba('+v_color[0]+','+v_color[1]+','+v_color[2]+', 0.15)';
        top_left.style.backgroundColor='rgba('+h_color[0]+','+h_color[1]+','+h_color[2]+', 0.15)';
        middle_left.style.backgroundColor='rgba('+h_color[0]+','+h_color[1]+','+h_color[2]+', 0.15)';
        bottom_left.style.backgroundColor='rgba('+h_color[0]+','+h_color[1]+','+h_color[2]+', 0.15)';
      }
  } else if (event.data.split("&")[0] == "home_name") {
    if (!sides) {
      left_name.innerHTML = event.data.split("&")[1];
    } else {
      right_name.innerHTML = event.data.split("&")[1];
    }
  } else if (event.data.split("&")[0] == "visitor_name") {
    if (!sides) {
      right_name.innerHTML = event.data.split("&")[1];
    } else {
      left_name.innerHTML = event.data.split("&")[1];
    }
  } else if (event.data.split("&")[0] == "show_score") {
    if (event.data.split("&")[1] == "false") {
      show_score = false;
    } else {
      show_score = true;
    }
  } else if (event.data.split("&")[0] == "show_foul") {
    if (event.data.split("&")[1] == "false") {
      show_foul = false;
      player_fouls_container.style.opacity = 0;
      setTimeout(function() {
        player_fouls_container.style.display = "none";
        bottom[0].style.gridTemplateColumns = "1.5fr 1.5fr";
      }, 350);
    } else {
      show_foul = true;
      player_fouls_container.style.display = "block";
      bottom[0].style.gridTemplateColumns = "1.5fr 1fr 1.5fr";
      setTimeout(function() {
        player_fouls_container.style.opacity = 1;
      }, 350);
    }
  } else if (event.data.split("&")[0] == "show_tol") {
    if (event.data.split("&")[1] == "false") {
      show_tol = false;
    } else {
      show_tol = true;
    }
  } else if (event.data.split("&")[0] == "intro_on") {
    first_name.style.opacity = 0;
    last_name.style.opacity = 0;
    if (event.data.split("&")[3] != team_name.innerHTML) {
      team_name.style.opacity = 0;
    }
    setTimeout(function() {
      first_name.innerHTML = event.data.split("&")[1];
      last_name.innerHTML = event.data.split("&")[2];
      team_name.innerHTML = event.data.split("&")[3];
      first_name.style.opacity = 1;
      last_name.style.opacity = 1;
      team_name.style.opacity = 1;
      team_intros.style.opacity = 1;
    }, 350);
  } else if (event.data.split("&")[0] == "intro_off") {
    team_intros.style.opacity = 0;
  } 
};

function update_countdown() {
  hour = countdown_time.split(":")[0];
  minute = countdown_time.split(":")[1];
  var countDownDate = new Date();
  countDownDate.setHours(hour);
  countDownDate.setMinutes(minute);
  countDownDate.setSeconds(0);
  var distance = countDownDate - Date.now();
  if (distance < 0) {
    time_til_game.innerHTML = "0.0";
  } else {
// Update the count down every 1 second
    countdown_interval_id = setInterval(function() {
      // Get today's date and time
      var now = new Date().getTime();
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
      // Time calculations for minutes, seconds, and tenths of a second
      var minutes = Math.floor((distance / (1000 * 60)));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      var tenth = Math.floor((distance % (1000)) / 100);
      // Display the result
      if (minutes != 0) {
        time_til_game.innerHTML = minutes + ":" + parseInt(seconds).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
      } else {
        time_til_game.innerHTML = seconds + "." + tenth;
      }
      // If the count down is finished, sound the buzzer and stop the timer
      if (distance < 0) {
        clearInterval(countdown_interval_id);
        time_til_game.innerHTML = "0.0";
        bc.postMessage("countdown_finished");
      }
    }, 50);
  }
}