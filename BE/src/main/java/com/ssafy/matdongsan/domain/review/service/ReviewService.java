package com.ssafy.matdongsan.domain.review.service;

import com.ssafy.matdongsan.domain.account.dto.PersonTagSaveRequestDto;
import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.account.model.PersonTag;
import com.ssafy.matdongsan.domain.account.repository.AccountRepository;
import com.ssafy.matdongsan.domain.account.repository.PersonTagRepository;
import com.ssafy.matdongsan.domain.restaurant.model.Restaurant;
import com.ssafy.matdongsan.domain.restaurant.repository.RestaurantRepository;
import com.ssafy.matdongsan.domain.review.dto.AccountSaveReviewRequestDto;
import com.ssafy.matdongsan.domain.review.dto.PersonTagSaveReviewRequestDto;
import com.ssafy.matdongsan.domain.review.dto.ReviewSaveRequestDto;
import com.ssafy.matdongsan.domain.review.model.Review;
import com.ssafy.matdongsan.domain.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReviewService {
    private final ReviewRepository reviewRepository;
    private final RestaurantRepository restaurantRepository;
    private final AccountRepository accountRepository;
    private final PersonTagRepository personTagRepository;

    //파일 업로드 연결 필요
    @Transactional
    public void save(ReviewSaveRequestDto requestDto, Integer accountId) throws Exception {

        // 문자열 -> LocalDateTime
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDateTime visitDate = LocalDateTime.of(LocalDate.parse(requestDto.getVisitDate(),formatter), LocalTime.of(0,0));

        //예외 발생시키기 수정 필요
        Restaurant restaurant = restaurantRepository.findById(requestDto.getRestaurantId()).get();

        //예외 발생시키기 수정 필요
        Account myAccount = accountRepository.findById(accountId).get();

        List<PersonTagSaveReviewRequestDto> reviewPersonTags = requestDto.getReviewPersonTags();
        List<AccountSaveReviewRequestDto> accountReviews = requestDto.getAccountReviews();

        //태그된 친구 목록이 있을때: PersonTagSaveReviewRequestDto -> PersonTag
        List<PersonTag> newRivewPersonTags = new ArrayList<>();
        if(!reviewPersonTags.isEmpty()){
            for(PersonTagSaveReviewRequestDto pd: reviewPersonTags){
                PersonTag personTag = extractedPersonTag(pd,myAccount); //없다면 등록
                newRivewPersonTags.add(personTag);
            }
        }
        //계정이 있는 친구 목록이 있을때: AccountSaveReviewRequestDto -> Account
        List<Account> newAccountReviews = new ArrayList<>();
        if(!accountReviews.isEmpty()){
            for(AccountSaveReviewRequestDto acc: accountReviews){
                Account findedAccount = accountRepository.findById(acc.getId()).get();
                newAccountReviews.add(findedAccount);
            }
        }

        Review newReview = requestDto.toEntity(myAccount ,restaurant,visitDate, newRivewPersonTags, newAccountReviews);
        reviewRepository.save(newReview);

    }


    @Transactional
    public PersonTag extractedPersonTag(PersonTagSaveReviewRequestDto pd, Account account) {
        //PersonTag 리스트 내 등록되지 않은 Tag있다면 등록 ,casecade안쓴 이유는 accountId 등록안되서
        Optional<PersonTag> optionalPersonTag  = personTagRepository.findByAccountAndBirthYearAndName(account, pd.getBirthYear(), pd.getName());
        //왜 orElse가 안되는지 모르겠음
        //없다면 저장 - concate하면 연계된게 많아서 나중에 안될거 같아서 일일이 저장
        if(!optionalPersonTag.isPresent()){
            PersonTag savedPersonTag = personTagRepository.save(optionalPersonTag.get());
            return savedPersonTag;
        }
        return optionalPersonTag.get();
    }


}
