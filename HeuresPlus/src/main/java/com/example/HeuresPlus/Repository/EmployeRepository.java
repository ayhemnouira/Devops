package com.example.HeuresPlus.Repository;

import com.example.HeuresPlus.model.Employe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
public interface EmployeRepository extends JpaRepository<Employe, Integer> {
}
