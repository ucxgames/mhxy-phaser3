class LoadScene extends Phaser.Scene {

	constructor() {
		super();
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
		this.load.script("jsMap", "js/map.js");
		this.load.script("jsPlayer", "js/player.js");
		this.load.script("jsNpc", "js/npc.js");
		this.load.script("jsUi", "js/ui.js");
		this.load.script("jsSlope", "js/slope.js");
		this.load.sceneFile('LcxScene', 'js/LcxScene.js');
	}

	create() {
		this.scene.start('lcxScene');
	}
	update() {}
}


var config = {
	type : Phaser.AUTO,
	mode : Phaser.Scale.FIT,
	width : 980,
	height : 500,
	backgroundColor : '#000000',
	scene : LoadScene
};

var game = new Phaser.Game(config);

var globalData = {
	ui : {},
	map : {
		name : "town-jianye"
	},
	player : {
		name : "jxk",
		nickName : "甚丰大流",
		orientation : "south",
		x : 45,
		y : 99
	},
	players : [],
	npcs : [ {
		name : "npcSumm",
		nickName : "苏梦梦",
		msg : [ "我是建邺城的快乐卖货郎～", "需要点什么吗？", "随便看看。" ],
		x : 50,
		y : 115,
		orientation : "DownRight"
	}, {
		name : "npcSumm",
		nickName : "苏梦梦A",
		msg : [ "A我是建邺城的快乐卖货郎～", "A需要点什么吗？", "A随便看看。" ],
		x : 61,
		y : 121,
		orientation : "UpLeft"
	} ]
}