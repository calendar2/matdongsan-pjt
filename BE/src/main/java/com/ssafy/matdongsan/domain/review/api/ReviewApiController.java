package com.ssafy.matdongsan.domain.review.api;
import com.ssafy.matdongsan.domain.review.dto.ReviewFindAllResponseDto;
import com.ssafy.matdongsan.domain.review.dto.ReviewFindOneResponseDto;
import com.ssafy.matdongsan.domain.review.dto.ReviewSaveRequestDto;
import com.ssafy.matdongsan.domain.review.dto.ReviewUpdateRequestDto;
import com.ssafy.matdongsan.domain.review.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
@RestController
@RequiredArgsConstructor
public class ReviewApiController {
    private final ReviewService reviewService;

    @Operation(summary = "리뷰 등록 및 리뷰-같이 간 사람 기록 API")
    @PostMapping("/review/{accountId}")

    public ResponseEntity<?> createReview(

            @PathVariable("accountId") Integer accountId,
            @RequestBody @Valid ReviewSaveRequestDto requestDto
    ){

        reviewService.save(requestDto,accountId);

        return ResponseEntity.ok(HttpStatus.OK);
    }

    @Operation(summary = "리뷰 목록 조회 API")
    @GetMapping("/review/{accountId}")
    public ResponseEntity<?> readAllReviews(
            @PathVariable("accountId") Integer accountId
    ){
        List<ReviewFindAllResponseDto> responseDtos =  reviewService.findAllByAccount(accountId);
        return  ResponseEntity.ok().body(responseDtos);
    }


    @Operation(summary = "리뷰 상세 조회 API")
    @GetMapping("/review/{accountId}/{reviewId}")
    public ResponseEntity<?> readOneReview(
            @PathVariable("accountId") Integer accountId,
            @PathVariable("reviewId") Long reviewId
    ){
        ReviewFindOneResponseDto responseDto =  reviewService.findById(reviewId);
        return  ResponseEntity.ok().body(responseDto);
    }
    @Operation(summary = "리뷰 삭제 API")
    @DeleteMapping("/review/{accountId}/{reviewId}")
    public ResponseEntity<?> deleteOneReview(
            @PathVariable("accountId") Integer accountId,
            @PathVariable("reviewId") Long reviewId
    ){
        reviewService.delete(reviewId);
        return ResponseEntity.ok(HttpStatus.OK);
    }
    @Operation(summary = "리뷰 수정 API")
    @PutMapping("/review/{accountId}/{reviewId}")
    public ResponseEntity<?> updateOneReview(
            @PathVariable("accountId") Integer accountId,
            @PathVariable("reviewId") Long reviewId,
            @RequestBody @Valid ReviewUpdateRequestDto requestDto
    ){
        reviewService.update(accountId,reviewId,requestDto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
