package com.ssafy.matdongsan.domain.food.model;

import com.ssafy.matdongsan.domain.Restaurant;
import com.ssafy.matdongsan.domain.account.model.Account;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class FoodCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "food_category_id")
    private Integer id;

    @Column(name = "food_category_name", length = 100)
    private String name;

    @ManyToMany(mappedBy = "bannedFoodCategories")
    private List<Account> accounts = new ArrayList<>();

    @ManyToMany(mappedBy = "foodCategories")
    private List<Food> foods = new ArrayList<>();

    @ManyToMany(mappedBy = "restaurantFoodCategories")
    private List<Restaurant> restaurants = new ArrayList<>();
}
