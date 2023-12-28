package com.citiustech.patientappointment.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.patientappointment.dto.DoctorLoginDTO;
import com.citiustech.patientappointment.model.Doctor;
import com.citiustech.patientappointment.service.DoctorService;


@RestController
@RequestMapping("doctor")
@CrossOrigin("*")
public class DoctorController {
	
	@Autowired
	private DoctorService doctorService;
	
	
	@PostMapping("add")
	public ResponseEntity<Doctor> addDoctor(@RequestBody DoctorLoginDTO doctorLoginDTO){
		Doctor doc = doctorService.addDoctor(doctorLoginDTO);
		return new ResponseEntity<Doctor>(doc,HttpStatus.CREATED);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Doctor> getDoctorById(@PathVariable int id){
		Doctor doc = doctorService.getDoctorById(id);
		return new ResponseEntity<Doctor>(doc,HttpStatus.OK);
	}
	
	@GetMapping("username/{username}")
	public ResponseEntity<Doctor> getDoctorByUsername(@PathVariable String username){
		Doctor doc = doctorService.getDoctorByUsername(username);
		return new ResponseEntity<Doctor>(doc,HttpStatus.OK);
	}
	
	@GetMapping("all")
	public ResponseEntity<List<Doctor>> getAllDoctors(){
		List<Doctor> doc = doctorService.getAllDoctors();
		return new ResponseEntity<List<Doctor>>(doc,HttpStatus.OK);
	}
	
	@GetMapping("count")
	public long count(){
		return doctorService.count();
	}
}
