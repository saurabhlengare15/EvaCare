package com.citiustech.patientappointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.citiustech.patientappointment.model.Doctor;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {
	public Doctor findByDoctorID(int id);
	
	@Query(value="select * from doctors where user_username=?1",nativeQuery=true)
	public Doctor findByUsername(String username);
}
