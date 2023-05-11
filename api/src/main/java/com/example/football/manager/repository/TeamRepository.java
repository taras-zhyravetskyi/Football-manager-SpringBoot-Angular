package com.example.football.manager.repository;

import com.example.football.manager.model.Team;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
    @Override
    @Query(value = "FROM Team t LEFT JOIN FETCH t.players p WHERE t.id = ?1")
    Optional<Team> findById(Long id);

    @Override
    @Query(value = "SELECT DISTINCT t FROM Team t LEFT JOIN FETCH t.players")
    List<Team> findAll();
}
