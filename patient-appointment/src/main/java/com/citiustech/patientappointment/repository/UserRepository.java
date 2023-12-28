package com.citiustech.patientappointment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.citiustech.patientappointment.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

	User findByUsername(String username);
}
