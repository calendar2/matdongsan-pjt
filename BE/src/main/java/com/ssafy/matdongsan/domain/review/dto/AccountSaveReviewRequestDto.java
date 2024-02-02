package com.ssafy.matdongsan.domain.review.dto;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AccountSaveReviewRequestDto {
    private Integer id;

    @Builder
    public AccountSaveReviewRequestDto(Integer id) {
        this.id = id;
    }

}
