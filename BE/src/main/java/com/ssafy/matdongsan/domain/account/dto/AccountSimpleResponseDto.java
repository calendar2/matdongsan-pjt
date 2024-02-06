package com.ssafy.matdongsan.domain.account.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class AccountSimpleResponseDto {
    private String nickname;
    private int follower;
}
