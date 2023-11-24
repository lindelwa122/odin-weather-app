import { store } from 'dom-wizard';
import dialog from '@lindelwa122/dropdown-menu';

const navbar = (country, city) => {
  const leftDiv = () => {
    const location = {
      options: { className: 'location' },
      children: [
        { tagName: 'i', options: { classList: ['bi', 'bi-geo-alt-fill' ]}},
        { text: `${city}, ${country}`}
      ]
    };

    const form = {
      tagName: 'form',
      options: { 
        className: 'search-city',
        onsubmit: (e) => {
          e.preventDefault();
          const city = e.target[0].value;
          store.getState('updateCity')(city);
        },
      },
      children: [
        {
          tagName: 'input',
          options: {
            type: 'search',
            name: 'city',
            id: 'city',
            placeholder: 'Search City',
            required: true,
          }
        },
        {
          tagName: 'button',
          options: { innerHTML: '<i class="bi bi-search"></i>' }
        }
      ]
    }

    return { children: [location, form] };
  } 

  const rightDiv = () => {
    const clickHandler = (e) => {
      const scale = e.target.innerText;
      store.getState('updateScale')(scale.toLowerCase());
    };

    return {
      options: { className: 'temperature-options' },
      after: () => {
        const preferences = dialog(
          'Scale',
          ['Celsius', 'Fahrenheit'],
          clickHandler
        );
        preferences.append('nav .temperature-options')
      }
    }
  };

  return { tagName: 'nav', children: [leftDiv(), rightDiv()]};
}

export default navbar;