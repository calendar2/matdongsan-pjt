package com.ssafy.matdongsan.domain.food.dto;

import com.ssafy.matdongsan.domain.food.model.Food;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class FoodRequest {

    private String name;
    private String image;

    public Food toEntity() {
        return Food.builder()
                .name(name)
                .image(image)
                .build();
    }
}
