package com.citiustech.patientappointment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.patientappointment.config.UserDetailsServiceImpl;
import com.citiustech.patientappointment.model.User;
import com.citiustech.patientappointment.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	
	public void doLogin(User user){
		userDetailsServiceImpl.loadUserByUsername(user.getUsername());
	}
}
