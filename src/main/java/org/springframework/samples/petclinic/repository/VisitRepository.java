/*
 * Copyright 2002-2013 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package org.springframework.samples.petclinic.repository;

import java.util.List;

import org.joda.time.LocalDate;
import org.joda.time.LocalDateTime;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;
import org.springframework.data.repository.query.Param;
import org.springframework.samples.petclinic.model.BaseEntity;
import org.springframework.samples.petclinic.model.Visit;
import org.springframework.transaction.annotation.Transactional;

/**
 * Repository class for <code>Visit</code> domain objects All method names are
 * compliant with Spring Data naming conventions so this interface can easily be
 * extended for Spring Data See here:
 * http://static.springsource.org/spring-data/jpa/docs/current/reference/html/jpa.repositories.html#jpa.query-methods.query-creation
 *
 * @author Ken Krebs
 * @author Juergen Hoeller
 * @author Sam Brannen
 * @author Michael Isvy
 */
public interface VisitRepository extends Repository<Visit, Integer> {

	/**
	 * Save a <code>Visit</code> to the data store, either inserting or updating
	 * it.
	 *
	 * @param visit
	 *            the <code>Visit</code> to save
	 * @see BaseEntity#isNew
	 */
	void save(Visit visit) throws DataAccessException;

	void delete(Visit visit) throws DataAccessException;

	@Modifying
	@Transactional
	@Query("delete from Visit v where v.id =:visitId")
	void deleteVisitById(@Param("visitId") Integer visitId);

	List<Visit> findByPetId(Integer petId);

	Visit findById(int id);

	@Query("SELECT visit FROM Visit visit WHERE visit.vet.id =:vetId")
	List<Visit> findVisitsByVetId(@Param("vetId") Integer vetId);

	@Query("SELECT visit FROM Visit visit WHERE visit.vet.id =:vetId AND visit.pet.id=:petId AND (:appointmentStart BETWEEN visit.appointmentStart AND visit.appointmentEnd OR :appointmentEnd BETWEEN visit.appointmentStart AND visit.appointmentEnd)")
	List<Visit> findVisitsBySchedule(@Param("petId") int petId, @Param("vetId") int vetId,
			@Param("appointmentStart") LocalDateTime appointmentStart,
			@Param("appointmentEnd") LocalDateTime appointmentEnd);

	@Query("SELECT vet, visit FROM Visit visit, Vet vet WHERE visit.vet.id =:vetId AND vet.id =visit.vet.id AND visit.pet.id=:petId AND visit.date=:date")
	List<Visit> findVisitsByDay(@Param("petId") int petId, @Param("vetId") int vetId, @Param("date") LocalDate date);

}
