import { format } from 'date-fns';

const currentWeather = (current, scale) => ({
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
      text: `${current.temp} \u00B0${scale === 'celsius' ? 'C' : 'F'}`,
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
        <div>${format(current.date, 'PPP')}, <span class="time">${format(current.date, 'p')}</span></div>`,
      }
    }
  ]
});

export default currentWeather;