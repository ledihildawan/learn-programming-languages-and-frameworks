package com.ledihildawan;

import java.math.BigInteger;
import java.text.NumberFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        // int age = 27;
        long viewCount = 3_123_456_789L;
        float price = 10.99F;
        char letter = 'A';
        boolean isEligible = false;
        final float PI = 3.14F;

        Date now = new Date();
        int[] numbers = { 2, 3, 5, 1, 4 };
        int[][] multiNumber = { { 1, 2, 3 }, { 4, 5, 6 } };

        Arrays.sort(numbers);

        System.out.println(Arrays.toString(numbers));
        System.out.println(Arrays.deepToString(multiNumber));
        System.out.println(now);

        String message = "Hello World" + "!!";

        System.out.println(message.startsWith("!!"));
        System.out.println(message.toLowerCase());
        System.out.println(message.toUpperCase());
        System.out.println(message.trim());
        System.out.println(message.length());
        System.out.println(message.indexOf("H"));
        System.out.println(message.replace("!", "*"));

        double result = 10 / 3;

        result++;

        System.out.println(result);
        System.out.println(Math.max(1, 2));
        System.out.println(Math.min(1, 2));
        System.out.println(Math.ceil(1.1F));
        System.out.println(Math.round(1.1F));

        NumberFormat currency = NumberFormat.getCurrencyInstance();

        System.out.println(currency.format(1234567.891));

        Scanner scanner = new Scanner(System.in);

        // System.out.println("Age : ");
        // byte age = scanner.nextByte();
        // System.out.println("Your are " + age);

        System.out.println("Name: ");
        String name = scanner.nextLine().trim();
        System.out.println("You are " + name);

        for (int i = 0; i < 5; i++) {
            System.out.println("Hello World" + " " + i);
        }
    }
}
