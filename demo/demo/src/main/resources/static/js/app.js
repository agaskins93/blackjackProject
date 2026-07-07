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


const BASE_URL = 'http://localhost:8080/api/game/draw?mode=D';

async function getAllItems() {
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

        }
    } else {
        console.error("Parsed value is not an array.");
    }
} catch (err) {
    console.error("Invalid JSON:", err); // JSON.parse throws on malformed JSON 
}
}


async function rankConverter(apiRank) {
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
            case "ACE": return 10;
            default:
                return null;
}

}
   

async function suitConverter(apiSuit) {
    
 switch (apiSuit) {
            case "HEARTS": return "♥";
            case "DIAMONDS": return "♦";
            case "CLUBS": return "♣";
            case "SPADES": return "♠";
           
            default:
                return null;
}
}
        count = 0;

function createCardhtml() {

    count++;
 const parent = document.getElementById("container");

       try {
            const outterbox = document.createElement("div");
            outterbox.id = "card"+count;
             outterbox.className = "card"+count;
            console.log("card"+count)
        // Create 4 different divs per group


        for (let i = 1; i <= 3; i++) {
            var idtag = count +1
            const box = document.createElement("div");
            
            // Assign unique ID using timestamp + index (prevents duplicates)
             if (i == 1) {
            box.id = "top";
            box.className = "corner" ;
            box.appendChild(document.createTextNode("A"));
            box.appendChild(document.createElement("br"));
            box.appendChild(document.createTextNode("♠"));
            } else if (i == 2) {
            box.id = "middle";
            box.className = "suit" ; 
            box.appendChild(document.createTextNode("♠")); 
            } else if (i == 3) {
            box.id = "bottom";
            box.className = "corner bottom";
            box.appendChild(document.createTextNode("A"));
            box.appendChild(document.createElement("br"));
            box.appendChild(document.createTextNode("♠"));   
            }
                        outterbox.appendChild(box);
                        
          }
        parent.appendChild(outterbox);
        // Append full group to container
    } catch (err) {
        console.error("Error creating group:", err);
    }
    
}
