(function(){

  var VERIFIED_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>';
  var MODERATION_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></svg>';
  var PLAY_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  var PAUSE_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>';
  var BACK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>';
  var PIN_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="10" r="3"/><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/></svg>';

  var LANGS = [
    { code:"en", label:"English" },
    { code:"kn", label:"ಕನ್ನಡ" },
    { code:"ta", label:"தமிழ்" },
    { code:"te", label:"తెలుగు" }
  ];
  var LANG_NAME = { en:"English", kn:"Kannada", ta:"Tamil", te:"Telugu" };

  function art(kind){
    if(kind === 'fort'){
      return '<svg viewBox="0 0 300 190" preserveAspectRatio="xMidYMid slice">' +
        '<rect width="300" height="190" fill="url(#gradHistoric)"/>' +
        '<circle cx="252" cy="42" r="22" fill="rgba(255,255,255,0.16)"/>' +
        '<circle cx="252" cy="42" r="13" fill="rgba(255,255,255,0.3)"/>' +
        '<path d="M64,178 L64,104 A46,46 0 0 1 156,104 L156,178" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.55)" stroke-width="2.5"/>' +
        '<path d="M84,178 L84,116 M104,178 L104,110 M124,178 L124,110 M140,178 L140,116" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>' +
        '<path d="M20,178 L280,178" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>' +
        '<path d="M195,140 q6,-11 12,0 q6,11 12,0" fill="none" stroke="rgba(255,255,255,0.6)" stroke-width="2"/>' +
        '<path d="M215,124 q6,-11 12,0 q6,11 12,0" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="2"/>' +
      '</svg>';
    }
    if(kind === 'garden'){
      return '<svg viewBox="0 0 300 190" preserveAspectRatio="xMidYMid slice">' +
        '<rect width="300" height="190" fill="url(#gradGarden)"/>' +
        '<path d="M110,178 L110,120 A40,55 0 0 1 190,120 L190,178" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.55)" stroke-width="2.5"/>' +
        '<path d="M150,60 L150,120 M150,68 L112,120 M150,68 L188,120 M150,74 L128,120 M150,74 L172,120" stroke="rgba(255,255,255,0.45)" stroke-width="1.6" fill="none"/>' +
        '<path d="M118,178 L118,140 M134,178 L134,138 M150,178 L150,136 M166,178 L166,138 M182,178 L182,140" stroke="rgba(255,255,255,0.3)" stroke-width="1.6"/>' +
        '<circle cx="52" cy="150" r="16" fill="rgba(255,255,255,0.28)"/><rect x="49" y="160" width="6" height="18" fill="rgba(255,255,255,0.28)"/>' +
        '<circle cx="248" cy="145" r="19" fill="rgba(255,255,255,0.28)"/><rect x="245" y="158" width="6" height="20" fill="rgba(255,255,255,0.28)"/>' +
        '<path d="M0,178 L300,178" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>' +
      '</svg>';
    }
    if(kind === 'temple'){
      return '<svg viewBox="0 0 300 190" preserveAspectRatio="xMidYMid slice">' +
        '<rect width="300" height="190" fill="url(#gradTemple)"/>' +
        '<path d="M150,42 L166,90 L134,90 Z" fill="rgba(255,255,255,0.16)" stroke="rgba(255,255,255,0.55)" stroke-width="2"/>' +
        '<path d="M150,58 L160,90 L140,90 Z" fill="rgba(255,255,255,0.14)"/>' +
        '<rect x="112" y="90" width="76" height="88" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" stroke-width="2.5"/>' +
        '<path d="M128,178 L128,120 A22,20 0 0 1 172,120 L172,178" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>' +
        '<circle cx="150" cy="34" r="6" fill="rgba(255,255,255,0.5)"/>' +
        '<path d="M0,178 L300,178" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>' +
      '</svg>';
    }
    if(kind === 'food'){
      return '<svg viewBox="0 0 300 190" preserveAspectRatio="xMidYMid slice">' +
        '<rect width="300" height="190" fill="url(#gradFood)"/>' +
        '<ellipse cx="150" cy="150" rx="64" ry="16" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>' +
        '<path d="M96,150 A54,42 0 0 1 204,150" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="2"/>' +
        '<path d="M126,96 q-6,-16 4,-24 M150,90 q-4,-18 6,-26 M174,96 q-2,-16 8,-22" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2.4" stroke-linecap="round"/>' +
        '<circle cx="238" cy="56" r="16" fill="rgba(255,255,255,0.16)"/>' +
        '<path d="M0,178 L300,178" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>' +
      '</svg>';
    }
    if(kind === 'business'){
      return '<svg viewBox="0 0 300 190" preserveAspectRatio="xMidYMid slice">' +
        '<rect width="300" height="190" fill="url(#gradBusiness)"/>' +
        '<rect x="70" y="108" width="160" height="70" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" stroke-width="2.5"/>' +
        '<rect x="96" y="70" width="16" height="40" fill="rgba(255,255,255,0.22)"/>' +
        '<rect x="150" y="56" width="16" height="54" fill="rgba(255,255,255,0.22)"/>' +
        '<path d="M104,70 q10,-14 -2,-26 M158,56 q10,-14 -2,-26" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2" stroke-linecap="round"/>' +
        '<circle cx="220" cy="140" r="16" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>' +
        '<circle cx="220" cy="140" r="5" fill="rgba(255,255,255,0.4)"/>' +
        '<path d="M0,178 L300,178" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>' +
      '</svg>';
    }
    if(kind === 'forest'){
      return '<svg viewBox="0 0 300 190" preserveAspectRatio="xMidYMid slice">' +
        '<rect width="300" height="190" fill="url(#gradForest)"/>' +
        '<circle cx="240" cy="46" r="20" fill="rgba(255,255,255,0.18)"/>' +
        '<path d="M70,178 L70,140 L48,140 L82,90 L58,90 L96,44 L134,90 L110,90 L144,140 L122,140 L122,178 Z" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>' +
        '<path d="M190,178 L190,146 L170,146 L200,104 L180,104 L212,66 L244,104 L224,104 L254,146 L234,146 L234,178 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>' +
        '<path d="M0,178 L300,178" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>' +
      '</svg>';
    }
    if(kind === 'tiger'){
      return '<svg viewBox="0 0 300 190" preserveAspectRatio="xMidYMid slice">' +
        '<rect width="300" height="190" fill="url(#gradTiger)"/>' +
        '<path d="M70,178 Q90,110 150,104 Q210,110 230,178 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" stroke-width="2.5"/>' +
        '<path d="M112,108 Q120,84 106,66 M140,102 Q146,76 134,58 M168,102 Q176,76 190,60 M196,108 Q206,86 222,70" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="3" stroke-linecap="round"/>' +
        '<circle cx="120" cy="150" r="4" fill="rgba(255,255,255,0.5)"/><circle cx="150" cy="156" r="4" fill="rgba(255,255,255,0.5)"/><circle cx="180" cy="150" r="4" fill="rgba(255,255,255,0.5)"/>' +
        '<path d="M0,178 L300,178" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>' +
      '</svg>';
    }
    if(kind === 'stone'){
      return '<svg viewBox="0 0 300 190" preserveAspectRatio="xMidYMid slice">' +
        '<rect width="300" height="190" fill="url(#gradStone)"/>' +
        '<path d="M110,178 L110,86 Q110,66 150,66 Q190,66 190,86 L190,178 Z" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.55)" stroke-width="2.5"/>' +
        '<path d="M122,96 L178,96 M122,114 L178,114 M122,132 L166,132 M122,150 L172,150" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>' +
        '<path d="M0,178 L300,178" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>' +
      '</svg>';
    }
    return art('institution');
  }
  // institution needs its own real case, defined after the recursive fallback above is bypassed
  var _origArt = art;
  art = function(kind){
    if(kind === 'institution'){
      return '<svg viewBox="0 0 300 190" preserveAspectRatio="xMidYMid slice">' +
        '<rect width="300" height="190" fill="url(#gradInstitution)"/>' +
        '<rect x="60" y="96" width="180" height="82" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.5)" stroke-width="2.5"/>' +
        '<path d="M78,96 a14,14 0 0 1 28,0 M118,96 a14,14 0 0 1 28,0 M158,96 a14,14 0 0 1 28,0 M198,96 a14,14 0 0 1 28,0" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>' +
        '<path d="M78,178 L78,110 M106,178 L106,110 M146,178 L146,110 M186,178 L186,110 M226,178 L226,110" stroke="rgba(255,255,255,0.3)" stroke-width="1.6"/>' +
        '<circle cx="42" cy="150" r="15" fill="rgba(255,255,255,0.26)"/><rect x="39" y="160" width="6" height="18" fill="rgba(255,255,255,0.26)"/>' +
        '<path d="M0,178 L300,178 M40,190 L110,178 M260,190 L200,178" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>' +
      '</svg>';
    }
    return _origArt(kind);
  };

  var stories = window.ITIHAAS_STORIES || [];
  var pending = [];
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
    if(isVerified(s)){
      return '<span class="mini-seal">' + VERIFIED_ICON + '</span><span>Verified</span>';
    }
    return '<span class="mini-seal mod">' + MODERATION_ICON + '</span><span>Under moderation</span>';
  }

  function heroHtml(s){
    return '' +
      '<div class="hero-card" onclick="ItihaasApp.openDetail(\'' + s.id + '\')">' +
        '<div class="art">' + mediaHtml(s) + '</div>' +
        '<div class="hero-tags"><span>' + s.category + '</span><span>' + s.state + '</span></div>' +
        '<div class="hero-scrim"><h2>' + s.title + '</h2><div class="sub">' + s.area + ', ' + s.city + '</div></div>' +
        '<button class="float-play" data-icon="' + s.id + '" onclick="event.stopPropagation(); ItihaasApp.toggleStoryPlay(\'' + s.id + '\')">' + PLAY_ICON + '</button>' +
      '</div>';
  }

  function cardHtml(s){
    return '' +
      '<div class="card">' +
        '<div class="card-media" onclick="ItihaasApp.openDetail(\'' + s.id + '\')">' +
          '<div class="art">' + mediaHtml(s) + '</div>' +
          '<div class="card-toptags"><span>' + s.category + '</span><span>' + s.state + '</span></div>' +
          '<div class="card-scrim"><h3>' + s.title + '</h3><div class="area">' + s.area + ', ' + s.city + '</div></div>' +
        '</div>' +
        '<button class="float-play" data-icon="' + s.id + '" onclick="ItihaasApp.toggleStoryPlay(\'' + s.id + '\')">' + PLAY_ICON + '</button>' +
        '<div class="card-body">' +
          '<p class="snippet">' + s.fact.slice(0, 88) + (s.fact.length > 88 ? '...' : '') + '</p>' +
          '<div class="card-progress">' +
            waveformHtml(s.id, 22, 20) +
            '<span class="status" data-status="' + s.id + '">' + fmtTime(wordSeconds(fullNarration(s))) + '</span>' +
          '</div>' +
          recLangsHtml(s) +
          '<div class="card-foot">' + footBadgeHtml(s) + '<span>·</span><span>' + s.photos + ' photos</span></div>' +
        '</div>' +
      '</div>';
  }

  function stripCardHtml(s){
    return '' +
      '<div class="strip-card" onclick="ItihaasApp.openDetail(\'' + s.id + '\')">' +
        '<div class="art-box">' + mediaHtml(s) + '<div class="cap"><span>' + s.title + '</span></div></div>' +
      '</div>';
  }

  function emptyHtml(cat){
    return '' +
      '<div class="empty">' +
        '<div class="stamp">Nothing verified here yet</div>' +
        '<p>No ' + cat.toLowerCase() + ' stories have made it through review in this area. Know one worth telling before it\'s forgotten?</p>' +
        '<button class="btn ghost" onclick="ItihaasApp.goTo(\'share\')">Share a memory</button>' +
      '</div>';
  }

  function renderLangSelector(){
    var row = document.getElementById('langRow');
    if(!row) return;
    row.innerHTML = '';
    LANGS.forEach(function(l){
      var b = document.createElement('button');
      b.className = 'lang-pill' + (l.code === currentLang ? ' active' : '');
      b.textContent = l.label;
      b.onclick = function(){
        currentLang = l.code;
        renderLangSelector();
        renderDiscover();
        var openSheet = document.getElementById('detailSheet');
        if(openSheet && openSheet.classList.contains('open') && ItihaasApp._openId){
          ItihaasApp.openDetail(ItihaasApp._openId);
        }
      };
      row.appendChild(b);
    });
  }

  function renderCategoryChips(){
    var chipsRow = document.getElementById('chipsRow');
    chipsRow.innerHTML = '';
    categories.forEach(function(cat){
      var b = document.createElement('button');
      b.className = 'chip' + (cat === activeCategory ? ' active' : '');
      b.textContent = cat;
      b.onclick = function(){
        activeCategory = cat;
        renderCategoryChips();
        renderDiscover();
      };
      chipsRow.appendChild(b);
    });
  }

  function renderDiscover(){
    var featured = document.getElementById('featuredSlot');
    var list = document.getElementById('cardList');
    var showFeatured = activeCategory === 'All' && !searchQuery;
    featured.innerHTML = showFeatured ? heroHtml(stories[0]) : '';

    var pool = showFeatured ? stories.slice(1) : stories;
    var filtered = pool.filter(function(s){
      var matchesCat = activeCategory === 'All' || s.category === activeCategory;
      var matchesQuery = !searchQuery || (s.title + ' ' + s.area + ' ' + s.city + ' ' + s.state + ' ' + s.narrator).toLowerCase().indexOf(searchQuery) !== -1;
      return matchesCat && matchesQuery;
    });

    var html = '';
    if(filtered.length === 0){
      html += emptyHtml(activeCategory === 'All' ? 'matching' : activeCategory);
    } else {
      html += filtered.map(cardHtml).join('');
    }
    if(pending.length){
      html += '<div class="related-label" style="margin-top:8px;">Your submissions, awaiting a curator</div>';
      pending.forEach(function(p){
        html += '<div class="pending-banner"><span class="tag">Pending</span><div><strong style="color:var(--ink);">' + p.place + '</strong><br>' + p.story.slice(0,74) + (p.story.length>74?'...':'') + '</div></div>';
      });
    }
    list.innerHTML = html;
    reflectPlayingState();
  }

  function reflectPlayingState(){
    document.querySelectorAll('[data-icon]').forEach(function(el){
      el.innerHTML = (el.dataset.icon === playingId) ? PAUSE_ICON : PLAY_ICON;
    });
    document.querySelectorAll('[data-status]').forEach(function(el){
      var s = stories.find(function(x){ return x.id === el.dataset.status; });
      if(!s) return;
      if(el.dataset.status === playingId){
        return; // actively updated by audio/tts handlers
      }
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
    if(activeAudioEl){
      activeAudioEl.pause();
      activeAudioEl.src = '';
      activeAudioEl = null;
    }
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

    audio.addEventListener('loadedmetadata', function(){
      setStatusText(s.id, '0:00 / ' + fmtTime(audio.duration));
    });
    audio.addEventListener('timeupdate', function(){
      if(!audio.duration) return;
      var pct = (audio.currentTime / audio.duration) * 100;
      document.querySelectorAll('[data-fg="' + s.id + '"]').forEach(function(fg){
        fg.style.transitionDuration = '0.15s';
        fg.style.width = pct + '%';
      });
      setStatusText(s.id, fmtTime(audio.currentTime) + ' / ' + fmtTime(audio.duration));
    });
    audio.addEventListener('ended', function(){
      playingId = null;
      activeAudioEl = null;
      reflectPlayingState();
      resetWaveform(s.id);
      setStatusText(s.id, fmtTime(wordSeconds(fullNarration(s))));
    });
    audio.addEventListener('error', function(){
      setStatusText(s.id, 'Could not load audio');
      playingId = null;
      activeAudioEl = null;
      reflectPlayingState();
    });
    audio.play();
  }

  function playViaTTS(s, note){
    if(!('speechSynthesis' in window)){
      setStatusText(s.id, 'Speech not supported in this browser');
      return;
    }
    var text = fullNarration(s);
    var secs = wordSeconds(text);
    var utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.92;
    playingId = s.id;
    reflectPlayingState();
    setStatusText(s.id, (note ? note + ', ' : '') + 'playing in English');

    document.querySelectorAll('[data-fg="' + s.id + '"]').forEach(function(fg){
      fg.style.transitionDuration = '0s';
      fg.style.width = '0%';
      void fg.offsetWidth;
      fg.style.transitionDuration = secs + 's';
      fg.style.transitionTimingFunction = 'linear';
      fg.style.width = '100%';
    });

    utter.onend = function(){
      if(playingId !== s.id) return;
      playingId = null;
      reflectPlayingState();
      resetWaveform(s.id);
      setStatusText(s.id, fmtTime(wordSeconds(text)));
    };
    window.speechSynthesis.speak(utter);
  }

  function toggleStoryPlay(id){
    var s = stories.find(function(x){ return x.id === id; });
    if(!s) return;

    if(playingId === id){
      stopPlayback();
      return;
    }
    stopPlayback();

    var recorded = s.audio && s.audio[currentLang];
    if(recorded){
      playViaAudio(s, recorded);
    } else if(currentLang === 'en'){
      playViaTTS(s, null);
    } else {
      playViaTTS(s, 'Not recorded in ' + LANG_NAME[currentLang] + ' yet');
    }
  }

  function openDetail(id){
    var s = stories.find(function(x){ return x.id === id; });
    if(!s) return;
    ItihaasApp._openId = id;
    var sameCategory = stories.filter(function(x){ return x.id !== id && x.category === s.category; });
    var others = stories.filter(function(x){ return x.id !== id && x.category !== s.category; });
    var related = sameCategory.concat(others).slice(0, 6);
    var mapUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(s.coords.replace('\u00b0 N,','').replace('\u00b0 E',''));

    var html = '' +
      '<div class="detail-hero">' +
        '<div class="art">' + mediaHtml(s) + '</div>' +
        '<div class="tags"><span>' + s.category + '</span><span>' + s.state + '</span></div>' +
        '<button class="back-btn" onclick="ItihaasApp.closeSheet()">' + BACK_ICON + '</button>' +
        '<div class="scrim"><h1>' + s.title + '</h1><div class="loc">' + s.area + ', ' + s.city + '</div></div>' +
        '<button class="float-play" data-icon="' + s.id + '" onclick="ItihaasApp.toggleStoryPlay(\'' + s.id + '\')">' + PLAY_ICON + '</button>' +
      '</div>' +

      '<div class="mod-status ' + (isVerified(s) ? 'is-verified' : 'is-mod') + '">' +
        (isVerified(s)
          ? '<span class="mini-seal">' + VERIFIED_ICON + '</span> Verified, checked against evidence and context'
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

      '<div class="related-label">More like this</div>' +
      '<div class="strip">' + related.map(stripCardHtml).join('') + '</div>';

    document.getElementById('sheetInner').innerHTML = html;
    document.getElementById('detailBackdrop').classList.add('show');
    document.getElementById('detailSheet').classList.add('open');
    reflectPlayingState();
  }

  function closeSheet(){
    document.getElementById('detailBackdrop').classList.remove('show');
    document.getElementById('detailSheet').classList.remove('open');
    ItihaasApp._openId = null;
  }

  function goTo(view){
    stopPlayback();
    document.querySelectorAll('.view').forEach(function(v){ v.classList.remove('active'); });
    document.getElementById('view-' + view).classList.add('active');
    document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
    var tabBtn = document.querySelector('.tab-btn[data-view="' + view + '"]');
    if(tabBtn) tabBtn.classList.add('active');
    var isDiscover = view === 'discover';
    document.getElementById('searchRow').style.display = isDiscover ? 'flex' : 'none';
    document.getElementById('chipsRow').style.display = isDiscover ? 'flex' : 'none';
    document.getElementById('appScroll').scrollTop = 0;
  }

  function init(){
    renderLangSelector();
    renderCategoryChips();
    document.getElementById('searchInput').addEventListener('input', function(e){
      searchQuery = e.target.value.toLowerCase();
      renderDiscover();
    });
    document.querySelectorAll('.tab-btn').forEach(function(btn){
      btn.onclick = function(){ goTo(btn.dataset.view); };
    });
    document.getElementById('shareForm').addEventListener('submit', function(e){
      e.preventDefault();
      pending.push({
        place: document.getElementById('f-place').value.trim(),
        story: document.getElementById('f-story').value.trim(),
        lang: document.getElementById('f-lang').value,
        relationship: document.getElementById('f-relationship').value.trim(),
        attribution: document.querySelector('input[name="attribution"]:checked').value
      });
      e.target.reset();
      goTo('discover');
      renderDiscover();
    });

    var hour = new Date().getHours();
    document.getElementById('greetTime').textContent = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

    renderDiscover();
  }

  window.ItihaasApp = {
    toggleStoryPlay: toggleStoryPlay,
    openDetail: openDetail,
    closeSheet: closeSheet,
    goTo: goTo,
    _openId: null
  };

  document.addEventListener('DOMContentLoaded', init);
})();
