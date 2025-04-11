package com.example.HeuresPlus.service;

import com.example.HeuresPlus.Repository.EmployeRepository;
import com.example.HeuresPlus.model.Employe;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
@RequiredArgsConstructor
public class EmployeService {
    private final EmployeRepository employeRepository;
    public List<Employe> getAllEmployes() {
        return employeRepository.findAll();
    }

}
