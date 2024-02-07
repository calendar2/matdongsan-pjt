package com.ssafy.matdongsan.domain.account.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

import java.util.List;

@Getter
public class AccountModifyStep1RequestDto {
    char gender;
    short birthYear;
    String regionName;
//    List<String> regionNames;
}