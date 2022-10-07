$(() => {
    const blue_team = nodecg.Replicant('blue_team');
    const red_team = nodecg.Replicant('red_team');
    const game_info = nodecg.Replicant('game_info');
    blue_team.on('change', (newVal) => {
        $(".team_image[data-team='blue_team']").css('background-image', `url(/assets/overwatch-nodecg/team_logos/${newVal.logo_file_name})`);
    })
    red_team.on('change', (newVal) => {
        $(".team_image[data-team='red_team']").css('background-image', `url(/assets/overwatch-nodecg/team_logos/${newVal.logo_file_name})`);
    })
    game_info.on('change', (newVal) => {

    })
});