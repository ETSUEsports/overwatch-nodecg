const logos = nodecg.Replicant('assets:team_logos');
const blue_team = nodecg.Replicant('blue_team');
const red_team = nodecg.Replicant('red_team');
const game_info = nodecg.Replicant('game_info');

game_info.on('change', (value) => {
    value.games.forEach(game => {
        if(game.map != 'tbd'){
            $(`#active_map_${game.id}`).html(`<div class="card small active_map game_status_${game.status}"><div class="card-action"><a class="waves-effect waves-light btn-small green darken-3 action_btn_small" onclick="setMapStatus('${game.id}', 'win')">Won</a> <a class="waves-effect waves-light btn-small red darken-1 action_btn_small" onclick="setMapStatus('${game.id}', 'loss')">Lost</a> <a class="waves-effect waves-light btn-small grey darken-3 action_btn_small" onclick="setMapStatus('${game.id}', 'tbd')">TBD</a></div>
            <div class="card-content"><h5>Game ${game.id+1}:<br>${game.map}</h5></div></div>`)
        }else{
            $(`#active_map_${game.id}`).html(`<div class="card small active_map"><div class="card-content"><h5>Game ${game.id+1}:<br>Map TBD</h5></div></div>`)
        }
    });
})
function getMaps(){
    $.getJSON("/etsu-ow/maps", function(result){
        $('#control_map_cards').html("");
        $.each(result.control, function(i, field){
            $('#control_map_cards').append(`<div class="card small"><div class="card-content"><h5>${field.name}</h5></div><div class="card-action"><a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${escape(field.name)}', '${field.image}', 0)">Map 1</a> <a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${escape(field.name)}', '${field.image}', 4)">Map 5</a></div></div>`);
        });
        $('#hybrid_map_cards').html("");
        $.each(result.hybrid, function(i, field){
            $('#hybrid_map_cards').append(`<div class="card small"><div class="card-content"><h5>${field.name}</h5></div><div class="card-action"><a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${escape(field.name)}', '${field.image}', 1)">Map 2</a></div></div>`);
        });
        $('#escort_map_cards').html("");
        $.each(result.escort, function(i, field){
            $('#escort_map_cards').append(`<div class="card small"><div class="card-content"><h5>${field.name}</h5></div><div class="card-action"><a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${escape(field.name)}', '${field.image}', 2)">Map 3</a></div></div>`);
        });
        $('#push_map_cards').html("");
        $.each(result.push, function(i, field){
            $('#push_map_cards').append(`<div class="card small"><div class="card-content"><h5>${field.name}</h5></div><div class="card-action"><a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${escape(field.name)}', '${field.image}', 3)">Map 4</a></div></div>`);
        });
    });
}

function setActiveMap(id, name, image, game_num){
    game_info.value.games[game_num].map_id = id;
    game_info.value.games[game_num].map = name;
    game_info.value.games[game_num].map_image = image;
}

function resetMaps(){
    let text = `Are you sure you want to reset maps back to TBD?`;
    if (confirm(text) == true) {
        for(let i = 0; i < 5; i++){
            game_info.value.games[i].map_id = "tbd";
            game_info.value.games[i].map = "tbd";
            game_info.value.games[i].map_image = null;
            game_info.value.games[i].status = "tbd";
            game_info.value.games[i].blue_team = "tbd";
            game_info.value.games[i].red_team = "tbd";
            game_info.value.games[i].blue_score = 0;
            game_info.value.games[i].red_score = 0;
        }
    }

}

function setMapStatus(id, result){
    if(result == "win"){
        game_info.value.games[id].status = "win";
    }else if(result == "loss"){
        game_info.value.games[id].status = "loss";
    } else{
        game_info.value.games[id].status = "tbd";
    }
}

setInterval(function () {getMaps();}, 2000);

getMaps();