package com.ssafy.matdongsan.domain.review.api;
import com.ssafy.matdongsan.domain.review.dto.ReviewFindAllResponseDto;
import com.ssafy.matdongsan.domain.review.dto.ReviewFindOneResponseDto;
import com.ssafy.matdongsan.domain.review.dto.ReviewSaveRequestDto;
import com.ssafy.matdongsan.domain.review.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ReviewApiController {
    private final ReviewService reviewService;

    @PostMapping("/review/{accountId}")
    public ResponseEntity<?>  CreateReview(
            @PathVariable("accountId") Integer accountId,
            @RequestBody @Valid ReviewSaveRequestDto requestDto
    ){
        try {
            reviewService.save(requestDto,accountId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        return ResponseEntity.ok(HttpStatus.OK);
    }

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
