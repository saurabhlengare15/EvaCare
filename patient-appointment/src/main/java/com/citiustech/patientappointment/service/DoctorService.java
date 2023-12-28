package com.citiustech.patientappointment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.citiustech.patientappointment.dto.DoctorLoginDTO;
import com.citiustech.patientappointment.model.Doctor;
import com.citiustech.patientappointment.model.Login;
import com.citiustech.patientappointment.model.User;
import com.citiustech.patientappointment.repository.DoctorRepository;
import com.citiustech.patientappointment.repository.LoginRepository;
import com.citiustech.patientappointment.repository.UserRepository;

@Service
public class DoctorService {
	
	@Autowired
	private DoctorRepository doctorRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository userRepository;
	
//	@Transactional
	public Doctor addDoctor(DoctorLoginDTO doctorLoginDTO){
		
//		Login login = new Login();
//		login.setUsername(doctorLoginDTO.getUsername());
//		login.setPassword(doctorLoginDTO.getPassword());
//		login.setRole("doctor");
//		loginRepository.save(login);
		
		User user = new User();
		user.setUsername(doctorLoginDTO.getUsername());
		user.setPassword(passwordEncoder.encode(doctorLoginDTO.getPassword()));
		user.setRole("doctor");
		userRepository.save(user);
		
		Doctor doctor = new Doctor();
		doctor.setFirstName(doctorLoginDTO.getFirstName());
		doctor.setLastName(doctorLoginDTO.getLastName());
		doctor.setResident(doctorLoginDTO.getResident());
		doctor.setSpecialization(doctorLoginDTO.getSpecialization());
//		doctor.setLogin(login);
		doctor.setUser(user);
		return doctorRepository.save(doctor);
	}
	
	public Doctor getDoctorById(int id){
		return doctorRepository.findByDoctorID(id);
	}
	
	public Doctor getDoctorByUsername(String username){
		return doctorRepository.findByUsername(username);
	}
	
	public List<Doctor> getAllDoctors(){
		return doctorRepository.findAll();
	}
	
	public long count(){
		return doctorRepository.count();
	}
}
