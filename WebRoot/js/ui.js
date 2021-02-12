
function LcxUI(activity) {
	var scene = activity.scene;
	var ui_upleft,
		ui_downright,
		ui_coordinateX,
		ui_coordinateY;
	var dialogScreen,
		dialogBG,
		dialogName,
		dialogContent;
	var showLog;
	var debugMsg = "";
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
		initDialog();
	}

	this.appendDebugMsg = function(content) {
		debugMsg = content;
		showLog.setText(debugMsg);
	};

	this.dialogShow = function(name, content) {
		dialogName.setText(name);
		dialogContent.setText(content);
		dialogScreen.setVisible(true);
		dialogBG.setVisible(true);
		dialogName.setVisible(true);
		dialogContent.setVisible(true);
	}
	this.dialogHide = function() {
		dialogScreen.setVisible(false);
		dialogBG.setVisible(false);
		dialogName.setVisible(false);
		dialogContent.setVisible(false);
	}

	function initDialog() {
		var gWidth = scene.game.config.width;
		var gHeight = scene.game.config.height;
		var npcName = "robot：";
		var npcContent = "I am robot.";
		//
		dialogScreen = scene.add.rectangle(gWidth / 2, gHeight / 2, gWidth, gHeight, 0x6666ff, 0);
		dialogScreen.setScrollFactor(0);
		//
		dialogBG = scene.add.rectangle(gWidth / 2, gHeight - 130, gWidth - 10, 250, 0x000000, 0.8);
		dialogBG.setScrollFactor(0);
		//
		dialogName = scene.add.text(20, gHeight - 245, npcName, {
			"fontSize": 14,
			"color": "#00FF00"
		});
		dialogName.setScrollFactor(0);
		dialogName.setWordWrapWidth(gWidth - 20, true);
		//
		dialogContent = scene.add.text(20, gHeight - 225, npcContent, {
			"fontSize": 14,
			"color": "#FFFFFF"
		});
		dialogContent.setScrollFactor(0);
		dialogContent.setWordWrapWidth(gWidth - 40, true);
		//
		dialogScreen.setInteractive().on('pointerdown', function(pointer) { });
		dialogBG.setInteractive().on('pointerdown', function(pointer) {
			dialogScreen.setVisible(false);
			dialogBG.setVisible(false);
			dialogName.setVisible(false);
			dialogContent.setVisible(false);
		});
		dialogScreen.setVisible(false);
		dialogBG.setVisible(false);
		dialogName.setVisible(false);
		dialogContent.setVisible(false);
		//
		dialogScreen.setDepth(9999);
		dialogBG.setDepth(9999);
		dialogName.setDepth(9999);
		dialogContent.setDepth(9999);
		ui_upleft.setDepth(9999);
		ui_downright.setDepth(9999);
		ui_coordinateX.setDepth(9999);
		ui_coordinateY.setDepth(9999);
	}

	this.update = function() {
		var coordinate = activity.player.coordinate();
		ui_coordinateX.setText("X:" + coordinate.x);
		ui_coordinateY.setText("Y:" + coordinate.y);
	}
}
