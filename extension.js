'use strict';

module.exports = function (nodecg) {
	const router = nodecg.Router();
	const blue_team = nodecg.Replicant('blue_team');
	const red_team = nodecg.Replicant('red_team');
	const game_info = nodecg.Replicant('game_info');
    router.post('/team/:team/score/add', (req, res, next) => {
		try{
			if(req.params.team == "blue"){
				blue_team.value.score++;
			}else if(req.params.team == "red"){
				red_team.value.score++;
			}else{
				throw new Error("Unknown team.")
			}
			res.send('OK!');
		}
		catch (err){
			next(err);
		}
    });
    router.post('/team/:team/score/del', (req, res, next) => {
		try{
			if(req.params.team == "blue"){
				if(!(blue_team.value.score < 1)){
					blue_team.value.score--;
				}else{
					throw new Error("Value cannot be lower than 0.");
				}
			}else if(req.params.team == "red"){
				if(!(red_team.value.score < 1)){
					red_team.value.score--;
				}else{
					throw new Error("Value cannot be lower than 0.");
				}
			}else{
				throw new Error("Unknown team.");
			}
			res.send('OK!');
		}
		catch (err){
			next(err);
		}
    });
	router.post('/game/ad_mode/on', (req, res, next) => {
		try{
			game_info.value.ad_mode = true;
			res.send('OK!');
		}
		catch (err){
			next(err);
		}
    });
	router.post('/game/ad_mode/off', (req, res, next) => {
		try{
			game_info.value.ad_mode = false;
			res.send('OK!');
		}
		catch (err){
			next(err);
		}
    });
	router.post('/game/attacking_team/:team', (req, res, next) => {
		try{
			if(req.params.team == "blue"){
				game_info.value.attacking_team = "blue";
			}else if(req.params.team == "red"){
				game_info.value.attacking_team = "red";
			}else{
				throw new Error("Unknown team.");
			}
			res.send('OK!');
		}
		catch (err){
			next(err);
		}
    });
	router.post('/overlay/on', (req, res, next) => {
		try{
			game_info.value.overlay_visible = true;
			res.send('OK!');
		}
		catch (err){
			next(err);
		}
    });
	router.post('/overlay/off', (req, res, next) => {
		try{
			game_info.value.overlay_visible = false;
			res.send('OK!');
		}
		catch (err){
			next(err);
		}
    });
    nodecg.mount('/etsu-ow', router);
};