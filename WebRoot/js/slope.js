/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 * 
 * 顺时针旋转的方向代表数字
 *  8 1 2
 *  7 0 3
 * 6 5 4
 * 
 */

var SLOPE_TOP = 1;
var SLOPE_RIGHTTOP = 2;
var SLOPE_RIGHT = 3;
var SLOPE_RIGHTDOWN = 4;
var SLOPE_DOWN = 5;
var SLOPE_LEFTDOWN = 6;
var SLOPE_LEFT = 7;
var SLOPE_LEFTUP = 8;

function Slope() {
	this.action = function(startX, startY, endX, endY) {
		var width = endX - startX;
		var height = endY - startY;
		var slope = width > height ? height / width : width / height; //斜率计算
		var json = "";
		//	console.log("斜率:" + slope );
		if (slope != 0 && slope != Infinity && slope != -Infinity) { //斜角
			if (width > 0 && height > 0) {
				json = slope_rightDown(startX, startY, endX, endY);
			} else if (width > 0 && height < 0) {
				json = slope_rightUp(startX, startY, endX, endY);
			} else if (width < 0 && height > 0) {
				json = slope_leftDown(startX, startY, endX, endY);
			} else if (width < 0 && height < 0) {
				json = slope_leftUp(startX, startY, endX, endY);
			}
		} else { //直线
			if (width > 0) {
				json = slope_right(startX, startY, width);
			} else if (width < 0) {
				json = slope_left(startX, startY, width);
			} else if (height > 0) {
				json = slope_down(startX, startY, height);
			} else if (height < 0) {
				json = slope_up(startX, startY, height);
			}
		}
		//		json.xy.shift();
		json.xy.push({
			"x" : endX,
			"y" : endY
		});
		return json;
	}


	function slope_up(x, y, distance) {
		var json = {
			"xy" : [],
			"oritation" : "north"
		};
		var count = 0;
		for (var i = distance; i < 0; i++) {
			//			console.log("/distance:" + distance + "/y" + y + "/index:" + i + "/" + (y - count));
			json.xy.push({
				"x" : x,
				"y" : (y - count)
			});
			count++;
		}
		return json;

	}

	function slope_right(x, y, distance) {
		var json = {
			"xy" : [],
			"oritation" : "east"
		};
		for (var i = 0; i < distance; i++) {
			json.xy.push({
				"x" : (x + i),
				"y" : y
			});
		}
		return json;
	}

	function slope_down(x, y, distance) {
		var json = {
			"xy" : [],
			"oritation" : "south"
		};
		for (var i = 0; i < distance; i++) {
			json.xy.push({
				"x" : x,
				"y" : (y + i)
			});
		}
		return json;
	}

	function slope_left(x, y, distance) {
		var json = {
			"xy" : [],
			"oritation" : "west"
		};
		var count = 0;
		for (var i = distance; i < 0; i++) {
			//			console.log("/distance:" + distance + "/y" + y + "/index:" + i + "/" + (y - count));
			json.xy.push({
				"x" : (x - count),
				"y" : y
			});
			count++;
		}
		return json;
	}

	function slope_rightUp(startX, startY, endX, endY) {
		var width = endX - startX;
		var height = endY - startY;
		var x = startX;
		var y = startY;
		var slope = 0;
		var json = {
			"xy" : [],
			"oritation" : "northeast"
		};
		//负数转整数
		width = width < 0 ? -width : width;
		height = height < 0 ? -height : height;
		//角度
		if (width > height) { //
			slope = height / width;
			for (var i = 0; i < width; i++) {
				x = startX + i;
				y = Math.round(startY - (slope * i));
				json.xy.push({
					"x" : x,
					"y" : y
				})
			}
			json.oritation = slope < 0.5 ? "east" : json.oritation;
		} else if (width < height) { //
			slope = width / height;
			for (var i = 0; i < height; i++) {
				x = Math.round(startX + (slope * i));
				y = startY - i;
				json.xy.push({
					"x" : x,
					"y" : y
				});
			}
			json.oritation = slope < 0.5 ? "north" : json.oritation;
		} else { //45度 对等角 斜率 = 1;
			for (var i = 0; i < width; i++) {
				x = startX + i;
				y = startY - i;
				json.xy.push({
					"x" : x,
					"y" : y
				});
			}
		}
		return json;
	}

	function slope_rightDown(startX, startY, endX, endY) {
		var width = endX - startX;
		var height = endY - startY;
		var x = startX;
		var y = startY;
		var slope = 0;
		var json = {
			"xy" : [],
			"oritation" : "southeast"
		};
		//负数转整数
		width = width < 0 ? -width : width;
		height = height < 0 ? -height : height;
		//角度
		if (width > height) { //上45度
			slope = height / width;
			for (var i = 0; i < width; i++) {
				x = startX + i;
				y = Math.round(startY + (slope * i));
				json.xy.push({
					"x" : x,
					"y" : y
				});
			}
			json.oritation = slope < 0.5 ? "east" : json.oritation;
		} else if (width < height) { //下45度
			slope = width / height;
			for (var i = 0; i < height; i++) {
				x = Math.round(startX + (slope * i));
				y = startY + i;
				json.xy.push({
					"x" : x,
					"y" : y
				});
			}
			json.oritation = slope < 0.5 ? "south" : json.oritation;
		} else { //45度 对等角 斜率 = 1;
			for (var i = 0; i < width; i++) {
				x = startX + i;
				y = startY + i;
				json.xy.push({
					"x" : x,
					"y" : y
				});
			}
		}
		return json;
	}

	function slope_leftDown(startX, startY, endX, endY) {
		var width = endX - startX;
		var height = endY - startY;
		var x = startX;
		var y = startY;
		var slope = 0;
		var json = {
			"xy" : [],
			"oritation" : "southwest"
		};
		//负数转整数
		width = width < 0 ? -width : width;
		height = height < 0 ? -height : height;
		//角度
		if (width > height) { //上45度
			slope = height / width;
			for (var i = 0; i < width; i++) {
				x = startX - i;
				y = Math.round(startY + (slope * i));
				json.xy.push({
					"x" : x,
					"y" : y
				});
			}
			json.oritation = slope < 0.5 ? "west" : json.oritation;
		} else if (width < height) { //下45度
			slope = width / height;
			for (var i = 0; i < height; i++) {
				x = Math.round(startX - (slope * i));
				y = startY + i;
				json.xy.push({
					"x" : x,
					"y" : y
				});
			}
			json.oritation = slope < 0.5 ? "south" : json.oritation;
		} else { //45度 对等角 斜率 = 1;
			for (var i = width; i < 0; i++) {
				x = startX - i;
				y = startY + i;
				json.xy.push({
					"x" : x,
					"y" : y
				});
			}
		}
		return json;
	}

	function slope_leftUp(startX, startY, endX, endY) {
		var width = endX - startX;
		var height = endY - startY;
		var x = startX;
		var y = startY;
		var slope = 0;
		var json = {
			"xy" : [],
			"oritation" : "northwest"
		};
		//负数转整数
		width = width < 0 ? -width : width;
		height = height < 0 ? -height : height;
		//角度
		if (width > height) { //上45度
			slope = height / width;
			for (var i = 0; i < width; i++) {
				x = startX - i;
				y = Math.round(startY - (slope * i));
				json.xy.push({
					"x" : x,
					"y" : y
				});
			}
			json.oritation = slope < 0.5 ? "west" : json.oritation;
		} else if (width < height) { //下45度
			slope = width / height;
			for (var i = 0; i < height; i++) {
				x = Math.round(startX - (slope * i));
				y = startY - i;
				json.xy.push({
					"x" : x,
					"y" : y
				});
			}
			json.oritation = slope < 0.5 ? "north" : json.oritation;
		} else { //45度 对等角 斜率 = 1;
			for (var i = width; i < 0; i++) {
				x = startX - i;
				y = startY - i;
				json.xy.push({
					"x" : x,
					"y" : y
				});
			}
		}
		return json;
	}
}