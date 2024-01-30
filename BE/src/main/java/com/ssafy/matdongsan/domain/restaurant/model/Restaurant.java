package com.ssafy.matdongsan.domain.restaurant.model;

import com.ssafy.matdongsan.domain.restaurant.dto.RestaurantSaveRequestDto;
import com.ssafy.matdongsan.domain.restaurant.dto.RestaurantSaveResponseDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import java.time.LocalDateTime;
import static jakarta.persistence.FetchType.LAZY;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name="restaurant")
public class Restaurant {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "restaurant_id")
    private  Integer id;

    @ManyToOne(fetch = LAZY)
    @JoinColumn(name = "region_id")
    private Region region;

    @NotEmpty
    @Column(name= "restaurant_name" ,length = 100)
    private String restaurantName;

    private Integer mapx;
    private Integer mapy;

    @Column(length = 100)
    private String address;

    @Column(name = "road_address" ,length = 100)
    private String roadAddress;

    @Column(length = 16)
    private String phone;

    @CreatedDate
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(name = "modified_date")
    private LocalDateTime modifiedDate;

//    @Builder
//    public Restaurant(String restaurantName, Integer mapx, Integer mapy, String address, String roadAddress, String phone, LocalDateTime createdDate, LocalDateTime modifiedDate) {
//        this.restaurantName = restaurantName;
//        this.mapx = mapx;
//        this.mapy = mapy;
//        this.address = address;
//        this.roadAddress = roadAddress;
//        this.phone = phone;
//        this.createdDate = createdDate;
//        this.modifiedDate = modifiedDate;
//    }
    @Builder
    public Restaurant(Region region, String restaurantName, Integer mapx, Integer mapy, String address, String roadAddress, String phone, LocalDateTime createdDate, LocalDateTime modifiedDate) {
        this.region = region;
        this.restaurantName = restaurantName;
        this.mapx = mapx;
        this.mapy = mapy;
        this.address = address;
        this.roadAddress = roadAddress;
        this.phone = phone;
        this.createdDate = createdDate;
        this.modifiedDate = modifiedDate;
    }
}
