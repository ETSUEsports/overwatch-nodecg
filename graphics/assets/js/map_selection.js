const game_info = nodecg.Replicant('game_info');

game_info.on('change', (value) => {
    value.games.forEach(game => {
        if(game.map != 'tbd'){
            if(game.status == 'win'){
                $(`#map_${game.id}_image`).addClass('map_win');
                $(`#map_${game.id}_image`).removeClass('map_loss');
            }else if(game.status == 'loss'){
                $(`#map_${game.id}_image`).addClass('map_loss');
                $(`#map_${game.id}_image`).removeClass('map_win');
            }else{
                $(`#map_${game.id}_image`).removeClass('map_win');
                $(`#map_${game.id}_image`).removeClass('map_loss');
            }
            $(`#map_${game.id}_image`).attr("src", `./assets/img/maps/${game.mode}/${game.map_image}`);
        }else{
            $(`#map_${game.id}_image`).attr("src", "./assets/img/maps/tbd.png");
        }
    });
})