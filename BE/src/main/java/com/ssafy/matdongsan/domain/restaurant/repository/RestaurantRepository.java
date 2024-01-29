package com.ssafy.matdongsan.domain.restaurant.repository;

import com.ssafy.matdongsan.domain.restaurant.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface RestaurantRepository extends JpaRepository<Restaurant, Integer> {
    Optional<List<Restaurant>> findByRestaurantName(String restaurantName);


}
