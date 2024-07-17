import getLocation from "./getLoc.js";
import chalk from "chalk";

export default async function getWeather(spinner) {
  const loc = await getLocation();
  const apikey = "d288ddcbf4164c50b5e94325242605";
  const currentTimeEpoch = Math.floor(Date.now() / 1000);

  const resp = await fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${loc.city}&days=7&alerts=yes&aqi=yes`,
  );

  const weatherData = await resp.json();
  const upcomingHours = weatherData.forecast.forecastday[0].hour.filter(
    (hour) => hour.time_epoch > currentTimeEpoch,
  );

  spinner.success();

  // console.log(weatherData);
  // console.log(upcomingHours);

  console.log(`
    ${chalk.bgGreen(chalk.black(" " + weatherData.location.name + ", " + weatherData.location.country + " "))}

    ${weatherData.current.condition.text} ${Math.floor(weatherData.current.temp_c)}°C
    Feels like ${weatherData.current.feelslike_c}°C

    ${chalk.bgRgb(255, 203, 164)(chalk.black(" " + upcomingHours[0].time.slice(-5) + " "))} ${upcomingHours[0].condition.text}, ${Math.floor(upcomingHours[0].temp_c)}°C
    ${chalk.bgRgb(255, 203, 164)(chalk.black(" " + upcomingHours[1].time.slice(-5) + " "))} ${upcomingHours[1].condition.text}, ${Math.floor(upcomingHours[1].temp_c)}°C
    ${chalk.bgRgb(255, 203, 164)(chalk.black(" " + upcomingHours[2].time.slice(-5) + " "))} ${upcomingHours[2].condition.text}, ${Math.floor(upcomingHours[2].temp_c)}°C

    Chance of rain: ${weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%

    Use ${chalk.bgBlue("https://weather.aapelix.dev/?q=" + weatherData.location.name)} for more information

    `);
}
