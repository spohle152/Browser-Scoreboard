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
const bc = new BroadcastChannel("channel");
var sides = false;
var countdown_interval_id;
var countdown_time = "09:00";
var min = 4;
var sec = 0;
var tenth = 0;
var clock_interval;
var audio = new Audio('Christian Music/audio-1.mp3');
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
  } else if (event.data.split("&")[0] == "home_poss") {
    if (!sides) {
      if (event.data.split("&")[1] == "true") {
        left_possession.src="active_possession.png";
      } else {
        left_possession.src="inactive_possession.png";
      }
    } else {
      if (event.data.split("&")[1] == "true") {
        right_possession.src="active_possession.png";
      } else {
        right_possession.src="inactive_possession.png";
      }
    }
  } else if (event.data.split("&")[0] == "away_poss") {
    if (!sides) {
      if (event.data.split("&")[1] == "true") {
        right_possession.src="active_possession.png";
      } else {
        right_possession.src="inactive_possession.png";
      }
    } else {
      if (event.data.split("&")[1] == "true") {
        left_possession.src="active_possession.png";
      } else {
        left_possession.src="inactive_possession.png";
      }
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
    if (!sides) {
      left_score.innerHTML = event.data.split("&")[1];
    } else {
      right_score.innerHTML = event.data.split("&")[1];
    }
  } else if (event.data.split("&")[0] == "away_score") {
    if (!sides) {
      right_score.innerHTML = event.data.split("&")[1];
    } else {
      left_score.innerHTML = event.data.split("&")[1];
    }
  } else if (event.data.split("&")[0] == "home_tol") {
    if (!sides) {
      left_tol.innerHTML = event.data.split("&")[1];
    } else {
      right_tol.innerHTML = event.data.split("&")[1];
    }
  } else if (event.data.split("&")[0] == "away_tol") {
    if (!sides) {
      right_tol.innerHTML = event.data.split("&")[1];
    } else {
      left_tol.innerHTML = event.data.split("&")[1];
    }
  } else if (event.data.split("&")[0] == "home_foul") {
    if (!sides) {
      left_fouls.innerHTML = event.data.split("&")[1];
    } else {
      right_fouls.innerHTML = event.data.split("&")[1];
    }
  } else if (event.data.split("&")[0] == "away_foul") {
    if (!sides) {
      right_fouls.innerHTML = event.data.split("&")[1];
    } else {
      left_fouls.innerHTML = event.data.split("&")[1];
    }
  } else if (event.data.split("&")[0] == "player_foul") {
      player_fouls.innerHTML = event.data.split("&")[1];
  } else if (event.data.split("&")[0] == "sides") {
      if (event.data.split("&")[1] == "true") {
        sides=true;
        top_left.style.backgroundColor='rgba(255, 255, 255, 0.15)';
        middle_left.style.backgroundColor='rgba(255, 255, 255, 0.15)';
        bottom_left.style.backgroundColor='rgba(255, 255, 255, 0.15)';
        top_right.style.backgroundColor='rgba(0, 255, 0, 0.15)';
        middle_right.style.backgroundColor='rgba(0, 255, 0, 0.15)';
        bottom_right.style.backgroundColor='rgba(0, 255, 0, 0.15)';
      } else {
        sides=false;
        top_right.style.backgroundColor='rgba(255, 255, 255, 0.15)';
        middle_right.style.backgroundColor='rgba(255, 255, 255, 0.15)';
        bottom_right.style.backgroundColor='rgba(255, 255, 255, 0.15)';
        top_left.style.backgroundColor='rgba(0, 255, 0, 0.15)';
        middle_left.style.backgroundColor='rgba(0, 255, 0, 0.15)';
        bottom_left.style.backgroundColor='rgba(0, 255, 0, 0.15)';
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