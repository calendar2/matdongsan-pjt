package com.ssafy.matdongsan.domain.food.repository;

import com.ssafy.matdongsan.domain.food.model.FoodCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FoodCategoryRepository extends JpaRepository<FoodCategory,Integer> {
    Optional<FoodCategory> findByName(String categoryData);
}
