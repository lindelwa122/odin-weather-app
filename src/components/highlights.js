const highlights = (info) => {
  const item = ({ title, data }) => ({
    children: [
      { text: title, options: { className: 'title' } },
      { options: {
        className: 'info',
        innerHTML: `<span>${data}</span> <span class="symbol">%</span>`
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