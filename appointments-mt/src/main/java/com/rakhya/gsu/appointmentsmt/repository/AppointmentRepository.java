package com.rakhya.gsu.appointmentsmt.repository;

import java.util.List;


import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.rakhya.gsu.appointmentsmt.models.Appointment;


public interface AppointmentRepository extends CrudRepository<Appointment, Integer> {
	
	@Query("SELECT p FROM Appointment p WHERE p.description LIKE %?1%")
	public List<Appointment> find(String description);
}
