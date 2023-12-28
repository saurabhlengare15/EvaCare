package com.citiustech.patientappointment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.citiustech.patientappointment.exceptions.LoginFailedException;
import com.citiustech.patientappointment.exceptions.UserNotFoundException;
import com.citiustech.patientappointment.model.Login;
import com.citiustech.patientappointment.repository.LoginRepository;

@Service
public class LoginService {
	
	@Autowired
	private LoginRepository loginRepository;
	
	public boolean doLogin(Login login){
		Login userExist = loginRepository.findByUsername(login.getUsername());
		boolean flag = false;
		
		if(userExist != null){
			if(userExist.getPassword().compareTo(login.getPassword())==0){
				flag = true;
				System.out.println(userExist);
			}else{
				flag = false;
				throw new LoginFailedException();
			}
		}else{
			flag = false;
			throw new UserNotFoundException();
		}
		return flag;
	}
}
