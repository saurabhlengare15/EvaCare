package com.citiustech.patientappointment.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.citiustech.patientappointment.config.CustomUserDetails;
import com.citiustech.patientappointment.config.JwtResponse;
import com.citiustech.patientappointment.config.JwtUtil;
import com.citiustech.patientappointment.config.UserDetailsServiceImpl;
import com.citiustech.patientappointment.exceptions.UserNotFoundException;
import com.citiustech.patientappointment.model.Doctor;
import com.citiustech.patientappointment.model.User;
import com.citiustech.patientappointment.repository.UserRepository;
import com.citiustech.patientappointment.service.UserService;

@RestController
@RequestMapping("login")
@CrossOrigin("*")
public class LoginController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	private void authenticate(String username, String password){
		try{
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
		}catch(DisabledException e){
			throw new DisabledException("Uers is Disabled");
		}catch(BadCredentialsException e){
//			throw new Exception("Invalid Credentials "+e.getMessage());
			throw new BadCredentialsException("Bad Credentials!!!!!");
		}
	}
	
	//generate token
	@PostMapping("generate-token")
	public ResponseEntity<?> generateToken(@RequestBody User user){
		try{
			authenticate(user.getUsername(),user.getPassword());
		}catch(UsernameNotFoundException e){
			e.printStackTrace();
			throw new UserNotFoundException();
		}catch(BadCredentialsException b){
			throw new BadCredentialsException("Bad Credentials");
		}
		
		UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(user.getUsername());
		String token = jwtUtil.generateToken(userDetails);
		
		return ResponseEntity.ok(new JwtResponse(token));
	}

	@PostMapping
	public void doLogin(@RequestBody User user){
		userService.doLogin(user);
	}
	
	@GetMapping("current-user")
	public UserDetails getCurrentUser(Principal principal){
		return userDetailsServiceImpl.loadUserByUsername(principal.getName());
	}

//	@Autowired
//	private LoginService loginService;
//	
//	@PostMapping("login")
//	public void doLogin(@RequestBody Login login){
//		loginService.doLogin(login);
//	}
	
//	@PostMapping("login")
//	public ResponseEntity<String> doLogin(@RequestBody Login login){
//		if(loginService.doLogin(login)){
//			return new ResponseEntity<String>("Login Successfull",HttpStatus.OK);
//		}else{
//			return new ResponseEntity<String>("",HttpStatus.UNAUTHORIZED);
//		}
//	}
	
//	@PostMapping("login")
//	public ResponseEntity<String> doLogin(@RequestBody Login login){
//		if(loginService.doLogin(login)){
//			return new ResponseEntity<String>("Login Successfull",HttpStatus.OK);
//		}else{
//			return new ResponseEntity<String>("user not found",HttpStatus.UNAUTHORIZED);
//		}
//	}
}
