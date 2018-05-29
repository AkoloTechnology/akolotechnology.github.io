//ge_set_step_function(gamefunc);
ge_game_default_init(600,700);
ge_load_image("gem1","gem1.png");
ge_load_image("gem2","gem2.png");
ge_load_image("gem3","gem3.png");
ge_load_image("gem4","gem4.png");
ge_load_image("gem5","gem5.png");
ge_load_image("gem6","gem6.png");

score = 0;
x_offset = 12;
y_offset = 700-588;
board = [];

function make_grid(){
for(var x = 0; x < 9; x++) {
	board.push([]);
	for(var y = 0; y < 9; y++)
		board[x].push(rnd(1,6));
}}

function check_for_hor(dis)
{
	for(var y = 8; y >= 0; y--)
		for(var x = 0; x <= 9-dis; x++)
		{
			match = true;
			color = board[x][y];
			if(color == 0)
				break;
			for(var z = 1; z < dis; z++)
				if(color != board[x+z][y])
				{
					match = false;
					break;
				}
			if(match == true)
			{
				score += color*dis;
				for(var z = 0; z < dis; z++)
					board[x+z][y]=0;
				push_down_grid();
				check_for_hor(dis);
				return;
			}				
		}
}

function check_for_ver(dis)
{
	for(var y = 8; y >= dis; y--)
		for(var x = 0; x < 9; x++)
		{
			match = true;
			color = board[x][y];
			if(color == 0)
				break;
			for(var z = y; z < dis; z++)
				if(color != board[x][y])
				{
					match = false;
					break;
				}
			if(match == true)
			{
				score += color*dis;
				for(var z = 0; z < dis; z++)
					board[x+z][y]=0;
				push_down_grid();
				check_for_hor(dis);
				return;
			}				
		}
}

function push_down_grid()
{
	for(var x = 0; x < 9; x++)
	{
		for(var y = 8; y >= 0; y--)
		{
			if(board[x][y] == 0)
			{
				for(var z = y-1; z >= 0; z--)
				{
					if(board[x][z] != 0)
					{
						board[x][y] = board[x][z];
						board[x][z] = 0;
						break;
					}
				}
				if(board[x][y] == 0)
					board[x][y] = rnd(1,6);
			}
		}
	}
}

make_grid();
for(var i = 6; i >= 3; i--)
{
	check_for_hor(i);
}

ge_step_function = function()
{
	ge_draw_box(x_offset,y_offset,600-12,700-12);
	ge_draw_text(12,64,"Score: " + String(score));
	ge_set_font("arial",32,"#000");
	// game board
	for(var x = 0; x < 9; x++)
		for(var y = 0; y < 9; y++)
		{
			ge_draw_image("gem" + board[x][y],12+x*64,y_offset+y*64);
		}	
		
}