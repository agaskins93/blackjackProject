package com.example.demo.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example.demo.enums.Rank;
import com.example.demo.model.Card;
import com.example.demo.model.Deck;
import com.example.demo.service.PlayerService;

@Service // Marks this as a Spring-managed service bean
public class PlayerServiceImpl implements PlayerService {

    private static final Logger logger = LoggerFactory.getLogger(PlayerServiceImpl.class);

    

     List<Card>playerMaintainedHand = new ArrayList<>();
     List<Card>dealerMaintainedHand = new ArrayList<>();
     int overallPlayerPoints = 0; 
     int overallDealerPoints = 0;


    @Override
    public List<Card> starterHand(char mode) {
      if (mode ==  'P') {

            Deck deck = new Deck(); 
            List<Card> playerHand = new ArrayList<>();
            playerHand.add(deck.drawCard());
            playerHand.add(deck.drawCard());
            playerMaintainedHand.addAll(playerHand);

            return playerHand;
    } else {
            Deck deck = new Deck(); 
            List<Card> dealerHand = new ArrayList<>();
            dealerHand.add(deck.drawCard());
            dealerHand.add(deck.drawCard());
            dealerMaintainedHand.addAll(dealerHand);
            return dealerHand;
    }
    }

    @Override 
    public Card hit(char mode) {
        if (mode ==  'P') {
            Deck deck = new Deck(); 
            playerMaintainedHand.add(deck.drawCard());
            return deck.drawCard();
        } else {
            Deck deck = new Deck(); 
            dealerMaintainedHand.add(deck.drawCard());
            return deck.drawCard();
        }
    }

    @Override
    public int calculateHandVal(char mode) {
        int pointValue = 0;
        
    if (mode ==  'P') {
        int playerPointValue = 0;
        for (Card card : playerMaintainedHand) {
              playerPointValue += Rank.fromString(card.rank().toString());
        }
          overallPlayerPoints = playerPointValue;      
          pointValue = playerPointValue;


    } else {
        int dealerPointValue = 0;
         for (Card card : dealerMaintainedHand) {
              dealerPointValue += Rank.fromString(card.rank().toString());
       }
       overallDealerPoints = dealerPointValue;
       pointValue = dealerPointValue;
         
    }
         return pointValue;

    }
    @Override
    public void clearHandVal() {

            
                playerMaintainedHand.clear();
                overallPlayerPoints = 0;
                dealerMaintainedHand.clear();
                overallDealerPoints = 0;

            }
    

    @Override
    public String checkScore(char mode) {
      String message =  "";
         if (mode ==  'P') {     
                if (overallPlayerPoints > 21) {
                    message = "Player has lost, point value over 21";
                } else if (overallPlayerPoints == 21){
                    message = "Player has won!!! BLACK JACK!!!";
                } else {
                    int winningScore = closestTo21(overallDealerPoints, overallPlayerPoints);
                         if (winningScore == overallPlayerPoints) {
                            message = "Player has won";
                         }
                          if (winningScore == overallDealerPoints) {
                            message = "Dealer has won";
                         }
                }

            } else {
                if (overallDealerPoints > 21) {
                message = "Dealer has lost, point value over 21";
            }   else if (overallPlayerPoints == 21){
                    message = "Player has won!!! BLACK JACK!!!";
                    } else {
                    int winningScore = closestTo21(overallDealerPoints, overallPlayerPoints);
                         if (winningScore == overallPlayerPoints) {
                            message = "Player has won";
                         }
                          if (winningScore == overallDealerPoints) {
                            message = "Dealer has won";
                         }
                }

    }
    return message;
    }

     public static int closestTo21(int a, int b) {
        final int TARGET = 21;

        // Filter out numbers greater than 4
        boolean aValid = a <= TARGET;
        boolean bValid = b <= TARGET;

        if (!aValid && !bValid) {
            throw new IllegalArgumentException("Both numbers are greater than 4. No valid choice.");
        }
        if (!aValid) return b;
        if (!bValid) return a;

        // Both are <= 4, compare distances to 4
        int diffA = Math.abs(a - TARGET);
        int diffB = Math.abs(b - TARGET);

        if (diffA < diffB) return a;
        if (diffB < diffA) return b;

        // Equal distance — choose the smaller one
        return Math.min(a, b);
    }


     
    
    
                
                


            
    
}