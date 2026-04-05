function extractKeywords(text) {
  const words = text.toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2);

  // Known tech/skill keywords
  const techKeywords = [
    'javascript','js','python','java','react','angular','vue','node','nodejs','express',
    'html','css','sass','tailwind','bootstrap','sql','mysql','mongodb','postgresql',
    'firebase','aws','docker','kubernetes','git','github','rest','api','graphql',
    'typescript','php','ruby','rails','django','flask','spring','linux','agile',
    'scrum','figma','photoshop','redux','next','nuxt','svelte','webpack','vite',
    'jest','testing','devops','ci/cd','machine learning','ml','ai','data science',
    'c++','c#','swift','kotlin','flutter','react native','firebase','wordpress'
  ];

  const found = new Set();
  // Match exact tech keywords
  words.forEach(w => { if (techKeywords.includes(w)) found.add(w); });

  // Also extract capitalized phrases (e.g., "REST APIs", "Node.js")
  const phraseMatches = text.toLowerCase().match(/\b(rest api|node\.js|react\.js|next\.js|vue\.js|machine learning|data science|ci\/cd|c\+\+|c#)\b/g) || [];
  phraseMatches.forEach(p => found.add(p.replace(/\./g, '')));

  // Multi-word common skills in text
  const multiWord = ['project management','team leadership','problem solving','communication'];
  multiWord.forEach(skill => { if (text.toLowerCase().includes(skill)) found.add(skill); });

  return found;
}

function scanResume() {
  const jobDesc = document.getElementById('jobDesc').value.trim();
  const resume = document.getElementById('resumeText').value.trim();

  if (!jobDesc || !resume) {
    alert('Please fill in both fields!');
    return;
  }

  const jobKeywords = extractKeywords(jobDesc);
  const resumeKeywords = extractKeywords(resume);

  const matched = [...jobKeywords].filter(k => resumeKeywords.has(k));
  const missing = [...jobKeywords].filter(k => !resumeKeywords.has(k));

  const score = jobKeywords.size === 0 ? 0 : Math.round((matched.length / jobKeywords.size) * 100);

  showResults(score, matched, missing);
}

function showResults(score, matched, missing) {
  const results = document.getElementById('results');
  results.classList.remove('hidden');

  let level = 'poor', label = 'Needs Work 😞';
  if (score >= 80) { level = 'excellent'; label = 'Excellent Match! 🏆'; }
  else if (score >= 60) { level = 'good'; label = 'Good Match! 👍'; }
  else if (score >= 40) { level = 'average'; label = 'Average Match 😐'; }

  const tips = [
    `Add these missing skills to your resume if you have them: ${missing.slice(0,3).join(', ') || 'none missing'}.`,
    'Use the exact keywords from the job description — ATS systems scan for exact matches.',
    'Quantify your achievements (e.g., "Improved load time by 40%").',
    'Tailor your resume for each application — don\'t use one resume for all jobs.',
    'Add a skills section at the top of your resume for faster ATS scanning.'
  ];

  results.innerHTML = `
    <div class="score-ring">
      <div class="score-circle ${level}">
        <span>${score}%</span>
      </div>
      <div class="score-label">${label}</div>
      <p style="color:#64748b;margin-top:0.5rem;font-size:0.9rem">
        ${matched.length} of ${matched.length + missing.length} required keywords found
      </p>
    </div>

    <div class="keywords-section">
      <h3>✅ Matched Keywords (${matched.length})</h3>
      <div class="keyword-tags">
        ${matched.length ? matched.map(k => `<span class="kw-tag match">${k}</span>`).join('') : '<span style="color:#94a3b8">No matches found</span>'}
      </div>
    </div>

    <div class="keywords-section" style="margin-top:1rem">
      <h3>❌ Missing Keywords (${missing.length})</h3>
      <div class="keyword-tags">
        ${missing.length ? missing.map(k => `<span class="kw-tag missing">${k}</span>`).join('') : '<span style="color:#28a745">None missing! Great job!</span>'}
      </div>
    </div>

    <div class="tips-section">
      <h3>💡 Tips to Improve Your Score</h3>
      <ul>${tips.map(t => `<li>${t}</li>`).join('')}</ul>
    </div>
  `;

  results.scrollIntoView({ behavior: 'smooth' });
}