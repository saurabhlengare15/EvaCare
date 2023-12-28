package com.citiustech.patientappointment.config;

import org.apache.tomcat.util.buf.UEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled=true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private UserDetailsServiceImpl userDetailsServiceImpl;
	
	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;
	
	@Autowired
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	
//	@Bean
//	public UserDetailsService getUserDetailsService(){
//		return new UserDetailsServiceImpl();
//	}
//	
	@Bean
	public BCryptPasswordEncoder passwordEncoder(){
		return new BCryptPasswordEncoder();
	}
	
//	@Bean
//	public DaoAuthenticationProvider authenticationProvider(){
//		DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
//		
//		daoAuthenticationProvider.setUserDetailsService(getUserDetailsService());
//		daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
//		
//		return daoAuthenticationProvider;
//	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsServiceImpl).passwordEncoder(passwordEncoder());
//		auth.authenticationProvider(authenticationProvider());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.csrf()
		.disable()
		.cors()
		.disable()
		.authorizeRequests()
		.antMatchers("/login/generate-token","/doctor/add","/doctor/all","/doctor/count","/patient/all","/login/current-user","/patient/add").permitAll()
//		.antMatchers("/doctor/username/**").hasAuthority("doctor")
//		.antMatchers("/appointment/patient/**").hasAuthority("patient")
		.antMatchers(HttpMethod.OPTIONS).permitAll()
		.anyRequest().authenticated()
		.and()
//		.exceptionHandling()
		.exceptionHandling().authenticationEntryPoint(unauthorizedHandler)
		.and()
		.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		
		http.addFilterBefore(jwtAuthenticationFilter,UsernamePasswordAuthenticationFilter.class);
//		.antMatcher("/generate-token","/doctor/add").permitAll();
//		.antMatchers("/doctor/all").permitAll()
//		.antMatchers("doctor/count").permitAll()
//		.antMatchers("doctor/add").permitAll()
//		.antMatchers("doctor/{id}").hasRole("doctor")
//		.antMatchers("appointment/add").hasRole("patient")
//		.antMatchers("appointment/count/{name}").hasRole("patient")
//		.antMatchers("appointment/{id}").hasRole("patient")
//		.antMatchers("appointment/patient/{name}").hasRole("patient")
//		.antMatchers("appointment/delete/{id}").hasRole("patient")
//		.antMatchers("appointment/update/{id}").hasRole("patient")
//		.antMatchers("appointment/doctor/{id}").hasRole("doctor")
//		.antMatchers("appointment/{id}/{status}").hasRole("doctor")
//		.antMatchers("appointment/updatestatus/{id}/{status}").hasRole("doctor")
//		.antMatchers("/**").permitAll()
//		.and().formLogin().loginPage("/doctorlogin")
	}
	
	
	
//	@Bean
//	public UserDetailsService userDetailsService(){
//		UserDetails admin = User.withUsername("admin")
//								.password(passwordEncoder().encode("admin"))
//								.roles("ADMIN")
//								.build();
//		
//		UserDetails patient = User.withUsername("saurabh")
//									.password(passwordEncoder().encode("password123"))
//									.roles("NORMAL")
//									.build();
//		
//		InMemoryUserDetailsManager inMemoryUserDetailsManager = new InMemoryUserDetailsManager(admin,patient);
//		return inMemoryUserDetailsManager;
//	}
	
//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception{
//		httpSecurity.csrf().disable()
////		httpSecurity
//		.authorizeHttpRequests()
////		.antMatchers("/combine/**")
////		.permitAll()
//////		.antMatchers("/doctor/**","/appointment/**")
////		
////		//for admin to access doctor as well as appointment
////		.antMatchers("/doctor/**")
////		.hasRole("ADMIN")
////		
////		// for patients to access only appointments
////		.antMatchers("/appointment/**")
////		.hasRole("NORMAL")
//		
//		.antMatchers("/**")
//		.permitAll()
//		.anyRequest()
//		.authenticated()
//		.and()
//		.formLogin();
//		return httpSecurity.build();
//	}
}
