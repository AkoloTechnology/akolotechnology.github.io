#crazy 8's countdown

from random import randint

def rnd(rng):
    return randint(0,rng-1)

class Card:
    suit = 0
    value = 0

    def GetSuit(self):
        if self.suit == 0:
            return "Spade"
        elif self.suit == 1:
            return "Club"
        elif self.suit == 2:
            return "Heart"
        elif self.suit == 3:
            return "Diamond"
    
    def GetValue(self):
        if self.value == 1:
            return "Ace"
        if self.value == 11:
            return "Jack"
        if self.value == 12:
            return "Queen"
        if self.value == 13:
            return "King"
        return str(self.value)

    def GetSuitShort(self):
        if self.suit == 0:
            return "S"
        elif self.suit == 1:
            return "C"
        elif self.suit == 2:
            return "H"
        elif self.suit == 3:
            return "D"
    
    def GetValueShort(self):
        if self.value == 1:
            return "A"
        if self.value == 11:
            return "J"
        if self.value == 12:
            return "Q"
        if self.value == 13:
            return "K"
        return str(self.value)
    
    def GetFullName(self):
        return self.GetValue() + " of " + self.GetSuit() + "s"
    
    def GetShortName(self):
        return self.GetValueShort() + self.GetSuitShort()
    
def CardSuitValue(card):
    return card.suit*13 + card.value

def CardFaceValue(card):
    return card.suit + card.value*4

class CardList:

    def __init__(self):
        self.deck = []
        
    def SizeOf(self):
        return len(self.deck)

    def RandomCard(self):
        return self.deck[rnd(self.SizeOf())]

    def FindPlace(self, card):
        for x in self.SizeOf():
            if card == self.deck[x]:
                return x
        return None

    def FindCard(self, cardshort):
        for x in self.deck:
            if x.GetShortName().lower() == cardshort.lower():
                return x
        return None

    def IsCardInDeck(self, card):
        for x in self.deck:
            if card == x:
                return True
        return False

    def RemoveCard(self, card):
        for x in range(self.SizeOf()):
            if card == self.deck[x]:
                del self.deck[x]
                return
            
    def SwapCards(self, pos1, pos2):
        temp_card = self.deck[pos1]
        self.deck[pos1] = self.deck[pos2]
        self.deck[pos2] = temp_card
        
    def Shuffle(self, shuffle_amount):
        for x in range(shuffle_amount):
            self.SwapCards(rnd(self.SizeOf()),rnd(self.SizeOf()))
            
    def CreateMainDeck(self):
        self.deck = [Card() for i in range(52)]
        for suit in range(4):
            for value in range(13):
                self.deck[suit*13+value].suit = suit
                self.deck[suit*13+value].value = value+1
                
    def PrintCardList(self):
        for x in self.deck:
            print (x.GetFullName())
            
    def PrintCardListShort(self):
        temp_string = ""
        for x in self.deck:
            temp_string += x.GetShortName() + " "
        print (temp_string)
            
    def SortBySuit(self):
        self.deck = sorted(self.deck,key=CardSuitValue)
        
    def SortByFace(self):
        self.deck = sorted(self.deck,key=CardFaceValue)

    def AddCard(self, card):
        if card != None:
            self.deck.append(card)

    def DrawCard(self):
        temp_card = None
        if self.SizeOf() == 0:
            return None
        temp_card = self.deck[-1]
        del self.deck[-1]
        return temp_card
    
    def Draw(self, otherlist):
        self.AddCard(otherlist.DrawCard())
        
    def DrawX(self, amount, otherlist):
        for x in range(amount):
            self.AddCard(otherlist.DrawCard())

    def Transfer(self, card, otherlist):
        if card != None:
            if self.IsCardInDeck(card):
                otherlist.AddCard(card)
                self.RemoveCard(card)            

    def GetLastCard(self):
        if self.SizeOf() > 0:
            return self.deck[-1]
        return None
        
maindeck = CardList()
discard = CardList()
playershand = CardList()
computershand = CardList()

maindeck.CreateMainDeck()
maindeck.Shuffle(500)
discard.Draw(maindeck)

playershand.DrawX(8,maindeck)
computershand.DrawX(8,maindeck)    
playershand.SortByFace()

print ("Crazy 8's (soon to be countdown but not yet countdown) by Spikerocks101")
print ("Objective: Win by beating the computer to emptying your hand from cards")
print ("You can play cards that share the same suit or face value as the card in the discard")
print ("(To play a card, enter the face then the suit, like '2s' for the 2 of Spades)\n")

gamedone = False
while gamedone == False:

    noplays = True
    
    #start of players turn
    print ("Last card: " + discard.GetLastCard().GetFullName())
    print ("Deck size: " + str(maindeck.SizeOf()))
    print ("Your hand: ", end='')
    playershand.PrintCardListShort()

    playedacard = False
    while playedacard == False:       
        dc = discard.GetLastCard()
        
        #start of players possible moves
        possiblemove = False
        for x in playershand.deck:
            if dc.suit == x.suit or dc.value == x.value:
                possiblemove = True
        if possiblemove == False:
            if maindeck.SizeOf() > 0:
                playershand.Draw(maindeck)
                playershand.SortByFace()
                print ("You had no moves and drew a card\n")
                playedacard = True
                noplays = False
                continue
            else:
                print ("You couldn't play or draw\n")
                playedacard = True
                continue
        #end of players possible moves

        #start of valid input loop
        inputstring = ""
        validinput = False
        while validinput == False:
            inputstring = input ("What would you like to play: ")
            if len(inputstring) == 2 or len(inputstring) == 3:
                fc = inputstring[0:-1].lower()
                if fc=='a' or fc=='2'  or fc=='3' or fc=='4' \
                or fc=='5' or fc=='6'  or fc=='7' or fc=='8' \
                or fc=='9' or fc=='10' or fc=='j' or fc=='q' or fc=='k':
                    lc = inputstring[-1].lower()
                    if lc=='s' or lc=='c'  or lc=='h' or lc=='d':
                        validinput = True
                    else:
                        print ("Not a valid input")
                else:
                    print ("Not a valid input")
            else:
                print ("Not a valid input")
        #end of valid input loop

        #start of valid card in hand
        iscardinhand = False
        for card in playershand.deck:
            if card.GetShortName().lower() == inputstring:
                iscardinhand = True
        if iscardinhand == False:
            print ("Card not in hand\n")
            continue
        #end of valid card in hand

        thc = playershand.FindCard(inputstring) #temp human card
        
        if dc.suit != thc.suit and dc.value != thc.value:
            print ("Card doesn't match suit or value\n")
            continue
        
        playershand.Transfer(thc,discard)
        playedacard = True
        noplays = False
        print ("You played the " + thc.GetFullName() + "\n")
    #end of players turn

    #start of players win check
    if playershand.SizeOf() == 0:
        print ("Player wins! Congrats!")
        gamedone = True
        continue
    #end of players win check
    
    #start of computers turn
    possiblecards = CardList()
    dc = discard.GetLastCard()
    for x in computershand.deck:
        if dc.suit == x.suit or dc.value == x.value:
            possiblecards.AddCard(x)
    if possiblecards.SizeOf() > 0:
        temp_card = possiblecards.RandomCard()
        computershand.Transfer(temp_card,discard)
        noplays = False
        print ("Computer played the " + temp_card.GetFullName() + "\n")
    elif maindeck.SizeOf() > 0:
        computershand.Draw(maindeck)
        noplays = False
        print ("Computer had no move and drew a card\n")
    else:
        print ("Computer couldn't play or draw\n")
    #end of computers turn

    #start of computers win check
    if computershand.SizeOf() == 0:
        print ("Computer wins, you lose. Sorry :(")
        gamedone = True
        continue
    #end of computers win check

    #start of noplay game end
    if noplays == True:
        print ("Game over, deck is empty!")
        gamedone = True
        continue
    #end of noplay game end





        









