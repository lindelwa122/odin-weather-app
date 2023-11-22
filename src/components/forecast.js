const forecast = (data) => {
  const item = ({ icon, maxTemp, minTemp, date }) => ({
    children: [
      { 
        tagName: 'img', 
        options: { src: icon, alt: 'Weather Icon', className: 'weather-icon' },
      },
      {
        options: { className: 'temp' },
        children: [
          { text: `+${maxTemp}/`, options: { className: 'max' }},
          { text: `+${minTemp}`, options: { className: 'min' }},
        ]
      },
      { text: '29 Nov', options: { className: 'date'} },
      { text: 'Thursday', options: { className: 'day'} },
    ]
  });

  return {
    options: { className: 'forecast' },
    children: [
      { text: '3 day\'s forecast', options: { className: 'heading' }},
      {
        options: { className: 'content' },
        children: data.map(d => item(d)),
      }
    ]
  }
}

export default forecast;