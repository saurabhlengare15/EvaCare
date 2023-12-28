package com.citiustech.patientappointment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorLoginDTO {
	
	private String firstName;
	private String lastName;
	private String specialization;
	private byte resident;
	private String username;
	private String password;
}
