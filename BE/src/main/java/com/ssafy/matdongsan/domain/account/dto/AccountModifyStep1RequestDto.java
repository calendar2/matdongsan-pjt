package com.ssafy.matdongsan.domain.account.dto;

import lombok.Getter;

@Getter
public class AccountModifyStep1RequestDto {
    char gender;
    short birthYear;
    Short regionId;
//    List<String> regionNames;
}