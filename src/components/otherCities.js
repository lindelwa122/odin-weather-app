const otherCities = (data, scale) => {
  const upper = (city, country, icon) => ({
    children: [
      { options: { 
        innerHTML: `
          <div class="country">${country}</div>
          <div class="city">${city}</div>
        `,
      }},
      {
        tagName: 'img',
        options: {
          src: icon,
          className: 'weather-icon',
          alt: 'Weather Icon',
        }
      }
    ]
  });

  const lower = (temp, condition) => ({
    children: [
      { text: condition, options: { className: 'condition' }},
      { text: `${temp} \u00B0${scale === 'celsius' ? 'C' : 'F'}`, options: { className: 'temp' }}
    ]
  })

  const city = ({ city, country, icon, temp, condition }) => ({
    children: [
      upper(city, country, icon),
      lower(temp, condition),
    ]
  });

  return {
    options: { className: 'other-large-cities' },
    children: [
      { text: 'Other large cities', options: { className: 'heading'}},
      { 
        options: { className: 'content' },
        children: data.map(d => city(d)),
      }
    ]
  }
}

export default otherCities;
