package com.ssafy.matdongsan.domain.account.model;

import com.ssafy.matdongsan.domain.*;
import com.ssafy.matdongsan.domain.account.dto.AccountModifyRequestDto;
import com.ssafy.matdongsan.domain.account.dto.AccountModifyStep1RequestDto;
import com.ssafy.matdongsan.domain.account.dto.AccountModifyStep2RequestDto;
import com.ssafy.matdongsan.domain.comparison.model.Comparison;
import com.ssafy.matdongsan.domain.food.model.Food;
import com.ssafy.matdongsan.domain.food.model.FoodCategory;
import com.ssafy.matdongsan.domain.notice.model.Notice;
import com.ssafy.matdongsan.domain.restaurant.model.Region;
import com.ssafy.matdongsan.domain.restaurant.model.Restaurant;
import com.ssafy.matdongsan.domain.review.model.Review;
import com.ssafy.matdongsan.domain.subcription.model.Subscription;
import jakarta.persistence.*;
import org.hibernate.annotations.DynamicUpdate;
import lombok.*;


import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Setter
@DynamicUpdate
public class Account extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "account_id")
    private Integer id;

    @Column(length = 64)
    private String password;

    @Column(length = 100)
    private String username;

    @Column(length = 100)
    private String nickname;

    @Column(length = 100)
    private String email;

    private short birthYear;
    private byte spicyLevel;
    private int follower = 0;
    private char gender;
    private boolean isPassed = false;

    @Lob
    private String picture;

    @OneToMany(mappedBy = "sender")
    private List<Notice> senders = new ArrayList<>();

    @OneToMany(mappedBy = "receiver")
    private List<Notice> receivers = new ArrayList<>();

    @OneToMany(mappedBy = "account")
    private List<Review> reviews = new ArrayList<>();

    @OneToMany(mappedBy = "account")
    private List<PersonTag> personTags = new ArrayList<>();

    @OneToMany(mappedBy = "subscriber")
    private List<Subscription> subscribing = new ArrayList<>();

    @OneToMany(mappedBy = "subscribed")
    private List<Subscription> subscribed = new ArrayList<>();

    @OneToMany(mappedBy = "comparer")
    private List<Comparison> comparing = new ArrayList<>();

    @OneToMany(mappedBy = "compared")
    private List<Comparison> compared = new ArrayList<>();

    @ManyToMany(mappedBy = "account")
    private List<Review> accountReviews = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "banned_food",
            joinColumns = @JoinColumn(name = "account_id"),
            inverseJoinColumns = @JoinColumn(name = "food_id")
    )
    private List<Food> bannedFoods = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "banned_food_category",
            joinColumns = @JoinColumn(name = "account_id"),
            inverseJoinColumns = @JoinColumn(name = "food_category_id")
    )
    private List<FoodCategory> bannedFoodCategories = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "interest_region",
            joinColumns = @JoinColumn(name = "account_id"),
            inverseJoinColumns = @JoinColumn(name = "region_id")
    )
    private List<Region> regions = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "my_restaurant",
            joinColumns = @JoinColumn(name = "account_id"),
            inverseJoinColumns = @JoinColumn(name = "restaurant_id")
    )
    private List<Restaurant> restaurants = new ArrayList<>();


    public void modify(AccountModifyRequestDto dto) {
        username = dto.getUsername();
        nickname = dto.getNickname();
        birthYear = dto.getBirthYear();
        spicyLevel = dto.getSpicyLevel();
    }

    public void modify(AccountModifyStep1RequestDto dto) {
        gender = dto.getGender();
        birthYear = dto.getBirthYear();
    }

    public void modify(AccountModifyStep2RequestDto dto) {
        spicyLevel = dto.getSpicyLevel();
        isPassed = true;
    }


    public void updateRestaurant(List<Restaurant> restaurants) {
        this.restaurants = restaurants;
    }

    public void increaseFollower() {
        follower++;
    }

    public void decreaseFollower() {
        follower--;
    }


}