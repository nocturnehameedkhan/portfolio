const movies = {
  trending: [
    { title:'Stranger Things', emoji:'👹', bg:'#1a0a0a', genre:'Sci-Fi', match:'98%', year:2016, desc:'Supernatural forces threaten a small town.' },
    { title:'Wednesday', emoji:'🖤', bg:'#0a0a1a', genre:'Mystery', match:'95%', year:2022, desc:'Wednesday Addams navigates her new school.' },
    { title:'The Crown', emoji:'👑', bg:'#1a1600', genre:'Drama', match:'92%', year:2016, desc:'The story of the British Royal Family.' },
    { title:'Squid Game', emoji:'🟢', bg:'#0a1a0a', genre:'Thriller', match:'97%', year:2021, desc:'Desperate players compete in deadly games.' },
    { title:'Dark', emoji:'⏳', bg:'#0a0a0a', genre:'Sci-Fi', match:'94%', year:2017, desc:'Time travel mysteries in a German town.' },
    { title:'Ozark', emoji:'💰', bg:'#001a1a', genre:'Crime', match:'91%', year:2017, desc:'A financial planner launders money for a cartel.' },
  ],
  action: [
    { title:'Extraction', emoji:'💥', bg:'#1a0800', genre:'Action', match:'90%', year:2020, desc:'A mercenary on a dangerous mission.' },
    { title:'The Old Guard', emoji:'⚔️', bg:'#0a001a', genre:'Action', match:'87%', year:2020, desc:'Immortal mercenaries fight through history.' },
    { title:'Army of the Dead', emoji:'🧟', bg:'#1a1a00', genre:'Horror', match:'85%', year:2021, desc:'A zombie heist in Las Vegas.' },
    { title:'Red Notice', emoji:'🔴', bg:'#1a0000', genre:'Action', match:'88%', year:2021, desc:'An FBI agent hunts the world\'s greatest thief.' },
  ],
  comedy: [
    { title:'Emily in Paris', emoji:'🗼', bg:'#1a0a1a', genre:'Comedy', match:'89%', year:2020, desc:'An American in Paris navigates work and love.' },
    { title:'The Good Place', emoji:'😇', bg:'#001a00', genre:'Comedy', match:'96%', year:2016, desc:'A flawed woman ends up in the afterlife.' },
    { title:'Brooklyn Nine-Nine', emoji:'🚔', bg:'#001a1a', genre:'Comedy', match:'93%', year:2013, desc:'Misfit detectives at a New York precinct.' },
    { title:'Schitt\'s Creek', emoji:'🌸', bg:'#0a1a0a', genre:'Comedy', match:'94%', year:2015, desc:'A wealthy family loses everything.' },
  ],
  documentary: [
    { title:'Our Planet', emoji:'🌍', bg:'#001500', genre:'Documentary', match:'99%', year:2019, desc:'David Attenborough explores Earth\'s natural wonders.' },
    { title:'The Last Dance', emoji:'🏀', bg:'#001a1a', genre:'Sports', match:'97%', year:2020, desc:'Michael Jordan and the 90s Chicago Bulls.' },
    { title:'Making a Murderer', emoji:'🔍', bg:'#0a0a00', genre:'True Crime', match:'95%', year:2015, desc:'The story of a controversial murder case.' },
  ]
};

const rowConfig = [
  { id:'trending', title:'🔥 Trending Now', data: movies.trending },
  { id:'action', title:'💥 Action & Adventure', data: movies.action },
  { id:'comedy', title:'😂 Comedy', data: movies.comedy },
  { id:'documentary', title:'🌍 Documentaries', data: movies.documentary },
];

function init() {
  rowConfig.forEach(row => {
    const el = document.getElementById(row.id);
    el.innerHTML = `
      <div class="row-title">${row.title}</div>
      <div class="cards-scroll">
        ${row.data.map(m => `
          <div class="movie-card" onclick="openModal(${JSON.stringify(m).replace(/"/g,'&quot;')})">
            <div class="card-thumb" style="background:${m.bg}">${m.emoji}</div>
            <div class="card-overlay">
              <strong>${m.title}</strong>
              <span>${m.match} Match</span>
              <div class="card-mini-btns">
                <button onclick="event.stopPropagation();alert('Playing: ${m.title}')">▶</button>
                <button onclick="event.stopPropagation()">+</button>
                <button onclick="event.stopPropagation()">👍</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  });
}

function openModal(movie) {
  document.getElementById('modalHero').style.background = movie.bg;
  document.getElementById('modalHero').innerHTML = `<span style="font-size:5rem">${movie.emoji}</span>`;
  document.getElementById('modalMeta').textContent = `${movie.match} Match • ${movie.year} • ${movie.genre}`;
  document.getElementById('modalDesc').textContent = movie.desc;
  document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
}

document.getElementById('modal').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

init();