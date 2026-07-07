package com.example.demo.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import  com.example.demo.enums.Rank;
import  com.example.demo.enums.Suit;


public class Deck {
    private final List<Card> cards;

    public Deck() {
        this.cards = new ArrayList<>();
        for (Suit suit : Suit.values()) {
            for (Rank rank : Rank.values()) {
                cards.add(new Card(suit, rank));
            }
        }
        shuffle();
    }

    public void shuffle() {
        Collections.shuffle(cards);
    }

    public Card drawCard() {
        if (cards.isEmpty()) {
            throw new IllegalStateException("Deck is empty");
        }
        return cards.remove(0); // Takes from the top of the deck
    }
}