const blue_team = nodecg.Replicant('blue_team', {defaultValue: {
    "name": "TEAM 1",
    "score": 0,
    "logo_file_name": "NO_ACTIVE_TEAM.png"
}});
const red_team = nodecg.Replicant('red_team', {defaultValue: {
    "name": "TEAM 2",
    "score": 0,
    "logo_file_name": "NO_ACTIVE_TEAM.png"
}});
const game_info = nodecg.Replicant('game_info', {defaultValue: {
    "current": 1,
    "maximum": 3,
    "ad_mode": true,
    "attacking_team": "blue",
    "overlay_visible": true,
    "blue_team": "NO_ACTIVE_TEAM",
    "red_team": "NO_ACTIVE_TEAM",
    "current_game": 0,
    "active_map": "tbd",
    "games": [
        {"id": 0, "map": "tbd", "map_image": null, "mode": "control", "status": "tbd", "blue_team": "tbd", "red_team": "tbd", "blue_score": 0, "red_score": 0},
        {"id": 1, "map": "tbd", "map_image": null, "mode": "hybrid", "status": "tbd", "blue_team": "tbd", "red_team": "tbd", "blue_score": 0, "red_score": 0},
        {"id": 2, "map": "tbd", "map_image": null, "mode": "escort", "status": "tbd", "blue_team": "tbd", "red_team": "tbd", "blue_score": 0, "red_score": 0},
        {"id": 3, "map": "tbd", "map_image": null, "mode": "push", "status": "tbd", "blue_team": "tbd", "red_team": "tbd", "blue_score": 0, "red_score": 0},
        {"id": 4, "map": "tbd", "map_image": null, "mode": "control", "status": "tbd", "blue_team": "tbd", "red_team": "tbd", "blue_score": 0, "red_score": 0},
    ]
}});
const ad_settings = nodecg.Replicant('ad_settings', {defaultValue: {"visible": true}});
const logos = nodecg.Replicant('assets:team_logos');
function resetStats(){
    visible = game_info.value.overlay_visible;
    let text = "Are you sure you want to reset game stats?";
    if (confirm(text) == true) {
        blue_team.value = {
            "name": "TEAM 1",
            "score": 0,
            "logo_file_name": "NO_ACTIVE_TEAM.png",
        };
        red_team.value = {
            "name": "TEAM 2",
            "score": 0,
            "logo_file_name": "NO_ACTIVE_TEAM.png",
        };
        game_info.value = {
            "current": 1,
            "maximum": 3,
            "ad_mode": true,
            "attacking_team": "blue",
            "overlay_visible": visible,
            "blue_team": "NO_ACTIVE_TEAM",
            "red_team": "NO_ACTIVE_TEAM",
            "current_game": 0,
            "active_map": "tbd",
            "games": [
                {"id": 0, "map_id": null, "map": "tbd", "map_image": null, "mode": "control", "status": "tbd", "blue_team": "tbd", "red_team": "tbd", "blue_score": 0, "red_score": 0},
                {"id": 1, "map_id": null, "map": "tbd", "map_image": null, "mode": "hybrid", "status": "tbd", "blue_team": "tbd", "red_team": "tbd", "blue_score": 0, "red_score": 0},
                {"id": 2, "map_id": null, "map": "tbd", "map_image": null, "mode": "escort", "status": "tbd", "blue_team": "tbd", "red_team": "tbd", "blue_score": 0, "red_score": 0},
                {"id": 3, "map_id": null, "map": "tbd", "map_image": null, "mode": "push", "status": "tbd", "blue_team": "tbd", "red_team": "tbd", "blue_score": 0, "red_score": 0},
                {"id": 4, "map_id": null, "map": "tbd", "map_image": null, "mode": "control", "status": "tbd", "blue_team": "tbd", "red_team": "tbd", "blue_score": 0, "red_score": 0},
            ]
        };
        M.updateTextFields();
    }
}
function update() {
    if(game_info.value.overlay_visible){
        blue_team.value = {
            "name": $("#blue_team_name").val(),
            "score": $("#blue_team_score").val(),
            "logo_file_name": $("#blue_team_logo").val(),
        };
        red_team.value = {
            "name": $("#red_team_name").val(),
            "score": $("#red_team_score").val(),
            "logo_file_name": $("#red_team_logo").val(),
        };
        let attacking_team = $("#attacking_team").prop('checked');
        if(attacking_team){
            attacking_team = "red";
        }else{
            attacking_team = "blue";
        }
        const ad_mode = $("#ad_mode").prop('checked');
        game_info.value = {
            "current": game_info.value.current,
            "maximum": game_info.value.maximum,
            "ad_mode": ad_mode,
            "attacking_team": attacking_team,
            "overlay_visible": game_info.value.overlay_visible,
            "blue_team": game_info.value.blue_team,
            "red_team": game_info.value.red_team,
            "current_game": game_info.value.current_game,
            "active_map": game_info.value.active_map,
            "games": game_info.value.games
        };
    }else{
        game_info.value.overlay_visible = true;
        $("#hide_button").removeClass("disabled");
        $("#update_button").html("Update");
    }
}
function swapSides(){
    const old_blue = game_info.value.blue_team;
    const old_red = game_info.value.red_team;
    nodecg.readReplicant('blue_team', value => {
        red_team.value = value;
    });
    nodecg.readReplicant('red_team', value => {
        blue_team.value = value;
    });
    nodecg.readReplicant('blue_team', value => {
        $("#blue_team_name").val(value.name);
        $("#blue_team_score").val(value.score);
        M.updateTextFields();
    });
    nodecg.readReplicant('red_team', value => {
        $("#red_team_name").val(value.name);
        $("#red_team_score").val(value.score);
        M.updateTextFields();
    });
    game_info.value.blue_team = old_red;
    game_info.value.red_team = old_blue;
}
function hide() {
    game_info.value.overlay_visible = false;
    $("#hide_button").addClass("disabled");
    $("#update_button").html("Show");
}
nodecg.readReplicant('blue_team', newVal => {
    console.log(newVal);
    $("#blue_team_name").val(newVal.name);
    $("#blue_team_score").val(newVal.score);
    $('#blue_team_logo_preview').attr('src', `/assets/overwatch-nodecg/team_logos/${newVal.logo_file_name}`);
    console.log(newVal.logo_file_name);
    $(`#blue_team_logo option[value="${newVal.logo_file_name}"]`).attr('selected', 'selected');
    const blue_team_logo = document.getElementById('blue_team_logo');
    M.FormSelect.init(blue_team_logo)
    M.updateTextFields();
});
nodecg.readReplicant('red_team', newVal => {
    console.log(newVal);
    $("#red_team_name").val(newVal.name);
    $("#red_team_score").val(newVal.score);
    $('#red_team_logo_preview').attr('src', `/assets/overwatch-nodecg/team_logos/${newVal.logo_file_name}`);
    console.log(newVal.logo_file_name);
    $(`#red_team_logo option[value="${newVal.logo_file_name}"]`).attr('selected', 'selected');
    const red_team_logo = document.getElementById('red_team_logo');
    M.FormSelect.init(red_team_logo)
    M.updateTextFields();
});
nodecg.readReplicant('assets:team_logos', value => {
    value.sort((a, b) => a.base.localeCompare(b.base))
    $.each(value, function (i, item) {
        $('#blue_team_logo').append($('<option>', { 
            value: item.base,
            text : item.base 
        }));
        $('#red_team_logo').append($('<option>', { 
            value: item.base,
            text : item.base 
        }));
    });
    $('#blue_team_logo').formSelect();
    $('#red_team_logo').formSelect();
});
nodecg.readReplicant('game_info', value => {
    $("#ad_mode").prop('checked', value.ad_mode);
    if(!(value.overlay_visible)){
        $("#hide_button").addClass("disabled");
        $("#update_button").html("Show");
    }
    if(value.attacking_team == "blue"){
        $("#attacking_team").val(false);
    }else{
        $("#attacking_team").val(true);
    }
    M.updateTextFields();
});
$('#blue_team_logo').on('change', function() {
    $('#blue_team_logo_preview').attr('src', `/assets/overwatch-nodecg/team_logos/${this.value}`);
});
$('#red_team_logo').on('change', function() {
    $('#red_team_logo_preview').attr('src', `/assets/overwatch-nodecg/team_logos/${this.value}`);
});

blue_team.on('change', (newVal) => {
    console.log(newVal);
    $("#blue_team_name").val(newVal.name);
    $("#blue_team_score").val(newVal.score);
    $('#blue_team_logo_preview').attr('src', `/assets/overwatch-nodecg/team_logos/${newVal.logo_file_name}`);
    console.log(newVal.logo_file_name);
    $(`#blue_team_logo option[value="${newVal.logo_file_name}"]`).attr('selected', 'selected');
    const blue_team_logo = document.getElementById('blue_team_logo');
    M.FormSelect.init(blue_team_logo)
    M.updateTextFields();
})
red_team.on('change', (newVal) => {
    console.log(newVal);
    $("#red_team_name").val(newVal.name);
    $("#red_team_score").val(newVal.score);
    $('#red_team_logo_preview').attr('src', `/assets/overwatch-nodecg/team_logos/${newVal.logo_file_name}`);
    console.log(newVal.logo_file_name);
    $(`#red_team_logo option[value="${newVal.logo_file_name}"]`).attr('selected', 'selected');
    const red_team_logo = document.getElementById('red_team_logo');
    M.FormSelect.init(red_team_logo)
    M.updateTextFields();
})
game_info.on('change', (newVal) => {
    console.log(newVal.games);
    if(newVal.attacking_team == "blue"){
        $("#attacking_team").prop('checked', false);
    }else{
        $("#attacking_team").prop('checked', true);
    }
    $("#ad_mode").prop('checked', newVal.ad_mode);
    if(newVal.overlay_visible){
        $("#hide_button").removeClass("disabled");
        $("#update_button").html("Update");
        setTimeout(function(){
            if(newVal.ad_mode){
                if(newVal.attacking_team == "blue"){
                    $("#attacking_team").val(false);
                }else{
                    $("#attacking_team").val(true);
                }
            }
        },400);
    }else{
        $("#hide_button").addClass("disabled");
        $("#update_button").html("Show");
    }
})