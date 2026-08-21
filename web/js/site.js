(function(){

  var VERIFIED_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>';
  var MODERATION_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>';
  var PLAY_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  var PAUSE_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>';
  var BACK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>';
  var PIN_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="10" r="3"/><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/></svg>';

  var LANGS = [
    { code:"en", label:"English" },
    { code:"kn", label:"ಕನ್ನಡ" },
    { code:"ta", label:"தமிழ்" },
    { code:"te", label:"తెలుగు" }
  ];
  var LANG_NAME = { en:"English", kn:"Kannada", ta:"Tamil", te:"Telugu" };

  var GRADIENTS = {
    Historic:['#E7A94F','#B5492E'], Garden:['#D8B65A','#5E7350'], Institutions:['#DE9166','#7C4A34'],
    Religious:['#F0C25E','#B5722E'], Food:['#E8935A','#A6402B'], Business:['#B69A78','#5C4A38'],
    Wildlife:['#8FA05E','#3E4E2E'], Pilgrimage:['#C9AE8C','#7A5C42']
  };
  var ART_GRAD = { fort:'Historic', garden:'Garden', institution:'Institutions', temple:'Religious', food:'Food', business:'Business', forest:'Wildlife', tiger:'Wildlife', stone:'Pilgrimage' };

  function gradId(kind){ return 'g_' + kind; }
  function ensureGradientDefs(){
    if(document.getElementById('siteGradDefs')) return;
    var svg = document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('width','0'); svg.setAttribute('height','0');
    svg.style.position = 'absolute';
    var defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
    Object.keys(ART_GRAD).forEach(function(kind){
      var colors = GRADIENTS[ART_GRAD[kind]];
      var grad = document.createElementNS('http://www.w3.org/2000/svg','linearGradient');
      grad.setAttribute('id', gradId(kind)); grad.setAttribute('x1','0'); grad.setAttribute('y1','0'); grad.setAttribute('x2','1'); grad.setAttribute('y2','1');
      var s1 = document.createElementNS('http://www.w3.org/2000/svg','stop'); s1.setAttribute('offset','0%'); s1.setAttribute('stop-color', colors[0]);
      var s2 = document.createElementNS('http://www.w3.org/2000/svg','stop'); s2.setAttribute('offset','100%'); s2.setAttribute('stop-color', colors[1]);
      grad.appendChild(s1); grad.appendChild(s2); defs.appendChild(grad);
    });
    svg.id = 'siteGradDefs';
    svg.appendChild(defs);
    document.body.appendChild(svg);
  }

  function art(kind){
    var g = gradId(ART_GRAD[kind] ? kind : 'institution');
    return '<svg viewBox="0 0 300 190" preserveAspectRatio="xMidYMid slice">' +
      '<rect width="300" height="190" fill="url(#' + g + ')"/>' +
      '<rect x="60" y="96" width="180" height="82" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" stroke-width="2.5"/>' +
      '<path d="M78,96 a14,14 0 0 1 28,0 M118,96 a14,14 0 0 1 28,0 M158,96 a14,14 0 0 1 28,0 M198,96 a14,14 0 0 1 28,0" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>' +
      '<path d="M0,178 L300,178" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>' +
    '</svg>';
  }

  var stories = window.ITIHAAS_STORIES || [];
  var categories = ["All","Historic","Religious","Institutions","Food","Business","Wildlife","Pilgrimage"];
  var activeCategory = "All";
  var searchQuery = "";
  var playingId = null;
  var currentLang = "en";
  var activeAudioEl = null;

  function wordSeconds(text){ return Math.max(4, Math.round(text.trim().split(/\s+/).length / 2.1)); }
  function fullNarration(s){ return [s.who, s.how, s.fact].filter(Boolean).join(' '); }
  function fmtTime(sec){ sec = Math.max(0, Math.round(sec)); var m = Math.floor(sec/60); var s = sec%60; return m + ":" + (s<10?"0":"") + s; }

  function barHeights(seed, count, min, max){
    var arr = [];
    for(var i=0;i<count;i++){
      var v = Math.abs(Math.sin(seed*12.9898 + i*4.233));
      arr.push(Math.round(min + v*(max-min)));
    }
    return arr;
  }
  function seedFromId(id){ var s=0; for(var i=0;i<id.length;i++) s += id.charCodeAt(i); return s; }

  function wfInner(id, count, h){
    var seed = seedFromId(id);
    var heights = barHeights(seed, count, Math.round(h*0.25), h);
    var bg = heights.map(function(v){ return '<span style="height:'+v+'px;"></span>'; }).join('');
    return '<div class="wf-row wf-bg">' + bg + '</div><div class="wf-fg wf-row" data-fg="' + id + '">' + bg + '</div>';
  }
  function waveformHtml(id, count, h){ return '<div class="wf-wrap" style="height:'+h+'px;">' + wfInner(id, count, h) + '</div>'; }

  function mediaHtml(s){
    var illustration = art(s.art);
    if(!s.photo) return illustration;
    return illustration +
      '<img src="' + s.photo + '" alt="' + s.title + '" loading="lazy" ' +
      'style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;" ' +
      'onerror="this.style.display=\'none\'">';
  }

  function isVerified(s){ return !!(s.audio && Object.keys(s.audio).length > 0); }

  function recLangsHtml(s){
    var have = Object.keys(s.audio || {});
    if(have.length === 0){
      return '<div class="rec-langs"><span class="mod">Under moderation</span><span class="none">No recorded voice yet, read in English for now</span></div>';
    }
    var html = '<div class="rec-langs">';
    ["kn","ta","te"].forEach(function(code){
      if(have.indexOf(code) === -1) return;
      var cls = (code === currentLang) ? 'have current' : 'have';
      html += '<span class="' + cls + '">' + code.toUpperCase() + '</span>';
    });
    html += '</div>';
    return html;
  }

  function footBadgeHtml(s){
    if(isVerified(s)) return '<span class="mini-seal">' + VERIFIED_ICON + '</span><span>Verified</span>';
    return '<span class="mini-seal mod">' + MODERATION_ICON + '</span><span>Under moderation</span>';
  }

  function cardHtml(s){
    return '' +
      '<div class="card">' +
        '<div class="card-media" onclick="ItihaasSite.openStory(\'' + s.id + '\')">' +
          '<div class="art">' + mediaHtml(s) + '</div>' +
          '<div class="card-toptags"><span>' + s.category + '</span><span>' + s.state + '</span></div>' +
          '<div class="card-scrim"><h3>' + s.title + '</h3><div class="area">' + s.area + ', ' + s.city + '</div></div>' +
        '</div>' +
        '<button class="float-play" data-icon="' + s.id + '" onclick="ItihaasSite.toggleStoryPlay(\'' + s.id + '\')">' + PLAY_ICON + '</button>' +
        '<div class="card-body">' +
          '<p class="snippet">' + s.fact.slice(0, 100) + (s.fact.length > 100 ? '...' : '') + '</p>' +
          '<div class="card-progress">' + waveformHtml(s.id, 22, 20) + '<span class="status" data-status="' + s.id + '">' + fmtTime(wordSeconds(fullNarration(s))) + '</span></div>' +
          recLangsHtml(s) +
          '<div class="card-foot">' + footBadgeHtml(s) + '<span>·</span><span>' + s.photos + ' photos</span></div>' +
        '</div>' +
      '</div>';
  }

  function stripCardHtml(s){
    return '' +
      '<div class="strip-card" onclick="ItihaasSite.openStory(\'' + s.id + '\')">' +
        '<div class="art">' + mediaHtml(s) + '</div><div class="cap"><span>' + s.title + '</span></div>' +
      '</div>';
  }

  function emptyHtml(cat){
    return '' +
      '<div class="empty">' +
        '<div class="stamp">Nothing verified here yet</div>' +
        '<p>No ' + cat.toLowerCase() + ' stories have made it through review in this area. Know one worth telling before it\'s forgotten?</p>' +
        '<a class="btn ghost" href="share.html">Share a memory</a>' +
      '</div>';
  }

  function renderLangSelector(){
    var row = document.getElementById('langRow');
    if(!row) return;
    row.innerHTML = '';
    LANGS.forEach(function(l){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'lang-pill' + (l.code === currentLang ? ' active' : '');
      b.textContent = l.label;
      b.onclick = function(){
        currentLang = l.code;
        renderLangSelector();
        renderGrid();
        if(currentOpenId) openStory(currentOpenId, true);
      };
      row.appendChild(b);
    });
  }

  function renderCategoryChips(){
    var chipsRow = document.getElementById('chipsRow');
    if(!chipsRow) return;
    chipsRow.innerHTML = '';
    categories.forEach(function(cat){
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (cat === activeCategory ? ' active' : '');
      b.textContent = cat;
      b.onclick = function(){
        activeCategory = cat;
        renderCategoryChips();
        renderGrid();
      };
      chipsRow.appendChild(b);
    });
  }

  function renderGrid(){
    var list = document.getElementById('cardList');
    if(!list) return;
    var filtered = stories.filter(function(s){
      var matchesCat = activeCategory === 'All' || s.category === activeCategory;
      var matchesQuery = !searchQuery || (s.title + ' ' + s.area + ' ' + s.city + ' ' + s.state + ' ' + s.narrator).toLowerCase().indexOf(searchQuery) !== -1;
      return matchesCat && matchesQuery;
    });
    list.innerHTML = filtered.length === 0 ? emptyHtml(activeCategory === 'All' ? 'matching' : activeCategory) : filtered.map(cardHtml).join('');
    reflectPlayingState();
  }

  function reflectPlayingState(){
    document.querySelectorAll('[data-icon]').forEach(function(el){
      el.innerHTML = (el.dataset.icon === playingId) ? PAUSE_ICON : PLAY_ICON;
    });
    document.querySelectorAll('[data-status]').forEach(function(el){
      var s = stories.find(function(x){ return x.id === el.dataset.status; });
      if(!s || el.dataset.status === playingId) return;
      el.textContent = fmtTime(wordSeconds(fullNarration(s)));
    });
  }

  function resetWaveform(id){
    document.querySelectorAll('[data-fg="' + id + '"]').forEach(function(fg){
      fg.style.transitionDuration = '0s';
      fg.style.width = '0%';
    });
  }

  function stopPlayback(){
    if(activeAudioEl){ activeAudioEl.pause(); activeAudioEl.src = ''; activeAudioEl = null; }
    window.speechSynthesis && window.speechSynthesis.cancel();
    if(playingId) resetWaveform(playingId);
    playingId = null;
    reflectPlayingState();
  }

  function setStatusText(id, text){
    document.querySelectorAll('[data-status="' + id + '"]').forEach(function(el){ el.textContent = text; });
  }

  function playViaAudio(s, url){
    var audio = new Audio(url);
    activeAudioEl = audio;
    playingId = s.id;
    reflectPlayingState();
    setStatusText(s.id, 'Loading ' + LANG_NAME[currentLang] + '...');

    audio.addEventListener('loadedmetadata', function(){ setStatusText(s.id, '0:00 / ' + fmtTime(audio.duration)); });
    audio.addEventListener('timeupdate', function(){
      if(!audio.duration) return;
      var pct = (audio.currentTime / audio.duration) * 100;
      document.querySelectorAll('[data-fg="' + s.id + '"]').forEach(function(fg){ fg.style.transitionDuration = '0.15s'; fg.style.width = pct + '%'; });
      setStatusText(s.id, fmtTime(audio.currentTime) + ' / ' + fmtTime(audio.duration));
    });
    audio.addEventListener('ended', function(){
      playingId = null; activeAudioEl = null; reflectPlayingState(); resetWaveform(s.id);
      setStatusText(s.id, fmtTime(wordSeconds(fullNarration(s))));
    });
    audio.addEventListener('error', function(){
      setStatusText(s.id, 'Could not load audio'); playingId = null; activeAudioEl = null; reflectPlayingState();
    });
    audio.play();
  }

  function playViaTTS(s, note){
    if(!('speechSynthesis' in window)){ setStatusText(s.id, 'Speech not supported in this browser'); return; }
    var text = fullNarration(s);
    var secs = wordSeconds(text);
    var utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.92;
    playingId = s.id;
    reflectPlayingState();
    setStatusText(s.id, (note ? note + ', ' : '') + 'playing in English');

    document.querySelectorAll('[data-fg="' + s.id + '"]').forEach(function(fg){
      fg.style.transitionDuration = '0s'; fg.style.width = '0%'; void fg.offsetWidth;
      fg.style.transitionDuration = secs + 's'; fg.style.transitionTimingFunction = 'linear'; fg.style.width = '100%';
    });

    utter.onend = function(){
      if(playingId !== s.id) return;
      playingId = null; reflectPlayingState(); resetWaveform(s.id);
      setStatusText(s.id, fmtTime(wordSeconds(text)));
    };
    window.speechSynthesis.speak(utter);
  }

  function toggleStoryPlay(id){
    var s = stories.find(function(x){ return x.id === id; });
    if(!s) return;
    if(playingId === id){ stopPlayback(); return; }
    stopPlayback();
    var recorded = s.audio && s.audio[currentLang];
    if(recorded) playViaAudio(s, recorded);
    else if(currentLang === 'en') playViaTTS(s, null);
    else playViaTTS(s, 'Not recorded in ' + LANG_NAME[currentLang] + ' yet');
  }

  var currentOpenId = null;

  function detailHtml(s){
    var sameCategory = stories.filter(function(x){ return x.id !== s.id && x.category === s.category; });
    var others = stories.filter(function(x){ return x.id !== s.id && x.category !== s.category; });
    var related = sameCategory.concat(others).slice(0, 4);
    var mapUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(s.coords.replace('° N,','').replace('° E',''));

    return '' +
      '<a href="explore.html" class="detail-back" onclick="return ItihaasSite.closeStory(event)">' + BACK_ICON + ' Back to all stories</a>' +
      '<div class="detail-grid">' +
        '<div>' +
          '<div class="detail-media">' +
            '<div class="art">' + mediaHtml(s) + '</div>' +
            '<div class="tags"><span>' + s.category + '</span><span>' + s.state + '</span></div>' +
            '<button class="float-play" data-icon="' + s.id + '" onclick="ItihaasSite.toggleStoryPlay(\'' + s.id + '\')">' + PLAY_ICON + '</button>' +
          '</div>' +
          '<div class="related-label">More like this</div>' +
          '<div class="strip">' + related.map(stripCardHtml).join('') + '</div>' +
        '</div>' +
        '<div>' +
          '<h1>' + s.title + '</h1><div class="loc">' + s.area + ', ' + s.city + '</div>' +
          '<div class="mod-status ' + (isVerified(s) ? 'is-verified' : 'is-mod') + '">' +
            (isVerified(s) ? '<span class="mini-seal">' + VERIFIED_ICON + '</span> Verified, checked against evidence and context'
              : '<span class="mini-seal mod">' + MODERATION_ICON + '</span> Under moderation, no recorded voice yet, curators are reviewing this one') +
          '</div>' +
          recLangsHtml(s) +
          '<div class="player-card">' +
            '<div class="wf-wrap" style="height:30px;">' + wfInner(s.id, 40, 30) + '</div>' +
            '<div class="status-row"><span data-status="' + s.id + '">' + fmtTime(wordSeconds(fullNarration(s))) + '</span><span>' + LANG_NAME[currentLang] + '</span></div>' +
          '</div>' +
          '<div class="narr-block"><div class="narr-label">Who they are</div><p>' + s.who + '</p></div>' +
          '<div class="narr-block"><div class="narr-label">How they know it</div><p>' + s.how + '</p></div>' +
          '<div class="narr-block fact"><div class="narr-label">The story</div><p>' + s.fact + '</p></div>' +
          '<div class="narrator-row"><div class="narrator-avatar"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg></div><div class="txt">' + s.narrator + '</div></div>' +
          '<div class="info-grid">' +
            '<div class="info-cell"><div class="k">Area</div><div class="v">' + s.area + '</div></div>' +
            '<div class="info-cell"><div class="k">State</div><div class="v">' + s.state + '</div></div>' +
            '<div class="info-cell"><div class="k">Coordinates</div><div class="v">' + s.coords + '</div></div>' +
            '<div class="info-cell"><div class="k">Photos attached</div><div class="v">' + s.photos + '</div></div>' +
          '</div>' +
          '<a class="btn ghost map-link" href="' + mapUrl + '" target="_blank" rel="noopener">' + PIN_ICON + ' Get directions</a>' +
        '</div>' +
      '</div>';
  }

  function openStory(id, silent){
    var s = stories.find(function(x){ return x.id === id; });
    if(!s) return;
    currentOpenId = id;
    document.getElementById('storyDetail').innerHTML = detailHtml(s);
    document.getElementById('storyDetail').classList.add('open');
    document.getElementById('exploreGridView').style.display = 'none';
    window.scrollTo(0,0);
    if(!silent && history.pushState) history.pushState({story:id}, '', 'explore.html?story=' + id);
    reflectPlayingState();
  }

  function closeStory(e){
    if(e) e.preventDefault();
    currentOpenId = null;
    stopPlayback();
    document.getElementById('storyDetail').classList.remove('open');
    document.getElementById('storyDetail').innerHTML = '';
    document.getElementById('exploreGridView').style.display = '';
    if(history.pushState) history.pushState({}, '', 'explore.html');
    return false;
  }

  function initExplore(){
    ensureGradientDefs();
    renderLangSelector();
    renderCategoryChips();
    var search = document.getElementById('searchInput');
    if(search) search.addEventListener('input', function(e){ searchQuery = e.target.value.toLowerCase(); renderGrid(); });
    renderGrid();

    var params = new URLSearchParams(location.search);
    var storyId = params.get('story');
    if(storyId) openStory(storyId, true);

    window.addEventListener('popstate', function(){
      var p = new URLSearchParams(location.search);
      var id = p.get('story');
      if(id) openStory(id, true); else closeStory();
    });
  }

  function initPreview(containerId, count){
    ensureGradientDefs();
    var el = document.getElementById(containerId);
    if(!el) return;
    el.innerHTML = stories.slice(0, count).map(cardHtml).join('');
    reflectPlayingState();
  }

  function initShareForm(){
    var form = document.getElementById('shareForm');
    if(!form) return;
    form.addEventListener('submit', function(e){
      e.preventDefault();
      document.getElementById('confirmBanner').classList.add('show');
      form.reset();
      window.scrollTo(0,0);
    });
  }

  window.ItihaasSite = {
    toggleStoryPlay: toggleStoryPlay,
    openStory: openStory,
    closeStory: closeStory,
    initExplore: initExplore,
    initPreview: initPreview,
    initShareForm: initShareForm
  };

})();
