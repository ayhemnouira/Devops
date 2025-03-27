package com.example.HeuresPlus.Repository;

import com.example.HeuresPlus.model.Tarif;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
public interface TarifRepository extends JpaRepository<Tarif, Integer> {
    Tarif findByTypeJour(String typeJour);
}
