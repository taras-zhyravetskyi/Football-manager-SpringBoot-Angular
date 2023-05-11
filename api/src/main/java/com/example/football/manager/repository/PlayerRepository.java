package com.example.football.manager.repository;

import com.example.football.manager.model.Player;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {

    @Query(value = "FROM Player p LEFT JOIN FETCH p.team t WHERE p.id = ?1")
    Optional<Player> findById(Long id);

    @Query(value = "FROM Player p LEFT JOIN FETCH p.team t")
    List<Player> findAll();
}
