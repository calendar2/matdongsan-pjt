package com.ssafy.matdongsan.domain.account.api;

import com.ssafy.matdongsan.domain.account.dto.AccountModifyRequestDto;
import com.ssafy.matdongsan.domain.account.dto.AccountSaveRequestDto;
import com.ssafy.matdongsan.domain.account.dto.PersonTagSaveRequestDto;
import com.ssafy.matdongsan.domain.account.model.Account;
import com.ssafy.matdongsan.domain.account.model.PersonTag;
import com.ssafy.matdongsan.domain.account.service.AccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
@Slf4j
public class AccountController {

    private final AccountService accountService;

    @GetMapping
    public ResponseEntity<?> getAccount(@RequestParam String email) {
        log.info("email={}", email);
        Account account = accountService.getAccount(email);
        return ResponseEntity.ok().body(account);
    }

    @PutMapping("/modify")
    public void modifyAccount(@AuthenticationPrincipal String email, @RequestBody AccountModifyRequestDto dto) {
        log.info("email={}", email);
        log.info("dto={}", dto.toString());
        accountService.modifyAccount(dto, email);
    }

    @PostMapping
    public ResponseEntity<?> saveAccount(@RequestBody AccountSaveRequestDto dto) {
        log.info("Account={}", dto.toString());
        Account account = accountService.saveAccount(dto);
        return ResponseEntity.ok().body(account);
    }

    @GetMapping("/tag")
    public ResponseEntity<?> getPersonTags(@AuthenticationPrincipal String email) {
        List<PersonTag> personTags = accountService.getPersonTags(email);
        return ResponseEntity.ok().body(personTags);
    }

    @PostMapping("/tag")
    public void createPersonTag(@AuthenticationPrincipal String email, @RequestBody PersonTagSaveRequestDto dto) {
        log.info("email={}", email);
        log.info("dto={}", dto.toString());
        accountService.savePersonTag(dto, email);
    }
}
