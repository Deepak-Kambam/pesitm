package com.gems.server.config;

import com.gems.server.entity.User;
import com.gems.server.entity.UserRole;
import com.gems.server.repository.UserRepository;
import com.gems.server.repository.UserRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private UserRoleRepository roleRepository;

        @Autowired
        private PasswordEncoder encoder;

        @Override
        public void run(String... args) throws Exception {
                // Create Roles if not exist
                createRoleIfNotFound(UserRole.RoleType.ADMIN);
                createRoleIfNotFound(UserRole.RoleType.FACULTY);
                createRoleIfNotFound(UserRole.RoleType.STUDENT);

                // Create Demo Admin
                if (userRepository.findByUsername("admin_demo").isEmpty()) {
                        System.out.println("Creating demo admin user...");
                        User admin = new User();
                        admin.setUsername("admin_demo");
                        admin.setPasswordHash(encoder.encode("admin123"));
                        admin.setEmail("admin@pesitm.edu.in");
                        UserRole adminRole = new UserRole();
                        adminRole.setRoleType(UserRole.RoleType.ADMIN);
                        adminRole.setUser(admin);
                        admin.setRoles(new java.util.ArrayList<>(java.util.List.of(adminRole)));
                        userRepository.save(admin);
                } else {
                        User admin = userRepository.findByUsername("admin_demo").get();
                        if (admin.getRoles() == null || admin.getRoles().isEmpty()) {
                                System.out.println("Fixing missing roles for demo admin...");
                                UserRole adminRole = new UserRole();
                                adminRole.setRoleType(UserRole.RoleType.ADMIN);
                                adminRole.setUser(admin);
                                if (admin.getRoles() == null)
                                        admin.setRoles(new java.util.ArrayList<>());
                                admin.getRoles().add(adminRole);
                                userRepository.save(admin);
                        }
                }

                // Create Demo Faculty
                if (userRepository.findByUsername("faculty_demo").isEmpty()) {
                        System.out.println("Creating demo faculty user...");
                        User faculty = new User();
                        faculty.setUsername("faculty_demo");
                        faculty.setPasswordHash(encoder.encode("faculty123"));
                        faculty.setEmail("faculty@pesitm.edu.in");
                        UserRole facRole = new UserRole();
                        facRole.setRoleType(UserRole.RoleType.FACULTY);
                        facRole.setUser(faculty);
                        faculty.setRoles(new java.util.ArrayList<>(java.util.List.of(facRole)));
                        userRepository.save(faculty);
                } else {
                        User faculty = userRepository.findByUsername("faculty_demo").get();
                        if (faculty.getRoles() == null || faculty.getRoles().isEmpty()) {
                                System.out.println("Fixing missing roles for demo faculty...");
                                UserRole facRole = new UserRole();
                                facRole.setRoleType(UserRole.RoleType.FACULTY);
                                facRole.setUser(faculty);
                                if (faculty.getRoles() == null)
                                        faculty.setRoles(new java.util.ArrayList<>());
                                faculty.getRoles().add(facRole);
                                userRepository.save(faculty);
                        }
                }

                // Create Demo Student
                if (userRepository.findByUsername("student_demo").isEmpty()) {
                        System.out.println("Creating demo student user...");
                        User student = new User();
                        student.setUsername("student_demo");
                        student.setPasswordHash(encoder.encode("student123"));
                        student.setEmail("student@pesitm.edu.in");
                        UserRole studRole = new UserRole();
                        studRole.setRoleType(UserRole.RoleType.STUDENT);
                        studRole.setUser(student);
                        student.setRoles(new java.util.ArrayList<>(java.util.List.of(studRole)));
                        userRepository.save(student);
                } else {
                        User student = userRepository.findByUsername("student_demo").get();
                        if (student.getRoles() == null || student.getRoles().isEmpty()) {
                                System.out.println("Fixing missing roles for demo student...");
                                UserRole studRole = new UserRole();
                                studRole.setRoleType(UserRole.RoleType.STUDENT);
                                studRole.setUser(student);
                                if (student.getRoles() == null)
                                        student.setRoles(new java.util.ArrayList<>());
                                student.getRoles().add(studRole);
                                userRepository.save(student);
                        }
                }
        }

        private void createRoleIfNotFound(UserRole.RoleType type) {
                if (roleRepository.findByRoleType(type).isEmpty()) {
                        UserRole role = new UserRole();
                        role.setRoleType(type);
                        roleRepository.save(role);
                }
        }
}
