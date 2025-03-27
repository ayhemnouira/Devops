package com.example.HeuresPlus.service;

import com.example.HeuresPlus.Repository.HeuresSupRepository;
import com.example.HeuresPlus.Repository.TarifRepository;
import com.example.HeuresPlus.model.HeuresSup;
import com.example.HeuresPlus.model.Tarif;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HeuresSupService {
    private final HeuresSupRepository heuresSupRepository;
    private final TarifRepository tarifRepository;

    // Calculate total overtime cost for an employee within a period
    public float calculateOvertimeCost(Integer employeId, LocalDate startDate, LocalDate endDate) {
        List<HeuresSup> heuresList = heuresSupRepository.findByEmployeIdAndDateBetween(employeId, startDate, endDate);
        float totalCost = 0;
        for (HeuresSup hs : heuresList) {
            // Determine the day type; for simplicity, assume weekends are Saturday and Sunday
            String typeJour = (hs.getDate().getDayOfWeek().getValue() >= 6) ? "weekend" : "jour ordinaire";
            Tarif tarif = tarifRepository.findByTypeJour(typeJour);
            totalCost += hs.getNbHeures() * tarif.getTarif();
        }
        return totalCost;
    }
}
