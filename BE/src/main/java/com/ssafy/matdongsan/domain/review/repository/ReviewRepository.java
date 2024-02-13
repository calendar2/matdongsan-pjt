package com.ssafy.matdongsan.domain.review.repository;

import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.restaurant.model.Restaurant;
import com.ssafy.matdongsan.domain.review.dto.FilterDto;
import com.ssafy.matdongsan.domain.review.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.query.DefaultJpaQueryMethodFactory;

import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long>,ReviewRepositoryCustom {

    List<Review> findAllByAccount(Account myAccount);


    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query(value = "delete from Review  r where r.account = :account and r.restaurant = :restaurant")
    void deleteByAccountAndRestaurant(Account account, Restaurant restaurant);

//    List<Review> searchByFilter(FilterDto filter);


}
