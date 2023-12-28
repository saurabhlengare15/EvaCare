package com.citiustech.patientappointment.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalHandler {
	
	@ExceptionHandler(LoginFailedException.class)
	public ResponseEntity<String> throwLoginFailedException(){
		return new ResponseEntity<String>("Password is Incorrect....",HttpStatus.UNAUTHORIZED);
	}
	
	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<String> throwUserNotFoundException(){
		return new ResponseEntity<String>("User not Found",HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<String> handleException(BadCredentialsException exception){
		return new ResponseEntity<String>("Invalid Credentials",HttpStatus.NOT_FOUND);
	}
}
