package com.rakhya.gsu.appointments.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.rakhya.gsu.appointments.models.Appointment;
import com.rakhya.gsu.appointments.services.AppointmentService;

@Controller
public class AppointmentController {
	
	@Autowired
	private AppointmentService appointmentService;
	
	@RequestMapping("/")
	public String homePage() {
		return "appointments";
	}
	
	@RequestMapping(value="/",method=RequestMethod.POST)
	public String postData(@RequestParam("date") String date,@RequestParam("time") String time,@RequestParam("desc") String desc) {
		Appointment appointment = new Appointment(date,time,desc);
		System.out.println("Testing the method");
		appointmentService.addApp(appointment);
		return "appointments";
	}
	
	
}
