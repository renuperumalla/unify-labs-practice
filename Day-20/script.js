// Day 20 Logic Practice
console.log('Lab Session 20 Started');

const display = document.getElementById('display');
display.innerText = 'Logic Engine Online';

// Practice your JS code here...
import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.awt.Desktop;
import java.util.concurrent.CompletableFuture;

public class WeatherDashboard extends JFrame {

    private JTextField cityField;
    private JTextArea resultArea;
    private JLabel loadingLabel;

    private final HttpClient client = HttpClient.newHttpClient();

    public WeatherDashboard() {
        setTitle("Real-Time Weather Dashboard");
        setSize(500, 400);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        setLayout(new BorderLayout());

        // Top Panel
        JPanel topPanel = new JPanel();
        cityField = new JTextField(15);
        JButton searchButton = new JButton("Get Weather");
        JButton wmoButton = new JButton("Open WMO Website");

        topPanel.add(new JLabel("City: "));
        topPanel.add(cityField);
        topPanel.add(searchButton);
        topPanel.add(wmoButton);

        add(topPanel, BorderLayout.NORTH);

        // Center Area
        resultArea = new JTextArea();
        resultArea.setEditable(false);
        add(new JScrollPane(resultArea), BorderLayout.CENTER);

        // Loading Label
        loadingLabel = new JLabel(" ");
        loadingLabel.setHorizontalAlignment(SwingConstants.CENTER);
        add(loadingLabel, BorderLayout.SOUTH);

        // Button Actions
        searchButton.addActionListener(this::fetchWeather);
        wmoButton.addActionListener(e -> openWMO());
    }

    private void fetchWeather(ActionEvent event) {
        String city = cityField.getText().trim();
        if (city.isEmpty()) {
            JOptionPane.showMessageDialog(this, "Please enter a city.");
            return;
        }

        loadingLabel.setText("Loading weather data...");
        resultArea.setText("");

        try {
            // Step 1: Get Coordinates
            String geoUrl = "https://geocoding-api.open-meteo.com/v1/search?name=" + city + "&count=1";
            HttpRequest geoRequest = HttpRequest.newBuilder()
                    .uri(URI.create(geoUrl))
                    .GET()
                    .build();

            client.sendAsync(geoRequest, HttpResponse.BodyHandlers.ofString())
                    .thenCompose(geoResponse -> {
                        String geoBody = geoResponse.body();

                        if (!geoBody.contains("latitude")) {
                            throw new RuntimeException("City not found.");
                        }

                        // Simple parsing (basic extraction)
                        double lat = Double.parseDouble(
                                geoBody.split("\"latitude\":")[1].split(",")[0]);
                        double lon = Double.parseDouble(
                                geoBody.split("\"longitude\":")[1].split(",")[0]);

                        String weatherUrl =
                                "https://api.open-meteo.com/v1/forecast?latitude="
                                        + lat + "&longitude=" + lon
                                        + "&current_weather=true";

                        HttpRequest weatherRequest = HttpRequest.newBuilder()
                                .uri(URI.create(weatherUrl))
                                .GET()
                                .build();

                        return client.sendAsync(weatherRequest,
                                HttpResponse.BodyHandlers.ofString());
                    })
                    .thenAccept(weatherResponse -> {
                        String weatherBody = weatherResponse.body();

                        String temperature = weatherBody.split("\"temperature\":")[1].split(",")[0];
                        String windspeed = weatherBody.split("\"windspeed\":")[1].split(",")[0];

                        SwingUtilities.invokeLater(() -> {
                            resultArea.setText(
                                    "Temperature: " + temperature + " °C\n" +
                                    "Wind Speed: " + windspeed + " km/h\n\n" +
                                    "Source: Open-Meteo API"
                            );
                            loadingLabel.setText(" ");
                        });
                    })
                    .exceptionally(ex -> {
                        SwingUtilities.invokeLater(() -> {
                            resultArea.setText("Error: " + ex.getMessage());
                            loadingLabel.setText(" ");
                        });
                        return null;
                    });

        } catch (Exception e) {
            resultArea.setText("Error: " + e.getMessage());
            loadingLabel.setText(" ");
        }
    }

    private void openWMO() {
        try {
            Desktop.getDesktop().browse(
                    new URI("https://worldweather.wmo.int/en/home.html"));
        } catch (Exception e) {
            JOptionPane.showMessageDialog(this,
                    "Unable to open website.");
        }
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            new WeatherDashboard().setVisible(true);
        });
    }
}