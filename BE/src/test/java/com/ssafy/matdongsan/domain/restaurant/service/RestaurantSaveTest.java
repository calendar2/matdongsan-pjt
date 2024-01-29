package com.ssafy.matdongsan.domain.restaurant.service;

import com.ssafy.matdongsan.domain.restaurant.dto.RestaurantSaveRequestDto;
import com.ssafy.matdongsan.domain.restaurant.repository.RegionRepository;
import com.ssafy.matdongsan.domain.restaurant.repository.RestaurantRepository;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;


@SpringBootTest
class RestaurantSaveTest {
    @Autowired
    RegionRepository regionRepository;
    @Autowired
    RestaurantRepository restaurantRepository;
    @Autowired
    RestaurantService restaurantService;
    @Autowired
    EntityManager em;



//      this.restaurantName = restaurantName;
//        this.mapx = mapx;
//        this.mapy = mapy;
//        this.address = address;
//        this.roadAddress = roadAddress;
//        this.phone = phone;

    @Test
    @Transactional
    @Rollback(value = false)
    public void saveRestaurant() throws Exception{
        RestaurantSaveRequestDto requestDto = RestaurantSaveRequestDto.builder()
                .restaurantName("강릉짬뽕순두부 동화가든 본점")
                .mapx(1289146373)
                .mapy(377911797)
                .address("강원특별자치도 평창군 대관령면 횡계리 377-12")
                .roadAddress("강원특별자치도 평창군 대관령면 경강로 5195-25")
                .phone("")
                .build();

        restaurantService.save(requestDto);




    }


}