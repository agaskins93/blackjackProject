package com.example.demo.enums;


public enum Rank {
    TWO(2),
    THREE(3),
    FOUR(4),
    FIVE(5),
    SIX(6),
    SEVEN(7),
    EIGHT(8),
    NINE(9),
    TEN(10),
    JACK(10),
    QUEEN(10),
    KING(10),
    ACE(11); 

    private final int value;

    Rank(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }

      /**
         * Converts a string to an EmailType enum constant.
         * Case-insensitive, trims whitespace.
         * @throws IllegalArgumentException if no match is found
         */
        public static int fromString(String value) {
            if (value == null) {
                throw new IllegalArgumentException("Email type cannot be null");
            }
            String normalized = value.trim();
            for (Rank type : Rank.values()) {
                if (type.name().equalsIgnoreCase(normalized)) {
                    return type.getValue();
                }
            }
            throw new IllegalArgumentException("Unknown email type: " + value);
        }
    
    }