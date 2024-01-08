package com.in28minutes.rest.webservices.restfulwebservices.basic;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

//@Configuration
public class BasicAuthenticationSecurityConfiguration {
	
	//filter chain
	@SuppressWarnings("removal")
	@Bean
	public SecurityFilterChain filterchain(HttpSecurity http) throws Exception{
		
		return 
				http
				    .authorizeHttpRequests(
						auth -> 
						     auth
						     //enable access to preflight request
						     .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
						     .anyRequest().authenticated()
						)
				    .httpBasic(Customizer.withDefaults())
			    	//configure stateless api
			    	.sessionManagement(
						session -> session.sessionCreationPolicy
						(SessionCreationPolicy.STATELESS)
						)
				   //disable csrf
				    .csrf().disable()
				    .build();
	}

}
