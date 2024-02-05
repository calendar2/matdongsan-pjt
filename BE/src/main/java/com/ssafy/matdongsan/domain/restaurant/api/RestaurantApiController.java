package com.ssafy.matdongsan.domain.restaurant.api;


import com.ssafy.matdongsan.domain.restaurant.dto.RestaurantFindAllAccountResponseDto;
import com.ssafy.matdongsan.domain.restaurant.dto.RestaurantFindOneResponseDto;
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

    @PostMapping("/restaurant/common")
    public ResponseEntity<?> createCommonRestaurant(@RequestBody @Valid RestaurantSaveRequestDto requestDto){
        restaurantService.save(requestDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/restaurant/common")
    public ResponseEntity<?> readAllCommonRestaurants(){
        List<RestaurantFindAllResponseDto> responseDtos =  restaurantService.findAll();
        return  ResponseEntity.ok().body(responseDtos);
    }

    @GetMapping("/restaurant/common/{restaurantId}")
    public ResponseEntity<?> readOneCommonRestaurant(
            @PathVariable("restaurantId") Integer restaurantId
    ){
        RestaurantFindOneResponseDto responseDto =  restaurantService.findById(restaurantId);
        return  ResponseEntity.ok().body(responseDto);
    }

    @PostMapping("/restaurant/{accountId}")
    public ResponseEntity<?> createAccountRestaurant(
            @PathVariable("accountId") Integer accountId,
            @RequestParam(value = "restaurantId") Integer restaurantId ){
        restaurantService.accountSave(accountId,restaurantId);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/restaurant/{accountId}")
    public ResponseEntity<?> readAllAccountRestaurants(
            @PathVariable("accountId") Integer accountId){
        List<RestaurantFindAllAccountResponseDto> responseDtos =  restaurantService.findAllAccountRestaurants(accountId);
        return  ResponseEntity.ok().body(responseDtos);
    }

    @DeleteMapping("/restaurant/{accountId}/{restaurantId}")
    public ResponseEntity<?> deleteOneAccountRestaurant(
            @PathVariable("accountId") Integer accountId,
            @PathVariable("restaurantId") Integer restaurantId){
        restaurantService.delete(accountId,restaurantId);
        return  ResponseEntity.ok(HttpStatus.OK);
    }
}
