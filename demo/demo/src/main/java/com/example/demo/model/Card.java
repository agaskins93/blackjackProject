package com.example.demo.model;

import  com.example.demo.enums.Rank;
import  com.example.demo.enums.Suit;


public record Card(Suit suit, Rank rank) {}