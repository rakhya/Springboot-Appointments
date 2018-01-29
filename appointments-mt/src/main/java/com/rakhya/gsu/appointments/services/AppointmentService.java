package com.rakhya.gsu.appointments.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rakhya.gsu.appointments.models.Appointment;
import com.rakhya.gsu.appointments.repository.AppointmentRepository;

@Service
public class AppointmentService {

	@Autowired
	private AppointmentRepository appRepo;
	
	public void addApp(Appointment app) {
		appRepo.save(app);
	}
	
	public List<Appointment> getApps(){
		List<Appointment> apps = new ArrayList<>();
		appRepo.findAll().forEach(apps::add);
		return apps;
	}
	
	public List<Appointment> getAppsByDesc(String description){
		return appRepo.find(description);
	}

}
