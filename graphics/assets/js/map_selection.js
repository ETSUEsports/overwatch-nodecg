const game_info = nodecg.Replicant('game_info');

game_info.on('change', (value) => {
    value.games.forEach(game => {
        if(game.map != 'tbd'){
            $(`#map_${game.id}_image`).attr("src", `./assets/img/maps/${game.mode}/${game.map_image}`);
            $(`#map_${game.id}_text`).html(`${game.map}`);
        }else{
            $(`#active_map_${game.id}`).attr("src", "./assets/img/maps/tbd.png");
            $(`#map_${game.id}_text`).html("TBD");
        }
    });
})