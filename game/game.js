//ge_set_step_function(gamefunc);
ge_game_default_init(600,700);
ge_load_image("guy","guy.png");
ge_load_image("bla","bla.svg");

ge_step_function = function gamefunc()
{
	ge_draw_box(20,10,ge_mouse_x,ge_mouse_y);
	ge_draw_box(ge_mouse_x,ge_mouse_y,ge_canvas.width-10,ge_canvas.height-10);
	ge_draw_text(30,30,"Bla");
	ge_draw_image("guy",50,50);
	ge_draw_image_resize("guy",100,50,32,32);
}