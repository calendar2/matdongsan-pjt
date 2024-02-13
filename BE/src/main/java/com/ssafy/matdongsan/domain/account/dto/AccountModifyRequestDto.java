package com.ssafy.matdongsan.domain.account.dto;

import com.ssafy.matdongsan.domain.account.model.Account;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class AccountModifyRequestDto {
    String username;
    String nickname;
    short birthYear;
    byte spicyLevel;
    char gender;
    String picture;
}
