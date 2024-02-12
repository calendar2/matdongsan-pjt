package com.ssafy.matdongsan.domain.food.service;

import com.ssafy.matdongsan.domain.food.dto.FoodRequest;
import com.ssafy.matdongsan.domain.food.dto.FoodResponse;
import com.ssafy.matdongsan.domain.food.model.Food;
import com.ssafy.matdongsan.domain.food.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FoodService {

    private final FoodRepository foodRepository;

    public FoodResponse getFood(Integer foodId) {
        Food food = foodRepository.findById(foodId).orElseThrow();
        return FoodResponse.from(food);
    }

    public FoodResponse getFood(String foodName) {
        Food food = foodRepository.findByName(foodName);
        return FoodResponse.from(food);
    }

    public FoodResponse saveFood(FoodRequest request) {
        Food food = foodRepository.save(request.toEntity());
        return FoodResponse.from(food);
    }
}
