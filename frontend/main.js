window.addEventListener('DOMContentLoaded', () => {
  // 1. Run line-by-line typing reveal
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

// Precise Line-by-Line Printing Effect
const typeLineByLine = () => {
  // Target every individual line/element inside the output blocks
  const selectors = [
    '.frame-container',
    '.banner-text p',
    '.prompt-line',
    '.ios-output > p',
    '.table-header',
    '.table-row'
  ];

  const lines = document.querySelectorAll(selectors.join(', '));

  // Hide all lines initially
  lines.forEach(line => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(2px)';
    line.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
  });

  // Print each line sequentially with a delay
  const lineDelay = 80; // Delay in milliseconds between each line

  lines.forEach((line, index) => {
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
      
      // Auto-scroll to the bottom as new lines print
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
    }, index * lineDelay);
  });
};