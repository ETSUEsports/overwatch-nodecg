'use strict';
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./bundles/overwatch-nodecg/overwatch.sqlite');
const multer = require('multer');
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  cb(null, './assets/overwatch-nodecg/team_logos')
	},
	filename: function (req, file, cb) {
	  cb(null, file.originalname)
	}
})
const fs = require('fs');

const upload = multer({ storage: storage });

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
	router.get('/teams', (req, res) => {
		db.all("SELECT logo, name FROM teams", (error, rows) => {
			res.send(rows);
		});
	})
	router.get('/teams/:name', (req, res) => {
		db.all("SELECT logo, name FROM teams WHERE name = ?", [req.params.name], (error, rows) => {
			res.send(rows[0]);
		});
	})
	router.put('/team', (req, res) => {
		db.all("INSERT INTO teams (logo, name) VALUES (?, ?)", [req.body.logo, req.body.name], (error, rows) => {
			if (error) {
				res.status(500);
				res.send(error.message);
				return console.log(error.message);
			}
			res.send('Added Team');
		});
	})
	router.post('/team/logo',upload.any(), (req, res) => {
		res.send('Uploaded Logo');
	})
	router.delete('/teams/:name', (req, res) => {
		db.all("DELETE FROM teams WHERE name = ?", [req.params.name], (error, rows) => {
			if (error) {
				res.status(500);
				res.send(error.message);
				return console.log(error.message);
			}
			try {
				fs.unlinkSync(`./assets/overwatch-nodecg/team_logos/${req.params.name}`);
			  } catch(err) {
				console.error(err)
			  }
			res.send('Deleted Team');
		});
	})
	router.get('/maps', (req, res) => {
		const jsonFile = fs.createReadStream('./bundles/overwatch-nodecg/graphics/assets/img/maps/maps.json');
		jsonFile.pipe(res);
	})
    nodecg.mount('/etsu-ow', router);
};