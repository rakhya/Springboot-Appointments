package com.rakhya.gsu.appointments.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.rakhya.gsu.appointments.models.Appointment;
import com.rakhya.gsu.appointments.services.AppointmentService;

@CrossOrigin
@RestController
public class AppointmentRestController {

	@Autowired
	private AppointmentService appService;
	
	@RequestMapping(value="api/add/appointment", method=RequestMethod.POST)
	public void addAppointment(@RequestBody Appointment app) {
		appService.addApp(app);
	}
	
	@RequestMapping(value="api/appointments", method=RequestMethod.GET)
	public List<Appointment> getAppointments() {
		return appService.getApps();
	}
	
	@RequestMapping(value="api/test", method=RequestMethod.GET)
	public String testAPI() {
		return "hello";
	}
	
	@RequestMapping(value="api/appointments/{desc}", method=RequestMethod.GET)
	public List<Appointment> getAppointmentsByDesc(@PathVariable("desc") String description) {
		return appService.getAppsByDesc(description);
	}
	
}
