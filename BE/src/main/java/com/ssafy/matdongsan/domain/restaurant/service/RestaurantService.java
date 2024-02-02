package com.ssafy.matdongsan.domain.restaurant.service;

import com.ssafy.matdongsan.domain.restaurant.dto.RestaurantFindAllResponseDto;
import com.ssafy.matdongsan.domain.restaurant.dto.RestaurantSaveRequestDto;
import com.ssafy.matdongsan.domain.restaurant.model.Region;
import com.ssafy.matdongsan.domain.restaurant.model.Restaurant;
import com.ssafy.matdongsan.domain.restaurant.repository.RegionRepository;
import com.ssafy.matdongsan.domain.restaurant.repository.RestaurantRepository;

import com.ssafy.matdongsan.domain.review.dto.ReviewFindAllResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor //@Autowired 사용 지양됨 -> @RequiredArgsConstructor 로 생성되는 생성자로 주입받기 위해 final 붙임.
@Transactional(readOnly = true)
public class RestaurantService {
    private final RestaurantRepository restaurantRepository;
    private final RegionRepository regionRepository;

    @Transactional
    public void save(RestaurantSaveRequestDto requestDto) {

        Optional<Restaurant> restaurants =  restaurantRepository.findByName(requestDto.getName());
        //음식점이 이미 등록 되어 있는 경우
        if(restaurants.isPresent()) return;

        //좌표 Int -> 소수로 변환
        String coords = String.format("%.7f",requestDto.getMapx() * 0.0000001) +","+  String.format("%.7f",requestDto.getMapy() * 0.0000001);

        URI uri = UriComponentsBuilder
                .fromUriString("https://naveropenapi.apigw.ntruss.com")
                .path("/map-reversegeocode/v2/gc")
                .queryParam("coords",coords )
                .queryParam("orders","legalcode")
                .queryParam("output","json")
                .encode(StandardCharsets.UTF_8)
                .build()
                .toUri();

        //WebClient  요청
        WebClient webClient = WebClient.builder()
                .baseUrl("https://naveropenapi.apigw.ntruss.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .defaultHeader("X-NCP-APIGW-API-KEY-ID","ntent8uz74")
                .defaultHeader("X-NCP-APIGW-API-KEY","k0eFc4F5w8d22LVGUQTVlBtsQfR6TiA5nWXfpZ4p")
                .build();


        ResponseEntity<String> responseEntity = webClient.get()
                .uri(uri)
                .retrieve()
                .toEntity(String.class)
                .block();

        System.out.println(responseEntity.getBody());
//        {"status":{"code":0,"name":"ok","message":"done"},
//         "results":[{"name":"legalcode","code":{"id":"5115011200","type":"L","mappingId":"01150112"},"region":{"area0":{"name":"kr","coords":{"center":{"crs":"","x":0.0,"y":0.0}}},"area1":{"name":"강원특별자치도","coords":{"center":{"crs":"EPSG:4326","x":128.311526,"y":37.860367}},"alias":"강원"},"area2":{"name":"강릉시","coords":{"center":{"crs":"EPSG:4326","x":128.875836,"y":37.752175}}},"area3":{"name":"초당동","coords":{"center":{"crs":"EPSG:4326","x":128.915963,"y":37.791883}}},"area4":{"name":"","coords":{"center":{"crs":"","x":0.0,"y":0.0}}}}}]}

        //JSON 데이터 파싱
        JSONObject jObj = new JSONObject(responseEntity.getBody());

        //법정동 코드 뽑기
        JSONObject results = jObj.getJSONArray("results").getJSONObject(0);
        String code = results.getJSONObject("code").getString("id");
        code = code.substring(0,code.length()-2); //뒤에서 2자리 제거 (하위 지역)ㄴ

        //1) 코드로 찾기
        String finalCode = code;
        Region region = regionRepository.findByCode(code).orElseGet( ()->
        {
            //2) 만약 법정동 코드가 없을 경우 새로 등록
            // 시 , 시약어, 구/군, 동 뽑기
            // ex- 강원도 -> 강원특별자치도로 개편해서 코드 없음
            JSONObject regionObject = results.getJSONObject("region");
            String area1 = regionObject.getJSONObject("area1").getString("name");
            String area2 = regionObject.getJSONObject("area2").getString("name");
            String area3 = regionObject.getJSONObject("area3").getString("name");
            JSONObject coordsObject = regionObject.getJSONObject("area3").getJSONObject("coords").getJSONObject("center");
            Integer mapx = Integer.parseInt(String.format("%.7f", coordsObject.getDouble("x")).replaceAll("\\.",""));
            Integer mapy = Integer.parseInt(String.format("%.7f", coordsObject.getDouble("y")).replaceAll("\\.",""));
            System.out.println("mapx:"+mapx+"mapy:"+mapy);
            Region newRegion = new Region(finalCode, area1,area2,area3,mapx,mapy);

            //없으면 등록 및 아이디값 가져옴
            regionRepository.save(newRegion);
            return newRegion;

        });


        Restaurant restaurant = requestDto.toEntity(region);
        restaurantRepository.save(restaurant);

    }


    public List<RestaurantFindAllResponseDto> findAll() {
        List<Restaurant> restaurants = restaurantRepository.findAll();

        return restaurants.stream()
                .map(restaurant -> new RestaurantFindAllResponseDto(
                         restaurant.getId(),
                         restaurant.getRegion().getId(),
                         restaurant.getName(),
                         restaurant.getMapx(),
                         restaurant.getMapy(),
                         restaurant.getAddress(),
                         restaurant.getRoadAddress(),
                         restaurant.getPhone()

                ))
                .toList();
    }
}


//}
