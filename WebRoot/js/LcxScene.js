
class LcxScene extends Phaser.Scene {
	constructor() {
		super("lcxScene");
	}

	preload() {
		var progress = this.add.graphics();
		this.load.on('progress', function(value) {
			progress.clear();
			progress.fillStyle(0xffffff, 1);
			progress.fillRect(0, 270, 800 * value, 60);
		});
		this.load.on('complete', function() {
			progress.destroy();
		});
		var mActiv = function() { };
		mActiv.scene = this;
		mActiv.group = this.add.group();
		mActiv.map = new LcxMap(mActiv, globalData.map);
		mActiv.player = new LcxPlayer(mActiv, globalData.player);
		mActiv.camera = new LcxCamera(mActiv);
		mActiv.npc = [];
		for (var i = 0; i < globalData.npcs.length; i++) {
			var npc = globalData.npcs[i];
			mActiv.npc.push(new LcxNPC(mActiv, npc));
		}
		//
		mActiv.ui = new LcxUI(mActiv);
		//
		mActiv.map.load();
		mActiv.player.load();
		for (var i = 0; i < mActiv.npc.length; i++) {
			var npc = mActiv.npc[i];
			npc.load();
		}
		mActiv.ui.load();
		this.activ = mActiv;
	}
	create() {
		var mGroup = this.activ.group;
		this.activ.map.init();
		for (var i = 0; i < this.activ.npc.length; i++) {
			var npc = this.activ.npc[i];
			npc.init();
			mGroup.add(npc.getNpc());
		}
		this.activ.player.init();
		this.activ.map.create();
		this.activ.ui.init();
		this.activ.camera.init();
		//
		mGroup.add(this.activ.player.getRole());
	}

	update() {
		this.activ.map.update();
		var msg = "";
		for (var i = 0; i < this.activ.npc.length; i++) {
			var npc = this.activ.npc[i];
			npc.update();
		}
		this.activ.player.update();
		this.activ.ui.update();
		//this.activ.ui.appendDebugMsg(msg );
		this.activ.ui.appendDebugMsg(msg + this.activ.player.getRole().depth);
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
	this.load = function() { };

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