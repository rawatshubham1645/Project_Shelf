package com.masai.projectshelf.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.masai.projectshelf.repository.UserRepository;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtil jwtUtil;


    // Create BCryptPasswordEncoder bean
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable()
        	.cors(Customizer.withDefaults())
            .authorizeRequests()
            .antMatchers(
                    "/api/users/register/**",
                    "/api/users/forgot-password/**",
                    "/api/users/login",               
                    "/swagger-ui/**",
                    "/v3/api-docs/swagger-config",
                    "/v3/api-docs",
                    "/actuator/**",
                    "/public/**"
                ).permitAll()
//            .antMatchers(HttpMethod.PUT, "/api/users/profile").hasAnyAuthority("ADMIN")
//            .antMatchers(HttpMethod.GET, "/api/users/profile").hasAnyAuthority("ADMIN")
//            .antMatchers(HttpMethod.PUT, "/api/users/aws-get-url").hasAnyAuthority("ADMIN")
//            .antMatchers(HttpMethod.GET, "/api/users/aws-get-url").hasAnyAuthority("ADMIN")
//            .antMatchers(HttpMethod.POST, "/api/files/upload").hasAnyAuthority("ADMIN")
            .anyRequest().authenticated()
            .and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // ✅ stateless session
            .and()
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    } 
}