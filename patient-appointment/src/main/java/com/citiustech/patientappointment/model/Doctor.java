package com.citiustech.patientappointment.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="doctors")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Doctor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "doctor_sequence_generator")
    @SequenceGenerator(name = "doctor_sequence_generator", sequenceName = "doctor_sequence_name", initialValue = 3000,allocationSize=1)
	private int doctorID;
	
	@Column(nullable=false)
	private String firstName;
	
	@Column(nullable=false)
	private String lastName;
	
	@Column(nullable=false)
	private String specialization;
	
	@Column(nullable=false)
	private byte resident;
	
//	@OneToOne
//	private Login login;
	
	@OneToOne
	private User user;
}
