package com.citiustech.patientappointment.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.patientappointment.model.Appointments;
import com.citiustech.patientappointment.repository.AppointmentRepository;

@Service
public class AppointmentService {
	
	@Autowired
	private AppointmentRepository appointmentRepository;
	
	public Appointments addAppointment(Appointments appointment){
		appointment.setStatus("pending");
		return appointmentRepository.save(appointment);
	}
	
	public List<Appointments> getAllAppointments(){
		return appointmentRepository.findAll();
	}
	
	public List getApts(){
		return appointmentRepository.findAll();
	}
	
	public Appointments getAppointmentById(int id){
		return appointmentRepository.findByAppointmentID(id);
	}
	
	public List<Appointments> getAppointmentByDoctorId(int did){
		return appointmentRepository.findByDoctorID(did);
	}
	
	public List<Appointments> getAppointmentByPatientName(String name){
		return appointmentRepository.findByPaitentName(name);
	}
	
	public Appointments updateAppointment(Appointments appointment){
		return appointmentRepository.save(appointment);
	}
	
	public Appointments deleteAppointment(int id){
		Appointments existAppointment = getAppointmentById(id);
		if(existAppointment != null){
			appointmentRepository.deleteById(id);
		}
		else{
			System.out.println("no data found");
		}
		return existAppointment;
	}
	
	public long allAppointmentscount(){
		return appointmentRepository.count();
	}
	
	public int appointmentCountByPatientName(String name){
		return appointmentRepository.getCount(name);
	}
	
	public List<Appointments> getAppointmentsByDoctorIDandStatus(int doctorID, String status){
		return appointmentRepository.findByDoctorIDandStatus(doctorID, status);
	}
	
	public void updateStatus(int aptId, String status){
		appointmentRepository.updateStatus(aptId, status);
	}
}
