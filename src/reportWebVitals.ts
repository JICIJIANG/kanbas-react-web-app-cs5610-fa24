const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals')
      .then((webVitals) => {
        console.log(webVitals);  

        const { getCLS, getFID, getFCP, getLCP, getTTFB } = webVitals;
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      })
      .catch((err) => console.error('Failed to load web-vitals:', err));
  }
};

export default reportWebVitals;

