window.addEventListener('DOMContentLoaded', () => {
  // 1. Run line-by-line typing reveal without scrolling
  typeLineByLine();

  // 2. Fetch Visitor Count
  getVisitCount();

  // 3. Bounce Badges
  const badges = document.querySelectorAll('.badge-bounce');
  badges.forEach((badge, index) => {
    setTimeout(() => {
      badge.classList.add('badge-bounce');
    }, index * 100);
  });
});

// Azure Function Visitor Counter API
const functionApiUrl = 'https://getresumecounterweb.azurewebsites.net/api/GetResumeCounter?code=7gVzmgzs2j85aLXc3erxe9TpsNVXlFqolML1jIxRKBXuAzFuSt58YQ%3D%3D';

const getVisitCount = () => {
  let count = 30;

  fetch(functionApiUrl)
    .then(response => response.json())
    .then(data => {
      console.log("Website called function API.");
      count = data.count;
      const counterEl = document.getElementById("counter");
      if (counterEl) {
        counterEl.innerText = count;
      }
    })
    .catch(error => {
      console.error("Visitor Counter API Error:", error);
    });

  return count;
};

// Line-by-Line Printing (Anchored to top)
const typeLineByLine = () => {
  // Ensure the browser always stays pinned to the top on page load
  window.scrollTo(0, 0);

  const selectors = [
    '.copilot-header',
    '.frame-container',
    '.banner-text p',
    '.prompt-line',
    '.ios-output > p',
    '.table-header',
    '.table-row'
  ];

  const lines = document.querySelectorAll(selectors.join(', '));

  // Hide lines initially
  lines.forEach(line => {
    line.style.opacity = '0';
    line.style.transition = 'opacity 0.12s ease';
  });

  // Reveal sequentially
  const lineDelay = 60;

  lines.forEach((line, index) => {
    setTimeout(() => {
      line.style.opacity = '1';
    }, index * lineDelay);
  });
};