package com.citiustech.patientappointment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.citiustech.patientappointment.model.Appointments;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointments, Integer> {
	@Query(value="select * from appointments where doctorid=?1",nativeQuery=true)
	public List<Appointments> findByDoctorID(int doctorID);
	public Appointments findByAppointmentID(int id);
	public List<Appointments> findByPaitentName(String name);
	
	@Query(value="select count(*) from appointments where paitent_name=?1",nativeQuery=true)
	public int getCount(String name);
	
	@Query(value="select * from appointments where doctorid=?1 and status=?2",nativeQuery=true)
	public List<Appointments> findByDoctorIDandStatus(int doctorID, String status);
	
	@Modifying
	@Query(value="update appointments set status=?2 where appointmentid=?1",nativeQuery=true)
	public void updateStatus(int aptId, String status);
}
