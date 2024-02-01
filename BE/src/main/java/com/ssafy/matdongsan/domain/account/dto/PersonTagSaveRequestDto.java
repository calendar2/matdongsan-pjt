package com.ssafy.matdongsan.domain.account.dto;

import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.account.model.PersonTag;
import com.ssafy.matdongsan.domain.restaurant.model.Region;
import com.ssafy.matdongsan.domain.restaurant.model.Restaurant;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PersonTagSaveRequestDto {
    private String name;
    private int birthYear;
    private Account account;



    public static PersonTag toEntity(Account account, String name, int birthYear) {
        return PersonTag.builder()
                .account(account)
                .name(name)
                .birthYear(birthYear)
                .build();

    }
}
