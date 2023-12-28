package com.citiustech.patientappointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.patientappointment.model.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login, String> {
	
	Login findByUsername(String username);
}
