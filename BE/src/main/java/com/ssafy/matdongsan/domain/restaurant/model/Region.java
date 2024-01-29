package com.ssafy.matdongsan.domain.restaurant.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "region")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Region {
    @Id @GeneratedValue
    @Column(name = "region_id")
    private Short id;

    @NotEmpty
    @Column(length = 8)
    private String code;

    @NotEmpty
    @Column(length = 50)
    private String city;

    @Column(length = 50)
    private String county;

    @Column(length = 50)
    private String district;

    private Integer mapx;
    private Integer mapy;

//    @JsonIgnore
//    @OneToMany(mappedBy = "region")
//    private List<Restaurant> restaurantList = new ArrayList<>();

    @Builder
    public Region(String code, String city, String county, String district, Integer mapx, Integer mapy) {
        this.code = code;
        this.city = city;
        this.county = county;
        this.district = district;
        this.mapx = mapx;
        this.mapy = mapy;
    }

    @Builder
    public Region(String code, String city, String county, String district) {
        this.code = code;
        this.city = city;
        this.county = county;
        this.district = district;
    }
}
