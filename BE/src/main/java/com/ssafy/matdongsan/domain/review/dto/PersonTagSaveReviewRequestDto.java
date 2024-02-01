package com.ssafy.matdongsan.domain.review.dto;

import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.account.model.PersonTag;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonTagSaveReviewRequestDto {
    private String name;
    private int birthYear;

    public PersonTag toEntity(Account account) {
        return PersonTag.builder()
                .account(account)
                .name(name)
                .birthYear(birthYear)
                .build();
    }
}
