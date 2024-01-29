package com.ssafy.matdongsan.domain.restaurant.dto;

import com.ssafy.matdongsan.domain.restaurant.model.Region;
import com.ssafy.matdongsan.domain.restaurant.model.Restaurant;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RestaurantSaveRequestDto {
    private String restaurantName;
    private Integer mapx;
    private Integer mapy;
    private String address;
    private String roadAddress;
    private String phone;

    @Builder
    public RestaurantSaveRequestDto(String restaurantName, Integer mapx, Integer mapy, String address, String roadAddress, String phone) {
        this.restaurantName = restaurantName;
        this.mapx = mapx;
        this.mapy = mapy;
        this.address = address;
        this.roadAddress = roadAddress;
        this.phone = phone;

    }

    public Restaurant toEntity(Region region){
        return Restaurant.builder()
                .region(region)
                .restaurantName(restaurantName)
                .mapx(mapx)
                .mapy(mapy)
                .address(address)
                .roadAddress(roadAddress)
                .phone(phone)
                .build();
    }
}
