package com.ssafy.matdongsan.contoller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.Charset;



@RestController
@RequiredArgsConstructor

public class NaverSearchApiController {
    @GetMapping("/naver/search/")
    @Operation(summary = "네이버 지역 검색 API", description = "관련 음식점 및 장소 20개 반환")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "성공"),
            @ApiResponse(responseCode = "400", description = "실패"),
            @ApiResponse(responseCode = "403", description = "API 권한 없음"),
            @ApiResponse(responseCode = "404", description = "API 요청 URL에 오타"),
            @ApiResponse(responseCode = "500", description = "서버 내부에 오류")
    })
    public ResponseEntity<String> naverSearch(
            @RequestParam("query") String query
    ){
        //공식 문서 파라미터값 참고
        URI uri = UriComponentsBuilder
                .fromUriString("https://openapi.naver.com")
                .path("/v1/search/local.json")
                .queryParam("query",query)
                .queryParam("display",20)
                .queryParam("start",1)
                .queryParam("sort","comment")
                .encode(Charset.forName("UTF-8"))
                .build()
                .toUri();
        //Header 설정
        RequestEntity<Void> req = RequestEntity
                .get(uri)
                .header("X-Naver-Client-Id","4RZmgsIFZSEvSjyV8003")
                .header("X-Naver-Client-Secret","_DrxTTBDna")
                .build();

        //응답 클래스 지정
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> result = restTemplate.exchange(req, String.class);

        return ResponseEntity.ok(result.getBody());
    }
}
