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

function getTeams(){
    $.getJSON("/etsu-ow/teams", function(result){
        $('#team_cards').html("");
        $.each(result, function(i, field){
            $('#team_cards').append(`<div class="card small"><div class="card-image"><img src="/assets/overwatch-nodecg/team_logos/${field.logo}"></div><div class="card-content"><p>${field.name}</p></div><div class="card-action"><a class="waves-effect waves-light btn-small team-blue" onclick="setActiveTeam('${field.name}', 'blue')">BLUE</a> <a class="waves-effect waves-light btn-small team-red" onclick="setActiveTeam('${field.name}', 'red')">RED</a> <a class="waves-effect waves-light btn-small" onclick="deleteTeam('${field.name}')"><i class="material-icons">delete</i></a></div></div>`);
        });
    });
}

function displayActiveTeam(name, color){
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

function setActiveTeam(name, color){
    console.log(`Setting ${name} as the active team for ${color}`);
    if(color == "blue"){
        game_info.value.blue_team = name;
    }else if(color == "red"){
        game_info.value.red_team = name;
    }
}

function deleteTeam(name){
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
                        getTeams();
                    }
                });
            }
        }
    });
}

setInterval(function () {getTeams();}, 2000);

document.addEventListener('dialog-confirmed', function() {
    getTeams();
});

getTeams();