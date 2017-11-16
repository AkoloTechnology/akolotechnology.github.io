/*
	Dungeon Crawler
	By: Timothy Fournier
	Started 11/16/17
*/

// allows you to access the input and textarea fields
var inp = document.getElementById("maininput");
var tex = document.getElementById("maintextarea");
var commandstring = ""; // string to hold command string
var room = "";
var item = [];
var state = [];
var unknown = true;

// sets default focus to input
inp.focus();

// code makes it so if you press enter in the input box, it pushes the command through
inp.onkeypress = function(e)
{
	if (!e)
		e = window.event;
	var keycode = e.keycode || e.charCode;
	if (keycode == '13')
	{
		prnt("Command: " + inp.value);
		commandstring = inp.value.toLowerCase();
		inp.value = "";
		game();
		if(unknown)
			prntl("Uknown command");
		else
			unknown = true;
	}
}

// quick way to compare lots of similar responses
function com()
{
	for (var i = 0; i < arguments.length; ++i)
		if (arguments[i] == commandstring)
		{
			unknown = false;
			return true;
		}
	return false;
}		

// displays text to the textarea
function prnt(printstring)
{
	tex.value += printstring + '\n';
	tex.scrollTop = tex.scrollHeight;
}

// displays text to the textarea with an extra line
function prntl(printstring)
{
	tex.value += printstring + '\n\n';
	tex.scrollTop = tex.scrollHeight;
}

// some quick commands for the ease of use

// help gives a discription of available commands
function help()
{
	if(com("help"))
		prntl("List of common commands (but not all commands!):\n\
  look - general description of area\n\
  compass - get possible ways to go\n\
  get *item* - allows you to pick up something\n\
  enter *location* - allows you to enter a specific area\n\
  open *item* - can open doors and other things\n\
  climb - allows you to go up or down locations\n\
  w or west - you dont need to type the full direction, just the first letter");
}


// look - general description of area
function look(message)
{
	if(com("look"))
		prntl(message);
}

// compass - get possible ways to go
function compass(message)
{
	if(com("compass"))
		prntl(message);
}

// climb - allows you to go up or down locations
function climb(gotoroom, message)
{
	if(com("climb"))
	{
		prntl(message);
		room = gotoroom;
	}
}

// west
function west(gotoroom, message)
{
	if(com("west","w"))
	{
		prntl(message);
		room = gotoroom;
	}
}

// east
function east(gotoroom, message)
{
	if(com("east","e"))
	{
		prntl(message);
		room = gotoroom;
	}
}

// north
function north(gotoroom, message)
{
	if(com("north","n"))
	{
		prntl(message);
		room = gotoroom;
	}
}

// south
function south(gotoroom, message)
{
	if(com("south","s"))
	{
		prntl(message);
		room = gotoroom;
	}
}

// get *item*
function get(getitem, message)
{
	if(com("get " + getitem))
	{
		prntl(message);
		item[getitem] = true;
	}
}


// main game area
function game()
{
	help();
	
	if(room == "start")
	{
		compass("you can go west");
		if(state["turtledead"])
			west("westward","you head west and see a dead turtle");
		else
			west("westward","you head west and see a turtle");
		if(item["sword"])
			look("nothing to see here");
		else
		{
			get("sword","You pick up a semi rusty sword");
			look("nothing to see except a sword on the ground");
		}
		
	}
	if(room == "westward")
	{
		if(!state["turtledead"])
		{
			look("you see a turtle");
			if(com("kill turtle","kill","attack","attack turtle"))
				if(item["sword"])
				{
					prntl("You murdered the turtle... why?");
					state["turtledead"] = true;
				}
				else
					prntl("You are quite violent, but do no harm. If you had a weapon maybe you'd kill the turtle");				
		}
		else
			look("you see turtle remains, but they are crawling with flies");
		compass("you can head east");
		east("start","you head back to where you were");
		
	}
}

// game start... kinda boring
function gamestart()
{
	room = "start";
	
	prntl("You arrive in a dungeon...");
}

// game starthere
gamestart();