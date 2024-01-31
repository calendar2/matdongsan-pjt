package com.ssafy.matdongsan.domain;

import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.food.model.FoodCategory;
import com.ssafy.matdongsan.domain.review.model.Review;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Restaurant extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "restaurant_id")
    private Integer id;

    @Column(name = "restaurant_name", nullable = false, length = 100)
    private String name;

    private Integer mapx;
    private Integer mapy;

    @Column(length = 100)
    private String address;

    @Column(length = 100)
    private String roadAddress;

    @Column(length = 16)
    private String phone;

    @OneToMany(mappedBy = "restaurant")
    private List<Review> reviews = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "region_id")
    private Region region;

    @ManyToMany
    private List<Account> accounts = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "restaurant_food_category",
            joinColumns = @JoinColumn(name = "restaurant_id"),
            inverseJoinColumns = @JoinColumn(name = "food_category_id")
    )
    List<FoodCategory> restaurantFoodCategories = new ArrayList<>();
}
