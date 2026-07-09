package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Card;
import com.example.demo.service.PlayerService;


@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "*")
public class GameController {
    
    @Autowired
    private PlayerService playerService;


    // Endpoint to start a new game/deck
    @GetMapping("/draw")
    public List<Card> drawCard(char mode) {
        // Fetch current game state/deck from your service layer
        return playerService.starterHand(mode);

    }

      @GetMapping("/hit")
    public Card hit(char mode) {
        // Fetch current game state/deck from your service layer
         Card playerHand= playerService.hit(mode);
        return playerHand;

    }
 @GetMapping("/value")
    public int valueOfPlayerHand(char mode) {
        // Fetch current game state/deck from your service layer
        return playerService.calculateHandVal(mode);

    }

     @GetMapping("/stay")
    public String stay() {
        // Fetch current game state/deck from your service layer
      String message = "";
        
        int dealerValue =  playerService.calculateHandVal('D');
        if (dealerValue < 17) {
             playerService.calculateHandVal('D');
             message = playerService.checkScore('D');
        } else{
             playerService.calculateHandVal('D');
             message = playerService.checkScore('D');
        }

        return message;

    }

     @GetMapping("/reset")
    public void reset() {      
        
        playerService.clearHandVal();
        

      

    }

}