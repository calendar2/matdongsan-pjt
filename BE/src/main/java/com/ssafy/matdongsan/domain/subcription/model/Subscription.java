package com.ssafy.matdongsan.domain.subcription.model;

import com.ssafy.matdongsan.domain.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


import com.ssafy.matdongsan.domain.account.model.Account;
import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Subscription extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "subscription_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "subscriber_id")
    private Account subscriber;

    @ManyToOne
    @JoinColumn(name = "subscribed_id")
    private Account subscribed;
}

