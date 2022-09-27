$(() => {
    const blue_team = nodecg.Replicant('blue_team');
    const red_team = nodecg.Replicant('red_team');
    const game_info = nodecg.Replicant('game_info');
    blue_team.on('change', (newVal) => {
        $("h1.team_name[data-team='blue_team']").text(newVal.name.toLowerCase());
        $("h1.team_score[data-team='blue_team']").text(newVal.score);
        $(".team_image[data-team='blue_team']").css('background-image', `url(${newVal.logo_path})`);
    })
    red_team.on('change', (newVal) => {
        $("h1.team_name[data-team='red_team']").text(newVal.name.toLowerCase());
        $("h1.team_score[data-team='red_team']").text(newVal.score);
        $(".team_image[data-team='red_team']").css('background-image', `url(${newVal.logo_path})`);
    })
    game_info.on('change', (newVal) => {
        if(newVal.overlay_visible){
            $("#blue_team").removeClass("animate__fadeOutLeft");
            $("#red_team").removeClass("animate__fadeOutRight");
            $("#blue_team").addClass("animate__fadeInLeft");
            $("#red_team").addClass("animate__fadeInRight");
                if(newVal.ad_mode){
                    $("#blue_team_ad").css("visibility", "visible");
                    $("#red_team_ad").css("visibility", "visible");
                    $("h1.team_score[data-team='blue_team']").attr('data-mode', 'visible');
                    $("h1.team_score[data-team='red_team']").attr('data-mode', 'visible');
                    if(newVal.attacking_team == "blue"){
                        $("#blue_team_ad").attr('data-mode', 'attack');
                        $("#red_team_ad").attr('data-mode', 'defend');
                    }else{
                        $("#blue_team_ad").attr('data-mode', 'defend');
                        $("#red_team_ad").attr('data-mode', 'attack');
                    }
                }else{
                    $("#blue_team_ad").css("visibility", "hidden");
                    $("#red_team_ad").css("visibility", "hidden");
                    $("h1.team_score[data-team='blue_team']").attr('data-mode', 'hidden');
                    $("h1.team_score[data-team='red_team']").attr('data-mode', 'hidden');
                }
        }else{
            $("#blue_team_ad").css("visibility", "hidden");
            $("#red_team_ad").css("visibility", "hidden");
            $("#blue_team").removeClass("animate__fadeInLeft");
            $("#red_team").removeClass("animate__fadeInRight");
            $("#blue_team").addClass("animate__fadeOutLeft");
            $("#red_team").addClass("animate__fadeOutRight");
        }
    })
});