/**
 * Created by rlaca on 09/10/2017.
 */


var tilesize = 32;
var ratio = tilesize/64;

var roomAx = 0;
var roomAy = 0;
var roomBx = 4;
var roomBy = 0;
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'canvascontainer', { preload: preload, create: create, update: update, render: render });
var doorA;

function Character(x, y, img_id, health) {
    this.x = x;
    this.y = y;
    this.img_id = img_id;
    this.health = health;
    this.health_bar = null;
    this.sprite = null;
    this.getHit = function(val) {
        var newVal = this.health_bar.char.health + val;
        if (newVal >= 0 && newVal <= 100) {
            this.health_bar.char.health = newVal;
            this.health_bar.update();
        }
    };
    this.move = function(x, y) {
        this.x = x*tilesize;
        this.y = y*tilesize;
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        this.health_bar.moveBar((x+0.1)*tilesize, y*tilesize-3);
    };
}

var p1 = new Character(3, 3, 116, 100);
var p2 = new Character(6, 3, 84, 100);

function preload() {
    game.load.spritesheet('tileset', 'images/tileset.png', 64, 64);
    game.load.spritesheet('objects', 'images/objects.png', 64, 64);
    game.load.spritesheet('people', 'images/people.png', 64, 64);
}

var handle1;
var handle2;

var line1;

function create() {

    game.stage.backgroundColor = '#ffffff';

    buildRoomA(roomAx,roomAy);
    buildRoomB(roomBx, roomBy);
    drawTileRectangle(roomAx+1,roomAy+1,3,3,'tileset',215);
    drawTileRectangle(roomBx+1,roomBy+1,3,3,'tileset',215);
    addCharacter(p1);
    addCharacter(p2);
}

function addCharacter(character)
{
    player = game.add.sprite(character.x*tilesize, character.y*tilesize, 'people', character.img_id);
    player.scale.setTo(ratio,ratio);

    player.health = character.health;
    player.maxHealth = 100;

    playerHealthMeter = game.add.plugin(Phaser.Plugin.HealthMeter);
    playerHealthMeter.bar(
        player, {x: (character.x+0.1)*tilesize, y: character.y*tilesize-3, width: tilesize*0.80, height: 2, background: '#aa0000'}
    );
    character.health_bar = playerHealthMeter;
    character.sprite = player;
}

function buildRoomA(x, y)
{
    var offsetx = x*tilesize;
    var offsety = y*tilesize;

    sprite = game.add.sprite(offsetx + 3*tilesize , offsety + 4*tilesize, 'tileset', 215);
    sprite.scale.setTo(ratio, ratio);

    // top wall
    sprite = game.add.sprite(offsetx, offsety, 'tileset',266);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx + tilesize, offsety, 'tileset',265);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx + 2*tilesize, offsety, 'tileset',265);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx + 3*tilesize, offsety, 'tileset',265);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx + 4*tilesize, offsety, 'tileset',268);
    sprite.scale.setTo(ratio,ratio);

    // left and right walls
    sprite = game.add.sprite(offsetx, offsety + 1*tilesize, 'tileset',264);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx, offsety + 2*tilesize, 'tileset',264);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx, offsety + 3*tilesize, 'tileset',264);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx + 4*tilesize, offsety + 1*tilesize, 'tileset',264);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx + 4*tilesize, offsety + 2*tilesize, 'tileset',264);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx + 4*tilesize, offsety + 3*tilesize, 'tileset',264);
    sprite.scale.setTo(ratio,ratio);

    // bottom wall
    sprite = game.add.sprite(offsetx, offsety + 4*tilesize, 'tileset',298);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx + tilesize, offsety + 4*tilesize, 'tileset',265);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx + 2*tilesize, offsety + 4*tilesize, 'tileset',265);
    sprite.scale.setTo(ratio,ratio);
    doorA = game.add.sprite(offsetx + 3*tilesize, offsety + 4*tilesize, 'objects',67);
    doorA.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx + 4*tilesize, offsety + 4*tilesize, 'tileset',300);
    sprite.scale.setTo(ratio,ratio);
}

function buildRoomB(x, y)
{
    var offsetx = x*tilesize;
    var offsety = y*tilesize;

    sprite = game.add.sprite(offsetx + 3*tilesize , offsety + 4*tilesize, 'tileset', 215);
    sprite.scale.setTo(ratio, ratio);

    // top wall
    /*sprite = game.add.sprite(offsetx, offsety, 'tileset',266);
    sprite.scale.setTo(ratio,ratio);*/
    sprite = game.add.sprite(offsetx + tilesize, offsety, 'tileset',265);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx + 2*tilesize, offsety, 'tileset',265);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx + 3*tilesize, offsety, 'tileset',265);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx + 4*tilesize, offsety, 'tileset',268);
    sprite.scale.setTo(ratio,ratio);

    // left and right walls
    /*sprite = game.add.sprite(offsetx, offsety + 1*tilesize, 'tileset',264);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx, offsety + 2*tilesize, 'tileset',264);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx, offsety + 3*tilesize, 'tileset',264);
    sprite.scale.setTo(ratio,ratio);*/
    sprite = game.add.sprite(offsetx + 4*tilesize, offsety + 1*tilesize, 'tileset',264);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx + 4*tilesize, offsety + 2*tilesize, 'tileset',264);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx + 4*tilesize, offsety + 3*tilesize, 'tileset',264);
    sprite.scale.setTo(ratio,ratio);

    // bottom wall
    /*sprite = game.add.sprite(offsetx, offsety + 4*tilesize, 'tileset',298);
    sprite.scale.setTo(ratio,ratio);*/
    sprite = game.add.sprite(offsetx + tilesize, offsety + 4*tilesize, 'tileset',265);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx + 2*tilesize, offsety + 4*tilesize, 'tileset',265);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx + 3*tilesize, offsety + 4*tilesize, 'objects',67);
    sprite.scale.setTo(ratio,ratio);
    sprite = game.add.sprite(offsetx + 4*tilesize, offsety + 4*tilesize, 'tileset',300);
    sprite.scale.setTo(ratio,ratio);
}

function drawTileRectangle(x, y, sizex, sizey, spritesheet, index) {
    for (i = 0; i < sizex; i++) {
        for (j = 0; j < sizey; j++) {
            sprite = game.add.sprite((x+i)*tilesize , (y+j)*tilesize, spritesheet, index);
            sprite.scale.setTo(ratio, ratio);
        }
    }
}

function openDoorA() {
    var demoTween = game.add.tween(doorA).to({x:roomAx+tilesize*2,y:roomAy+tilesize*4},1000);
    demoTween.start();
}

function closeDoorA() {
    var demoTween = game.add.tween(doorA).to({x:roomAx+tilesize*3,y:roomAy+tilesize*4},1000);
    demoTween.start();
}

function update() {

    //line1.fromSprite(handle1, handle2, false);

}

function render() {

}


jQuery(function($){

    $("#start").click(function(e) {
        /*p1.move(10,10);
        p1.getHit(-20);*/
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/start",
            data: {},
            success: function (result) {
                // alert('ok');
            },
            error: function (result) {
                // alert('error');
            }
        });
    });

    $('#actionslist').on('click','li.actions',function() {
        $.ajax({
            type: "POST",
            url: "/selectaction",
            data: {
                id: $(this).attr('id')
            },
            success: function (result) {
                // alert('ok');
            },
            error: function (result) {
                // alert('error');
            }
        });
    });

    var socket = io.connect('http://localhost:3700');
    socket.on('js_client', function (msg) {
        console.log(msg);
        var res = msg.data.toString().split('@');
        var core_msg = msg.data.toString().replace(res[0]+'@','').trim();
        if (res[0]=='listaction')
        {
            var list = d3.select("#actionslist");
            list.html('');
            var action = core_msg.split('@');
            for (i = 0; i < action.length; i++)
            {
                list.append('li').attr("class","actions").attr("id",action[i].charAt(0)).text(action[i]);
            }
           // $("#actionslist").load(location.href + " #actionslist");
        }
        else if (res[0]=='executed')
        {
            var txt = $("textarea#story");
            txt.val( txt.val() + core_msg + "\n");
        }
        else if (core_msg=='end')
        {
            var list = d3.select("#actionslist");
            list.html('');
            list.append('li').attr("class","items").text("End !");
        }
    });

});