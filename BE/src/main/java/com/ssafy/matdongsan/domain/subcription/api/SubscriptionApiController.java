package com.ssafy.matdongsan.domain.subcription.api;

import com.ssafy.matdongsan.domain.subcription.model.Subscription;
import com.ssafy.matdongsan.domain.subcription.service.SubscriptionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
public class SubscriptionApiController {
    private final SubscriptionService subscriptionService;
//    @PostMapping("/subscription")
//    public ResponseEntity<?> subscriptionUser(@RequestBody @Valid){
//
//    }
    @GetMapping("/subscription/{follower_id}")
    public ResponseEntity<?> getFollower(){
        List<Subscription> subs = subscriptionService.getAllFollower();
        return ResponseEntity.ok().body(subs);
    }
}
