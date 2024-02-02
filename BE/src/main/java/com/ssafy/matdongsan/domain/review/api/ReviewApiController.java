package com.ssafy.matdongsan.domain.review.api;
import com.ssafy.matdongsan.domain.review.dto.ReviewFindAllResponseDto;
import com.ssafy.matdongsan.domain.review.dto.ReviewFindOneResponseDto;
import com.ssafy.matdongsan.domain.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ReviewApiController {
    private final ReviewService reviewService;

    @GetMapping("/review/{accountId}")
    public ResponseEntity<?> ReadAllReviews(
            @PathVariable("accountId") Integer accountId
    ){
        List<ReviewFindAllResponseDto> responseDtos =  reviewService.findAllByAccount(accountId);
        return  ResponseEntity.ok().body(responseDtos);

    }
    @GetMapping("/review/{accountId}/{reviewId}")
    public ResponseEntity<?> ReadOneReviews(
            @PathVariable("reviewId") Long reviewId
    ){

        ReviewFindOneResponseDto responseDto =  reviewService.findById(reviewId);
        return  ResponseEntity.ok().body(responseDto);

    }

}
