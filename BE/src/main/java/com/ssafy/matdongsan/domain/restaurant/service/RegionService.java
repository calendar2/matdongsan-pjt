package com.ssafy.matdongsan.domain.restaurant.service;

import com.ssafy.matdongsan.domain.restaurant.dto.RegionFindAllDto;
import com.ssafy.matdongsan.domain.restaurant.model.Region;
import com.ssafy.matdongsan.domain.restaurant.repository.RegionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RegionService {
    private final RegionRepository regionRepository;


    public List<RegionFindAllDto> getAllRegion(){
        List<Region> regions = regionRepository.findAll();
        log.info("#### {}", regions.size());
        return regions.stream().map(
                region -> new RegionFindAllDto(
                        region.getId(),
                        region.getCode(),
                        region.getCity(),
                        region.getCounty(),
                        region.getDistrict(),
                        region.getMapx(),
                        region.getMapy()
                )
        ).toList();
    }
}
