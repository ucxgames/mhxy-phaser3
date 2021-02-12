function LcxPlayer(activity) {
	var scene = activity.scene;
	var roleMain,
		roleNickName,
		roleWeapon,
		roleShadow;

	this.getRole = function() {
		return roleMain;
	}

	this.coordinate = function() {
		return {
			"x" : Math.round(roleMain.x / activity.map.getTileWidth()),
			"y" : Math.round(roleMain.y / activity.map.getTileHeight())
		};
	}

	this.load = function() {
		scene.load.spritesheet("roleStand", "MyAssets/jxk_stand.png", {
			frameWidth : 504 / 9,
			frameHeight : 728 / 8
		});
		scene.load.spritesheet("weaponStand", "MyAssets/jxk_stand_weapon_zl.png", {
			frameWidth : 1460 / 10,
			frameHeight : 704 / 8
		});
		scene.load.spritesheet("weaponRun", "MyAssets/jxk_run_weapon_zl.png", {
			frameWidth : 1288 / 8,
			frameHeight : 1112 / 8
		});
		scene.load.spritesheet("roleRun", "MyAssets/jxk_run.png", {
			frameWidth : 536 / 8,
			frameHeight : 728 / 8
		});
	}
	this.init = function() {
		var initX = activity.map.getTileWidth() * 45; //初始坐标X
		var initY = activity.map.getTileHeight() * 99; //初始化坐标Y
		var initName = "无处呻吟";
		createAnimations();
		//
		roleShadow = scene.add.ellipse(0, 0, 50, 16, '0x00000', 0.45);
		//
		roleNickName = scene.add.text(0, 0, initName, {
			"fontSize" : 12,
			"color" : "#00FF00"
		});
		roleNickName.setShadow(1, 1, '#000000', 1, false, true);
		//
		roleMain = scene.add.sprite(initX, initY, "role");
		roleMain.originX = 0.5;
		roleMain.originY = 0.8571;
		roleMain.movePath = [];
		roleMain.moveTween = scene.tweens.add({
			targets : roleMain,
		});
		roleMain.posture = "roleS"
		roleMain.orientation = "south";
		roleMain.anims.play(roleMain.posture + roleMain.orientation);
		//
		roleWeapon = scene.add.sprite(initX, initY, "roleWeapon");
		roleWeapon.originX = 0.4315;
		roleWeapon.originY = 0.5795;
		roleWeapon.posture = "weaponS"
		roleWeapon.anims.play(roleWeapon.posture + roleMain.orientation);
	}
	this.update = function() {
		if (roleMain.movePath.length > 0) {
			var nextTile = roleMain.movePath[0];
			var duration = 0;
			var tw = activity.map.getTileWidth();
			var th = activity.map.getTileHeight();
			//检测，碰撞后返回一步
			for (var i = 0; i < roleMain.movePath.length; i++) {
				var tile = roleMain.movePath[i]; // 从路径数组中取出下一步的tile
				var tx = tile.x * tw;
				var ty = tile.y * th;
				if (!activity.map.isTileOpenAt(tx, ty)) {
					break;
				}
				nextTile = tile;
				duration = (200 * i);
			}
			console.log("Goto: x" + nextTile.x + ",y" + nextTile.y + ",duration:" + duration);
			if (duration >= 200) {
				//人物動畫
				roleMain.moveTween.stop();
				roleMain.posture = "roleR";
				roleMain.originY = 0.8352;
				roleWeapon.posture = "weaponR";
				roleWeapon.originX = 0.441;
				roleWeapon.originY = 0.6835;
				roleMain.anims.play(roleMain.posture + roleMain.orientation);
				roleWeapon.anims.play(roleWeapon.posture + roleMain.orientation);
				console.log(roleMain.posture + roleMain.orientation);
				//将坐标转换 为 世界坐标(实际像素)
				var moveX = nextTile.x * tw;
				var moveY = nextTile.y * th;
				//人物移动
				roleMain.moveTween = scene.tweens.add({
					targets : roleMain, // on the player 
					ease : 'Linear',
					duration : duration,
					x : moveX,
					y : moveY,
					yoyo : false
				});
				roleMain.moveTween.on("complete", function() {
					if (roleMain.movePath.length == 0 && roleMain.posture != "roleS") {
						roleMain.posture = "roleS";
						roleMain.originY = 0.8571;
						roleWeapon.posture = "weaponS";
						roleWeapon.originX = 0.4315;
						roleWeapon.originY = 0.5795;
						roleMain.anims.play(roleMain.posture + roleMain.orientation);
						roleWeapon.anims.play(roleWeapon.posture + roleMain.orientation);
					}
				})
			}
			//初始化路径
			roleMain.movePath = [];
		}
		//shadow
		roleShadow.x = roleMain.x;
		roleShadow.y = roleMain.y;
		roleWeapon.x = roleMain.x;
		roleWeapon.y = roleMain.y;
		roleNickName.x = roleMain.x - roleNickName.width * roleMain.originX;
		roleNickName.y = roleMain.y + roleMain.height * (1 - roleMain.originY);
	}


	function createAnimations() {
		var frames = 9,
			frameEnd = frames - 1;
		makeAnims("roleSsoutheast", "roleStand", (frames * 0), frameEnd + (frames * 0), 10);
		makeAnims("roleSsouthwest", "roleStand", (frames * 1), frameEnd + (frames * 1), 10);
		makeAnims("roleSnorthwest", "roleStand", (frames * 2), frameEnd + (frames * 2), 10);
		makeAnims("roleSnortheast", "roleStand", (frames * 3), frameEnd + (frames * 3), 10);
		makeAnims("roleSsouth", "roleStand", (frames * 4), frameEnd + (frames * 4), 10);
		makeAnims("roleSwest", "roleStand", (frames * 5), frameEnd + (frames * 5), 10);
		makeAnims("roleSnorth", "roleStand", (frames * 6), frameEnd + (frames * 6), 10);
		makeAnims("roleSeast", "roleStand", (frames * 7), frameEnd + (frames * 7), 10);
		//
		frames = 10,
		frameEnd = frames - 1;
		makeAnims("weaponSsoutheast", "weaponStand", (frames * 0), frameEnd + (frames * 0), 9);
		makeAnims("weaponSsouthwest", "weaponStand", (frames * 1), frameEnd + (frames * 1), 9);
		makeAnims("weaponSnorthwest", "weaponStand", (frames * 2), frameEnd + (frames * 2), 9);
		makeAnims("weaponSnortheast", "weaponStand", (frames * 3), frameEnd + (frames * 3), 9);
		makeAnims("weaponSsouth", "weaponStand", (frames * 4), frameEnd + (frames * 4), 9);
		makeAnims("weaponSwest", "weaponStand", (frames * 5), frameEnd + (frames * 5), 9);
		makeAnims("weaponSnorth", "weaponStand", (frames * 6), frameEnd + (frames * 6), 9);
		makeAnims("weaponSeast", "weaponStand", (frames * 7), frameEnd + (frames * 7), 9);
		//Run
		frames = 8,
		frameEnd = frames - 1;
		makeAnims("roleRsoutheast", "roleRun", (frames * 0), frameEnd + (frames * 0), 10);
		makeAnims("roleRsouthwest", "roleRun", (frames * 1), frameEnd + (frames * 1), 10);
		makeAnims("roleRnorthwest", "roleRun", (frames * 2), frameEnd + (frames * 2), 10);
		makeAnims("roleRnortheast", "roleRun", (frames * 3), frameEnd + (frames * 3), 10);
		makeAnims("roleRsouth", "roleRun", (frames * 4), frameEnd + (frames * 4), 10);
		makeAnims("roleRwest", "roleRun", (frames * 5), frameEnd + (frames * 5), 10);
		makeAnims("roleRnorth", "roleRun", (frames * 6), frameEnd + (frames * 6), 10);
		makeAnims("roleReast", "roleRun", (frames * 7), frameEnd + (frames * 7), 10);
		//weponRun
		frames = 8,
		frameEnd = frames - 1;
		makeAnims("weaponRsoutheast", "weaponRun", (frames * 0), frameEnd + (frames * 0), 10);
		makeAnims("weaponRsouthwest", "weaponRun", (frames * 1), frameEnd + (frames * 1), 10);
		makeAnims("weaponRnorthwest", "weaponRun", (frames * 2), frameEnd + (frames * 2), 10);
		makeAnims("weaponRnortheast", "weaponRun", (frames * 3), frameEnd + (frames * 3), 10);
		makeAnims("weaponRsouth", "weaponRun", (frames * 4), frameEnd + (frames * 4), 10);
		makeAnims("weaponRwest", "weaponRun", (frames * 5), frameEnd + (frames * 5), 10);
		makeAnims("weaponRnorth", "weaponRun", (frames * 6), frameEnd + (frames * 6), 10);
		makeAnims("weaponReast", "weaponRun", (frames * 7), frameEnd + (frames * 7), 10);
	}
	function makeAnims(keyName, frameName, startIndex, endIndex, rate) {
		scene.anims.create({
			key : keyName,
			frames : scene.anims.generateFrameNumbers(frameName, {
				start : startIndex,
				end : endIndex
			}),
			frameRate : rate,
			repeat : -1
		});
	}
}