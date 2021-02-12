
function LcxNPC(activity, data) {
	var scene = activity.scene;
	var npc,
		nickName,
		shadow;
	this.getNpc = function() {
		return npc;
	};
	this.getX = function() {
		return npc.x;
	};
	this.getY = function() {
		return npc.y;
	};

	this.load = function() {
		if (data.name === "npcSumm") {
			scene.load.spritesheet("npcSummStand", "MyAssets/npc_summ_stand.png", {
				frameWidth: 66,
				frameHeight: 73
			});
		}
	};

	this.init = function() {
		var initX = activity.map.getTileWidth() * data.x; //初始坐标X
		var initY = activity.map.getTileHeight() * data.y; //初始化坐标Y
		//
		if (data.name == "npcSumm") {
			var tmpName = "npcSummStand";
			var frames = 5,
				frameEnd = frames - 1;
			makeAnims("DownRight", tmpName, 0, 5);
			makeAnims("DownLeft", tmpName, 1, 5);
			makeAnims("UpLeft", tmpName, 2, 5);
			makeAnims("UpRight", tmpName, 3, 5);
			//
			shadow = scene.add.ellipse(0, 0, 50, 16, '0x00000', 0.45);
			nickName = scene.add.text(0, 0, data.nickName, {
				"fontSize": 12,
				"color": "#00FF00"
			});
			nickName.setShadow(1, 1, '#000000', 1, false, true);
			npc = scene.add.sprite(initX, initY, data.name);
			npc.originX = 0.5;
			npc.originY = 0.8767;
			npc.posture = tmpName;
			npc.orientation = data.orientation;
			npc.anims.play(npc.posture + npc.orientation);
		}
		npc.setInteractive().on('pointermove', function(pointer) {
			this.setTint(Math.random() * 16000000);
		});
		npc.setInteractive().on('pointerout', function(pointer) {
			this.clearTint();
		});
		npc.setInteractive().on('pointerdown', function(pointer) {
			var index = Math.floor(data.msg.length * Math.random());
			activity.ui.dialogShow(data.nickName, data.msg[index]);
			if (!scene.scale.isFullscreen) {
				scene.scale.startFullscreen();
			}
		});
		//
	}

	this.update = function() {
		npc.setDepth(npc.y);
		shadow.setDepth(npc.y);
		nickName.setDepth(npc.y);
		//
		shadow.x = npc.x;
		shadow.y = npc.y;
		nickName.x = npc.x - nickName.width * npc.originX;
		nickName.y = npc.y + npc.height * (1 - npc.originY);
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