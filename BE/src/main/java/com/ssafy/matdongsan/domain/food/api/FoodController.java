package com.ssafy.matdongsan.domain.food.api;

import com.ssafy.matdongsan.domain.food.dto.FoodRequest;
import com.ssafy.matdongsan.domain.food.dto.FoodResponse;
import com.ssafy.matdongsan.domain.food.service.FoodService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/food")
@RequiredArgsConstructor
@Tag(name = "food", description = "food API")
public class FoodController {

    private final FoodService foodService;

    @Operation(summary = "get a food by id", tags = { "food" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = FoodResponse.class))
            })
    })
    @GetMapping("/{foodId}")
    public ResponseEntity<?> getFoodById(@PathVariable Integer foodId) {
        FoodResponse response = foodService.getFood(foodId);
        if (response == null)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "get a food by name", tags = { "food" })
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "successful operation", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = FoodResponse.class))
            })
    })
    @GetMapping
    public ResponseEntity<?> getFoodByName(@RequestParam String name) {
        FoodResponse response = foodService.getFood(name);
        if (response == null)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok().body(response);
    }

    @PostMapping
    public ResponseEntity<?> registerFood(@RequestBody FoodRequest request) {
        FoodResponse response = foodService.saveFood(request);
        if (response == null)
            return ResponseEntity.badRequest().build();
        return ResponseEntity.ok().body(response);
    }
}
