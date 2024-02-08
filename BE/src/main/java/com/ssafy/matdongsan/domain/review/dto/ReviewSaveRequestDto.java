package com.ssafy.matdongsan.domain.review.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.account.model.PersonTag;
import com.ssafy.matdongsan.domain.restaurant.model.Restaurant;
import com.ssafy.matdongsan.domain.review.model.Review;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ReviewSaveRequestDto {

    @JsonProperty("kindnessRating")
    private double kindnessRating;
    @JsonProperty("tasteRating")
    private double tasteRating;
    @JsonProperty("content")
    private String content;
    @JsonProperty("visitDate")
    private String visitDate;
    @JsonProperty("restaurantId")
    private Integer restaurantId;
    @JsonProperty("accountReviews")
    private List<AccountSaveReviewRequestDto> accountReviews;
    @JsonProperty("reviewPersonTags")
    private List<PersonTagSaveReviewRequestDto> reviewPersonTags;

    public Review toEntity(Account account, Restaurant restaurant, LocalDateTime visitDate, List<PersonTag> reviewPersonTags, List<Account> accountReviews) {
        return Review.builder()
                .account(account)
                .kindnessRating(kindnessRating)
                .tasteRating(tasteRating)
                .content(content)
                .visitDate(visitDate)
                .restaurant(restaurant)
                .reviewPersonTags(reviewPersonTags)
                .accountReviews(accountReviews)
                .build();
    }

    @Override
    public String toString() {
        return "ReviewSaveRequestDto{" +
                "kindnessRating=" + kindnessRating +
                ", tasteRating=" + tasteRating +
                ", content='" + content + '\'' +
                ", visitDate='" + visitDate + '\'' +
                ", restaurantId=" + restaurantId +
                ", accountReviews=" + accountReviews +
                ", reviewPersonTags=" + reviewPersonTags +
                '}';
    }
}
