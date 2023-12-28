package com.citiustech.patientappointment.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientLoginDTO {
	
	private String name;
	private String gender;
	private String email;
	private String mobileno;
	private String username;
	private String password;
}
