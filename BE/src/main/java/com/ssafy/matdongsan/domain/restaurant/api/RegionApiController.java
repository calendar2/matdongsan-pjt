package com.ssafy.matdongsan.domain.restaurant.api;

import com.ssafy.matdongsan.domain.restaurant.model.Region;
import com.ssafy.matdongsan.domain.restaurant.service.RegionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RegionApiController {
    private final RegionService regionService;
    @GetMapping("/region")
    public ResponseEntity<?> getRegions(){
        List<Region> regions = regionService.getAllRegion();
        return ResponseEntity.ok().body(regions);
    }
}
