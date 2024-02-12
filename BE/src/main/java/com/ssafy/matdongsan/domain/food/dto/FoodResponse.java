package com.ssafy.matdongsan.domain.food.dto;

import com.ssafy.matdongsan.domain.food.model.Food;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class FoodResponse {

    private Integer id;
    private String name;
    private String image;

    public static FoodResponse from(Food food) {
        return FoodResponse.builder()
                .id(food.getId())
                .name(food.getName())
                .image(food.getImage())
                .build();
    }
}
