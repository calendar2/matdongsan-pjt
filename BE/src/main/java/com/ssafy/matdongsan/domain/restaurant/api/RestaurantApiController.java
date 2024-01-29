package com.ssafy.matdongsan.domain.restaurant.api;


import com.ssafy.matdongsan.domain.restaurant.dto.RestaurantSaveRequestDto;
import com.ssafy.matdongsan.domain.restaurant.dto.RestaurantSaveResponseDto;
import com.ssafy.matdongsan.domain.restaurant.model.Region;
import com.ssafy.matdongsan.domain.restaurant.model.Restaurant;
import com.ssafy.matdongsan.domain.restaurant.service.RegionService;
import com.ssafy.matdongsan.domain.restaurant.service.RestaurantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class RestaurantApiController {
    private final RestaurantService restaurantService;

    @PostMapping("/restaurant")
    public ResponseEntity<?> saveRestaurant(@RequestBody @Valid RestaurantSaveRequestDto requestDto){
        restaurantService.save(requestDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }


}
