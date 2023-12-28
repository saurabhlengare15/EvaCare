package com.citiustech.patientappointment.controller;

import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.patientappointment.model.Appointments;
import com.citiustech.patientappointment.service.AppointmentService;
import com.opencsv.CSVWriter;

@RestController
@RequestMapping("appointment")
@CrossOrigin("*")
public class AppointmentController {
	
	@Autowired
	private AppointmentService appointmentService;
	
	@PostMapping("add")
	public ResponseEntity<Appointments> addAppointment(@RequestBody Appointments appointment){
		Appointments app = appointmentService.addAppointment(appointment);
		return new ResponseEntity<Appointments>(app, HttpStatus.CREATED);
	}
	
	@GetMapping("all")
	public ResponseEntity<List<Appointments>> getAllAppointments(){
		List<Appointments> applist = appointmentService.getAllAppointments();
		return new ResponseEntity<List<Appointments>>(applist,HttpStatus.OK);
	}
	
//	@GetMapping("/get/getall")
//	public String getAndSavetoCSV(){
//		List<Appointments> data = appointmentService.getApts();
//		
//		try(CSVWriter writer = new CSVWriter(new FileWriter("output.csv"))) {
//			writer.writeNext(getHeader());
//			for (Appointments appointments : data) {
//				writer.writeNext(convertToArray(appointments));
//			}
////			writer.writeAll(data);
//			return "data saved to csv";
//		} catch (IOException e) {
//			e.printStackTrace();
//			return "error";
//		}
//	}
//	
//	private String[] getHeader(){
//		String[] names = {"Gemder","Name","Status","Date","Id","Doctor"};
////		names[0] = "Gender"
//		return names;
//	}
//	
//	public String[] convertToArray(Appointments apt){
//		String[] row = new String[6];
//		
//		row[0] = apt.getGender();
//		row[1] = apt.getPaitentName();
//		row[2] = apt.getStatus();
//		row[3] = String.valueOf(apt.getAppointmentDate());
//		row[4] = String.valueOf(apt.getAppointmentID());
//		row[5] = String.valueOf(apt.getDoctor());
//		
//		return row;
//	}
	
	@GetMapping("{id}")
	public ResponseEntity<Appointments> getAppointmentById(@PathVariable int id){
		Appointments applist = appointmentService.getAppointmentById(id);
		return new ResponseEntity<Appointments>(applist, HttpStatus.OK);
	}
	
	@GetMapping("doctor/{id}")
	public ResponseEntity<List<Appointments>> getAppointmentByDoctorId(@PathVariable int id){
		List<Appointments> applist = appointmentService.getAppointmentByDoctorId(id);
		return new ResponseEntity<List<Appointments>>(applist,HttpStatus.OK);
	}
	
	@GetMapping("patient/{name}")
	public ResponseEntity<List<Appointments>> getAppointmentByPatientName(@PathVariable String name){
		List<Appointments> applist = appointmentService.getAppointmentByPatientName(name);
		return new ResponseEntity<List<Appointments>>(applist,HttpStatus.OK);
	}
	
	@PutMapping("update/{id}")
		public ResponseEntity<Appointments> updateAppointment(@PathVariable int id, @RequestBody Appointments appointment){
			Appointments app = appointmentService.getAppointmentById(id);
			app.setAppointmentID(id);
			app.setAppointmentDate(appointment.getAppointmentDate());
			app.setGender(appointment.getGender());
			app.setPaitentName(appointment.getPaitentName());
			app.setDoctor(appointment.getDoctor());
//			app.setDoctorID(appointment.getDoctor());
			return new ResponseEntity<Appointments>(appointmentService.updateAppointment(app), HttpStatus.OK);
	}
	
	@DeleteMapping("delete/{id}")
	public ResponseEntity<String> deleteAppointment(@PathVariable int id){
		Appointments app = appointmentService.deleteAppointment(id);
		if(app != null){
			return new ResponseEntity<String>("Appointment Deleted Successfully....",HttpStatus.OK);
		}
		else{
			return new ResponseEntity<String>("No Data Found!!!!!",HttpStatus.OK);
		}
	}
	
	@GetMapping("count")
	public long count(){
		return appointmentService.allAppointmentscount();
	}
	
	@GetMapping("count/{name}")
	public int appointmentCountByPatientName(@PathVariable String name){
		return appointmentService.appointmentCountByPatientName(name);
	}
	
	@GetMapping("{doctorID}/{status}")
	public ResponseEntity<List<Appointments>> getAppointmentsByDoctorIDandStatus(@PathVariable int doctorID, @PathVariable String status){
		List<Appointments> aptList = appointmentService.getAppointmentsByDoctorIDandStatus(doctorID, status);
		return new ResponseEntity<List<Appointments>>(aptList,HttpStatus.OK);
	}
	
	@Transactional
	@PutMapping("updatestatus/{aptId}/{status}")
	public void updateStatus(@PathVariable int aptId, @PathVariable String status){
		appointmentService.updateStatus(aptId, status);
//		return new ResponseEntity<>(HttpStatus.OK);
	}
		
}
