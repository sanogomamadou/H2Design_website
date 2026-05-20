import './style.css';

document.addEventListener('DOMContentLoaded', () => {


  /* =====================================================
     1. SMOOTH-SCROLL NAVIGATION
     ===================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      anchor.classList.add('active');
    });
  });

  /* =====================================================
     2. MOBILE MENU TOGGLE
     ===================================================== */
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navOverlay = document.getElementById('nav-overlay');
  const menuIcon = menuToggle?.querySelector('.material-symbols-outlined');
  let menuFocusCache = [];

  function openMenu() {
    navLinks?.classList.add('is-open');
    navOverlay?.classList.add('is-open');
    menuToggle?.setAttribute('aria-expanded', 'true');
    if (menuIcon) menuIcon.textContent = 'close';
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      menuToggle?.focus();
      const links = navLinks ? [...navLinks.querySelectorAll('a')] : [];
      menuFocusCache = menuToggle ? [menuToggle, ...links] : links;
    }, 50);
  }

  function closeMenu() {
    navLinks?.classList.remove('is-open');
    navOverlay?.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    if (menuIcon) menuIcon.textContent = 'menu';

    const drawer = document.getElementById('project-drawer');
    if (!drawer?.classList.contains('is-open')) {
      document.body.style.overflow = '';
    }
    menuFocusCache = [];
  }

  menuToggle?.addEventListener('click', () => {
    navLinks?.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  navOverlay?.addEventListener('click', closeMenu);

  document.addEventListener('keydown', e => {
    if (e.key === 'Tab' && navLinks?.classList.contains('is-open') && menuFocusCache.length > 0) {
      const firstEl = menuFocusCache[0];
      const lastEl = menuFocusCache[menuFocusCache.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          lastEl?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastEl) {
          firstEl?.focus();
          e.preventDefault();
        }
      }
    }
  });

  // Unified Escape key handler — priority chain: drawer first, then menu.
  // Two separate listeners would fire simultaneously if both were open,
  // causing conflicting overflow restoration. One handler, one responsibility.
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (drawer?.classList.contains('is-open')) {
      closeDrawer();
    } else {
      closeMenu();
    }
  });

  /* =====================================================
     3. REVEAL ON SCROLL (IntersectionObserver)
     ===================================================== */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -60px 0px' };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);

          // Clear transition delays after reveal completes so hover effects are snappy
          setTimeout(() => {
            entry.target.style.transitionDelay = '';
            entry.target.classList.remove('delay-1', 'delay-2', 'delay-3', 'delay-4');
          }, 1200);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach((el) => {
      observer.observe(el);
    });
  } else {
    // Immediately show all for reduced-motion users
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }

  /* =====================================================
     4. PROJECT FILTER PILLS & MONOGRAPH DRAWER
     ===================================================== */
  const filterPills = document.querySelectorAll('.filter-pills .pill');
  const projectCards = document.querySelectorAll('.project-card');

  // Smooth filter pill actions
  filterPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.stopPropagation();
      // Update active pill
      filterPills.forEach(p => {
        p.classList.remove('active');
        p.setAttribute('aria-pressed', 'false');
      });
      pill.classList.add('active');
      pill.setAttribute('aria-pressed', 'true');

      const filter = pill.dataset.filter;

      projectCards.forEach(card => {
        const categories = (card.dataset.category || '').split(' ');
        const show = filter === 'all' || categories.includes(filter);

        if (show) {
          card.style.opacity = '1';
          card.style.pointerEvents = 'auto';
          card.style.transform = '';
        } else {
          card.style.opacity = '0.15';
          card.style.pointerEvents = 'none';
          card.style.transform = 'scale(0.97)';
        }
        card.style.transition = 'opacity 0.5s var(--ease-out-quart), transform 0.5s var(--ease-out-quart)';
      });
    });
  });

  // Dynamic Case Study Data Store for Distant Trust
  const projectDetails = {
    'villa-aci': {
      title: "Villa Contemporaine ACI 2000",
      category: "Construction",
      location: "Bamako, Mali",
      img: "/assets/h2_hero_villa_1778682722885.png",
      specs: [
        { label: "Superficie", value: "450 m²" },
        { label: "Lots réalisés", value: "BIM, Gros œuvre, Finitions" },
        { label: "Typologie", value: "Villa R+1" },
        { label: "Suivi", value: "100% à distance" },
        { label: "Structure", value: "R+1 béton armé & verre" }
      ],
      testimonial: {
        text: "Depuis Paris, je voulais faire construire une villa moderne et sécurisée pour ma famille à Bamako. H2 Design a tout géré de A à Z : modélisation BIM en amont, rapports hebdomadaires avec photos de drone et appels vidéo en direct. Le résultat dépasse nos attentes, et ce sans aucune mauvaise surprise budgétaire !",
        author: "Moussa S."
      },
      timeline: [
        {
          date: "Mars 2023",
          title: "Plans BIM & Études Techniques",
          desc: "Conception 3D intégrale de la villa. Validation des plans de structure en béton armé et coordination des fluides (plomberie/électricité) via maquette numérique avec le client à distance.",
          visual: "/assets/h2_interior_wood_1778682764614.png",
          visualDesc: "Maquette 3D BIM & rendu intérieur partagés en direct."
        },
        {
          date: "Juin 2023",
          title: "Fondations & Terrassement",
          desc: "Ouverture des fouilles et coulage des fondations superficielles. Analyse géotechnique validée. Inspecté et certifié conforme par notre bureau de contrôle partenaire à Bamako.",
          visual: "/assets/h2_project_construction_1778682750140.png",
          visualDesc: "Inspection des ferraillages avant coulage du béton de propreté."
        },
        {
          date: "Novembre 2023",
          title: "Élévations & Gros Œuvre R+1",
          desc: "Montage des murs porteurs en agglos pleins vibrés et coulage des dalles de compression du premier étage. Suivi drone régulier envoyé via l'espace client.",
          visual: "/assets/h2_project_construction_1778682750140.png",
          visualDesc: "Coulage de la dalle R+1 - Rapport drone du 18 Novembre."
        },
        {
          date: "Mai 2024",
          title: "Finition Premium & Remise des Clés",
          desc: "Pose des menuiseries aluminium à double vitrage, peinture extérieure texturée et aménagement intérieur. Nettoyage final et remise des clés en direct au propriétaire venu pour l'occasion.",
          visual: "/assets/h2_hero_villa_1778682722885.png",
          visualDesc: "Villa finalisée - Vue extérieure sous le soleil de Bamako."
        }
      ]
    },
    'residence-sotuba': {
      title: "Résidence Familiale Sotuba",
      category: "Construction",
      location: "Bamako, Mali",
      img: "/assets/h2_project_construction_1778682750140.png",
      specs: [
        { label: "Superficie", value: "580 m²" },
        { label: "Lots réalisés", value: "Terrassement, Gros œuvre" },
        { label: "Typologie", value: "Résidence R+2" },
        { label: "Suivi", value: "Rapports Drone & Visio" },
        { label: "Avancement", value: "Gros œuvre complété à 100%" }
      ],
      testimonial: {
        text: "Un travail d'ingénierie et de gros œuvre remarquable. Habitant à Lyon, j'ai pu valider chaque phase du béton armé grâce aux relevés topographiques et aux vidéos hebdomadaires. Très professionnel.",
        author: "Abdoulaye T."
      },
      timeline: [
        {
          date: "Octobre 2024",
          title: "Étude de Sol & Implantation",
          desc: "Relevé topographique précis de la parcelle à Sotuba près du fleuve. Conception des fondations profondes adaptées au sol alluvionnaire.",
          visual: "/assets/h2_project_construction_1778682750140.png",
          visualDesc: "Implantation des axes au théodolite."
        },
        {
          date: "Janvier 2025",
          title: "Semelles & Soubassement",
          desc: "Coulage des semelles filantes renforcées et réalisation du mur de soubassement étanche pour protéger le bâtiment contre les remontées capillaires.",
          visual: "/assets/h2_project_construction_1778682750140.png",
          visualDesc: "Coulage des longrines et étanchéité bitumineuse."
        },
        {
          date: "Avril 2025",
          title: "Élévation Gros Œuvre R+2",
          desc: "Coulage des poteaux d'angles et des dalles en béton armé. Poteaux coulés avec coffrages métalliques garantissant une planéité parfaite.",
          visual: "/assets/h2_project_construction_1778682750140.png",
          visualDesc: "Vue d'ensemble du gros œuvre achevé - Vue aérienne drone."
        }
      ]
    },
    'renovation-badala': {
      title: "Rénovation Badalabougou",
      category: "Rénovation",
      location: "Bamako, Mali",
      img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
      specs: [
        { label: "Superficie", value: "320 m²" },
        { label: "Lots réalisés", value: "Plomberie, Peinture, Graffiato" },
        { label: "Typologie", value: "Villa Basse" },
        { label: "Type", value: "Rénovation complète de villa" },
        { label: "Suivi", value: "Photos & Visio de validation" }
      ],
      testimonial: {
        text: "H2 Design a redonné vie à notre ancienne villa de Badalabougou. Bien qu'étant loin en Allemagne, j'ai pu choisir les matériaux en visio et suivre l'avancement pas à pas. Le soin apporté aux finitions et à la plomberie est exceptionnel.",
        author: "Aminata D."
      },
      timeline: [
        {
          date: "Mai 2023",
          title: "Curetage & Démolition Ciblée",
          desc: "Dépose des anciens revêtements de sol, sanitaires obsolètes et cloisons pour redistribuer les pièces de vie de manière plus fluide et lumineuse.",
          visual: "/assets/h2_project_construction_1778682750140.png",
          visualDesc: "Phase de curage intérieur et évacuation des gravats."
        },
        {
          date: "Août 2023",
          title: "Rénovation Réseaux & Plomberie",
          desc: "Remplacement complet de la tuyauterie en cuivre par du PER multicouche et mise aux normes du tableau de distribution électrique générale.",
          visual: "/assets/h2_interior_wood_1778682764614.png",
          visualDesc: "Intégration des fourreaux encastrés pour l'éclairage LED."
        },
        {
          date: "Décembre 2023",
          title: "Pose Revêtements & Peinture Graffiato",
          desc: "Application d'un enduit extérieur protecteur de type Graffiato résistant au climat sahélien, pose de carrelage en grès cérame poli et livraison.",
          visual: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80",
          visualDesc: "Salon rénové avec peinture blanche mate et éclairage intégré."
        }
      ]
    },
    'extension-hippo': {
      title: "Extension & Rénovation Hippodrome",
      category: "Extension & Rénovation",
      location: "Bamako, Mali",
      img: "/assets/h2_interior_wood_1778682764614.png",
      specs: [
        { label: "Superficie", value: "180 m²" },
        { label: "Lots réalisés", value: "Menuiserie bois, Mobilier" },
        { label: "Typologie", value: "Pavillon Bois" },
        { label: "Matériaux", value: "Bois noble locaux, Acier noir" },
        { label: "Suivi", value: "Atelier & Visio de chantier" }
      ],
      testimonial: {
        text: "Pour notre extension en bois noble à l'Hippodrome, H2 Design a réalisé des menuiseries sur-mesure d'un raffinement rare au Mali. Le suivi vidéo en atelier et sur le chantier nous a rassurés tout au long du projet.",
        author: "Fousseyni K."
      },
      timeline: [
        {
          date: "Février 2024",
          title: "Étude Structure Bois & Fondations",
          desc: "Calcul de charge pour l'extension et réalisation de micro-pieux en béton armé pour stabiliser la structure sans endommager le jardin existant.",
          visual: "/assets/h2_project_construction_1778682750140.png",
          visualDesc: "Implantation des micro-pieux béton."
        },
        {
          date: "Mai 2024",
          title: "Préfabrication & Menuiserie Bois",
          desc: "Façonnage des poteaux et bardages en bois noble local traité autoclave dans nos ateliers. Relevé vidéo partagé avec le client en atelier.",
          visual: "/assets/h2_interior_wood_1778682764614.png",
          visualDesc: "Usinage des lambris bois dans l'atelier H2."
        },
        {
          date: "Août 2024",
          title: "Assemblage & Finitions Intérieures",
          desc: "Montage rapide de la structure en bois, installation des baies vitrées coulissantes en acier noir et pose des meubles de rangement sur-mesure.",
          visual: "/assets/h2_interior_wood_1778682764614.png",
          visualDesc: "Livraison finale - Perspective chaleureuse du salon en bois."
        }
      ]
    }
  };

  // DOM Elements for the dynamic drawer
  const drawer = document.getElementById('project-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const drawerCloseBtn = document.getElementById('drawer-close');
  const drawerImg = document.getElementById('drawer-img');
  const drawerCategory = document.getElementById('drawer-category-badge');
  const drawerTitle = document.getElementById('drawer-title');
  const drawerLocation = document.getElementById('drawer-location');
  const drawerTimeline = document.getElementById('drawer-timeline');
  const drawerSpecsContainer = document.getElementById('drawer-specs-container');
  const drawerTestimonialContainer = document.getElementById('drawer-testimonial-container');
  const drawerQuoteText = document.getElementById('drawer-quote-text');
  const drawerQuoteAuthor = document.getElementById('drawer-quote-author');

  let lastActiveElement = null;

  function openDrawer(projectId) {
    const details = projectDetails[projectId];
    if (!details || !drawer) return;

    lastActiveElement = document.activeElement;

    // Load static elements
    if (drawerImg) {
      drawerImg.src = details.img;
      drawerImg.alt = details.title;
    }
    if (drawerCategory) {
      drawerCategory.textContent = details.category;
      drawerCategory.className = 'p-badge'; // Reset classes
      if (details.category.toLowerCase().includes('construction')) {
        drawerCategory.classList.add('badge-success');
      } else {
        drawerCategory.classList.add('badge-warning');
      }
    }
    if (drawerTitle) drawerTitle.textContent = details.title;
    if (drawerLocation) {
      drawerLocation.innerHTML = `<span class="material-symbols-outlined">location_on</span> ${details.location}`;
    }

    // Build specs table
    if (drawerSpecsContainer) {
      let specsHtml = '<table class="p-specs-table">';
      details.specs.forEach(spec => {
        specsHtml += `<tr><td>${spec.label}</td><td><strong>${spec.value}</strong></td></tr>`;
      });
      specsHtml += '</table>';
      drawerSpecsContainer.innerHTML = specsHtml;
    }

    // Build dynamic timeline
    if (drawerTimeline) {
      let timelineHtml = '';
      details.timeline.forEach((item, index) => {
        const isActive = index === details.timeline.length - 1; // Highlight the latest phase
        const activeClass = isActive ? 'active' : '';
        const dotClass = `timeline-dot ${activeClass}`;

        let visualHtml = '';
        if (item.visual) {
          visualHtml = `
            <div class="timeline-visual">
              <img src="${item.visual}" alt="${item.title}" loading="lazy" />
              <div class="timeline-visual-desc">
                <span class="material-symbols-outlined">verified</span>
                <span>${item.visualDesc || 'Rapport de suivi certifié'}</span>
              </div>
            </div>
          `;
        }

        timelineHtml += `
          <div class="timeline-item">
            <div class="${dotClass}"></div>
            <div class="timeline-date">${item.date}</div>
            <h4 class="timeline-title">${item.title}</h4>
            <p class="timeline-desc">${item.desc}</p>
            ${visualHtml}
          </div>
        `;
      });
      drawerTimeline.innerHTML = timelineHtml;
    }

    // Build Testimonial
    if (drawerTestimonialContainer) {
      if (details.testimonial) {
        drawerTestimonialContainer.style.display = 'block';
        if (drawerQuoteText) drawerQuoteText.textContent = details.testimonial.text;
        if (drawerQuoteAuthor) drawerQuoteAuthor.textContent = `— ${details.testimonial.author}`;
      } else {
        drawerTestimonialContainer.style.display = 'none';
      }
    }

    // Slide open drawer
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Move focus to close button, then capture a stable focusable list.
    // We read the DOM once after the open animation rather than on every Tab
    // keypress — prevents the list from shifting as lazy-loaded images paint.
    setTimeout(() => {
      drawerCloseBtn?.focus();
      cacheFocusableEls();
    }, 600);
  }

  function closeDrawer() {
    if (!drawer || !drawer.classList.contains('is-open')) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    // Restore body scroll only if mobile nav is closed
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks?.classList.contains('is-open')) {
      document.body.style.overflow = '';
    }
    // Clear the cached focus list and stop the observer
    drawerFocusCache = [];
    drawerMutationObserver?.disconnect();
    if (lastActiveElement) {
      if (lastActiveElement.classList?.contains('project-card')) {
        lastActiveElement.setAttribute('aria-expanded', 'false');
      }
      lastActiveElement.focus();
      lastActiveElement = null;
    }
  }

  // --- Stable Focus Trap ---
  // Cache is built once on open, refreshed by MutationObserver if drawer content
  // changes (e.g. dynamic content injection). Avoids querying live DOM on every Tab.
  const FOCUSABLE_SELECTORS = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  let drawerFocusCache = [];
  let drawerMutationObserver = null;

  const cacheFocusableEls = () => {
    if (!drawer) return;
    drawerFocusCache = [...drawer.querySelectorAll(FOCUSABLE_SELECTORS)];

    // Watch for any subsequent DOM changes inside the drawer and refresh cache
    drawerMutationObserver?.disconnect();
    drawerMutationObserver = new MutationObserver(() => {
      drawerFocusCache = [...drawer.querySelectorAll(FOCUSABLE_SELECTORS)];
    });
    drawerMutationObserver.observe(drawer, { childList: true, subtree: true });
  };

  // Focus trap — reads from stable cache, never queries live DOM during keypress
  drawer?.addEventListener('keydown', e => {
    if (e.key !== 'Tab' || drawerFocusCache.length === 0) return;
    const firstEl = drawerFocusCache[0];
    const lastEl = drawerFocusCache[drawerFocusCache.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        lastEl?.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastEl) {
        firstEl?.focus();
        e.preventDefault();
      }
    }
  });

  // Bind click & keyboard event to each project card
  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      const projectId = card.dataset.id;
      if (projectId) {
        card.setAttribute('aria-expanded', 'true');
        openDrawer(projectId);
      }
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const projectId = card.dataset.id;
        if (projectId) {
          card.setAttribute('aria-expanded', 'true');
          openDrawer(projectId);
        }
      }
    });
  });

  // Bind close buttons
  drawerOverlay?.addEventListener('click', closeDrawer);
  drawerCloseBtn?.addEventListener('click', closeDrawer);

  // (Escape key handling is managed by the unified handler registered in section 2)

  /* =====================================================
     4b. HERO CAROUSEL
     ===================================================== */
  const heroImages = document.querySelectorAll('.carousel-img');
  const heroIndicators = document.querySelectorAll('.line-indicator');
  const heroPrev = document.querySelector('.carousel-btn.prev-btn');
  const heroNext = document.querySelector('.carousel-btn.next-btn');
  let currentHeroIdx = 0;
  let heroInterval;

  const heroImageAlts = [
    'Villa moderne réalisée par H2 Design à Bamako',
    'Aménagement intérieur',
    'Chantier en cours'
  ];
  const carouselLive = document.getElementById('carousel-live');

  const updateHeroCarousel = (index) => {
    heroImages.forEach((img, i) => {
      if (i === index) {
        img.classList.add('active');
      } else {
        img.classList.remove('active');
      }
    });
    heroIndicators.forEach((ind, i) => {
      if (i === index) {
        ind.classList.add('active');
        ind.setAttribute('aria-pressed', 'true');
      } else {
        ind.classList.remove('active');
        ind.setAttribute('aria-pressed', 'false');
      }
    });
    // Announce slide change to screen readers
    if (carouselLive) {
      carouselLive.textContent = `Image ${index + 1} sur ${heroImages.length} : ${heroImageAlts[index] || ''}`;
    }
  };

  const nextHeroImage = () => {
    currentHeroIdx = (currentHeroIdx + 1) % heroImages.length;
    updateHeroCarousel(currentHeroIdx);
  };

  const prevHeroImage = () => {
    currentHeroIdx = (currentHeroIdx - 1 + heroImages.length) % heroImages.length;
    updateHeroCarousel(currentHeroIdx);
  };

  const startHeroInterval = () => {
    heroInterval = setInterval(() => {
      if (document.visibilityState !== 'hidden') nextHeroImage();
    }, 5000);
  };

  const stopHeroInterval = () => {
    clearInterval(heroInterval);
  };

  if (heroImages.length > 0) {
    startHeroInterval();

    heroNext?.addEventListener('click', () => {
      stopHeroInterval();
      nextHeroImage();
      startHeroInterval();
    });

    heroPrev?.addEventListener('click', () => {
      stopHeroInterval();
      prevHeroImage();
      startHeroInterval();
    });

    heroIndicators.forEach((indicator, idx) => {
      indicator.addEventListener('click', () => {
        stopHeroInterval();
        currentHeroIdx = idx;
        updateHeroCarousel(currentHeroIdx);
        startHeroInterval();
      });
    });
  }

  /* =====================================================
     4c. SERVICES CAROUSEL
     ===================================================== */
  const serviceCarousels = document.querySelectorAll('.s-carousel-controls');

  serviceCarousels.forEach(controls => {
    const carouselId = controls.dataset.carousel;
    if (!carouselId) return;

    const serviceRow = document.getElementById(carouselId);
    const track = serviceRow?.querySelector('.s-images-track');
    const slides = track?.querySelectorAll('.s-slide');
    const prevBtn = controls.querySelector('.s-prev');
    const nextBtn = controls.querySelector('.s-next');
    const currentEl = controls.querySelector('.s-current');
    const totalEl = controls.querySelector('.s-total');

    if (!track || !slides || slides.length === 0) return;

    let currentSlide = 0;
    const totalSlides = slides.length;

    if (totalEl) {
      totalEl.textContent = String(totalSlides).padStart(2, '0');
    }

    const updateSlide = (index) => {
      track.style.transform = `translateX(-${index * 100}%)`;
      if (currentEl) {
        currentEl.textContent = String(index + 1).padStart(2, '0');
      }
    };

    nextBtn?.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlide(currentSlide);
    });

    prevBtn?.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlide(currentSlide);
    });
  });

  /* =====================================================
     5. TESTIMONIAL MARQUEE
     ===================================================== */
  // The testimonial horizontal scroller is fully powered by high-performance 
  // CSS keyframe animations for fluid, hardware-accelerated movement.
  // Hover & keyboard focus pause behaviors are native CSS/HTML for ultimate speed.


  /* =====================================================
     6. NAVBAR SCROLL BEHAVIOUR (shadow + background + breadcrumb)
     ===================================================== */
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const bcCurrent = document.getElementById('bc-current');
  const footer = document.querySelector('.site-footer');

  // Cache section offsetTop values to avoid layout thrash inside the rAF scroll loop.
  // offsetTop forces a synchronous layout reflow on every read — reading it 6× per frame
  // is a guaranteed performance issue on low-end devices. We read once and cache.
  let sectionOffsets = [];
  let footerOffsetTop = 0;
  const cacheSectionOffsets = () => {
    sectionOffsets = [...sections].map(s => ({
      id: s.getAttribute('id'),
      top: s.offsetTop
    }));
    if (footer) {
      footerOffsetTop = footer.offsetTop;
    }
  };
  cacheSectionOffsets();

  // Refresh cache on resize (debounced — layout shifts after viewport change)
  let _resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(_resizeTimer);
    _resizeTimer = setTimeout(() => {
      cacheSectionOffsets();
      if (window.innerWidth > 1024) {
        closeMenu();
      }
    }, 200);
  });

  let scrollRafPending = false;
  window.addEventListener('scroll', () => {
    if (scrollRafPending) return;
    scrollRafPending = true;
    requestAnimationFrame(() => {
      scrollRafPending = false;
 
      if (window.scrollY > 80) {
        navbar?.classList.add('navbar--scrolled');
      } else {
        navbar?.classList.remove('navbar--scrolled');
      }
 
      if (footer) {
        const footerTop = footerOffsetTop - window.scrollY;
        if (footerTop < 120) {
          navbar?.classList.add('navbar--hidden');
        } else {
          navbar?.classList.remove('navbar--hidden');
        }
      }

      // Breadcrumb scrollspy — reads from cached offsets, no layout reflow
      let currentId = '';
      sectionOffsets.forEach(({ id, top }) => {
        if (window.scrollY >= (top - 150)) {
          currentId = id;
        }
      });

      if (bcCurrent) {
        if (currentId === 'about') bcCurrent.textContent = 'À propos';
        else if (currentId === 'services') bcCurrent.textContent = 'Services';
        else if (currentId === 'expertises') bcCurrent.textContent = 'Expertises';
        else if (currentId === 'projects') bcCurrent.textContent = 'Réalisations';
        else if (currentId === 'contact') bcCurrent.textContent = 'Contact';
        else bcCurrent.textContent = 'Accueil';
      }
    });
  }, { passive: true });

  /* =====================================================
     7. CONTACT FORM HANDLER
     ===================================================== */
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('cf-submit');
  const successPanel = document.getElementById('form-success');
  const errorPanel = document.getElementById('form-error');

  const scheduleCheckbox = document.getElementById('cf-schedule-call');
  const schedulerFields = document.getElementById('cf-scheduler-fields');
  const timezoneSelect = document.getElementById('cf-timezone');
  const slotSelect = document.getElementById('cf-slot');

  if (contactForm && submitBtn) {
    // Helper to query required fields dynamically (since slotSelect becomes required on check)
    const getRequiredFields = () => contactForm.querySelectorAll('[required]');

    // Validate a single field
    const validateField = (field) => {
      const isEmpty = !field.value.trim();

      // Phone format check for WhatsApp field (international number, 8-20 chars)
      if (field.id === 'cf-whatsapp' && !isEmpty) {
        const phonePattern = /^[+]?[\d\s\-().]{8,20}$/;
        if (!phonePattern.test(field.value.trim())) {
          field.classList.add('field-error');
          field.classList.remove('field-valid');
          return false;
        }
      }

      if (field.hasAttribute('required') && isEmpty) {
        field.classList.add('field-error');
        field.classList.remove('field-valid');
        return false;
      } else {
        field.classList.remove('field-error');
        if (field.value.trim() && field.hasAttribute('required')) {
          field.classList.add('field-valid');
        } else {
          field.classList.remove('field-valid');
        }
        return true;
      }
    };

    // Check overall form validity to toggle submit button state
    const checkFormValidity = () => {
      let isValid = true;
      const fields = getRequiredFields();
      fields.forEach(field => {
        if (field.hasAttribute('required') && !field.value.trim()) {
          isValid = false;
        }
      });
      submitBtn.disabled = !isValid;
      // Use CSS class for disabled visual state, not inline opacity/cursor
      submitBtn.classList.toggle('btn--pending', !isValid);
      if (isValid && errorPanel) errorPanel.hidden = true;
    };

    // Event listener helper for fields validation
    const attachValidationListeners = (field) => {
      field.addEventListener('blur', () => {
        validateField(field);
        checkFormValidity();
      });

      field.addEventListener('input', () => {
        // Re-validate immediately if currently showing error
        if (field.classList.contains('field-error')) {
          validateField(field);
        }
        checkFormValidity();
      });

      field.addEventListener('change', () => {
        validateField(field);
        checkFormValidity();
      });
    };

    // Attach listeners to initial required fields
    getRequiredFields().forEach(field => {
      attachValidationListeners(field);
    });

    // Toggle Diaspora Call Scheduling fields
    if (scheduleCheckbox && schedulerFields) {
      // Attach change listener to the checkbox
      scheduleCheckbox.addEventListener('change', () => {
        if (scheduleCheckbox.checked) {
          schedulerFields.classList.add('is-expanded');
          slotSelect.setAttribute('required', '');
          // Attach listeners to newly required slotSelect if not already present
          attachValidationListeners(slotSelect);
        } else {
          schedulerFields.classList.remove('is-expanded');
          slotSelect.removeAttribute('required');
          slotSelect.style.borderBottomColor = ''; // Reset border
        }
        // Recalculate validity and clear error panel if now valid
        checkFormValidity();
      });
    }

    // Initial state calculation
    checkFormValidity();

    // Form Submission Interception
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      let valid = true;
      const fields = getRequiredFields();
      fields.forEach(field => {
        if (!validateField(field)) valid = false;
      });

      if (!valid) {
        if (errorPanel) errorPanel.hidden = false;
        return;
      }
      if (errorPanel) errorPanel.hidden = true;

      // Submission animation loading state
      submitBtn.disabled = true;
      submitBtn.classList.add('btn--loading');
      submitBtn.innerHTML = 'Préparation en cours… <span class="material-symbols-outlined">sync</span>';

      // Simulate sending animation
      setTimeout(() => {
        // Hide form groups, checkbox, and submit rows smoothly
        contactForm.querySelectorAll('.form-row, .form-group, .form-submit, .cf-scheduler-fields').forEach(el => {
          el.style.display = 'none';
        });

        // Retrieve data values
        const name = document.getElementById('cf-name')?.value.trim() || '';
        const typeSelect = document.getElementById('cf-type');
        const type = typeSelect ? typeSelect.options[typeSelect.selectedIndex].text : '';
        const message = document.getElementById('cf-message')?.value.trim() || '';
        const isScheduled = scheduleCheckbox && scheduleCheckbox.checked;

        // Compile robust, readable WhatsApp French narrative
        let waText = `Bonjour, je m'appelle ${name} et je souhaite discuter d'un projet de type : "${type}".\n\nMessage : ${message}`;

        if (isScheduled) {
          const tz = timezoneSelect ? timezoneSelect.options[timezoneSelect.selectedIndex].text : '';
          const slot = slotSelect ? slotSelect.value : '';
          waText += `\n\n🕒 Appel de cadrage souhaité :\n- Fuseau : ${tz}\n- Créneau : ${slot} (Heure Bamako)`;
        }

        const waUrl = `https://wa.me/22374149914?text=${encodeURIComponent(waText)}`;

        // Show success card — uses CSS classes only, no inline colors
        if (successPanel) {
          successPanel.hidden = false;
          successPanel.innerHTML = `
            <div class="success-inner">
              <div class="success-header">
                <span class="material-symbols-outlined" aria-hidden="true">check_circle</span>
                <div>
                  <h4>Détails de cadrage configurés.</h4>
                  <p>Cliquez ci-dessous pour lancer la discussion WhatsApp ou copiez le message si votre navigateur bloque l’ouverture automatique.</p>
                </div>
              </div>
              <div class="success-actions">
                <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  Démarrer la discussion
                </a>
                <button type="button" id="cf-copy-btn" class="btn-copy">
                  <span class="material-symbols-outlined">content_copy</span> Copier le message
                </button>
              </div>
            </div>
          `;

          const copyBtn = document.getElementById('cf-copy-btn');
          if (copyBtn) {
            copyBtn.addEventListener('click', () => {
              navigator.clipboard.writeText(waText).then(() => {
                copyBtn.innerHTML = '<span class="material-symbols-outlined">check</span> Message copié !';
                copyBtn.classList.add('is-copied');
                setTimeout(() => {
                  copyBtn.innerHTML = '<span class="material-symbols-outlined">content_copy</span> Copier le message';
                  copyBtn.classList.remove('is-copied');
                }, 3000);
              }).catch(err => {
                console.error('Erreur de copie:', err);
              });
            });
          }
        }

        // Auto-redirect to WhatsApp in a new tab
        window.open(waUrl, '_blank');
      }, 1200);
    });
  }

  /* =====================================================
     7.5 DYNAMIC BAMAKO TIME INDICATOR
     ===================================================== */
  const updateBamakoTime = () => {
    const timeDisplay = document.getElementById('bamako-time-display');
    const footerTimeDisplay = document.getElementById('footer-bamako-time');

    const getBamakoTimeStr = () => {
      const options = {
        timeZone: 'Africa/Bamako',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      };
      try {
        const formatter = new Intl.DateTimeFormat('fr-FR', options);
        const parts = formatter.formatToParts(new Date());
        const hour = parts.find(p => p.type === 'hour').value;
        const minute = parts.find(p => p.type === 'minute').value;
        return `Bamako ${hour}:${minute} GMT+0`;
      } catch (e) {
        const now = new Date();
        const utcHour = String(now.getUTCHours()).padStart(2, '0');
        const utcMin = String(now.getUTCMinutes()).padStart(2, '0');
        return `Bamako ${utcHour}:${utcMin} GMT+0`;
      }
    };

    const timeStr = getBamakoTimeStr();
    if (timeDisplay) timeDisplay.innerHTML = timeStr;
    if (footerTimeDisplay) footerTimeDisplay.innerHTML = timeStr;
  };

  updateBamakoTime();
  let bamakoInterval = setInterval(() => {
    if (document.visibilityState !== 'hidden') updateBamakoTime();
  }, 5000);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') updateBamakoTime();
  });

  /* =====================================================
     8. KEYBOARD NAVIGATION
     ===================================================== */
  document.addEventListener('keydown', e => {
    // Ignore keyboard shortcuts if user is typing in an input, textarea, or select
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

    // Quick navigation shortcuts for Power Users
    if (e.key === 'c' || e.key === 'C') {
      const contactSec = document.getElementById('contact');
      if (contactSec) {
        e.preventDefault();
        contactSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    if (e.key === 'p' || e.key === 'P') {
      const projectsSec = document.getElementById('projects');
      if (projectsSec) {
        e.preventDefault();
        projectsSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      const hero = document.querySelector('.hero-section');
      const serviceRows = document.querySelectorAll('.service-row');

      const isVisible = (el) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top < (window.innerHeight / 2) && rect.bottom > (window.innerHeight / 2);
      };

      if (isVisible(hero)) {
        stopHeroInterval();
        e.key === 'ArrowRight' ? nextHeroImage() : prevHeroImage();
        startHeroInterval();
      } else {
        serviceRows.forEach(row => {
          if (isVisible(row)) {
            const controls = row.querySelector('.s-carousel-controls');
            if (controls) {
              const nextBtn = controls.querySelector('.s-next');
              const prevBtn = controls.querySelector('.s-prev');
              e.key === 'ArrowRight' ? nextBtn?.click() : prevBtn?.click();
            }
          }
        });
      }
    }
  });

});
