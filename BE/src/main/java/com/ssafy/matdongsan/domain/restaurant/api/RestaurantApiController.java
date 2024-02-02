package com.ssafy.matdongsan.domain.restaurant.api;


import com.ssafy.matdongsan.domain.restaurant.dto.RestaurantSaveRequestDto;
import com.ssafy.matdongsan.domain.restaurant.dto.RestaurantFindAllResponseDto;
import com.ssafy.matdongsan.domain.restaurant.service.RestaurantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class RestaurantApiController {
    private final RestaurantService restaurantService;

    @PostMapping("/restaurant")
    public ResponseEntity<?> createRestaurant(@RequestBody @Valid RestaurantSaveRequestDto requestDto){
        restaurantService.save(requestDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/restaurant")
    public ResponseEntity<?> readAllReviews(){
        List<RestaurantFindAllResponseDto> responseDtos =  restaurantService.findAll();
        return  ResponseEntity.ok().body(responseDtos);

    }


}
