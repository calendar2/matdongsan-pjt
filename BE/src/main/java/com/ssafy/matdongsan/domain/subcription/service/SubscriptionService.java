package com.ssafy.matdongsan.domain.subcription.service;

import com.ssafy.matdongsan.domain.subcription.model.Subscription;
import com.ssafy.matdongsan.domain.subcription.repository.SubscriptionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SubscriptionService {
    private final SubscriptionRepository subscriptionRepository;

    public List<Subscription> getAllFollower(){
        List<Subscription> all = subscriptionRepository.findAll();
        log.info("#### {}", all.size());
        return all;
    }
}
