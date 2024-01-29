//package com.ssafy.matdongsan.domain.subcription.model;
//
//import jakarta.persistence.*;
//import jakarta.validation.constraints.NotEmpty;
//import lombok.AccessLevel;
//import lombok.Builder;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "subscription")
//@Getter
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
//public class Subscription {
//    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
//
//    @NotEmpty
//    private int followerId;
//    @NotEmpty
//    private int followingId;
//    private LocalDateTime createdTime;
//    private LocalDateTime modifiedTime;
//
//    @Builder
//    public Subscription(int followerId, int followingId){
//        this.followerId = followerId;
//        this.followingId = followingId;
//    }
//}
