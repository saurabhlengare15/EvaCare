package com.citiustech.patientappointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.citiustech.patientappointment.model.Patient;

@Repository
public interface PatientRepository extends JpaRepository<Patient, Integer> {
	Patient findById(int id);
	
	@Query(value="select * from patient where user_username=?1",nativeQuery=true)
	public Patient findByUsername(String username);
}
