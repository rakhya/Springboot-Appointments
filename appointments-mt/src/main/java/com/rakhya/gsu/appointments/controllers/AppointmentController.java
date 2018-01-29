package com.rakhya.gsu.appointments.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AppointmentController {

	@RequestMapping("/")
	public String homePage() {
		return "appointments";
	}
}
