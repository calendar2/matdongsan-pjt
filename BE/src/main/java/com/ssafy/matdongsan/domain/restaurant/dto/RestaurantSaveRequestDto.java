package com.ssafy.matdongsan.domain.restaurant.dto;

import com.ssafy.matdongsan.domain.restaurant.model.Region;
import com.ssafy.matdongsan.domain.restaurant.model.Restaurant;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RestaurantSaveRequestDto {

    private String name;
    private Integer mapx;
    private Integer mapy;
    private String address;
    private String roadAddress;
    private String phone;

    @Builder
    public RestaurantSaveRequestDto(String name, Integer mapx, Integer mapy, String address, String roadAddress, String phone) {
        this.name = name;
        this.mapx = mapx;
        this.mapy = mapy;
        this.address = address;
        this.roadAddress = roadAddress;
        this.phone = phone;

    }

    public Restaurant toEntity(Region region) {
        return Restaurant.builder()
                .region(region)
                .name(name)
                .mapx(mapx)
                .mapy(mapy)
                .address(address)
                .roadAddress(roadAddress)
                .phone(phone)
                .build();
    }
}
