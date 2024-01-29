package com.ssafy.matdongsan.domain.restaurant.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class RegionRepositoryTest {

    @Autowired
    RegionRepository regionRepository;
    @Test
    @Transactional
    void findIdByCode() {
         System.out.println(regionRepository.findIdByCode("11110515"));
    }

}