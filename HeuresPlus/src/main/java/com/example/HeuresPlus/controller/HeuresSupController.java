package com.example.HeuresPlus.controller;

import com.example.HeuresPlus.service.HeuresSupService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/heures-sup")
@RequiredArgsConstructor
public class HeuresSupController {
    private final HeuresSupService heuresSupService;
    @GetMapping("/calculate")
    public float calculateOvertimeCost(@RequestParam Integer employeId,
                                       @RequestParam String startDate,
                                       @RequestParam String endDate) {
        // Expected date format: yyyy-MM-dd
        DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;
        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);
        return heuresSupService.calculateOvertimeCost(employeId, start, end);
    }
}
