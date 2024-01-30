package com.ssafy.matdongsan.domain.subcription.repository;

import com.ssafy.matdongsan.domain.subcription.model.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubscriptionRepository extends JpaRepository<Subscription, Short> {
}
