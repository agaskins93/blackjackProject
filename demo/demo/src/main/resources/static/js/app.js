let finalcount = 0;
let starterLeft = 1050;
let newLeft = 0;
function updateCard() {
    const rank = document.getElementById('rank').value;
    const suit = document.getElementById('suit').value;
    const isRed = (suit === '♥' || suit === '♦');

    document.getElementById('top').innerHTML = `${rank}<br>${suit}`;
    document.getElementById('middle').textContent = suit;
    document.getElementById('bottom').innerHTML = `${rank}<br>${suit}`;

    document.querySelectorAll('.corner, .suit').forEach(el => {
        el.classList.toggle('red', isRed);
    });
}

function moveCard() {
    const x = parseInt(document.getElementById('posX').value, 10);
    const y = parseInt(document.getElementById('posY').value, 10);

    if (isNaN(x) || isNaN(y)) {
        alert("Please enter valid numbers for X and Y.");
        return;
    }

    const card = document.getElementById('card');
    card.style.left = x + "px";
    card.style.top = y + "px";
}


let BASE_URL = "";
async function starterDeck(mode) {
  if(mode == 'P') {
        BASE_URL = 'http://localhost:8080/api/game/draw?mode=P';

  } else {
         BASE_URL = 'http://localhost:8080/api/game/draw?mode=D';
  }

  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const items = await response.json();
    const data = JSON.parse(JSON.stringify(items));

 if (Array.isArray(data)) {
        for (const item of data) {
            // Safe access with optional chaining for nested props 
            console.log("ID:", item.suit, "Name:", item.rank);
            console.log(rankConverter(item.rank));
             console.log(suitConverter(item.suit));
            createCardhtml(abbrvConverter(item.rank),suitConverter(item.suit));
        }
    } else {
        console.error("Parsed value is not an array.");
    }
} catch (err) {
    console.error("Invalid JSON:", err); // JSON.parse throws on malformed JSON 
}
}


function rankConverter(apiRank) {
 switch (apiRank) {
            case "ONE": return 1;
            case "TWO": return 2;
            case "THREE": return 3;
            case "FOUR": return 4;
            case "FIVE": return 5;
            case "SIX": return 6;
            case "SEVEN": return 7;
            case "EIGHT": return 8;
            case "NINE": return 9;
            case "TEN": return 10;
            case "JACK": return 10;
            case "QUEEN": return 10;
            case "KING": return 10;
            case "ACE": return 11;
            default:
                return null;
}

}

function abbrvConverter(apiRankcode) {
 switch (apiRankcode) {
            case "ONE": return "1";
            case "TWO": return "2";
            case "THREE": return "3";
            case "FOUR": return "4";
            case "FIVE": return "5";
            case "SIX": return "6";
            case "SEVEN": return "7";
            case "EIGHT": return "8";
            case "NINE": return "9";
            case "TEN": return "10";
            case "JACK": return "J";
            case "QUEEN": return "Q";
            case "KING": return "K";
            case "ACE": return "A";
            default:
                return null;
}

}
   
function suitConverter(apiSuit) {
    
 switch (apiSuit) {
            case "HEARTS": return "♥";
            case "DIAMONDS": return "♦";
            case "CLUBS": return "♣";
            case "SPADES": return "♠";
           
            default:
                return null;
}
}
        let count = 0;

function storeLatestCount(){
return count;
}
       
function createCardhtml(abbrvRank, suit) {
 console.log("Createcard" + abbrvRank, suit );
    count++;
 const parent = document.getElementById("container");

       try {
            const outterbox = document.createElement("div");
            outterbox.id = "card"+count;
             outterbox.className = "card"+count;
            console.log("card"+count);
            finalcount = count;
            
            
              
            

        for (let i = 1; i <= 3; i++) {
            var idtag = count +1
            const box = document.createElement("div");
            
             if (i == 1) {
            box.id = "top";
            box.className = "corner" ;
            box.appendChild(document.createTextNode(abbrvRank));
            box.appendChild(document.createElement("br"));
            box.appendChild(document.createTextNode(suit));
            } else if (i == 2) {
            box.id = "middle";
            box.className = "suit" ; 
            box.appendChild(document.createTextNode(suit)); 
            } else if (i == 3) {
            box.id = "bottom";
            box.className = "corner bottom";
            box.appendChild(document.createTextNode(abbrvRank));
            box.appendChild(document.createElement("br"));
            box.appendChild(document.createTextNode(suit));   
            }
                        outterbox.appendChild(box);
                        
          }
        parent.appendChild(outterbox);
        // Append full group to container
    } catch (err) {
        console.error("Error creating group:", err);
    }
    
}

function createCardhtmlforDealer(abbrvRank, suit) {
 console.log("CreatecardNOW" + abbrvRank, suit );
 const parent = document.getElementById("container");

       try {
            const outterbox = document.createElement("div");
            outterbox.id = "dealerExtraCard";
             outterbox.className = "dealerExtraCard";
            
            
              
            

        for (let i = 1; i <= 3; i++) {
            const box = document.createElement("div");
            
             if (i == 1) {
            box.id = "top";
            box.className = "corner" ;
            box.appendChild(document.createTextNode(abbrvRank));
            box.appendChild(document.createElement("br"));
            box.appendChild(document.createTextNode(suit));
            } else if (i == 2) {
            box.id = "middle";
            box.className = "suit" ; 
            box.appendChild(document.createTextNode(suit)); 
            } else if (i == 3) {
            box.id = "bottom";
            box.className = "corner bottom";
            box.appendChild(document.createTextNode(abbrvRank));
            box.appendChild(document.createElement("br"));
            box.appendChild(document.createTextNode(suit));   
            }
                        outterbox.appendChild(box);
                        
          }
        parent.appendChild(outterbox);
        // Append full group to container
    } catch (err) {
        console.error("Error creating group:", err);
    }
    
    
}
var hitcount = count + 1;
let hitrank = "";
let hitsuit = "";
BASE_URL2 = "";
async function hit(mode) {
    console.log("IN HIT");

    if(mode == 'P') {
        BASE_URL2 = 'http://localhost:8080/api/game/hit?mode=P';

  } else {
         BASE_URL2 = 'http://localhost:8080/api/game/hit?mode=D';
  }

  try {
    const response = await fetch(BASE_URL2);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const items = await response.json();
    const data = JSON.parse(JSON.stringify(items));
    hitrank =  data.rank;
    hitsuit =  data.suit;

        
    
} catch (err) {
    console.error("Invalid JSON:", err); // JSON.parse throws on malformed JSON 
}
    console.log("finalcount" + finalcount)

const mySheet = Array.from(document.styleSheets).find(sheet => {
    return sheet.href && sheet.href.includes('/css/style.css');
  });
  
  // 2. If found, inject your new CSS rule at the very end
  if (mySheet) {

    try {
        newLeft = starterLeft + 50;
         starterLeft = newLeft ;
        console.log("hit" + starterLeft);
     const newRule = `.card${finalcount + 1} { 
  width: 150px !important; 
  height: 220px !important; 
  border: 2px solid #000; 
  border-radius: 10px; 
  background: white; 
  color: black; 
  display: flex; 
  flex-direction: column; 
  justify-content: space-between; 
  padding: 10px; 
  box-shadow: 0 4px 8px rgba(0,0,0,0.3); 
  position: absolute !important; 
  top: 150px !important; 
  left: ${newLeft}px !important; 
}`;

      // Inserting at mySheet.cssRules.length ensures it has the highest priority
      mySheet.insertRule(newRule, mySheet.cssRules.length);
       const styleTag = document.createElement('style');
  
  // 2. Build the exact text, fixing the !important placement
  styleTag.textContent = `
    .card${finalcount + 1} { 
      width: 150px !important; 
      height: 220px !important; 
      border: 2px solid #000; 
      border-radius: 10px; 
      background: white; 
      color: black; 
      display: flex; 
      flex-direction: column; 
      justify-content: space-between; 
      padding: 10px; 
      box-shadow: 0 4px 8px rgba(0,0,0,0.3); 
      position: absolute !important; 
      top: 150px !important; 
      left: ${newLeft}px !important; 
    }
  `;
  
  // 3. Append it to the head so it is visible in the HTML elements tree
  document.head.appendChild(styleTag);

  
   if (mode == 'D'){
                console.log("made it");
             createCardhtmlforDealer(abbrvConverter(hitrank),suitConverter(hitsuit));

            } else {
                createCardhtml(abbrvConverter(hitrank),suitConverter(hitsuit));
            }

  
      console.log("Successfully injected the new CSS rule!");
    } catch (error) {
      console.error("Failed to insert rule:", error);
    }
  } else {
    console.error("Could not find /css/style.css in document.styleSheets");
  }
}
            

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

async function start(){
    starterDeck('D');
    await sleep(3000);
    starterDeck('P');
}

let BASE_URL4 = ""
async function reset () { 
 BASE_URL4  = 'http://localhost:8080/api/game/reset';

 try {
    const response = await fetch(BASE_URL4);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
console.log("clear: " + response);
const cards = document.getElementById('container');
while (cards.firstChild) {
  cards.removeChild(cards.firstChild);
  count = 0;
  finalcount = 0;
}

        
    
} catch (err) {
    console.error("Invalid JSON:", err); // JSON.parse throws on malformed JSON 
}
}

let extraDealerCardValue = 0;
let BASE_URL5 = ""
async function handValue (mode) { 
  if(mode == 'P') {
        BASE_URL5 = 'http://localhost:8080/api/game/value?mode=P';

  } else {
         BASE_URL5 = 'http://localhost:8080/api/game/value?mode=D';
  }   
let handval = 0;
 try {
    const response = await fetch(BASE_URL5);
    const data = await response.json();
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
console.log("value of hand " + JSON.stringify(data));
 extraDealerCardValue = JSON.stringify(data);
 
return data;
        
    
} catch (err) {
    console.error("Invalid JSON:", err); // JSON.parse throws on malformed JSON 
}
}

let BASE_URL3 = ""
console.log("Extra2:" +extraDealerCardValue)
async function stayNow () {
    extraDealerCardValue = await handValue('D');
    let dealerHandVal = extraDealerCardValue;
    console.log("VAl" + extraDealerCardValue);
    if (dealerHandVal < 17){
        hit('D');
    }

    
        BASE_URL3 = 'http://localhost:8080/api/game/stay?mode=D';

    

  
    const response = await fetch(BASE_URL3);
    const data = await response.text();
    alert(data);

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
        
    




    }

