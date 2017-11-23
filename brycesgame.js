/*
	Bryce's Game
	By: Bryce
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
			prntl("You can't do that");
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

// substring com
function sscom(textpart)
{
	if(commandstring.substring(0,textpart.length) == textpart)
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
  inv - get a list of items you possess\n\
  get *item* - allows you to pick up something\n\
  use *item* on *thing* - use one of your items on something in the room\n\
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

// inv - get a list of items you have
function inv()
{
	if(com("inv"))
	{
		if(Object.keys(item).length !== 0)
			prntl(Object.keys(item));
		else
			prntl("You don't have any items");
	}
}

// get *item*
function get(itemname, message)
{
	if(com("get " + itemname))
	{
		prntl(message);
		item[itemname] = true;
	}
}


// main game area
function game()
{
	help();
	inv();
	/*
	if(room == "start")
	{
		compass("you can go west");
		
		if(state["turtledead"])
			west("westward","you head west and see a dead turtle");
		else
			west("westward","you head west and see a turtle");
		
		if(item["sword"])
		{
			look("nothing to see here");
		}
		else
		{
			get("sword","You pick up a semi rusty sword");
			look("nothing to see except a sword on the ground");
		}
		
	}
	if(room == "westward")
	{
		if(state["turtledead"])
			look("you see turtle remains, but they are crawling with flies");
		else
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
		compass("you can head east");
		east("start","you head back to where you were");
		
	}*/
	
	/* - Cheats
	if(s_Command == "get item") // cheat code for getting items
	{
		string temp;
		prntl << "Enter a number for game data change: ";
		cin >> temp;
		int x = temp.at(0) - 48;
		inventory[x].state = !inventory[x].state;
	}*/
	
	
	if(room == "start") // if you are currently at the start, use these commands
	{
		// all commands you can use in the starting location
		look("You can see a fork in the path up ahead.");		
		compass("It's a compass. It says the path continues to the east");
		east("fork","You walk down the path a bit and come to a fork in the road. The path goes north and south.");
		
		/* more cheats
		if(com("shuwatch") // skip room cheat
		{
			prntl << "You jumped throw a warp zone, I wonder were you landed.";
			room = "library_second_floor";
			inventory[0].state = true;
			inventory[1].state = true;
			inventory[2].state = true;
			//inventory[3].state = true;
			inventory[4].state = true;
			inventory[6].state = true;
			//inventory[8].state = true;
			//inventory[9].state = true;
			//inventory[10].state = true;
			//inventory[11].state = true;
			//inventory[12].state = true;
			//inventory[13].state = true;
			gamedata[0] = false;
			gamedata[2] = true;
			//gamedata[4] = true;
			//gamedata[7] = true;
			//gamedata[8] = true;
			//gamedata[9] = true;
			//gamedata[11] = true;
		}*/
		if(com("look at ropes","look ropes","look at the ropes","look the ropes","look rope","look at rope","look at the rope","look the rope"))
			prntl("The ropes that bound your hands and feet have been cut.\n"
				+ "Wonder why who ever cut them didnt stick around. (or did they?)");
		if(com("get rope","get the rope","grab rope","grab the rope","pick up rope","pick up the rope"))
			prntl("Its just some scrabs of rope that used to bind your hands and feet,\n"
				+ "You decide to just leave them on the ground.");
	}
	else if(room == "fork") // commands for fork in the road 
	{
		// if you type left, it gives you a message then changes the room to "cave_enterence"
		north("cave entrance","You take the path heading north and come to a cave.");
		// same applies with right
		south("cabin entrance","Theres a small cabin along the side of the path.");
		look("Theres a fork in the road that goes north and south");
		compass("Theres a fork in the road that goes north and south");
		if(com("look at fork","look at the fork","look at fork in road","look at the fork in the road","look fork"))
			prntl("The road splits off in two different directions, it's not a literal fork.");
		if(com("get fork","pick up fork","get the fork","pick up the fork","grab fork","grab the fork"))
			prntl("That joke is bad and you should feel bad.");
	}
	else if(room == "cave entrance") // commands for the cave enterence
	{
		// me having fun // who's having fun? tim? is that you teddy?
		if(com("look","look at cave","look cave","look at the cave"))
			prntl("The cave is infront of you, and the path you came form is behind you.\n"
				+ "You notice a small figure behind a rock.");
		compass("The path goes south, the cave entrance is to the north.");
		/* bidoof crap... come on
		else if(s_Command == "look at figure" || s_Command == "look figure" || s_Command == "look at the figure")
		{
			prntl << "It's a Bidoof. What a sad creature.";
			room = "Bidoof";
		}*/
		
		if(com("enter cave","go in cave","go into the cave","go into cave","enter the cave","north","go north","n","head north","walk north"))
		{
			if(!state["lamp"]) // dont have lamp
			{
				prntl("You enter the cave but its to dark to see anything\n."
					+ "You should probably head back out in case you trip on anything.");
			}
			else
			{
				prntl << "You enter the cave and your lamp lights most of it up.";
			}
			room = "cave";
		}
		south("fork","You head back to the fork in the road. Go north or south?");
	}
	else if(room == "cabin entrance") // commands for when you "notice a small cabin"
	{
		if(com("enter","enter cabin","go in cabin","go into cabin","enter the cabin","go into the cabin","open door to cabin","enter cabin door","go in cabin door"))
		{
			prntl("You enter the cabin but find no one at home.");
			room = "cabin";
		}
		north("fork","You head back to the fork in the road. Go north or south?");
		if(state["wolfdead"]) // wolf is dead
			east("castle","You head east to the castle.");
		else
			east("long path","The path goes on for a ways and you start to get tired,\n"
				+"you should try and find some provisions before you get to deep in the forest");
				
		if(com("look at cabin","look cabin","look at the cabin"))
			prntl("Its a cabin in the woods, there could be something useful in side.");
		if(!item["lamp"])
			look("You notice that the path continues down a ways\n"
				+"and theres a small cabin with boarded windows\n"
				+"and a flickering coming from the inside.");
		else
			look("You notice that the path continues down a ways\n"
				+ "and theres a small cabin with boarded windows.");
		compass("The path continues east and the fork in the road is north");
	}
	else if(room == "cabin") // inside the cabin
	{
		// i assume you are going to use the lamp variable here, considering there is a lamp
		if(!item["lamp"]) // if you dont have the lamp yet
		{
			if(com("look at lamp","look at the lamp","look lamp"))
				prntl("There's a nice looking lamp just sitting on the table.");
			look("The floor is covered in old newspapers and the smell of mold fills the air,\n"
				+"Their is a small table in the middle of the room with a dim lamp burning,\n"
				+"their is also a bookself with two books on it by a boarded up door.");
			if(com("get lamp","pick up lamp","get the lamp","grab lamp","take lamp","take the lamp","grab lamp","grab the lamp"))
			{
				prntl("You pick the lamp up, you can now see a bit better in the dark.");
				item["lamp"] = true;
			}
			if(com("steal lamp","steal the lamp"))
			{
				prntl("You sneakfully grab the lamp with out anyone noticing,\n"
					+ "you can now see a bit better in the dark.");
				item["lamp"] = true;
			}
		}
		else
			look("The floor is covered in old newspapers and the smell of mold fills the air,\n"
				+"There is a small table in the middle of the room.\n"
				+"There is also a bookself with two books on it by a boarded up door.");
				
		if(com("get newspapers","get the newspapers","pick up newspapers","pick up the newspapers"))
			prntl("You dont need those.");
		if(com("read newspapers","look at newspapers","read the newspapers","look at the newspapers"))
			prntl("The newspapers are to wet and soggy to read, not to mention their old news.");
		if(com("open door","open the door","open boarded up door","open the boarded up door"))
			prntl("The door is sealed up tight.");
		if(com("let love open the door","let my love open the door"))
			prntl("Not even your love can open this door.");
		if(com("look at books","look books","look at book","look at book","look at bookshelf","look bookshelf","look at the books","look at the bookshelf"))
			prntl("Their are two books on the bookshelf, the first one is called 'Lithography And You' and the second book is a dictionary.");
		if(com("get lithography and you","pick up lithography and you","look at lithography and you","look lithography and you","read lithography and you"))
			prntl("A book all about lithography, you decide to just leave it on the shelf.");
		if(com("get dictionary","get the dictionary","pick up the dictionary","pick up dictionary","look at dictionary","look at the dictionary","pick up dictionary","pick up the dictionary","read dictionary","read the dictionary"))
		{
			prntl("Loads of words, non useful.");
			//prntl("It's a dictionary what word do you want to look up?");
			//room = "dictionary";
		}
		if(com("exit","leave","leave cabin","leave the cabin","exit the cabin","exit cabin"))
		{
			prntl("You head back out side.");
			room = "cabin entrance";
		}
	}/*
	else if(room == "long_path")
	{
		if(s_Command == "west" || s_Command == "w" || s_Command == "go west" || s_Command == "head west" || s_Command == "walk west")
		{
			prntl << "You head back towards the cabin.";
			room = "cabin_entrance";
		}
		else if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "Your on a long path deep in the forest, theres nothing much to look at.";
		}
		else if(s_Command == "east" || s_Command == "e" || s_Command == "go east" || s_Command == "head east" || s_Command == "walk east")
		{
			prntl << "You keep going until a wolf jumps out of the woods and blocks your path.";
			room = "deep_in_woods";
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The path goes east and west.";
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "cave")
	{
		if(s_Command == "north" || s_Command == "n" || s_Command == "go north" || s_Command == "head north" || s_Command == "walk north")
		{
			if(!inventory[0].state) // lamp
			{
				prntl << "You try to make your way through the dark but you trip and hit your head.\n"
					<< "You died";
				done = true;
			}
			else
			{
				prntl << "The lamp lights the route, and you continue down the cave.";
				room = "deep_in_cave";
			}
		}
		else if(s_Command == "south" || s_Command == "s" || s_Command == "go south" || s_Command == "head south" || s_Command == "walk south")
		{
			prntl << "you head back outside the cave.";
			room = "cave_entrance";
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The cave continues north.";
		}
		else if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "The cave stretches out in front of you for a ways.";
		}
		else if(s_Command == "exit" || s_Command == "exit cave" || s_Command == "exit the cave" || s_Command == "leave" || s_Command == "leave the cave" || s_Command == "south" || s_Command == "go south" || s_Command == "s" || s_Command == "head south" || s_Command == "walk south")
		{
			prntl << "You head back outside the cave.";
			room = "cave_entrance";
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "deep_in_woods")
	{
		if(s_Command == "east" || s_Command == "e" || s_Command == "go east" || s_Command == "head east" || s_Command == "walk east")
		{
			prntl << "You try to run past the wolf but he manages to grab hold of you.\n"
				<< "You died.";
			done = true; // bad ending
		}
		else if(s_Command == "west" || s_Command == "w" || s_Command == "go west" || s_Command == "head west" || s_Command == "walk west")
		{
			prntl << "You try to run back to the cabin but the wolf manages to grab\n"
				<< "you before you can get very far.\n"
				<< "You died.";
			done = true; // bad ending
		}
		else if(s_Command == "attack" || s_Command == "fight" || s_Command == "fight wolf" || s_Command == "attack the wolf" || s_Command == "attack wolf" || s_Command == "fight the wolf" || s_Command == "use sword" || s_Command == "use the sword" || s_Command == "use sword on wolf" || s_Command == "use the sword on wolf" || s_Command == "use sword on the wolf" || s_Command == "use the sword on the wolf")
		{
			if(inventory[1].state) // sword
			{
				gamedata[0] = false; // wolf
				prntl << "You go to attack the wolf and stab it, it is now dead and you can get past it.";
				room = "past_wolf";
			}
			else if(gamedata[1]) // bidoof
			{
				prntl << "You go to attack the wolf when suddenly he asks you if you've seen Bidoof";
				room = "talking_to_wolf";
			}
			else
			{
				prntl << "You try to fight the wolf off but you dont have anything to fight him with.\n"
					<< "You Died.";
				done = true; // bad ending
			}
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "talking_to_wolf")
	{
		if(s_Command == "yes")
		{
			prntl << "Where Bidoof at?";
			room = "where_Bidoof";
		}
		else if(s_Command == "no")
		{
			prntl << "You lied to the Mightyena and he eats you.\n"
				<< "You died.";
			done = true; // bad ending
		}
		else
		{
			prntl << "The Mightyena eats you for being rude.\n"
				<< "You died.";
			done = true; // bad ending
		}
	}
	else if(room == "where_Bidoof")
	{
		if(s_Command == "cave" || s_Command == "he's at the cave" || s_Command == "he's at the cave entrance" || s_Command == "he's in front of the cave" || s_Command == "he's in front of the cave entrance" || s_Command == "hes at the cave" || s_Command == "hes at the cave entrance" || s_Command == "hes in front of the cave" || s_Command == "hes in front of the cave entrance")
		{
			prntl << "K thanks. You can go past.";
			room = "past_wolf";
		}
		else
		{
			prntl << "Why dont you want to tell the Mightyena were Bidoof at?\n"
				<< "You died.\n"
				<< "Good";
			done = true; // bad ending
		}
	}
	else if(room == "Bidoof")
	{
		if(s_Command == "hi bidoof")
		{
			prntl << "Hi stanger";
			gamedata[1] = true; // bidoof
		}
		else if(s_Command == "exit")
		{
			prntl << "Your at the cave.";
			room = "cave_entrance";
		}
		else
			prntl << "Unknown command";

	}
	else if(room == "deep_in_cave")
	{
		if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "There is water dripping from the ceiling,\n"
				<< "and you can barly make out what looks\n"
				<< "like a light coming from deeper in the cave.";
		}
		else if(s_Command == "look at water" || s_Command == "look at the water" || s_Command == "look water")
		{
			prntl << "It's just boring water dripping from some stalactite's.";
		}
		else if(s_Command == "look at stalactites" || s_Command == "look at stalactite's" || s_Command == "look at the stalactites" || s_Command == "look at the stalactite's" || s_Command == "look stalactite" || s_Command == "look stalactites" || s_Command == "look stalactite's")
		{
			prntl << "It's just some boring old stalactite's with water dripping from them.";
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "Theres a light coming from the path to the west and the cave entrance is back south,\n"
				<< "theres a path heading north but you can't go that way.";
		}
		else if(s_Command == "north" || s_Command == "n" || s_Command == "go north" || s_Command == "head north" || s_Command == "walk north")
		{
			prntl << "You head north deeper into the cave... no wait, you dont,\n"
				<< "because I already told you you cant go that way.";
		}
		else if(s_Command == "west" || s_Command == "w" || s_Command == "go west" || s_Command == "head west" || s_Command == "walk west")
		{
			prntl << "You walk towards what looks like a light coming\n"
				<< "from the end of the tunnel.\n"
				<< "You come to what apeers to be an abandoned camp.";
			room = "camp";
		}
		else if(s_Command == "south" || s_Command == "s" || s_Command == "go south" || s_Command == "head south" || s_Command == "walk south")
		{
			prntl << "You head to the start of the cave.";
			room = "cave";
		}
		else if(s_Command == "exit" || s_Command == "exit the cave" || s_Command == "exit cave" || s_Command == "leave" || s_Command == "leave the cave")
		{
			prntl << "You head back outside the cave.";
			room = "cave_entrance";
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "camp")
	{
		if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "You see a small camp fire with some embers burning,\n"
				<< "theres also a gross looking cot all torn up beside it,\n"
				<< "and a chest in the corner.";
		}
		else if(s_Command == "sleep" || s_Command == "sleep in bed" || s_Command == "sleep in the bed" || s_Command == "sleep in cot" || s_Command == "sleep in the cot" || s_Command == "use cot" || s_Command == "use the cot")
		{
			prntl << "Your pretty tired but you decide this might\n"
				<< "not be the safest place to take a quick nap.";
		}
		else if(s_Command == "get fire" || s_Command == "pick up fire" || s_Command == "grab the fire" || s_Command == "grab fire" || s_Command == "pick up the fire" || s_Command == "get the fire")
		{
			prntl << "You try to pick up a log from the fire but its much to hot to touch.";
		}
		else if(s_Command == "look at bed" || s_Command == "look at the bed" || s_Command == "look bed" || s_Command == "look at cot" || s_Command == "look cot" || s_Command == "look at the cot")
		{
			prntl << "It's a nasty looking cot with stains and a terrible smell coming from it.";
		}
		else if(s_Command == "look at fire" || s_Command == "look at the fire" || s_Command == "look fire")
		{
			prntl << "There's a nice warm fire burning.";
		}
		else if(s_Command == "look at chest" || s_Command == "look at the chest" || s_Command == "look chest")
		{
			prntl << "There's a long chest on the floor by the cot with its lock busted off.";
		}
		else if(s_Command == "open chest" || s_Command == "open the chest" || s_Command == "get chest" || s_Command == "get the chest")
		{
			if(!gamedata[2]) // chest
			{
				prntl << "You open up the chest and find an old rusty sword inside,\n"
					<< "now you can defend your self if the need arises.";
				inventory[1].state = true; // sword
				gamedata[2] = true; // chest
			}
			else
			{
				prntl << "The chest is already open.";
			}
		}
		else if(s_Command == "east" || s_Command == "e" || s_Command == "go east" || s_Command == "head east" || s_Command == "walk east")
		{
			prntl << "You head deep in the cave.";
			room = "deep_in_cave";
		}
		else if(s_Command == "exit" || s_Command == "exit the cave" || s_Command == "exit cave" || s_Command == "leave cave" || s_Command == "leave the cave")
		{
			prntl << "You head back outside the cave.";
			room = "cave_entrance";
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "past_wolf")
	{
		if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "You notice a tower peeking up from above the trees.";
		}
		else if(s_Command == "look at tower" || s_Command == "look at the tower" || s_Command == "look tower")
		{
			prntl << "You can see the tower of a nearby castle above the tree line";
		}
		else if(s_Command == "east" || s_Command == "e" || s_Command == "go east" || s_Command == "head east" || s_Command == "walk east")
		{
			prntl << "You head towards a tower in the distance and come find your self at the old castle Ravenwood.";
			room = "castle";
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "Theres a tower in the east and the cabins back west.";
		}
		else if(s_Command == "west" || s_Command == "w" || s_Command == "go west" || s_Command == "head west" || s_Command == "walk west")
		{
			prntl << "You head back to the cabin.";
			room = "cabin_entrance";
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "castle")
	{
		if(s_Command == "look" || s_Command == "look at castle" || s_Command == "look at the castle" || s_Command == "look castle" || s_Command == "look around")
		{
			prntl << "Castle Ravenwood stands in front of you with a big moat around it.\n"
				<< "You walk around a bit looking for an entrance and find a broken sewer grate.";
		}
		else if(s_Command == "look at moat" || s_Command == "look at the moat" || s_Command == "look moat")
		{
			prntl << "The water looks murky and gross, you probably dont\n"
				<< "want to go in it unless you absolutely have to.";
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The way back to the cabin is west.";
		}
		else if(s_Command == "west" || s_Command == "w" || s_Command == "go west" || s_Command == "head west" || s_Command == "walk west")
		{
			prntl << "you head back to the cabin.\n";
			room = "cabin_entrance";
		}
		else if(s_Command == "enter sewer" || s_Command == "go in the sewer" || s_Command == "go in to the sewer" || s_Command == "enter the sewer" || s_Command == "enter the sewer grate" || s_Command == "enter sewer grate" || s_Command == "go in to the sewer grate" || s_Command == "go in the sewer grate")
		{
			prntl << "You trudge through the moat and squeeze through the broken grate.";
			room = "sewer";
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "dictionary")
	{
		if(s_Command == "lithography")
		{
			prntl << "Lithography is a method for printing using a stone or a metal plate\n"
				<< "with a completely smooth surface.";
		}
		else if(s_Command == "poop")
		{
			prntl << "Bodily waste of varying color, viscosity, shape, odor and texture.\n"
				<< "Usually exits the body through your pooper, speed, noise and\n"
				<< "degree of pain may vary depending on what you ate.";
		}
		else if(s_Command == "horse")
		{
			prntl << "A solid-hoofed plant-eating domesticated mammal with a flowing mane and tail,\n"
				<< "used for riding, racing, and to carry and pull loads";
		}
		else if(s_Command == "lexicon")
		{
			prntl << "The vocabulary of a person, language, or branch of knowledge";
		}
		else if(s_Command == "penis")
		{
			prntl << "The male genital organ of higher vertebrates, carrying the duct for\n"
				<< "the transfer of sperm during copulation. In humans and most other mammals,\n"
				<< "it consists largely of erectile tissue and serves also for\n"
				<< "the elimination of urine.";
		}
		else if(s_Command == "kafkaesque")
		{
			prntl << "Characteristic or reminiscent of the oppressive or nightmarish qualities\n"
				<< "of Franz Kafka's fictional world.";
		}
		else if(s_Command == "yes")
		{
			prntl << "An affirmative answer or decision, esp. in voting.";
		}
		else if(s_Command == "the")
		{
			prntl << "Denoting one or more people or things already mentioned or assumed\n"
				<< "to be common knowledge.";
		}
		else if(s_Command == "aardvark")
		{
			prntl << "A nocturnal burrowing mammal with long ears, a tubular snout,\n"
				<< "and a long extensible tongue, feeding on ants and termites.\n"
				<< "Aardvarks are native to Africa and have no close relatives.";
		}
		else if(s_Command == "dog")
		{
			prntl << "A domesticated carnivorous mammal that typically has a long snout,\n"
				<< "an acute sense of smell, and a barking, howling, or whining voice.\n"
				<< "It is widely kept as a pet or for work or field sports.";
		}
		else if(s_Command == "pyromania")
		{
			prntl << "An obsessive desire to set fire to things.";
		}
		else if(s_Command == "juxtapose")
		{
			prntl << "Place or deal with close together for contrasting effect.";
		}
		else if(s_Command == "visceral")
		{
			prntl << "Relating to deep inward feelings rather than to the intellect.";
		}
		else if(s_Command == "exit")
		{
			prntl << "Go out of or leave a place: 'they exited from the aircraft'\n"
				<< "'elephants enter and exit the forest on narrow paths'."
				<< "You put the book back on the shelf.";
			room = "cabin";
		}
	}
	else if(room == "sewer")
	{
		if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "It's very dark and your lamp cant light it up very well\n"
				<< "but you can make out a ladder as a rat scurrys past your leg.";
		}
		else if(s_Command == "look at rat" || s_Command == "look at the rat" || s_Command == "look rat" || s_Command == "look at the rats" || s_Command == "look rats" || s_Command == "look at rats")
		{
			prntl << "The rat ran through a hole in the sewer,\n"
				<< "you probably shouldnt just stand around looking at rats,\n"
				<< "you dont want to get any diseases.";
		}
		else if(s_Command == "eastward" || s_Command == "go eastward" || s_Command == "head eastward" || s_Command == "walk eastward")
		{
			prntl << "You continue down the sewer till you see another grate\n"
				<< "that you cant squeeze throw so you decide to head back\n"
				<< "but you trip on some thing and almost drop your lamp.";
			room = "deep_in_sewer";
		}
		else if(s_Command == "look at the ladder" || s_Command == "look at ladder" || s_Command == "look ladder")
		{
			prntl << "The ladder looks sturdy enough to get you to the top without breaking.";
		}
		else if(s_Command == "climb ladder" || s_Command == "climb the ladder" || s_Command == "go up ladder" || s_Command == "go up the ladder" || s_Command == "use ladder" || s_Command == "use the ladder")
		{
			prntl << "You climb up the ladder and find yourself in what\n"
				<< "looks to be some kind of dungeon.";
			room = "dungeon";
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The sewer continues eastward.";
		}
		else if(s_Command == "east" || s_Command == "e" || s_Command == "go east" || s_Command == "head east" || s_Command == "walk east")
		{
			prntl << "The sewer doesnt go that way.";
		}
		else if(s_Command == "exit" || s_Command == "exit sewer" || s_Command == "leave sewer" || s_Command == "get out" || s_Command == "get out of the sewer" || s_Command == "get out of sewer" || s_Command == "get out sewer" || s_Command == "leave the sewer" || s_Command == "exit the sewer")
		{
			prntl << "You squeeze back through the grate and head to were the path comes out to the castle.";
			room = "castle";
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "deep_in_sewer")
	{
		if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "You look down to see what you tripped over and notice its a skeleton.";
		}
		else if(s_Command == "look at skeleton" || s_Command == "look at the skeleton" || s_Command == "look skeleton")
		{
			prntl << "You examine the skeleton, most of his cloths are gone but\n"
				<< "you find a chainmail vest on him that you decide to take.";
			inventory[2].state = true; // conakry eager's chainmail
		}
		else if(s_Command == "westward" || s_Command == "go westward" || s_Command == "head westward" || s_Command == "walk westward")
		{
			prntl << "You head back the the ladder near the start of the sewers.";
			room = "sewer";
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The sewer goes east and westward.";
		}
		else if(s_Command == "west" || s_Command == "w" || s_Command == "go west" || s_Command == "head west" || s_Command == "walk west")
		{
			prntl << "The sewer doesnt go that way.";
		}
		else if(s_Command == "east" || s_Command == "e" || s_Command == "go east" || s_Command == "head east" || s_Command == "walk east")
		{
			prntl << "Theres a grate blocking your path.";
		}
		else if(s_Command == "look at sewer grate" || s_Command == "look at the sewer grate" || s_Command == "look at the grate" || s_Command == "look at grate")
		{
			prntl << "Theres a grate blocking you from going any further in the sewer.\n"
				<< "(Thank goodness)";
		}
		else if(s_Command == "open grate" || s_Command == "open the grate" || s_Command == "squeeze through grate" || s_Command == "squeeze through the grate" || s_Command == "go through grate" || s_Command == "go through the grate")
		{
			prntl << "Great theres no way through this grate.";
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "dungeon")
	{
		if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "You look around and see many different types of torture devices'\n"
				<< "as well as some cells, some of which contain skeletons.\n"
				<< "Theres a large wooden door on the other side";
		}
		else if(s_Command == "open door" || s_Command == "open the door")
		{
			if(inventory[3].state) // axe of mystle
			{
				prntl << "You axe the hinges off the door and it falls to the ground with a loud THUD!\n"
					<< "You step out of the door way and find a staircase leading up.";
				room = "dungeon_stairs";
			}
			else if(inventory[4].state) // dungeon keys
			{
				prntl << "You start trying the different keys when the\n"
					<< "second to last one finalley works and the door swings open with a loud CREEK!\n"
					<< "You step out of the door way and find a staircase leading up.";
				room = "dungeon_stairs";
			}
			else
			{
				prntl << "You try to open the door but its locked,\n"
					<< "maybe one of the skeletons in here has some keys to open up this door.";
			}
		}
		else if(s_Command == "let love open the door") // no one will ever know about these dumb commands.
		{
			prntl << "You release yourself from this dungeon of misery\n"
				<< "and find yourself at a staircase.";
			room = "dungeon_stairs";
		}
		else if(s_Command == "look at cells" || s_Command == "look at the cells" || s_Command == "look cells")
		{
			prntl << "You start searching the cells but most of them are locked,\n"
				<< "maybe one of the skeletons might have something.";
		}
		else if(s_Command == "look at skeletons" || s_Command == "look at the skeletons" || s_Command == "look skeletons")
		{
			prntl << "You find a skeleton by a rack with a set of keys around his waist.";
		}
		else if(s_Command == "get keys" || s_Command == "get the keys" || s_Command == "pick up the keys" || s_Command == "pick up keys" || s_Command == "grab keys" || s_Command == "grab the keys" || s_Command == "take keys" || s_Command == "take the keys")
		{
			if(!inventory[4].state) // dungeon keys
			{
				prntl << "You unhook the keys from the now dead guard,\n"
					<< "hopefully one of them should open up that door.";
				inventory[4].state = true; // dungeon keys
			}
			else
			{
				prntl << "You already got the keys.";
			}
		}
		else if(s_Command == "look at the rack" || s_Command == "look the rack" || s_Command == "look at rack")
		{
			prntl << "It's a device that stretches its victims.";
		}
		else if(s_Command == "look at iron maiden" || s_Command == "look iron maiden" || s_Command == "look at the iron maiden")
		{
			prntl << "You look over at Iron Maiden as their just setting up for their next set,\n"
				<< "you probably dont have time to stay and listen.";
		}
		else if(s_Command == "listen to iron maiden") // cause why not
		{
			prntl << "You find a chair and listen to the show. It was pretty good.";
		}
		else if(s_Command == "get axe" || s_Command == "get the axe" || s_Command == "pick up axe" || s_Command == "pick up the axe" || s_Command == "get ax" || s_Command == "get the ax" || s_Command == "pick up the ax" || s_Command == "pick up ax")
		{
			if(!inventory[3].state) // axe of mystle
			{
				prntl << "You look around for an axe and find one stuck in a block.";
				inventory[3].state = true; // axe of mystle
			}
			else
			{
				prntl << "You already picked up the axe.";
			}
		}
		else if(s_Command == "exit" || s_Command == "leave" || s_Command == "exit the dungeon" || s_Command == "exit dungeon" || s_Command == "leave the dungeon" || s_Command == "leave dungeon" || s_Command == "go down ladder" || s_Command == "use ladder" || s_Command == "go down the ladder" || s_Command == "use the ladder")
		{
			prntl << "You head back down the ladder in to the sewers.";
			room = "sewers";
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "dungeon_stairs")
	{
		if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "Theres a long winding stair case leading up with torches lighting the way,\n"
				<< "and the door to the dungeon is behind you.";
		}
		else if(s_Command == "climb stairs" || s_Command == "go up stairs" || s_Command == "go up the stairs" || s_Command == "climb the stairs" || s_Command == "climb staircase" || s_Command == "climb the staircase" || s_Command == "go up the staircase" || s_Command == "go up staircase")
		{
			prntl << "You start to climb the stairs when you start to hear a rumbling noise.\n"
				<< "You get near to the top of the stairs and the rumbling gets louder and\n"
				<< "the staircase starts falling apart. You just manage to get to the top\n"
				<< "and out the door before the whole thing comes crashing down. Guess you\n"
				<< "wont be able to go back that way.";
			room = "main_hall";
		}
		else if(s_Command == "open door" || s_Command == "exit")
		{
			prntl << "You head back in to the dungeon.";
			room = "dungeon";
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "main_hall")
	{
		if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "Your in a long hallway, theres a door in front of you with a sign\n"
				<< "that says barracks.";
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The hallway goes west and the stair case to the dungeon is north.";
		}
		else if(s_Command == "north" || s_Command == "n" || s_Command == "go north" || s_Command == "head north" || s_Command == "walk north")
		{
			prntl << "The staircase crumbled, you cant go that way.";
		}
		else if(s_Command == "west" || s_Command == "w" || s_Command == "go west" || s_Command == "head west" || s_Command == "walk west")
		{
			prntl << "You come to an intersection.";
			room = "crossroads";
		}
		else if(s_Command == "look at stairs" || s_Command == "look stairs" || s_Command == "look staircase" || s_Command == "look at the stairs" || s_Command == "look at staircase" || s_Command == "look at the staircase")
		{
			prntl << "The staircase crumbled behind you, looks like your not going back that way.";
		}
		else if(s_Command == "let love open the door") // why did I waste my time on them.
		{
			prntl << "You can take all the worry out of your mind as this door opens right up.";
			room = "barracks";
		}
		else if(s_Command == "open door" || s_Command == "open the door")
		{
			if(gamedata[4]) // barracks door open or closed
			{
				prntl << "You enter the barracks.";
				room = "barracks";
			}
			else
			{
				if(inventory[5].state) // utensils
				{
					prntl << "You manage to use the utensils as a primitive lockpick and\n"
						<< "get the door open but the fork and knife are mangled and\n"
						<< "now useless.";
					inventory[5].state = false; // utensils
					gamedata[4] = true; // barracks open or closed
					room = "barracks";
				}
				else
				{
					prntl << "It's locked but you notice the lock doesnt look very secure.\n"
						<< "You might be able to pick it with something.";
				}
			}
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "crossroads")
	{
		if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "The hall way goes in all directions.";
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The halls go north, south, east, and west.";
		}
		else if(s_Command == "east" || s_Command == "e" || s_Command == "go east" || s_Command == "head east" || s_Command == "walk east")
		{
			prntl << "You head to the door to the barracks.";
			room = "main_hall";
		}
		else if(s_Command == "west" || s_Command == "w" || s_Command == "go west" || s_Command == "head west" || s_Command == "walk west")
		{
			prntl << "Theres nothing of any use down here.";
			room = "west_hall_main_floor";
		}
		else if(s_Command == "south" || s_Command == "s" || s_Command == "go south" || s_Command == "head south" || s_Command == "walk south")
		{
			prntl << "You come to the castle's main gate.";
			room = "main_gate";
		}
		else if(s_Command == "north" || s_Command == "n" || s_Command == "go north" || s_Command == "head north" || s_Command == "walk north")
		{
			prntl << "You come to the end of the hall and find a couple of doors.";
			room = "north_hall_main_floor";
		}
		else
			prntl << "unknown command";
	}
	else if(room == "west_hall_main_floor")
	{

		if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The hall goes east.";
		}
		else if(s_Command == "east" || s_Command == "e" || s_Command == "go east" || s_Command == "head east" || s_Command == "walk east")
		{
			prntl << "You come to an intersection.";
			room = "crossroads";
		}
		else
		{
			prntl << "Theres nothing of any use here.";
		}
	}
	else if(room == "main_gate")
	{
		if(s_Command == "look" || s_Command == "look around")
		{
			if(!gamedata[3]) // drawbridge
			{
				prntl << "It's the main gate to the castle. It looks like the drawbridge\n"
					<< "is up, maybe you should find a way to open it and get out of here.";
			}
			else
			{
				prntl << "The drawbridge is finally down you can get out of here now.";
			}
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			if(!gamedata[3]) // drawbridge
			{
				prntl << "The hall goes north.";
			}
			else
			{
				prntl << "The hall goes north and the drawbridge is south.";
			}

		}
		else if(s_Command == "look at drawbridge" || s_Command == "look drawbridge" || s_Command == "look at the drawbridge")
		{
			prntl << "There's a massive drawbridge leading to the outside world, its probably the only way.";
		}
		else if(s_Command == "open gate" || s_Command == "open door" || s_Command == "open the gate" || s_Command == "open the door")
		{
			prntl << "You look for something that would lower the bridge and notice a lever.";
		}
		else if(s_Command == "north" || s_Command == "n" || s_Command == "go north" || s_Command == "head north" || s_Command == "walk north")
		{
			prntl << "You come to an intersection.";
			room = "crossroads";
		}
		else if(s_Command == "look at lever" || s_Command == "look at the lever" || s_Command == "look lever")
		{
			prntl << "The lever looks like it controls the drawbridge.";
		}
		else if(s_Command == "use lever" || s_Command == "pull lever" || s_Command == "use the lever" || s_Command == "pull the lever")
		{
			if(!gamedata[10]) // pedestal puzzle complete
			{
				prntl << "The lever wont budge, maybe theres something you\n"
					<< "need to do be for you can use it";
			}
			else
			{
				prntl << "You pull the lever and hear chains clanking as the drawbridge starts to lower.";
				gamedata[3] = true; // drawbridge
			}
		}
		else if(s_Command == "south" || s_Command == "go south" || s_Command == "exit" || s_Command == "get me out of here" || s_Command == "s" || s_Command == "exit the castle" || s_Command == "head south" || s_Command == "walk south")
		{
			if(!gamedata[3]) // drawbridge
			{
				prntl << "Unknown command";
			}
			else
			{
				prntl << "You finally got out of that castle and can now make your way to\n"
					<< "a village and get some help.\n"
					<< "\n"
					<< "\n"
					<< "\n"
					<< "\n"
					<< "The End";
				done = true; // good ending. yay
			}
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "north_hall_main_floor")
	{
		if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "Theres a door with a sign next to it that says: Kitchen.\n"
				<< "Theres also another door that says: Stairway.";
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The hall goes south, the kitchen door is to the west and the stairway is east.";
		}
		else if(s_Command == "south" || s_Command == "s" || s_Command == "go south" || s_Command == "head south" || s_Command == "walk south")
		{
			prntl << "You come to an intersection.";
			room = "crossroads";
		}
		else if(s_Command == "enter kitchen" || s_Command == "open kitchen door" || s_Command == "west" || s_Command == "w" || s_Command == "open the door to the kitchen" || s_Command == "open the door to kitchen" || s_Command == "open door to kitchen" || s_Command == "open door to the kitchen" || s_Command == "head west" || s_Command == "walk west")
		{
			prntl << "You open up the door to the kitchen and walk inside.";
			room = "kitchen";
		}
		else if(s_Command == "enter stairway" || s_Command == "open stairway door" || s_Command == "east" || s_Command == "e" || s_Command == "open the door to the stairway" || s_Command == "open the door to stairway" || s_Command == "open door to stairway" || s_Command == "open door to the stairway" || s_Command == "head east" || s_Command == "walk east")
		{
			if(!inventory[6].state) // dapper skeleton's key
			{
				prntl << "It's locked.";
			}
			else
			{
				prntl << "You use the key you got from the basement and open up the door.";
				room = "LVL_2_staircase";
			}
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "kitchen")
	{
		if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "Theres pots and pans all over the place and a couple skeletons strewn out\n"
				<< "on the floor, aswell as the stench of rotten food. Theres is also a door\n"
				<< "on the far side of the room behind a giant spit. Theres also a countertop\n"
				<< "with all sorts of cooking utensils.";
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The door back to the hall is to the east and theres a panty to the west.";
		}
		else if(s_Command == "exit" || s_Command == "exit kitchen" || s_Command == "exit the kitchen" || s_Command == "leave" || s_Command == "leave kitchen" || s_Command == "leave the kitchen" || s_Command == "east" || s_Command == "e" || s_Command == "go east" || s_Command == "head east" || s_Command == "walk east")
		{
			prntl << "You head back out the the hall.";
			room = "north_hall_main_floor";
		}
		else if(s_Command == "open door" || s_Command == "open the door" || s_Command == "west" || s_Command == "w" || s_Command == "go west" || s_Command == "head west" || s_Command == "walk west")
		{
			prntl << "The stench of rotten food gets closer as you approach the door.\n"
				<< "You open the door and almost fall over from the smell, it appears\n"
				<< "to be a pantry.";
			room = "pantry";
		}
		else if(s_Command == "look at countertop" || s_Command == "look countertop" || s_Command == "look at the countertop")
		{
			prntl << "Their is an assortment of cooking and eating utensils and a large flagon.";
		}
		else if(s_Command == "look at spit" || s_Command == "look at the spit" || s_Command == "look spit" || s_Command == "look at spit of meat" || s_Command == "look at the spit of meat" || s_Command == "look spit of meat")
		{
			prntl << "Looks like someone was roasting some meat here, hopefully you dont run into anyone.";
		}
		else if(s_Command == "eat meat" || s_Command == "eat the meat" || s_Command == "eat spit of meat" || s_Command == "eat the spit of meat")
		{
			prntl << "The meat doesnt look to bad so you take a few bites.";
		}
		else if(s_Command == "eat spit" || s_Command == "eat the spit")
		{
			prntl << "Your not supposed to eat the spit...";
		}
		else if(s_Command == "get flagon" || s_Command == "pick up flagon" || s_Command == "pick up the flagon" || s_Command == "get the flagon")
		{
			if(!gamedata[11]) // finding the kegs
			{
				prntl << "That doesnt seem like a very useful item right now,\n"
					<< "there's not even any kegs around here.";
			}
			else
			{
				prntl << "Maybe you can get a drink in the basement.";
				inventory[9].state = true; // flagon
			}
		}
		else if(s_Command == "look at flagon" || s_Command == "look at the flagon" || s_Command == "look flagon")
		{
			prntl << "their are some flagons on the countertop,\n"
				<< "maybe if you find something to put in it they might be useful.";
		}
		else if(s_Command == "get utensils" || s_Command == "pick up utensils" || s_Command == "pick up the untensils" || s_Command == "get the utensils")
		{
			if(!inventory[5].state && !gamedata[5]) // utensils // utensils
			{
				prntl << "You pick up a fork and knife, maybe you can try picking a lock with them.";
				inventory[5].state = true; // utensils
				gamedata[5] = true; // utensils
			}
			else
			{
				prntl << "Their's just a bunch of rusty silverware, best just to leave it.";
			}
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "pantry")
	{
		if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "Theres rotten fruits and vegetables everywere and sacks of grain\n"
				<< "with rodents living in it.";
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The door to get out and back to the kitchen is west.";
		}
		else if(s_Command == "look at fruit" || s_Command == "look at the fruit" || s_Command == "look fruit" || s_Command == "look at fruits" || s_Command == "look at the fruits" || s_Command == "look fruits" || s_Command == "look at rotten fruit" || s_Command == "look at the rotten fruit" || s_Command == "look rotten fruit" || s_Command == "look at rotten fruits" || s_Command == "look at the rotten fruits" || s_Command == "look rotten fruits")
		{
			prntl << "There's a bunch of nasty look food everywhere.";
		}
		else if(s_Command == "eat food" || s_Command == "eat the food" || s_Command == "eat rotten food" || s_Command == "eat the rotten food" || s_Command == "eat fruits" || s_Command == "eat the fruits" || s_Command == "eat rotten fruits" || s_Command == "eat the rotten fruits")
		{
			prntl << "That really not something you want to be eating.";
		}
		else if(s_Command == "exit" || s_Command == "leave" || s_Command == "exit pantry" || s_Command == "exit the pantry" || s_Command == "leave pantry" || s_Command == "leave the pantry" || s_Command == "west" || s_Command == "w" || s_Command == "go west" || s_Command == "head west" || s_Command == "walk west")
		{
			prntl << "You head back out to the kitchen.";
			room = "kitchen";
		}
		else if(s_Command == "look at grain" || s_Command == "look grain" || s_Command == "look at the grain" || s_Command == "look sack of grain" || s_Command == "look at sack of grain" || s_Command == "look at the sack of grain")
		{
			if(!gamedata[9]) // beating mordecai riverbottom
			{
				prntl << "You dont see much use looking through the bag its not like\n"
					<< "there'd be anytihng hidden in it.";
			}
			else
			{
				prntl << "You cut the bag open and another stone key falls outs.";
				inventory[12].state = true; // stone key 3
			}
		}
	}
	else if(room == "barracks")
	{
		if(s_Command == "exit" || s_Command == "leave" || s_Command == "exit barracks" || s_Command == "exit the barracks" || s_Command == "leave barracks" || s_Command == "leave the barracks" || s_Command == "north" || s_Command == "n" || s_Command == "go north" || s_Command == "head north" || s_Command == "walk north")
		{
			prntl << "You head back in to the hall.";
			room = "main_hall";
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The door back out to the hall is north.";
		}
		else if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "There are bunk beds lining the walls and a weapon rack going down the middle of the room.";
		}
		else if(s_Command == "look at racks" || s_Command == "look at the racks" || s_Command == "look racks" || s_Command == "look weapon racks" || s_Command == "look at weapon racks" || s_Command == "look at the weapon racks")
		{
			prntl << "All the spear shafts are rotten and the heads are rusty.";
		}
		else if(s_Command == "get spear" || s_Command == "get spears" || s_Command == "get the spear" || s_Command == "get the spears" || s_Command == "grab spear" || s_Command == "grab the spear" || s_Command == "grab spears" || s_Command == "grab the spears" || s_Command == "pick up spear" || s_Command == "pick up the spear" || s_Command == "pick up spears" || s_Command == "pick up the spears")
		{
			prntl << "None of the spears look very useful, you decide to just leave them.";
		}
		else if(s_Command == "look at beds" || s_Command == "look at bunk beds" || s_Command == "look at bunks" || s_Command == "look beds" || s_Command == "look bed" || s_Command == "look at bed" || s_Command == "look at the beds" || s_Command == "look at the bed" || s_Command == "look at the bunk" || s_Command == "look at the bunks" || s_Command == "look bunks" || s_Command == "look bunk" || s_Command == "look bunk beds" || s_Command == "look at the bunk beds")
		{
			prntl << "You dont see anything out of the ordinary with the beds until you notice\n"
				<< "some thing odd under one of them.";
		}
		else if(s_Command == "sleep" || s_Command == "sleep in bed" || s_Command == "sleep in bunk bed" || s_Command == "sleep in the bed" || s_Command == "sleep in the bunk beds")
		{
			prntl << "You should try and figure away out of this castle first.";
		}
		else if(s_Command == "move bed" || s_Command == "move bunk" || s_Command == "move bunk bed" || s_Command == "move the bunk beds" || s_Command == "move bunks" || s_Command == "move the bed" || s_Command == "move the beds" || s_Command == "move the bunks" || s_Command == "move the bunk" || s_Command == "move the bunk bed" || s_Command == "push the bed" || s_Command == "push bed" || s_Command == "push beds" || s_Command == "push the beds" || s_Command == "push bunk beds" || s_Command == "push the bunk beds")
		{
			prntl << "You push the bed out of the way and find a trapdoor.";
			gamedata[20] = true; // moving the bed in the barracks
		}
		else if(s_Command == "enter trapdoor" || s_Command == "open trapdoor" || s_Command == "open the trapdoor" || s_Command == "enter the trapdoor" || s_Command == "go in trapdoor" || s_Command == "go into trapdoor" || s_Command == "go into the trapdoor" || s_Command == "use trapdoor" || s_Command == "use the trapdoor")
		{
			if(!gamedata[20]) // moving the bed in the barracks
			{
				prntl << "You can't see any trapdoors, maybe if you moved stuff around you might find one.";
			}
			else
			{
				prntl << "You lift the door up and descend the ladder leading to the castles basement.\n";
				room = "castle_basement";
			}
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "castle_basement")
	{
		if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "Its very dark and dingy and you can see a door in front of you.";
		}
		else if(s_Command == "open door" || s_Command == "open the door" || s_Command == "north" || s_Command == "n" || s_Command == "go north" || s_Command == "head north" || s_Command == "walk north")
		{
			prntl << "You open the door and find massive kegs on either wall.";
			room = "celler";
		}
		else if(s_Command == "let love open the door") // cant stop wont stop.
		{
			prntl << "Only one things gonna set you free of this castle.\n"
				<< "You walk into the celler and find large kegs on both walls.";
			room = "celler";
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The hall goes west and theres a door to the north.\n"
				<< "The ladder back to the barracks is south.";
		}
		else if(s_Command == "west" || s_Command == "w" || s_Command == "go west" || s_Command == "head west" || s_Command == "walk west")
		{
			prntl << "You head deeper and find your self in some sort of eerie crypt.";
			room = "crypt";
		}
		else if(s_Command == "climb ladder" || s_Command == "exit" || s_Command == "exit basement" || s_Command == "exit the basement" || s_Command == "climb the ladder" || s_Command == "south" || s_Command == "s" || s_Command == "go south" || s_Command == "head south" || s_Command == "walk south")
		{
			prntl << "You head back up the ladder to the barracks.";
			room = "barracks";
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "celler")
	{
		if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "The north wall is all crumbled, probably from the staircase collapsing.\n"
				<< "Theres not much else here exept for the kegs.";
			gamedata[11] = true; // finding the kegs
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The door to the basement is south.";
		}
		else if(s_Command == "look at keg" || s_Command == "look at the keg" || s_Command == "look keg" || s_Command == "look kegs" || s_Command == "look at kegs" || s_Command == "look at the kegs")
		{
			prntl << "It looks like someone etched some numbers and letters here\n"
				<< "they read 2B3G1R 1G1B3B2R2G3R."; // dear god this is too complicated... make it like 3 books you gotta pull or something
		}
		else if(s_Command == "use keg" || s_Command == "use the keg" || s_Command == "use kegs" || s_Command == "use the kegs" || s_Command == "use flagon" || s_Command == "use the flagon" || s_Command == "use flagon on keg" || s_Command == "use flagon on kegs" || s_Command == "use flagon on the keg" || s_Command == "use flagon on the kegs" || s_Command == "use the flagon on keg" || s_Command == "use the flagon on the kegs" || s_Command == "use the flagon on the keg")
		{
			if(!gamedata[9] && inventory[9].state) // beating mordecai riverbottom // flagon
			{
				prntl << "You dont have time for that maybe later once you've made sure\n"
					<< "the rest of the castle is safe.";
			}
			else
			{
				prntl << "You stick your flagon under the faucet and turn the tap but it only\n"
					<< "seems to be trickling out, there might be something blocking it.";
				gamedata[12] = true; // trying to use the keg
			}
		}
		else if(s_Command == "open keg" || s_Command == "use sword" || s_Command == "use sword on keg" || s_Command == "use the sword on keg" || s_Command == "use the sword on the keg" || s_Command == "open the keg" || s_Command == "smash the keg" || s_Command == "smash keg" || s_Command == "break up keg" || s_Command == "break up the keg")
		{
			if(!gamedata[12]) // trying to use the keg
			{
				prntl << "You don't have any reason to do that now.\n"
					<< "Go explore the rest of the castle before trying to find any weird keys.";
			}
			else
			{
				prntl << "you smash the faucet off and find another stone key.";
				inventory[13].state = true; // stone key 4
			}
		}
		else if(s_Command == "exit" || s_Command == "exit celler" || s_Command == "exit the celler" || s_Command == "leave" || s_Command == "leave celler" || s_Command == "leave the celler" || s_Command == "south" || s_Command == "s" || s_Command == "go south" || s_Command == "head south" || s_Command == "walk south")
		{
			prntl << "You head back to the ladder.";
			room = "castle_basement";
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "crypt")
	{
		if(s_Command == "exit" || s_Command == "east" || s_Command == "e" || s_Command == "exit crypt" || s_Command == "exit the crypt" || s_Command == "leave" || s_Command == "leave the crypt" || s_Command == "leave crypt")
		{
			prntl << "You head back to the ladder.";
			room = "castle_basement";
		}
		else if(s_Command == "compass" || s_Command == "look compass" || s_Command == "look at compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The ladder is east.";
		}
		else if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "You notice some tombs on both sides of the wall as well as some sort of\n"
				<< "strange pedestal in the middle of the room.\n"
				<< "HINT: try looking at and then opening tomb 1 - 4.";
		}
		else if(s_Command == "look at pedestal" || s_Command == "look pedestal" || s_Command == "look at the pedestals")
		{
			prntl << "It looks like four big keyholes in the middle of it, there is also\n"
				<< "strange markings on the sides of it.\n"
				<< "HINT: Come back here once you've explored the rest of the castle and found\n"
				<< "all the keys.";
		}
		else if(s_Command == "look at tombs" || s_Command == "look tombs" || s_Command == "look at the tombs")
		{
			prntl << "There's four tombs, two on each wall.\n"
				<< "Which one do you want to look at.";
		}
		else if(s_Command == "look at first tomb" || s_Command == "look at sir tact tomb" || s_Command == "look at the first tomb" || s_Command == "look tomb 1" || s_Command == "look at tomb 1" || s_Command == "look tomb one" || s_Command == "look at tomb one")
		{
			prntl << "Here lies Sir Tact, a diplomatic fellow\n"
				<< "Whose silence was not golden, but just yellow.";
		}
		else if(s_Command == "look at second tomb" || s_Command == "look at twisleton tomb" || s_Command == "look at the second tomb" || s_Command == "look tomb 2" || s_Command == "look at tomb 2" || s_Command == "look tomb two" || s_Command == "look at tomb two")
		{
			prntl << "Twisleton Wykeham-Fiennes the worlds greatest adventurer and explorer.";
		}
		else if(s_Command == "look at third tomb" || s_Command == "look at the third tomb" || s_Command == "look tomb 3" || s_Command == "look at tomb 3" || s_Command == "look tomb three" || s_Command == "look at tomb three")
		{
			prntl << "The plague is to worn to read but you notice the lid is a bit crooked.";
		}
		else if(s_Command == "look at fourth tomb" || s_Command == "look at mordecai tomb" || s_Command == "look at the fourth tomb" || s_Command == "look tomb 4" || s_Command == "look at tomb 4" || s_Command == "look tomb four" || s_Command == "look at tomb four")
		{
			prntl << "Mordecai Riverbottom. Thats all the plague says but you see that the lid is nearly off.";
		}
		else if(s_Command == "open tomb 1" || s_Command == "open tomb one")
		{
			prntl << "You can't move the lid.";
		}
		else if(s_Command == "open tomb 2" || s_Command == "open tomb two")
		{
			prntl << "You can't move the lid.";
		}
		else if(s_Command == "open third tomb" || s_Command == "open the third tomb" || s_Command == "open lid to third tomb" || s_Command == "open lid to the third tomb" || s_Command == "open the lid to third tomb" || s_Command == "open the lid to the third tomb" || s_Command == "open lid of third tomb" || s_Command == "open lid of the third tomb" || s_Command == "open the lid of the third tomb" || s_Command == "open tomb 3" || s_Command == "open tomb three")
		{
			prntl << "You push the heavy lid off and peer inside. There's an ornately dressed skeleton inside./n"
				<< "It looks like this skeleton might have something useful, try taking a closer look at him.";
		}
		else if(s_Command == "open fourth tomb" || s_Command == "open mordecai tomb" || s_Command == "open mordecais tomb" || s_Command == "open the fourth tomb" || s_Command == "open lid to fourth tomb" || s_Command == "open lid to the fourth tomb" || s_Command == "open the lid to fourth tomb" || s_Command == "open the lid to the fourth tomb" || s_Command == "open lid of fourth tomb" || s_Command == "open lid of the fourth tomb" || s_Command == "open the lid of the fourth tomb" || s_Command == "open tomb 4" || s_Command == "open tomb four")
		{
			prntl << "You push the lid off and look in but see that it is completely empty save for a few cobwebs.";
		}
		else if(s_Command == "look at skeleton" || s_Command == "search skeleton" || s_Command == "look at the skeleton" || s_Command == "look skeleton" || s_Command == "search the skeleton")
		{
			prntl << "You search him and find a key hung around his neck.\n"
				<< "I don't think he'd mind if you tried grabbing it.";
		}
		else if(s_Command == "get key" || s_Command == "get the key" || s_Command == "grab key" || s_Command == "grab the key" || s_Command == "pick up key" || s_Command == "pick up the key")
		{
			prntl << "You grab the keys from around the neck of the rather dapper skeleton.";
			inventory[6].state = true; // dapper skeleton's key
		}
		else if(s_Command == "put stone key one in pedestal" || s_Command == "use stone key one" || s_Command == "use stone key 1" || s_Command == "put stone key 1 in pedestal" || s_Command == "use stone key one in pedestal" || s_Command == "use stone key 1 in pedestal" || s_Command == "use pedestal" || s_Command == "use the pedestal" || s_Command == "use key in pedestal" || s_Command == "use key with pedestal")
		{
			if(!inventory[10].state && !gamedata[13]) // stone key 1 // stone key 1 in pedestal
			{
				prntl << "You dont have anything to put in the pedestal.";
			}
			else if(!gamedata[13] && inventory[10].state) // stone key 1 in pedestal // stone key 1
			{
				prntl << "You stick the key in the pedestal.\n";
				inventory[10].state = false; // stone key 1
				gamedata[13] = true; // stone key 1 in pedestal
				if(gamedata[14] && gamedata[15] && gamedata[16]) // stone key 2 in pedestal // stone key 3 in pedestal // stone key 3 in pedestal
				{
					prntl << "All the pieces are in the pedestal, hopefully Mordecai wasn't\n"
						<< "lieing about them unlocking the drawbridge.\n"
						<< "(You didn't miss anything I'm just lazy.)";
					gamedata[10] = true; // stone puzzle complete
				}
			}
			else if(!inventory[10].state && gamedata[13]) // stone key 1 // stone key 1 in pedestal
			{
				prntl << "That piece is already in the pedestal.";
			}
		}
		else if(s_Command == "put stone key two in pedestal" || s_Command == "use stone key two" || s_Command == "use stone key 2" || s_Command == "put stone key 2 in pedestal" || s_Command == "use stone key two in pedestal" || s_Command == "use stone key 2 in pedestal")
		{
			if(!inventory[11].state && !gamedata[14]) // stone key 2 // stone key 2 in pedestal
			{
				prntl << "You dont have anything to put in the pedestal.";
			}
			else if(!gamedata[14] && inventory[11].state) // stone key 2 in pedestal // stone key 2
			{
				prntl << "You stick the key in the pedestal.\n";
				inventory[11].state = false; // stone key 2
				gamedata[14] = true; // stone key 2 in pedestal
				if(gamedata[13] && gamedata[15] && gamedata[16]) // stone key 1 in pedestal // stone key 3 in pedestal // stone key 4 in pedestal
				{
					prntl << "All the pieces are in the pedestal, hopefully Mordecai wasn't\n"
						<< "lieing about them unlocking the drawbridge.\n"
						<< "(You didn't miss anything I'm just lazy.)";
					gamedata[10] = true; // stone puzzle complete
				}
			}
			else if(!inventory[11].state && gamedata[14]) // stone key 2 // stone key 2 in pedestal
			{
				prntl << "That piece is already in the pedestal.";
			}
		}
		else if(s_Command == "put stone key three in pedestal" || s_Command == "use stone key three" || s_Command == "use stone key 3" || s_Command == "put stone key 3 in pedestal" || s_Command == "use stone key three in pedestal" || s_Command == "use stone key 3 in pedestal")
		{
			if(!inventory[12].state && !gamedata[15])// stone key 3 // stone key 3 in pedestal
			{
				prntl << "You dont have anything to put in the pedestal.";
			}
			else if(!gamedata[15] && inventory[12].state) // stone key 3 in pedestal // stone key 3
			{
				prntl << "You stick the key in the pedestal.\n";
				inventory[12].state = false; // stone key 3
				gamedata[15] = true; // stone key 3 in pedestal
				if(gamedata[14] && gamedata[13] && gamedata[16]) // stone key 2 in pedestal // stone key 1 in pedestal // stone key 4 in pedestal
				{
					prntl << "All the pieces are in the pedestal, hopefully Mordecai wasn't\n"
						<< "lieing about them unlocking the drawbridge.\n"
						<< "(You didn't miss anything I'm just lazy.)";
					gamedata[10] = true; // stone puzzle complete
				}
			}
			else if(!inventory[12].state && gamedata[15]) // stone key 2 // stone key 2 in pedestal
			{
				prntl << "That piece is already in the pedestal.";
			}
		}
		else if(s_Command == "put stone key four in pedestal" || s_Command == "use stone key four" || s_Command == "use stone key 4" || s_Command == "put stone key 4 in pedestal" || s_Command == "use stone key four in pedestal" || s_Command == "use stone key 4 in pedestal")
		{
			if(!inventory[13].state && !gamedata[16]) // stone key 4 // stone key 4 in pedestal
			{
				prntl << "You dont have anything to put in the pedestal.";
			}
			else if(!gamedata[16] && inventory[13].state) // stone key 4 in pedestal // stone key 4
			{
				prntl << "You stick the key in the pedestal.\n";
				inventory[13].state = false; // stone key 4
				gamedata[16] = true; // stone key 4 in pedestal
				if(gamedata[14] && gamedata[15] && gamedata[13]) // stone key 2 in pedestal // stone key 3 in pedestal // stone key 1 in pedestal
				{
					prntl << "All the pieces are in the pedestal, hopefully Mordecai wasn't\n"
						<< "lieing about them unlocking the drawbridge.\n"
						<< "(You didn't miss anything I'm just lazy.)";
					gamedata[10] = true;
				}
			}
			else if(!inventory[13].state && gamedata[16]) // stone key 4 // stone key 4 in pedestal
			{
				prntl << "That piece is already in the pedestal.";
			}
		}
		else if(s_Command == "use stone key")
		{
			prntl << "Which stone key.";
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "LVL_2_staircase")
	{
		if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "It's a long winding staircase leading up to the tower.";
		}
		else if(s_Command == "compass" || s_Command == "look compass" || s_Command == "look at compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "You can go back to the hallway via the door to the west.";
		}
		else if(s_Command == "exit" || s_Command == "leave" || s_Command == "west" || s_Command == "w" || s_Command == "go west" || s_Command == "head west" || s_Command == "walk west")
		{
			prntl << "You head back in to the hallway.";
			room = "north_hall_main_floor";
		}
		else if(s_Command == "climb stairs" || s_Command == "climb the stairs" || s_Command == "climb staircase" || s_Command == "climb the staircase" || s_Command == "go up stairs" || s_Command == "go up the stairs" || s_Command == "go up the staircase" || s_Command == "go up staircase" || s_Command == "use staircase" || s_Command == "use the staircase" || s_Command == "use stairs" || s_Command == "use the stairs")
		{
			prntl << "You head up the stairs and come to a small hallway.";
			room = "tower";
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "tower")
	{
		if(s_Command == "exit" || s_Command == "exit tower" || s_Command == "exit the tower" || s_Command == "go down stairs" || s_Command == "go down the stairs" || s_Command == "go down staircase" || s_Command == "go down the staircase" || s_Command == "climb down stairs" || s_Command == "climb down the stairs" || s_Command == "climb down staircase" || s_Command == "cimlb down the staircasae" || s_Command == "use stairs" || s_Command == "use the stairs" || s_Command == "use staircase" || s_Command == "use the staircase" || s_Command == "east" || s_Command == "e" || s_Command == "go east" || s_Command == "head east" || s_Command == "walk east")
		{
			prntl << "You head back down the stairs.";
			room = "LVL_2_staircase";
		}
		else if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "Your in a small corridor, theres apears to be a few doors down the hall a bit.\n"
				<< "There's also a big EXIT sign above the staircase you came from.";
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The hallway goes south, the staircase is west.";
		}
		else if(s_Command == "south" || s_Command == "s" || s_Command == "go south" || s_Command == "head south" || s_Command == "walk south")
		{
			prntl << "You head down the hallway to the first door.";
			room = "front_of_library";
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "front_of_library")
	{
		if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "Your in the middle of the hallway, there's a door beside you.\n"
				<< "You notice a sign next to the door that reads 'Library'";
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The hall goes north and south. The library door is west.";
		}
		else if(s_Command == "north" || s_Command == "n" || s_Command == "go north" || s_Command == "head north" || s_Command == "walk north")
		{
			prntl << "You head back up to the stairwell.";
			room = "tower";
		}
		else if(s_Command == "south" || s_Command == "s" || s_Command == "go south" || s_Command == "head south" || s_Command == "walk south")
		{
			prntl << "You make your way to the end of the hallway and come to another door.";
			room = "front_of_closet";
		}
		else if(s_Command == "open door" || s_Command == "open the door" || s_Command == "west" || s_Command == "w" || s_Command == "go west" || s_Command == "head west" || s_Command == "walk west" || s_Command == "use key" || s_Command == "use library key" || s_Command == "use the library key")
		{
			if(!inventory[8].state) // library key
			{
				prntl << "The door seems to be locked.";
			}
			else
			{
				prntl << "You use the key from the bucket and open the door.";
				room = "library";
			}
		}
		else if(s_Command == "let love open the door") // i just really like this song ok.
		{
			prntl << "Only one thing's gonna set you free, and your now one step closer\n"
				<< "now that your in this library.";
			room = "library";
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "front_of_closet")
	{
		if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "Theres a closet in font of you and nothing else.";
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The hall goes north, the closet door is east.";
		}
		else if(s_Command == "north" || s_Command == "n" || s_Command == "go north" || s_Command == "head north" || s_Command == "walk north" || s_Command == "go north")
		{
			prntl << "You head back to the library door.";
			room = "front_of_library";
		}
		else if(s_Command == "open door" || s_Command == "open the door" || s_Command == "east" || s_Command == "e" || s_Command == "go east" || s_Command == "head east" || s_Command == "walk east")
		{
			if(!gamedata[50]) // using skeleton's keys on closet
			{
				prntl << "The door is locked.";
			}
			else
			{
				prntl << "You open the door and step in to the closet.";
				room = "closet";
			}
		}
		else if(s_Command == "use keys" || s_Command == "use key" || s_Command == "use the keys" || s_Command == "use the key" || s_Command == "use skeleton's key" || s_Command == "use skeleton key" || s_Command == "use the skeleton's key" || s_Command == "use the skeleton key" || s_Command == "use skeletons key" || s_Command == "use the skeletons key" || s_Command == "use skeleton's keys" || s_Command == "use skeleton keys" || s_Command == "use the skeleton's keys" || s_Command == "use the skeleton keys" || s_Command == "use skeletons keys" || s_Command == "use the skeletons keys")
		{
			prntl << "You try some of the keys you got from the dungeon and manage to unlock the door.";
			gamedata[50] = true; // using skeleton's keys on closet
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "closet")
	{
		if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "There's a dingy mop on the one wall as well\n"
				<< "as a bucket filled with sludgie water\n"
				<< "there's also a bunch of other cleaning supplys\n"
				<< "on the shelves and a drain on the floor.";
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The door back to the hallway is west.";
		}
		else if(s_Command == "exit" || s_Command == "west" || s_Command == "w" || s_Command == "exit closet" || s_Command == "exit the closet" || s_Command == "leave" || s_Command == "leave the closet" || s_Command == "leave closet" || s_Command == "go west" || s_Command == "head west" || s_Command == "walk west")
		{
			if(!inventory[7].state) // bucket of sludgie water
			{
				prntl << "You head back out to the hallway.";
				room = "front_of_closet";
			}
			else
			{
				prntl << "You're still holding the bucket of water.";
			}
		}
		else if(s_Command == "look at bucket" || s_Command == "look at the bucket" || s_Command == "look bucket")
		{
			prntl << "It's full of filthy water, you wonder to yourself if there's anything useful in it.";
		}
		else if(s_Command == "look at cleaning supplys" || s_Command == "look cleaning supplys" || s_Command == "look at the cleaning supplys")
		{
			prntl << "Looks like their out of Windex.";
		}
		else if(s_Command == "look at mop" || s_Command == "look mop" || s_Command == "look at the mop")
		{
			prntl << "It's just an ordinary mop.";
		}
		else if(s_Command == "get mop" || s_Command == "get the mop" || s_Command == "grab mop" || s_Command == "grab the mop" || s_Command == "pick up mop" || s_Command == "pick up the mop")
		{
			prntl << "You dont need that.";
		}
		else if(s_Command == "look at drain" || s_Command == "look drain" || s_Command == "look at the drain")
		{
			prntl << "There's a drain on the floor that probably leads to the sewers you came in through.";
		}
		else if(s_Command == "get bucket" || s_Command == "pick up bucket" || s_Command == "get the bucket" || s_Command == "grab the bucket" || s_Command == "grab bucket" || s_Command == "pick up the bucket")
		{
			prntl << "You pick the bucket up but you dont want to be carrying it around with you.";
			inventory[7].state = true; // bucket of sludgie water
		}
		else if(s_Command == "pour bucket out" || s_Command == "empty bucket" || s_Command == "empty the bucket" || s_Command == "pour the bucket out" || s_Command == "pour out bucket" || s_Command == "pour out the bucket")
		{
			prntl << "You pour the bucket out throw the drain and notice something\n"
				<< "shiny in the pile of sludge left behind.";
			inventory[7].state = false; // bucket of sludgie water
		}
		else if(s_Command == "look at sludge" || s_Command == "look at the sludge" || s_Command == "look sludge" || s_Command == "look at pile of sludge" || s_Command == "look at the pile of sludge" || s_Command == "look pile of sludge")
		{
			prntl << "You look in the pile and find a key in it. Someone must have moped it\n"
				<< "up by mistake. You stuck it in your pocket, it might be useful.";
			inventory[8].state = true; // libray key
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "library") // make this room easier ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	{
		if(s_Command == "exit" || s_Command == "leave" || s_Command == "leave library" || s_Command == "leave the library" || s_Command == "exit library" || s_Command == "exit the library" || s_Command == "east" || s_Command == "e" || s_Command == "go east" || s_Command == "head east" || s_Command == "walk east")
		{
			prntl << "You head back out to the hallway.";
			room = "front_of_library";
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The door back to the hallway is east.";
		}
		else if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "Theres two aisles of books that you can enter.";
		}
		else if(s_Command == "enter first aisle" || s_Command == "enter the first aisle" || s_Command == "go into first aisle" || s_Command == "go into the first aisle")
		{
			prntl << "You walk down the first aisle.";
			room = "first_aisle";
		}
		else if(s_Command == "enter second aisle" || s_Command == "enter the second aisle" || s_Command == "go into second aisle" || s_Command == "go into the second aisle")
		{
			prntl << "You walk down the second aisle.";
			room = "second_aisle";
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "first_aisle")
	{
		if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "Most of the books are either ruined or missing expect for\n"
				<< "three blue books on the left side.";
		}
		else if(s_Command == "exit")
		{
			prntl << "You head out of the aisle.";
			room = "library";
		}
		else if(s_Command == "look at books" || s_Command == "look books" || s_Command == "look blue books" || s_Command == "look at blue books" || s_Command == "look at the blue books" || s_Command == "look at the books")
		{
			prntl << "You notice the blue books are standing perfectly straight.";
		}
		else if(s_Command == "get blue book" || s_Command == "get blue books" || s_Command == "get the blue book" || s_Command == "get the blue books" || s_Command == "grab blue book" || s_Command == "grab the blue books" || s_Command == "grab the blue book" || s_Command == "grab blue books")
		{
			if(!gamedata[7]) // pulling the first book
			{
				prntl << "You go to grab one of the books but as your trying to pull\n"
					<< "it out you notice its attached to a chain which makes a strange grinding noise.";
				gamedata[7] = true; // pulling the first book
			}
			else
			{
				prntl << "All the blue books are attached to chains.";
			}
		}
		else if(s_Command == "pull second blue book")
		{
			if(gamepuzzle[0].done)
				prntl << "You already beat this puzzle";
			else if(gamepuzzle[0].states[3])
				prntl << "This book is already pulled, maybe try another one?";
			else
			{
				prntl << "The book stayed down. You hear gears shifting in the walls.";
				gamepuzzle[0].states[3] = 1;
			}
		}
		else if(s_Command == "pull first blue book")
		{
			if(gamepuzzle[0].done)
				prntl << "You already beat this puzzle";
			else if(gamepuzzle[0].states[0])
				prntl << "This book is already pulled, maybe try another one?";
			else if(gamepuzzle[0].states[1])
			{
				prntl << "The book stayed down. You hear gears shifting in the walls.";
				gamepuzzle[0].states[0] = 1;
			}
			else
			{
				prntl << "Wrong book. All books reset.";
				gamepuzzle[0].reset();
			}
		}
		else if(s_Command == "pull third blue book")
		{
			if(gamepuzzle[0].done)
				prntl << "You already beat this puzzle";
			else if(gamepuzzle[0].states[6])
				prntl << "This book is already pulled, maybe try another one?";
			else if(gamepuzzle[0].states[1])
			{
				prntl << "The book stayed down. You hear gears shifting in the walls.";
				gamepuzzle[0].states[6] = 1;
			}
			else
			{
				prntl << "Wrong book. All books reset.";
				gamepuzzle[0].reset();
			}
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "second_aisle")
	{
		if(s_Command == "exit")
		{
			prntl << "You head out of the aisle.";
			room = "library";
		}
		else if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "Theres three red books and three green books on the one shelf\n"
				<< "as well as a few ruined books. You also notice a ladder leading\n"
				<< "to the second level of the library.";
		}
		else if(s_Command == "look at books" || s_Command == "look books" || s_Command == "look blue books" || s_Command == "look at blue books" || s_Command == "look at the blue books" || s_Command == "look at the books")
		{
			prntl << "Theres three red and three green books standign perfectly straight.";
		}
		else if(s_Command == "climb ladder" || s_Command == "climb the ladder" || s_Command == "go up ladder" || s_Command == "go up the ladder" || s_Command == "use ladder" || s_Command == "use the ladder")
		{
			if(!gamedata[8]) // book puzzle/ladder complete
			{
				prntl << "The ladders to high to reach maybe theres some way to lower it.";
			}
			else
			{
				prntl << "You head up the ladder.";
				room = "library_second_floor";
			}
		}
		else if(s_Command == "get red book" || s_Command == "get green book" || s_Command == "get red books" || s_Command == "get the red book" || s_Command == "get the red books" || s_Command == "grab red book" || s_Command == "grab the red books" || s_Command == "grab the red book" || s_Command == "grab red books" || s_Command == "get green books" || s_Command == "get the green book" || s_Command == "get the green books" || s_Command == "grab green book" || s_Command == "grab the green books" || s_Command == "grab the green book" || s_Command == "grab green books")
		{
			if(!gamedata[7]) // pulling the first book
			{
				prntl << "You go to grab one of the books but as your trying to pull\n"
					<< "it out you notice its attached to a chain which makes a strange grinding noise.";
				gamedata[7] = true; // pulling the first book
			}
			else
			{
				prntl << "All the red and green books are attached to chains.";
			}
		}
		else if(s_Command == "pull first red book")
		{
			if(gamepuzzle[0].done)
				prntl << "You already beat this puzzle";
			else if(gamepuzzle[0].states[2])
				prntl << "This book is already pulled, maybe try another one?";
			else if(gamepuzzle[0].states[7])
			{
				prntl << "The book stayed down. You hear gears shifting in the walls.";
				gamepuzzle[0].states[2] = 1;
			}
			else
			{
				prntl << "Wrong book. All books reset.";
				gamepuzzle[0].reset();
			}
		}
		else if(s_Command == "pull second red book")
		{
			if(gamepuzzle[0].done)
				prntl << "You already beat this puzzle";
			else if(gamepuzzle[0].states[5])
				prntl << "This book is already pulled, maybe try another one?";
			else if(gamepuzzle[0].states[6])
			{
				prntl << "The book stayed down. You hear gears shifting in the walls.";
				gamepuzzle[0].states[5] = 1;
			}
			else
			{
				prntl << "Wrong book. All books reset.";
				gamepuzzle[0].reset();
			}
		}
		else if(s_Command == "pull third red book")
		{
			if(gamepuzzle[0].done)
				prntl << "You already beat this puzzle";
			else if(!gamepuzzle[0].states[8])
			{
				if(gamepuzzle[0].states[4])
				{
					prntl << "Book stayed out. Puzzle complete.";
					gamepuzzle[0].states[9] = 1;
					gamepuzzle[0].done = 1;
					gamedata[8] = 1; // book puzzle/ladder complete
				}
				else
				{
					prntl << "Wrong book. All books reset.";
					gamepuzzle[0].reset();
				}
			}
		}
		else if(s_Command == "pull first green book")
		{
			if(gamepuzzle[0].done)
				prntl << "You already beat this puzzle";
			else if(gamepuzzle[0].states[1])
				prntl << "This book is already pulled, maybe try another one?";
			else if(gamepuzzle[0].states[2])
			{
				prntl << "The book stayed down. You hear gears shifting in the walls.";
				gamepuzzle[0].states[1] = 1;
			}
			else
			{
				prntl << "Wrong book. All books reset.";
				gamepuzzle[0].reset();
			}
		}
		else if(s_Command == "pull second green book")
		{
			if(gamepuzzle[0].done)
				prntl << "You already beat this puzzle";
			else if(gamepuzzle[0].states[4])
				prntl << "This book is already pulled, maybe try another one?";
			else if(gamepuzzle[0].states[5])
			{
				prntl << "The book stayed down. You hear gears shifting in the walls.";
				gamepuzzle[0].states[4] = 1;
			}
			else
			{
				prntl << "Wrong book. All books reset.";
				gamepuzzle[0].reset();
			}
		}
		else if(s_Command == "pull third green book")
		{
			if(gamepuzzle[0].done)
				prntl << "You already beat this puzzle";
			else if(gamepuzzle[0].states[7])
				prntl << "This book is already pulled, maybe try another one?";
			else if(gamepuzzle[0].states[3])
			{
				prntl << "The book stayed down. You hear gears shifting in the walls.";
				gamepuzzle[0].states[7] = 1;
			}
			else
			{
				prntl << "Wrong book. All books reset.";
				gamepuzzle[0].reset();
			}
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "library_second_floor")
	{
		if(s_Command == "climb down ladder" || s_Command == "exit" || s_Command == "head down ladder" || s_Command == "head down the ladder" || s_Command == "climb down the ladder" || s_Command == "use ladder" || s_Command == "use the ladder")
		{
			prntl << "You head back down the ladder.";
			room = "second_aisle";
		}
		else if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "There's a lot less ruined books up here. There's also a big old book\n"
				<< "sitting on a desk with a candle flickering next to it.\n"
				<< "Also there's a door.";
		}
		else if(s_Command == "look at old book" || s_Command == "look at book" || s_Command == "look at the book" || s_Command == "look book" || s_Command == "look at big old book" || s_Command == "look old book" || s_Command == "look big old book" || s_Command == "look at the old book" || s_Command == "look at the big old book")
		{
			if(!gamedata[9]) // beating mordecai riverbottom
			{
				prntl << "It apears to be an old history book,\n"
					<< "you should go see whats behind that door before you start reading anything.";
			}
			else
			{
				prntl << "An old book, there might be some usefull information if you read it.";
			}

		}
		else if(s_Command == "read book" || s_Command == "read history book" || s_Command == "read the book" || s_Command == "read the old book" || s_Command == "read the history book" || s_Command == "read old book" || s_Command == "look history book" || s_Command == "look at history book" || s_Command == "look at book" || s_Command == "look at old book" || s_Command == "look at the history book" || s_Command == "look old book")
		{
			if(!gamedata[9]) // beating mordecai riverbottom
			{
				prntl << "It looks like a long and boring book maybe you should find out whats behind the door\n"
					<< "first before you starting reading it.";
			}
			else
			{
				prntl << "You open the book up and find that the middle has been cut out and another\n"
					<< "one of those stone keys is in side.";
				inventory[11].state = true; // stone key 2
			}
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "There is a door on the east wall.";
		}
		else if(s_Command == "open door" || s_Command == "open the door" || s_Command == "east" || s_Command == "e" || s_Command == "go east" || s_Command == "head east" || s_Command == "walk east")
		{
			prntl << "You lacklusterly go to turn the doorknob assuming it will be locked but\n"
				<< "to your surprise its not. You step threw and find your self in some sort of\n"
				<< "stange sanctumesque room filled with many a strange artifacts and beakers,\n"
				<< "theres also a chair on the far side on the room, it looks like there's a\n"
				<< "person sitting in it.";
			room = "sanctum";
		}
		else if(s_Command == "let love open the door") // help.
		{
			prntl << "Don't let them bring you down because this door opens right.\n"
				<< "You step threw and find your self in some sort of\n"
				<< "stange sanctumesque room filled with many a strange artifacts and beakers,\n"
				<< "theres also a chair on the far side on the room, it looks like there's a\n"
				<< "person sitting in it.";
			room = "sanctum";
		}
		else
			prntl << "Unknown command";
	}
	else if(room == "sanctum")
	{
		if(s_Command == "exit" || s_Command == "exit sanctum" || s_Command == "exit the sanctum" || s_Command == "leave" || s_Command == "leave sanctum" || s_Command == "leave the sanctum" || s_Command == "west" || s_Command == "w" || s_Command == "go west" || s_Command == "head west" || s_Command == "walk west")
		{
			if(!gamedata[9]) // beating mordecai riverbottom
			{
				prntl << "It problably wouldnt be a good idea to turn your back in case\n"
					<< "there is some one in the chair.";
			}
			else
			{
				prntl << "You head back out to the library.";
				room = "library_second_floor";
			}
		}
		else if(s_Command == "compass" || s_Command == "look at compass" || s_Command == "look compass" || s_Command == "look at the compass" || s_Command == "use compass" || s_Command == "use the compass")
		{
			prntl << "The only exit from this room is west.\n"
				<< "(Other then maybe a window.)";
		}
		else if(s_Command == "go out window" || s_Command == "go window" || s_Command == "go out the window" || s_Command == "use window" || s_Command == "use the window" || s_Command == "go through window" || s_Command == "go through the window" || s_Command == "jump through window " || s_Command == "jump through the window" || s_Command == "jump out the window" || s_Command == "jump out window" || s_Command == "exit window" || s_Command == "exit through window" || s_Command == "exit through the window")
		{
			prntl << "It's not safe for you to go out the window.";
		}
		else if(s_Command == "look" || s_Command == "look around")
		{
			prntl << "You look around the sanctum to see theres strange artifacts all over and bubbling beakers on all the tables.\n"
				<< "Also theres a chair with its back to you that seems like someones sitting in it.\n"
				<< "The person sitting is the chair is evil and hes going to attack you."; // i'll fix the ending some other time... maybe ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		}
		else if(s_Command == "fight" || s_Command == "attack" || s_Command == "use sword" || s_Command == "use the sword")
		{
			prntl << "There was a guy in the chair and his name is Mordecai Riverbottom,\n"
				<< "he attacks you but you dodge and he falls out a window.\n"
				<< "You notice a strange stone key on his desk that has strange words written\n"
				<< "on it like the pedestal you found in the crypts. Maybe you should\n"
				<< "try putting it in the pedestal, and go find the other 3.\n"
				<< "HINT: It will unlock the drawbridge once you use all 4\n"
				<< "in the pedestal.";
			gamedata[9] = true; // beating mordecai riverbottom
			inventory[10].state = true; // stone key 1
		}
		else
			prntl << "Unknown command";
	}*/
}

// game start... kinda boring
function gamestart()
{
	room = "start";
	tex.value = "";
	prntl("You wake up and find your self on a path lost in Ravenwood forest.\n"
		+ "You check your pockets and surroundings and find some rope thats been cut\n");
}

// game starthere
gamestart();
