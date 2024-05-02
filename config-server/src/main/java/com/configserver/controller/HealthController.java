package com.configserver.controller;

public class MyAppHealthCheck implements {

    private static final String HEALTH_CHECK_URL = "http://localhost:8080/health";
    
    public HealthCheckResult check() {
        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpGet httpGet = new HttpGet(HEALTH_CHECK_URL);
            CloseableHttpResponse response = httpClient.execute(httpGet);
            int statusCode = response.getStatusLine().getStatusCode();
            if (statusCode == HttpStatus.SC_OK) {
                return new HealthCheckResult(true, "Application is healthy");
            } else {
                return new HealthCheckResult(false, "Application is not healthy: HTTP " + statusCode);
            }
        } catch (IOException e) {
            return new HealthCheckResult(false, "Application is not healthy: " + e.getMessage());
        }
    }
}
