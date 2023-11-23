const highlights = (info) => {
  const item = ({ title, data, symbol, icon }) => ({
    children: [
      { text: title, options: { className: 'title' } },
      { options: {
        className: 'info',
        innerHTML: `<div>
          <span>${data}</span> <span class="symbol">${symbol}</span>
        </div><i class='bi ${icon}'></i>`
      } },
    ]
  });

  return {
    options: { className: 'additional-info' },
    children: [
      { text: 'Today\'s Highlight', options: { className: 'heading' } },
      { 
        options: { className: 'content' },
        children: info.map(i => item(i)),
      }
    ] 
  }
} 

export default highlights;