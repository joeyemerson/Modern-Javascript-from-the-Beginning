class Weather {
  constructor(city, state) {
    this.apiKey = '267ec6ca4591b78b10d5dc958023e55a';
    this.city = city;
    this.state = state;
  }

  // fetch weather from api
  async getWeather() {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.state}&units=imperial&appid=${this.apiKey}`
    );

    const responseData = await response.json();
    return responseData;
  }

  changeLocation(city, state) {
    this.city = city;
    this.state = state;
  }
}
