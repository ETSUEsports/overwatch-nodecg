const logos = nodecg.Replicant('assets:team_logos');
const blue_team = nodecg.Replicant('blue_team');
const red_team = nodecg.Replicant('red_team');
const game_info = nodecg.Replicant('game_info');

nodecg.readReplicant('game_info', value => {
    if(value.blue_team != "NO_ACTIVE_TEAM"){
        displayActiveTeam(value.blue_team, 'blue');
    }else{
        $('#active_blue_team').html(`<div class="card active-blue small"><div class="card-image"><img src="/assets/overwatch-nodecg/team_logos/NO_ACTIVE_TEAM.png"></div><div class="card-content"><p>No Active Team</p></div></div>`);
    }
    if(value.red_team != "NO_ACTIVE_TEAM"){
        displayActiveTeam(value.red_team, 'red');
    }else{
        $('#active_red_team').html(`<div class="card active-red small"><div class="card-image"><img src="/assets/overwatch-nodecg/team_logos/NO_ACTIVE_TEAM.png"></div><div class="card-content"><p>No Active Team</p></div></div>`);
    }
});

game_info.on('change', (value) => {
    if(value.blue_team != "NO_ACTIVE_TEAM"){
        displayActiveTeam(value.blue_team, 'blue');
    }else{
        $('#active_blue_team').html(`<div class="card active-blue small"><div class="card-image"><img src="/assets/overwatch-nodecg/team_logos/NO_ACTIVE_TEAM.png"></div><div class="card-content"><p>No Active Team</p></div></div>`);
    }
    if(value.red_team != "NO_ACTIVE_TEAM"){
        displayActiveTeam(value.red_team, 'red');
    }else{
        $('#active_red_team').html(`<div class="card active-red small"><div class="card-image"><img src="/assets/overwatch-nodecg/team_logos/NO_ACTIVE_TEAM.png"></div><div class="card-content"><p>No Active Team</p></div></div>`);
    }
})

function getMaps(){
    $.getJSON("/etsu-ow/maps", function(result){
        $('#control_map_cards').html("");
        $.each(result.control, function(i, field){
            $('#control_map_cards').append(`<div class="card small"><div class="card-content"><h5>${field.name}</h5></div><div class="card-action"><a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}')">Set as Active</a></div></div>`);
        });
        $('#hybrid_map_cards').html("");
        $.each(result.hybrid, function(i, field){
            $('#hybrid_map_cards').append(`<div class="card small"><div class="card-content"><h5>${field.name}</h5></div><div class="card-action"><a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}')">Set as Active</a></div></div>`);
        });
        $('#escort_map_cards').html("");
        $.each(result.escort, function(i, field){
            $('#escort_map_cards').append(`<div class="card small"><div class="card-content"><h5>${field.name}</h5></div><div class="card-action"><a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}')">Set as Active</a></div></div>`);
        });
        $('#push_map_cards').html("");
        $.each(result.escort, function(i, field){
            $('#push_map_cards').append(`<div class="card small"><div class="card-content"><h5>${field.name}</h5></div><div class="card-action"><a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}')">Set as Active</a></div></div>`);
        });
    });
}

function displayActiveMap(name, color){
    $.getJSON(`/etsu-ow/teams/${name}`, function(result){
        if(color == "blue"){
            $('#active_blue_team').html(`<div class="card active-blue small"><div class="card-image"><img src="/assets/overwatch-nodecg/team_logos/${result.logo}"></div><div class="card-content"><p>${result.name}</p></div></div>`);
            blue_team.value.name = result.name;
            blue_team.value.logo_file_name = result.logo;
        }else if(color == "red"){
            $('#active_red_team').html(`<div class="card active-red small"><div class="card-image"><img src="/assets/overwatch-nodecg/team_logos/${result.logo}"></div><div class="card-content"><p>${result.name}</p></div></div>`);
            red_team.value.name = result.name;
            red_team.value.logo_file_name = result.logo;
        }    
    });
}

function setActiveMap(id){
    game_info.value.active_map = id;
}

function deleteMap(name){
    if(name == "ETSU"){
        alert("You cannot delete the ETSU Team!");
        return
    }
    nodecg.readReplicant('game_info', value => {
        if(value.blue_team == name || value.red_team == name){
            alert("You cannot delete an active team!");
        }else{
            let text = `Are you sure you want to delete the team: ${name}?`;
            if (confirm(text) == true) {
                $.ajax({
                    type: "DELETE",
                    url: `/etsu-ow/teams/${name}`,
                    success: function(data){
                        alert(data);
                        getMaps();
                    }
                });
            }
        }
    });
}

setInterval(function () {getMaps();}, 2000);

document.addEventListener('dialog-confirmed', function() {
    getMaps();
});

getMaps();