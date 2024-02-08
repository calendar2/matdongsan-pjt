package com.ssafy.matdongsan.domain.restaurant.dto;

import jakarta.persistence.Column;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class RegionFindAllDto {
    private Short id;
    private String code;
    private String city;
    private String county;
    private String district;
    private Integer mapx;
    private Integer mapy;

    public RegionFindAllDto(Short id, String code, String city, String county, String district, Integer mapx, Integer mapy) {
        this.id = id;
        this.code = code;
        this.city = city;
        this.county = county;
        this.district = district;
        this.mapx = mapx;
        this.mapy = mapy;
    }
}