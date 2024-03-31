import React, { useState } from 'react';
import axios from 'axios';
import { Flex, Input, Button, Heading, Text, VStack } from '@chakra-ui/react';

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = '1b42e60d95ca0be2861fa6a20e879273';

  const handleInputChange = (event) => {
    setLocation(event.target.value);
  };

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (location.trim() !== '') {
      fetchWeatherData();
    }
  };

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgGradient="linear(to-r, #48C6EF, #6F86D6)"
      color="black"
    >
      <VStack spacing={8} padding={8} bg="whiteAlpha.900" borderRadius="lg" boxShadow="lg">
        <Heading mb={4} color="#6F86D6">
          Weather App
        </Heading>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={handleInputChange}
            mb={4}
            variant="filled"
            borderColor="gray.400"
            borderWidth="2px"
          />
          <Button type="submit" colorScheme="blue">
            Get Weather
          </Button>
        </form>
        {weatherData && (
          <VStack spacing={4} alignItems="center">
            <Heading size="md">Weather in {weatherData.name}</Heading>
            <Text>Temperature: {weatherData.main.temp}°C</Text>
            <Text>Description: {weatherData.weather[0].description}</Text>
            <Text>Humidity: {weatherData.main.humidity}%</Text>
            <Text>Pressure: {weatherData.main.pressure} hPa</Text>
            <Text>Wind Speed: {weatherData.wind.speed} m/s</Text>
            <Text>Cloudiness: {weatherData.clouds.all}%</Text>
            <Text>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</Text>
            <Text>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</Text>
          </VStack>
        )}
      </VStack>
    </Flex>
  );
};

export default WeatherApp;
