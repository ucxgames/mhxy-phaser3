

var config = {
	type : Phaser.AUTO,
	width : 1024,
	height : 768,
	backgroundColor : '#000000',
	parent : 'phaser-example',
	pixelArt : true,
	scene : {
		preload : preload,
		create : create,
		update : update
	}
};

var game = new Phaser.Game(config);
var actMap;
var actPlayer;
var actCam,
	actMusic;
var actUI;
var act;
function Activity() {
}

function preload() {
	act = new Activity();
	Activity.prototype.scene = this;
	Activity.prototype.map = new LcxMap(act);
	Activity.prototype.player = new LcxPlayer(act);
	Activity.prototype.camera = new LcxCamera(act);
	Activity.prototype.npc = new LcxNPC(act);
	Activity.prototype.music = new LcxMusic(act);
	Activity.prototype.ui = new LcxUI(act);
	//
	actMap = act.map;
	actMap.load();
	//
	actPlayer = act.player;
	actPlayer.load();
	//
	act.npc.load();
	//
	actCam = act.camera;
	actMusic = act.music;
	actMusic.load();
	//
	actUI = act.ui;
	actUI.load();
}
function create() {
	// load the map 
	actMap.init();
	//player
	act.npc.init();
	actPlayer.init();
	actMap.create();
	//UI
	actUI.init();
	//
	var gWidth = this.game.config.width;
	var gHeight = this.game.config.height;
	var dialog = this.add.rectangle(gWidth / 2, gHeight / 2, gWidth, gHeight, 0x6666ff, 0);
	dialog.setScrollFactor(0);
	var dialogBG = this.add.rectangle(gWidth / 2, gHeight - 110, gWidth - 10, 200, 0x000000, 0.8);
	dialogBG.setScrollFactor(0);
	var dialogName = this.add.text(20, gHeight - 200, '苏美美：', {
		"fontSize" : 14,
		"color" : "#00FF00"
	}).setScrollFactor(0);
	dialogName.setWordWrapWidth(gWidth - 20, true);
	var dialogContent = this.add.text(20, gHeight, 'Hello~', {
		"fontSize" : 14,
		"color" : "#FFFFFF"
	}).setScrollFactor(0);
	dialogContent.setWordWrapWidth(gWidth - 40, true);
	dialog.setInteractive().on('pointerdown', function(pointer) {
		console.log("smm: disable");
	});
	dialogBG.setInteractive().on('pointerdown', function(pointer) {
		console.log("smm: disable");
		dialog.setVisible(false);
		dialogBG.setVisible(false);
		dialogName.setVisible(false);
		dialogContent.setVisible(false);
	});
	Activity.prototype.dialog = dialog;
	//Music
	actMusic.init();
	//Camera
	actCam.init();
}

class LcxScene extends Phaser.Scene {
	constructor() {
		super("LcxScene");
	}
	preload() {}
	create() {}
	update() {}
}


function update(time, delta) {
	act.npc.update();
	actPlayer.update();
	actUI.update();
}

function LcxNPC(activity) {
	var scene = activity.scene;
	var npc,
		nickName,
		shadow;

	this.getNpc = function() {
		return npc;
	};
	this.load = function() {
		scene.load.spritesheet("npcSummStand", "MyAssets/npc_summ_stand.png", {
			frameWidth : 66,
			frameHeight : 73
		});
	};

	this.init = function() {
		var initX = activity.map.getTileWidth() * 50; //初始坐标X
		var initY = activity.map.getTileHeight() * 115; //初始化坐标Y
		var initName = "孙梦梦";
		//
		var frames = 5,
			frameEnd = frames - 1;
		makeAnims("npcSummStandDownRight", "npcSummStand", (frames * 0), frameEnd + (frames * 0), 5);
		makeAnims("npcSummStandDownLeft", "npcSummStand", (frames * 1), frameEnd + (frames * 1), 5);
		makeAnims("npcSummStandUpLeft", "npcSummStand", (frames * 2), frameEnd + (frames * 2), 5);
		makeAnims("npcSummStandUpRight", "npcSummStand", (frames * 3), frameEnd + (frames * 3), 5);
		//
		shadow = scene.add.ellipse(0, 0, 50, 16, '0x00000', 0.45);
		//
		nickName = scene.add.text(0, 0, initName, {
			"fontSize" : 12,
			"color" : "#00FF00"
		});
		nickName.setShadow(1, 1, '#000000', 1, false, true);
		//
		npc = scene.add.sprite(initX, initY, "npcSumm");
		npc.originX = 0.5;
		npc.originY = 0.8767;
		npc.posture = "npcSummStand"
		npc.orientation = "DownRight";
		npc.anims.play(npc.posture + npc.orientation);
		npc.setInteractive().on('pointermove', function(pointer) {
			this.setTint(Math.random() * 16000000);
		});
		npc.setInteractive().on('pointerout', function(pointer) {
			console.log("smm: you are out.");
			this.clearTint();
		});
		npc.setInteractive().on('pointerdown', function(pointer) {
			console.log("smm: Hi~");
			if (!activity.dialog.visible) {
				activity.dialog.setVisible(true);
			}
		});
	//
	}

	this.update = function() {
		shadow.x = npc.x;
		shadow.y = npc.y;
		nickName.x = npc.x - nickName.width * npc.originX;
		nickName.y = npc.y + npc.height * (1 - npc.originY);
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


function LcxUI(activity) {
	var scene = activity.scene;
	var ui_upleft,
		ui_downright,
		ui_coordinateX,
		ui_coordinateY;
	var showLog;
	this.load = function() {
		//
		scene.load.image("downright", "MyAssets/ui-downright.png", 318, 63);
		scene.load.image("upleft", "MyAssets/ui-upleft.png", 118, 79);
	};

	this.init = function() {
		ui_upleft = scene.add.image(118 / 2, 79 / 2, 'upleft').setScrollFactor(0);
		ui_downright = scene.add.image(config.width - 318 / 2 - 1, config.height - 63 / 2 - 1, 'downright').setScrollFactor(0);
		ui_coordinateX = scene.add.text(20, 65).setText('X:0').setScrollFactor(0);
		ui_coordinateX.setFontSize(12);
		ui_coordinateX.setShadow(1, 1, '#000000', 1);
		ui_coordinateY = scene.add.text(67, 65).setText('Y:0').setScrollFactor(0);
		ui_coordinateY.setFontSize(12);
		ui_coordinateY.setShadow(1, 1, '#000000', 1);
		showLog = scene.add.text(150, ui_coordinateY.y).setText('showLog:Null').setScrollFactor(0);
		scene.scale.on('orientationchange', function(orientation) {
			if (orientation === Phaser.Scale.PORTRAIT) {
				showLog.setText("PORTRAIT");
			//			actCam.setRotation(1.555);
			} else if (orientation === Phaser.Scale.LANDSCAPE) {
				showLog.setText("LANDSCAPE");
			//			actCam.setRotation(1);
			}
		});
	}

	this.update = function() {
		var coordinate = activity.player.coordinate();
		ui_coordinateX.setText("X:" + coordinate.x);
		ui_coordinateY.setText("Y:" + coordinate.y);
	}
}

function LcxMusic(activity) {
	var scene = activity.scene;
	this.load = function() {
		scene.load.audio('theme', [
			'bgm/bgm-jianye.mp3'
		]);
	};

	this.init = function() {
		var music = scene.sound.add('theme');
		var loopMarker = {
			name : 'loop',
			start : 0,
			duration : 54,
			config : {
				loop : true
			}
		};
		music.addMarker(loopMarker);
		music.play('loop', {
			delay : 0
		});
	}
}

function LcxCamera(activity) {
	var scene = activity.scene;
	var player;
	var layer;
	var cam;
	this.getCamera = function() {
		return cam
	};
	this.load = function() {};

	this.init = function() {
		player = activity.player.getRole();
		layer = activity.map.getLayer();
		//
		cam = scene.cameras.main;
		cam.setBounds(0, 0, layer.width * layer.scaleX, layer.height * layer.scaleY);
		cam.startFollow(player, true, 0.01, 0.03);
	//		cam.scrollX = player.x - cam.width * 0.5;
	//		cam.scrollY = player.y - cam.height * 0.5;
	}

	this.update = function() {
		// Smooth follow the player
		var smoothFactor = 0.9;
		cam.scrollX = smoothFactor * cam.scrollX + (1 - smoothFactor) * (player.x - cam.width * 0.5);
		cam.scrollY = smoothFactor * cam.scrollY + (1 - smoothFactor) * (player.y - cam.height * 0.5);
	}
}