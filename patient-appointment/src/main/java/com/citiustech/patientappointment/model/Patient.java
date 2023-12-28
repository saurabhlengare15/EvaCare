package com.citiustech.patientappointment.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;

import org.hibernate.annotations.Cascade;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Patient {
	
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "patient_sequence_generator")
    @SequenceGenerator(name = "patient_sequence_generator", sequenceName = "patient_sequence", initialValue = 2001,allocationSize=1)	
	private int id;
	private String name;
	private String gender;
	private String email;
	private String mobileno;
	
	@OneToOne
	private User user;
}
