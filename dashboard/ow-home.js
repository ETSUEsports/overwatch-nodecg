const blue_team = nodecg.Replicant('blue_team', {defaultValue: {
    "name": "Left Team",
    "score": 0,
    "logo_path": "/assets/etsu-ow/team_logos/!DEFAULT_GRAPHIC.png",
}});
const red_team = nodecg.Replicant('red_team', {defaultValue: {
    "name": "Left Team",
    "score": 0,
    "logo_path": "/assets/etsu-ow/team_logos/!DEFAULT_GRAPHIC.png",
}});
const game_info = nodecg.Replicant('game_info', {defaultValue: {
    "current": 1,
    "maximum": 3,
    "ad_mode": true,
    "attacking_team": "blue",
    "overlay_visible": true,
}});
const logos = nodecg.Replicant('assets:team_logos');
function resetStats(){
    visible = game_info.value.overlay_visible;
    let text = "Are you sure you want to reset game stats?";
    if (confirm(text) == true) {
        blue_team.value = {
            "name": "Blue Team",
            "score": 0,
            "logo_path": "/assets/etsu-ow/team_logos/!DEFAULT_GRAPHIC.png",
        };
        red_team.value = {
            "name": "Red Team",
            "score": 0,
            "logo_path": "/assets/etsu-ow/team_logos/!DEFAULT_GRAPHIC.png",
        };
        game_info.value = {
            "current": 1,
            "maximum": 3,
            "ad_mode": true,
            "attacking_team": "blue",
            "overlay_visible": visible
        };
        M.updateTextFields();
    }
}
function update() {
    if(game_info.value.overlay_visible){
        blue_team.value = {
            "name": $("#blue_team_name").val(),
            "score": $("#blue_team_score").val(),
            "logo_path": $("#blue_team_logo").val(),
        };
        red_team.value = {
            "name": $("#red_team_name").val(),
            "score": $("#red_team_score").val(),
            "logo_path": $("#red_team_logo").val(),
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
            "overlay_visible": game_info.value.overlay_visible
        };
    }else{
        game_info.value.overlay_visible = true;
        $("#hide_button").removeClass("disabled");
        $("#update_button").html("Update");
    }
}
function swapSides(){
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
}
function hide() {
    game_info.value.overlay_visible = false;
    $("#hide_button").addClass("disabled");
    $("#update_button").html("Show");
}
nodecg.readReplicant('blue_team', value => {
    $("#blue_team_name").val(value.name);
    $("#blue_team_score").val(value.score);
    $('#blue_team_logo_preview').attr('src', value.logo_path);
    M.updateTextFields();
});
nodecg.readReplicant('red_team', value => {
    $("#red_team_name").val(value.name);
    $("#red_team_score").val(value.score);
    $('#red_team_logo_preview').attr('src', value.logo_path);
    M.updateTextFields();
});
nodecg.readReplicant('assets:team_logos', value => {
    value.sort((a, b) => a.base.localeCompare(b.base))
    $.each(value, function (i, item) {
        $('#blue_team_logo').append($('<option>', { 
            value: item.url,
            text : item.base 
        }));
        $('#red_team_logo').append($('<option>', { 
            value: item.url,
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
    $('#blue_team_logo_preview').attr('src', this.value);
});
$('#red_team_logo').on('change', function() {
    $('#red_team_logo_preview').attr('src', this.value);
});

blue_team.on('change', (newVal) => {
    $("#blue_team_name").val(newVal.name);
    $("#blue_team_score").val(newVal.score);
    $('#blue_team_logo_preview').attr('src', newVal.logo_path);
})
red_team.on('change', (newVal) => {
    $("#red_team_name").val(newVal.name);
    $("#red_team_score").val(newVal.score);
    $('#red_team_logo_preview').attr('src', newVal.logo_path);
})
game_info.on('change', (newVal) => {
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