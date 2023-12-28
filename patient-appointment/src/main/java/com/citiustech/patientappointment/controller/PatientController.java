package com.citiustech.patientappointment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.patientappointment.dto.PatientLoginDTO;
import com.citiustech.patientappointment.model.Appointments;
import com.citiustech.patientappointment.model.Patient;
import com.citiustech.patientappointment.service.AppointmentService;
import com.citiustech.patientappointment.service.PatientService;

@RestController
@RequestMapping("patient")
@CrossOrigin("*")
public class PatientController {

	@Autowired
	private PatientService patientService;
	
	@Autowired
	private AppointmentService appointmentService;
	
	@GetMapping("all")
	public ResponseEntity<List<Patient>> getAllPatients(){
		List allPatients = patientService.getAllPatients();
		return new ResponseEntity<List<Patient>>(allPatients,HttpStatus.OK);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Patient> getPatientById(@PathVariable int id){
		Patient patient = patientService.getPatientById(id);
		return new ResponseEntity<Patient>(patient, HttpStatus.OK);
	}
	
	@GetMapping("username/{username}")
	public ResponseEntity<Patient> getPatientByUsername(@PathVariable String username){
		Patient patient = patientService.getpatientByUsername(username);
		return new ResponseEntity<Patient>(patient, HttpStatus.OK);
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<String> deletePatient(@PathVariable int id){
		Patient patient = patientService.deletePatient(id);
		if(patient!=null){
			return new ResponseEntity<String>("Patient Deleted Successfully...", HttpStatus.OK);
		}else{
			return new ResponseEntity<String>("No data Found!!!",HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("add")
	public ResponseEntity<Patient> addPatient(@RequestBody PatientLoginDTO patientLoginDTO){
		Patient pt = patientService.addPatient(patientLoginDTO);
		return new ResponseEntity<Patient>(pt,HttpStatus.CREATED);
	}
	
	@PutMapping("update/{id}")
	public ResponseEntity<Patient> updatePatient(@PathVariable int id, @RequestBody Patient patient){
		Patient pt = patientService.getPatientById(id);
		
		List<Appointments> patientAppointments = appointmentService.getAppointmentByPatientName(pt.getName());
//		System.out.println("patient list: "+patientAppointments);
		
		for(int i=0;i<patientAppointments.size();i++){
			Appointments exist = patientAppointments.get(i);
//			System.out.println(exist);
			exist.setPaitentName(patient.getName());
			
			appointmentService.updateAppointment(exist);
		}
		
		pt.setEmail(patient.getEmail());
		pt.setGender(patient.getGender());
		pt.setMobileno(patient.getMobileno());
		pt.setName(patient.getName());
		
		return new ResponseEntity<Patient>(patientService.updatePatient(pt),HttpStatus.OK);
	}
}
