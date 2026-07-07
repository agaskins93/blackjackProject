package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.Card;

@Service 
public interface PlayerService {
   // Product createProduct(Product product);
   // Product getProductById(Long id);
    List<Card> starterHand(char mode);
    List<Card> hit( char mode);
    int calculateHandVal(char mode);
    void clearHandVal(char mode);
    String checkScore(char mode);
    //void deleteProduct(Long id);
}