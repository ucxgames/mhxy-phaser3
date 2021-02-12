function LcxPlayer(activity, data) {
	var scene = activity.scene;
	var roleMain,
		roleNickName,
		roleWeapon,
		roleShadow;

	this.getRole = function() {
		return roleMain;
	}
	this.getX = function() {
		return roleMain.x;
	}
	this.getY = function() {
		return roleMain.y;
	}

	this.coordinate = function() {
		return {
			"x": Math.round(roleMain.x / activity.map.getTileWidth()),
			"y": Math.round(roleMain.y / activity.map.getTileHeight())
		};
	}

	this.load = function() {
		scene.load.spritesheet("roleStand", "MyAssets/jxk_stand.png", {
			frameWidth: 504 / 9,
			frameHeight: 728 / 8
		});
		scene.load.spritesheet("weaponStand", "MyAssets/jxk_stand_weapon_zl.png", {
			frameWidth: 1460 / 10,
			frameHeight: 704 / 8
		});
		scene.load.spritesheet("weaponRun", "MyAssets/jxk_run_weapon_zl.png", {
			frameWidth: 1288 / 8,
			frameHeight: 1112 / 8
		});
		scene.load.spritesheet("roleRun", "MyAssets/jxk_run.png", {
			frameWidth: 536 / 8,
			frameHeight: 728 / 8
		});
	}
	this.init = function() {
		var initX = activity.map.getTileWidth() * data.x; //初始坐标X
		var initY = activity.map.getTileHeight() * data.y; //初始化坐标Y
		createAnimations();
		//
		roleShadow = scene.add.ellipse(0, 0, 50, 16, '0x00000', 0.45);
		//
		roleNickName = scene.add.text(0, 0, data.nickName, {
			"fontSize": 14,
			"color": "#00FF00"
		});
		roleNickName.setShadow(1, 1, '#000000', 1, false, true);
		//
		roleMain = scene.add.sprite(initX, initY, "role");
		roleMain.originX = 0.5;
		roleMain.originY = 0.8571;
		roleMain.movePath = [];
		roleMain.moveTween = scene.tweens.add({
			targets: roleMain,
		});
		roleMain.posture = "roleStand"
		roleMain.orientation = data.orientation;
		roleMain.anims.play(roleMain.posture + roleMain.orientation);
		//
		roleWeapon = scene.add.sprite(initX, initY, "roleWeapon");
		roleWeapon.originX = 0.4315;
		roleWeapon.originY = 0.5795;
		roleWeapon.posture = "weaponStand"
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
				roleMain.posture = "roleRun";
				roleMain.originY = 0.8352;
				roleWeapon.posture = "weaponRun";
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
					targets: roleMain, // on the player 
					ease: 'Linear',
					duration: duration,
					x: moveX,
					y: moveY,
					yoyo: false
				});
				roleMain.moveTween.on("complete", function() {
					if (roleMain.movePath.length == 0 && roleMain.posture != "roleS") {
						roleMain.posture = "roleStand";
						roleMain.originY = 0.8571;
						roleWeapon.posture = "weaponStand";
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
		roleMain.setDepth(roleMain.y);
		roleWeapon.setDepth(roleMain.y);
		roleNickName.setDepth(roleMain.y);
		roleShadow.setDepth(roleMain.y);
		//shadow
		roleShadow.x = roleMain.x;
		roleShadow.y = roleMain.y;
		roleWeapon.x = roleMain.x;
		roleWeapon.y = roleMain.y;
		roleNickName.x = roleMain.x - roleNickName.width * roleMain.originX;
		roleNickName.y = roleMain.y + roleMain.height * (1 - roleMain.originY);
	}

	function createAnimations() {
		makeAnims("southeast", "roleStand", 0, 9);
		makeAnims("southwest", "roleStand", 1, 9);
		makeAnims("northwest", "roleStand", 2, 9);
		makeAnims("northeast", "roleStand", 3, 9);
		makeAnims("south", "roleStand", 4, 9);
		makeAnims("west", "roleStand", 5, 9);
		makeAnims("north", "roleStand", 6, 9);
		makeAnims("east", "roleStand", 7, 9);
		//
		makeAnims("southeast", "weaponStand", 0, 10);
		makeAnims("southwest", "weaponStand", 1, 10);
		makeAnims("northwest", "weaponStand", 2, 10);
		makeAnims("northeast", "weaponStand", 3, 10);
		makeAnims("south", "weaponStand", 4, 10);
		makeAnims("west", "weaponStand", 5, 10);
		makeAnims("north", "weaponStand", 6, 10);
		makeAnims("east", "weaponStand", 7, 10);
		//Run
		makeAnims("southeast", "roleRun", 0, 8);
		makeAnims("southwest", "roleRun", 1, 8);
		makeAnims("northwest", "roleRun", 2, 8);
		makeAnims("northeast", "roleRun", 3, 8);
		makeAnims("south", "roleRun", 4, 8);
		makeAnims("west", "roleRun", 5, 8);
		makeAnims("north", "roleRun", 6, 8);
		makeAnims("east", "roleRun", 7, 8);
		//weponRun
		makeAnims("southeast", "weaponRun", 0, 8);
		makeAnims("southwest", "weaponRun", 1, 8);
		makeAnims("northwest", "weaponRun", 2, 8);
		makeAnims("northeast", "weaponRun", 3, 8);
		makeAnims("south", "weaponRun", 4, 8);
		makeAnims("west", "weaponRun", 5, 8);
		makeAnims("north", "weaponRun", 6, 8);
		makeAnims("east", "weaponRun", 7, 8);
	}
	function makeAnims(keyName, frameName, index, rate) {
		var startIndex = rate * index;
		var endIndex = rate - 1 + (rate * index);
		//		console.log(frameName + keyName + " : " + startIndex + "," + endIndex);
		scene.anims.create({
			key: frameName + keyName,
			frames: scene.anims.generateFrameNumbers(frameName, {
				start: startIndex,
				end: endIndex
			}),
			frameRate: rate,
			repeat: -1
		});
	}
}