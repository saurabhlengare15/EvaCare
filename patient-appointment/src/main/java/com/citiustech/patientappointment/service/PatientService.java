package com.citiustech.patientappointment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.citiustech.patientappointment.dto.PatientLoginDTO;
import com.citiustech.patientappointment.model.Patient;
import com.citiustech.patientappointment.model.User;
import com.citiustech.patientappointment.repository.PatientRepository;
import com.citiustech.patientappointment.repository.UserRepository;

@Service
public class PatientService {
	
	@Autowired
	private PatientRepository patientRepository;
	
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	@Autowired
	private UserRepository userRepository;
	
	public List<Patient> getAllPatients(){
		return patientRepository.findAll();
	}
	
	public Patient getPatientById(int id){
		return patientRepository.findById(id);
	}
	
	public Patient addPatient(PatientLoginDTO patientLoginDTO){
		User user = new User();
		user.setUsername(patientLoginDTO.getUsername());
		user.setPassword(passwordEncoder.encode(patientLoginDTO.getPassword()));
		user.setRole("patient");
		userRepository.save(user);
		
		Patient patient = new Patient();
		patient.setName(patientLoginDTO.getName());
		patient.setGender(patientLoginDTO.getGender());
		patient.setEmail(patientLoginDTO.getEmail());
		patient.setMobileno(patientLoginDTO.getMobileno());
		patient.setUser(user);
		
		return patientRepository.save(patient);
	}
	
	public Patient updatePatient(Patient patient){
		return patientRepository.save(patient);
	}
	
	public Patient deletePatient(int id){
		Patient exist = getPatientById(id);
		if(exist!=null){
			patientRepository.deleteById(id);
		}else{
			System.out.println("no data found");
		}
		return exist;
	}
	
	public Patient getpatientByUsername(String username){
		return patientRepository.findByUsername(username);
	}
}
