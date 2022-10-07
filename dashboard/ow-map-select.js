const logos = nodecg.Replicant('assets:team_logos');
const blue_team = nodecg.Replicant('blue_team');
const red_team = nodecg.Replicant('red_team');
const game_info = nodecg.Replicant('game_info');

game_info.on('change', (value) => {
    value.games.forEach(game => {
        if(game.map != 'tbd'){
            $(`#active_map_${game.id}`).html(`<div class="card small active_map"><div class="card-content"><h5>Game ${game.id+1}:<br>${game.map}</h5></div></div>`)
        }else{
            $(`#active_map_${game.id}`).html(`<div class="card small active_map"><div class="card-content"><h5>Game ${game.id+1}:<br>Map TBD</h5></div></div>`)
        }
    });
})

function getMaps(){
    $.getJSON("/etsu-ow/maps", function(result){
        $('#control_map_cards').html("");
        $.each(result.control, function(i, field){
            $('#control_map_cards').append(`<div class="card small"><div class="card-content"><h5>${field.name}</h5></div><div class="card-action"><a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${field.name}', '${field.image}', 0)">1</a> <a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${field.name}', '${field.image}', 1)">2</a> <a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${field.name}', '${field.image}', 2)">3</a> <a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${field.name}', '${field.image}', 3)">4</a> <a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${field.name}', '${field.image}', 4)">5</a></div></div>`);
        });
        $('#hybrid_map_cards').html("");
        $.each(result.hybrid, function(i, field){
            $('#hybrid_map_cards').append(`<div class="card small"><div class="card-content"><h5>${field.name}</h5></div><div class="card-action"><a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${field.name}', '${field.image}', 0)">1</a> <a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${field.name}', '${field.image}', 1)">2</a> <a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${field.name}', '${field.image}', 2)">3</a> <a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${field.name}', '${field.image}', 3)">4</a> <a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${field.name}', '${field.image}', 4)">5</a></div></div>`);
        });
        $('#escort_map_cards').html("");
        $.each(result.escort, function(i, field){
            $('#escort_map_cards').append(`<div class="card small"><div class="card-content"><h5>${field.name}</h5></div><div class="card-action"><a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${field.name}', '${field.image}', 0)">1</a> <a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${field.name}', '${field.image}', 1)">2</a> <a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${field.name}', '${field.image}', 2)">3</a> <a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${field.name}', '${field.image}', 3)">4</a> <a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${field.name}', '${field.image}', 4)">5</a></div></div>`);
        });
        $('#push_map_cards').html("");
        $.each(result.escort, function(i, field){
            $('#push_map_cards').append(`<div class="card small"><div class="card-content"><h5>${field.name}</h5></div><div class="card-action"><a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${field.name}', '${field.image}', 0)">1</a> <a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${field.name}', '${field.image}', 1)">2</a> <a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${field.name}', '${field.image}', 2)">3</a> <a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${field.name}', '${field.image}', 3)">4</a> <a class="waves-effect waves-light btn-small" onclick="setActiveMap('${field.id}', '${field.name}', '${field.image}', 4)">5</a></div></div>`);
        });
    });
}

function setActiveMap(id, name, image, game_num){
    game_info.value.games[game_num].map_id = id;
    game_info.value.games[game_num].map = name;
    game_info.value.games[game_num].map_image = image;
}

setInterval(function () {getMaps();}, 2000);

getMaps();