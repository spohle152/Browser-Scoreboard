var switch_sides = document.getElementById('switch_sides');
var left = document.getElementById('left');

if (localStorage.getItem("sides") == "true") {
    left.innerHTML = 
        '        <div class="visitor" id="visitor">\
                <select id="v_name" name="v_name" class="team_name"></select>\
                <div class="color"><h3>&nbsp;R:&nbsp;</h3><input id="v_r_color" type="number" min="0" max="255" value="255"><h3>&nbsp;G:&nbsp;</h3><input id="v_g_color" type="number" min="0" max="255" value="255"><h3>&nbsp;B:&nbsp;</h3><input id="v_b_color" type="number" min="0" max="255" value="255"></div>\
                <h3 id="v_score">Score: 0</h3>\
                <button id="v_p3">+3</button><br>\
                <button id="v_p2">+2</button><br>\
                <button id="v_p1">+1</button><br>\
                <button id="v_m1">-1</button><br>\
                <p id="v_foul">Fouls: 0</p>\
                <button id="v_foul_p1">Foul: +1</button><br>\
                <button id="v_foul_m1">Foul: -1</button><br>\
                <button id="v_bonus">B</button>\
                <button id="v_d_bonus">B+</button>\
                <p id="v_tol">TOL: 1</p>\
                <button id="v_tol_p1">TOL: +1</button><br>\
                <button id="v_tol_m1">TOL: -1</button>\
            </div>';
}
else {
    left.innerHTML = 
        '        <div class="home" id="home">\
                <select id="h_name" name="h_name" class="team_name"></select>\
                <div class="color"><h3>&nbsp;R:&nbsp;</h3><input id="h_r_color" type="number" min="0" max="255" value="0"><h3>&nbsp;G:&nbsp;</h3><input id="h_g_color" type="number" min="0" max="255" value="255"><h3>&nbsp;B:&nbsp;</h3><input id="h_b_color" type="number" min="0" max="255" value="0"></div>\
                <h3 id="h_score">Score: 0</h3>\
                <button id="h_p3">+3</button><br>\
                <button id="h_p2" onclick="this.blur();">+2</button><br>\
                <button id="h_p1">+1</button><br>\
                <button id="h_m1">-1</button><br>\
                <p id="h_foul">Fouls: 0</p>\
                <button id="h_foul_p1">Foul: +1</button><br>\
                <button id="h_foul_m1">Foul: -1</button><br>\
                <button id="h_bonus">B</button>\
                <button id="h_d_bonus">B+</button>\
                <p id="h_tol">TOL: 1</p>\
                <button id="h_tol_p1">TOL: +1</button><br>\
                <button id="h_tol_m1">TOL: -1</button>\
            </div>';
}