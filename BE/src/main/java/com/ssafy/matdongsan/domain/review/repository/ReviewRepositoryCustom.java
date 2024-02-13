package com.ssafy.matdongsan.domain.review.repository;

import com.ssafy.matdongsan.domain.review.dto.FilterDto;
import com.ssafy.matdongsan.domain.review.model.Review;
import com.ssafy.matdongsan.domain.review.repository.query.SearchReviewQueryDto;

import java.util.List;

public interface ReviewRepositoryCustom {
    List<SearchReviewQueryDto> searchByFilter(FilterDto filter);


}
