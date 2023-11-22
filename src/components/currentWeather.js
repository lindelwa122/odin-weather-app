const currentWeather = (current) => ({
  options: { className: 'weather-current' },

  children: [
    {
      tagName: 'img',
      options: {
        src: current.icon,
        className: 'weather-icon',
        alt: 'Weather Icon',
      },
    },

    {
      text: `${current.temp}&deg C`,
      options: { className: 'temp' },
    },

    {
      text: current.condition,
      options: { className: 'condition' },
    },

    { tagName: 'hr' },

    {
      options: {
        className: 'location',
        innerHTML: `<i class="bi bi-geo-alt"></i>
        <span>${current.city}, ${current.country}</span>`,
      }
    },

    {
      options: {
        className: 'date',
        innerHTML: `<i class="bi bi-calendar-week"></i>
        <div>22 Nov 2023, <span class="time">08:52</span></div>`,
      }
    }
  ]
});

export default currentWeather;