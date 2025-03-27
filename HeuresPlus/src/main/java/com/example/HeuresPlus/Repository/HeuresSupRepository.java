package com.example.HeuresPlus.Repository;

import com.example.HeuresPlus.model.HeuresSup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

public interface HeuresSupRepository extends JpaRepository<HeuresSup, Integer>{
    List<HeuresSup> findByEmployeIdAndDateBetween(Integer employeId, LocalDate startDate, LocalDate endDate);
}
