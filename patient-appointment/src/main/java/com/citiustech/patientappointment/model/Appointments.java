package com.citiustech.patientappointment.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;

import lombok.AllArgsConstructor;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Appointments {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "appointment_sequence_generator")
    @SequenceGenerator(name = "appointment_sequence_generator", sequenceName = "appointment_sequence_name", initialValue = 1000,allocationSize=1)
	private int appointmentID;
	
	@Column(nullable=false)
	private String paitentName;
	
	@Column(nullable=false)
	private String gender;
	
	@Column(nullable=false)
	private Date appointmentDate;
	
	@ManyToOne
	@JoinColumn(name="doctorID")
	private Doctor doctor;
	
	@Column(nullable=false)
	private String status;
	
}
