package com.ssafy.matdongsan.domain.review.repository;

import com.ssafy.matdongsan.domain.review.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ReviewRepository extends JpaRepository<Review, Long> {
}
