
function LcxMap(activity) {
	var scene = activity.scene;
	var tileMap;
	var layer,
		layerCollision;

	this.getTileMap = function() {
		return tileMap;
	}

	this.getLayer = function() {
		return layer;
	}

	this.getLayerCollision = function() {
		return layerCollision;
	}

	this.getTileWidth = function() {
		return tileMap.tileWidth * layer.scaleX;
	};
	this.getTileHeight = function() {
		return tileMap.tileHeight * layer.scaleY;
	};
	this.load = function() {
		scene.load.tilemapTiledJSON("worldmap", "map/town-jianye.json");
		//		scene.load.spritesheet("wild-eastBay", "map/wild-eastBay.jpg", {
		//			frameWidth : 2440,
		//			frameHeight : 2440
		//		});
		scene.load.spritesheet("town-jianye", "map/town-jianye.jpg", {
			frameWidth : 2560 * 2,
			frameHeight : 2880
		});
	};

	this.init = function() {
		tileMap = scene.make.tilemap({
			key : 'worldmap'
		});
		var tileset = tileMap.addTilesetImage('town-jianye');
		layer = tileMap.createDynamicLayer('layer1', tileset);
		layer.setCollisionByExclusion([ -1 ]);
		layerCollision = tileMap.createDynamicLayer('layer2', null);
		layerCollision.setCollisionByExclusion([ -1 ]);
		layerCollision.setVisible(false);
		//
		layer.setInteractive().on('pointerdown', function(pointer, localX, localY, event) {
			var player = activity.player.getRole();
			var startTile = layer.getTileAtWorldXY(player.x, player.y);
			var endTile = layer.getTileAtWorldXY(localX, localY);
			var mathSlope = new Slope();
			var wayline = mathSlope.action(startTile.x, startTile.y, endTile.x, endTile.y);
			player.movePath = wayline.xy;
			player.orientation = wayline.oritation;
			console.log("start: x" + startTile.x + " , y" + startTile.y + ">> end: x" + endTile.x + " , y" + endTile.y);
		});
	};
	this.create = function() {
		var objLayer = tileMap.getObjectLayer("object1");
		var objs = objLayer.objects;
		var plg;
		//		console.log(objs.length);
		for (var i = 0; i < objs.length; i++) {
			var obj = objs[i];
			plg = scene.add.polygon(obj.x, obj.y, obj.polygon, 0x000000, 0.6);
			plg.x = plg.x + plg.width / 2;
			plg.y = plg.y + plg.height / 2;
			plg.setVisible(false);
			//
			var image = scene.add.image(0, 0, 'town-jianye');
			image.x = image.width / 2;
			image.y = image.height / 2;
			image.alpha = 0.7;
			//			image.setMask(image.createBitmapMask(plg));
			image.setMask(image.createGeometryMask(plg));
		}
	}


	this.isTileOpenAt = function(worldX, worldY) {
		var tileCollision = layerCollision.getTileAtWorldXY(worldX, worldY, true);
		var isPass = false;
		if (tileCollision && tileCollision.collides) {
			isPass = true;
		}
		//		console.log(tileCollision.x + "," + tileCollision.y //
		//			+ " / " + worldX + "," + worldY //
		//			+ " = " + tileCollision.index + "," + tileCollision.collides + "," + isPass);
		return isPass;
	}
}