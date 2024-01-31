package com.ssafy.matdongsan.domain.restaurant.model;

import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.food.model.FoodCategory;
import com.ssafy.matdongsan.domain.restaurant.dto.RestaurantSaveRequestDto;
import com.ssafy.matdongsan.domain.restaurant.dto.RestaurantSaveResponseDto;
import com.ssafy.matdongsan.domain.review.model.Review;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="restaurant")
public class Restaurant {

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
