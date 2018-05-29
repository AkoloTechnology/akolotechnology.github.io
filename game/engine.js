ge_canvas = null;
ge_ctx = null;

ge_buffer_canvas = null;
ge_buffer_ctx = null;

ge_step_function = function(){}

ge_last_step = 0;
ge_game_speed = 60; // x game steps per second

ge_mouse_x = 0;
ge_mouse_y = 0;

ge_background_color = "#ddd";
ge_draw_color = "#000";

// assests
ge_images = [];
function ge_load_image(name,location){
	if(ge_images[name]!=undefined)return;
	var img = new Image();
	img.onload = function (){
		ge_images[name]=img;
		}
	img.src = location;
}

// canvas and ctx
function ge_create_canvas(width, height){
	ge_canvas = document.getElementById("canvas");
	ge_ctx = ge_canvas.getContext("2d");
	ge_canvas.width = width;
	ge_canvas.height = height;
}

function ge_create_buffer(){
	ge_buffer_canvas = document.createElement('canvas');
	ge_buffer_ctx = ge_buffer_canvas.getContext("2d");
	ge_buffer_canvas.width = ge_canvas.width;
	ge_buffer_canvas.height = ge_canvas.height;
}

function ge_draw_background(){ge_buffer_ctx.fillStyle=ge_background_color;ge_buffer_ctx.fillRect(0,0,ge_buffer_canvas.width,ge_buffer_canvas.height);}
function ge_draw_color(color=null){if(color!=null)ge_draw_color = color;return ge_draw_color;}

function ge_draw_image(img,x,y){if(ge_images[img]==undefined) return;ge_buffer_ctx.drawImage(ge_images[img],x,y);}
function ge_draw_image_resize(img,x,y,width,height){if(ge_images[img]==undefined)return;ge_buffer_ctx.drawImage(ge_images[img],x,y,width,height);}

function ge_set_font(type,size,color){ge_buffer_ctx.font = Number(size) + "px " + type;ge_buffer_ctx.fillStyle = color;}
function ge_draw_text(x,y,text_string){ge_buffer_ctx.fillText(text_string,x,y);}

function ge_draw_line(x1,y1,x2,y2){ge_buffer_ctx.beginPath();ge_buffer_ctx.moveTo(x1,y1);ge_buffer_ctx.lineTo(x2,y2);ge_buffer_ctx.stroke();}
function ge_draw_box(x1,y1,x2,y2){ge_buffer_ctx.strokeRect(x1,y1,x2-x1,y2-y1);}

function ge_game_init(){setInterval(ge_stepset,(1000/(ge_game_speed*2)));}

function ge_update_mouse(evt) {
    var rect = canvas.getBoundingClientRect();
    ge_mouse_x = evt.clientX - rect.left;
    ge_mouse_y = evt.clientY - rect.top;
}

function ge_stepset() {
	var game_time = Date.now();
	if(ge_last_step + (1000/ge_game_speed) <= game_time) {
		ge_draw_background();
		ge_buffer_ctx.fillStyle = ge_draw_color;
		ge_step_function();
		ge_ctx.drawImage(ge_buffer_canvas,0,0);
		ge_last_step = game_time;
	}
}
	
function ge_game_default_init(width, height) {
	ge_create_canvas(width, height);
	ge_create_buffer();
	ge_canvas.addEventListener('mousemove',ge_update_mouse);
	ge_set_font("arial",20,"#000");
	setInterval(ge_stepset,(1000/(ge_game_speed*2)));
}