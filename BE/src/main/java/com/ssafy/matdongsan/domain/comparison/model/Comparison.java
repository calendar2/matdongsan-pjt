package com.ssafy.matdongsan.domain.comparison.model;

import com.ssafy.matdongsan.domain.BaseEntity;
import com.ssafy.matdongsan.domain.account.model.Account;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Comparison extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comparison_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account comparer;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private Account compared;

    private boolean isHidden = false;
}
