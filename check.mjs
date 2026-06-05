import https from 'https';

https.get('https://www.h2designml.com/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const lines = data.split('\n');
    lines.forEach(line => {
      if (line.includes('og:image') || line.includes('favicon') || line.includes('apple-touch-icon')) {
        console.log(line.trim());
      }
    });
  });
}).on('error', err => {
  console.log('Error: ', err.message);
});

https.get('https://www.h2designml.com/assets/og-image.jpg', (res) => {
  console.log('og-image.jpg status:', res.statusCode);
});

https.get('https://www.h2designml.com/favicon.png', (res) => {
  console.log('favicon.png status:', res.statusCode);
});
