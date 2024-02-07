package com.ssafy.matdongsan.domain.account.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.List;

@Getter
public class AccountModifyStep2RequestDto {
    byte spicyLevel;
    List<String> bannedFoodNames;
}