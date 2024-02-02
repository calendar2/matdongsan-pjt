package com.ssafy.matdongsan.domain.review.repository;

import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.review.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findAllByAccount(Account myAccount);

}
