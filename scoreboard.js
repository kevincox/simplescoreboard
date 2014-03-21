"use strict";

window.Player = (function(){
	var privmap = new WeakMap();
	function newpriv(self) {
		var r = {};
		privmap.set(self, r);
		return r;
	}
	function getpriv(self) {
		return privmap.get(self);
	}
	
	function Player(name) {
		var priv = newpriv(this);
		
		this.root = $("<section>", {
			"class": "player",
		});
		
		priv.namee = $("<h1>", {
			"class": "name",
			"contenteditable": "true",
			"tabindex": "1",
		}).appendTo(this.root);
		
		priv.scoree = $("<div>", {
			"class": "score",
			"contenteditable": "true",
		}).appendTo(this.root);
		
		this.root.on("keypress", function(e) {
			if (e.key == "Enter") {
				e.target.blur();
				e.preventDefault();
			}
			else e.stopPropagation();
		});
		
		this.score = 0;
		this.name = name;
		
		return this;
	}
	Object.defineProperties(Player.prototype, {
		score: {
			get: function Player_scoreget(){
				return parseInt(getpriv(this).scoree.text())
			},
			set: function Player_scoreset(score){
				getpriv(this).scoree.text(Math.max(0, score));
			},
			enumerable: true,
		},
		name: {
			get: function Player_nameget(){
				return getpriv(this).namee.text();
			},
			set: function Player_nameset(name){
				return getpriv(this).namee.text(name);
			},
			enumerable: true,
		},
	});
	Object.preventExtensions(Player.prototype);
	
	return Player;
}());

var p1 = new Player("Player 1");
var p2 = new Player("Player 2");
$("#players").append(
	p1.root,
	p2.root
);

function buzzer() {
	var b = $("#buzzer")[0];
	
	b.currentTime = 0;
	b.play();
}

function lights() {
	var top    = $("#light-box-top");
	var bottom = $("#light-box-bottom");
	var left   = $("#light-box-left");
	var right  = $("#light-box-right");
	
	var w = Math.floor(top.innerWidth()/40)-2;
	var h = Math.floor(left.innerHeight()/40)-1;
	
	var c, i;
	
	c = top.children();
	i = c.length;
	while ( i < w ) {
		top.append('<div class="light">');
		i++;
	}
	while ( i >= w ) {
		c.eq(--i).remove();
	}
	
	c = bottom.children();
	i = c.length;
	while ( i < w ) {
		bottom.append('<div class="light">');
		i++;
	}
	while ( i >= w ) {
		c.eq(--i).remove();
	}
	
	c = left.children();
	i = c.length;
	while ( i < h ) {
		left.append('<div class="light">');
		i++;
	}
	while ( i >= h ) {
		c.eq(--i).remove();
	}
	
	c = right.children();
	i = c.length;
	while ( i < h ) {
		right.append('<div class="light">');
		i++;
	}
	while ( i >= h ) {
		c.eq(--i).remove();
	}
}
$(window).resize(lights);
setTimeout(lights, 100); // Firefox needs a timeout, literally.

$("html").on("keypress", function(e) {
	if (e.charCode === "q".charCodeAt(0)) p1.score += 5;
	if (e.charCode === "Q".charCodeAt(0)) p1.score -= 5;
	if (e.charCode === "w".charCodeAt(0)) p1.score += 10;
	if (e.charCode === "W".charCodeAt(0)) p1.score -= 10;
	if (e.charCode === "e".charCodeAt(0)) p1.score += 15;
	if (e.charCode === "E".charCodeAt(0)) p1.score -= 15;
	if (e.charCode === "r".charCodeAt(0)) p1.score += 20;
	if (e.charCode === "R".charCodeAt(0)) p1.score -= 20;
	
	if (e.charCode === "a".charCodeAt(0)) p2.score += 5;
	if (e.charCode === "A".charCodeAt(0)) p2.score -= 5;
	if (e.charCode === "s".charCodeAt(0)) p2.score += 10;
	if (e.charCode === "S".charCodeAt(0)) p2.score -= 10;
	if (e.charCode === "d".charCodeAt(0)) p2.score += 15;
	if (e.charCode === "D".charCodeAt(0)) p2.score -= 15;
	if (e.charCode === "f".charCodeAt(0)) p2.score += 20;
	if (e.charCode === "F".charCodeAt(0)) p2.score -= 20;
	
	if (e.charCode === "p".charCodeAt(0)) p1.score = 0;
	if (e.charCode === "l".charCodeAt(0)) p2.score = 0;
	if (e.charCode === ",".charCodeAt(0)) {
		p1.score = 0;
		p2.score = 0;
	}
	
	if (e.charCode === "b".charCodeAt(0)) buzzer();
});
