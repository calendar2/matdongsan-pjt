package com.ssafy.matdongsan.domain.account.dto;

import com.ssafy.matdongsan.domain.account.model.Account;
import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class AccountResponse {

    private Integer id;
    private String nickname;
    private String email;
    private short birthYear;
    private byte spicyLevel;
    private int follower;
    private char gender;
    private boolean isPassed;
    private String picture;

    public static AccountResponse from(Account account) {
        return AccountResponse.builder()
                .id(account.getId())
                .nickname(account.getNickname())
                .email(account.getEmail())
                .birthYear(account.getBirthYear())
                .spicyLevel(account.getSpicyLevel())
                .follower(account.getFollower())
                .gender(account.getGender())
                .isPassed(account.isPassed())
                .picture(account.getPicture())
                .build();
    }
}