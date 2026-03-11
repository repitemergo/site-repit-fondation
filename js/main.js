/* ============================================
   FONDATION EMERGO - JavaScript principal
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

  // --- Header hide on scroll down, show on scroll up ---
  const header = document.querySelector('.site-header');
  if (header) {
    var lastScrollY = 0;
    var ticking = false;

    function updateHeader() {
      var currentScrollY = window.scrollY;

      // Shadow quand on a scrollé
      if (currentScrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Cacher/montrer selon la direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll down → cacher
        header.classList.add('header-hidden');
      } else {
        // Scroll up → montrer
        header.classList.remove('header-hidden');
      }

      lastScrollY = currentScrollY;
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    });
  }

  // --- Hamburger menu toggle ---
  const hamburger = document.querySelector('.hamburger');
  const mainNav = document.querySelector('.main-nav');

  if (hamburger && mainNav) {
    // Move nav-actions into mobile menu so lang toggle + donate button are visible
    var navActions = document.querySelector('.header-inner > .nav-actions');
    if (navActions && window.innerWidth <= 768) {
      mainNav.appendChild(navActions.cloneNode(true));
      mainNav.querySelector('.nav-actions').classList.add('nav-actions-mobile');
    }
    window.addEventListener('resize', function() {
      var mobileActions = mainNav.querySelector('.nav-actions-mobile');
      if (window.innerWidth <= 768 && !mobileActions) {
        var na = document.querySelector('.header-inner > .nav-actions');
        if (na) {
          mainNav.appendChild(na.cloneNode(true));
          mainNav.querySelector('.nav-actions:last-child').classList.add('nav-actions-mobile');
        }
      }
    });

    hamburger.addEventListener('click', function() {
      mainNav.classList.toggle('open');
      // Animate hamburger
      const spans = hamburger.querySelectorAll('span');
      hamburger.classList.toggle('active');
      if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });

    // Close on nav link click
    mainNav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        mainNav.classList.remove('open');
        hamburger.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  // --- Active nav link ---
  const currentPath = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    const href = link.getAttribute('href').replace(/\/$/, '');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // --- Simple scroll reveal animation ---
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function(el) {
      revealObserver.observe(el);
    });
  }

  // --- Init language ---
  const saved = localStorage.getItem('fondation-lang');
  const browserLang = navigator.language && navigator.language.startsWith('fr') ? 'fr' : null;
  setLang(saved || browserLang || 'fr');
});


/* ============================================
   SYSTÈME DE TRADUCTION BILINGUE FR/EN
   ============================================ */

const translations = {
  fr: {
    // Meta
    'meta.title': 'Fondation Emergo – Répit pour l\'autisme au Québec',
    'meta.description': 'La Fondation Emergo soutient les familles en finançant des répits spécialisés pour les personnes autistes de tous âges.',

    // Nav
    'nav.about': 'À propos',
    'nav.cause': 'La cause',
    'nav.dons': 'Dons',
    'nav.simpliquer': 'S\'impliquer',
    'nav.donate': 'Faire un don',
    'nav.lang': 'EN',

    // Home — Hero
    'home.hero.title': 'Parce que l\'autisme ne prend pas de répit',
    'home.hero.text': 'La Fondation Emergo soutient les familles en finançant des répits spécialisés pour les personnes autistes de tous âges.',
    'home.hero.btn1': 'Qui sommes-nous',
    'home.hero.btn2': 'Notre cause',

    // Home — Notre fondation
    'home.fondation.subtitle': 'Notre fondation',
    'home.fondation.title': 'Une mission engagée',
    'home.fondation.text': 'Depuis sa création, la Fondation appuie les familles qui vivent au quotidien la réalité de l\'autisme, en soutenant des services de répit spécialisés, humains et accessibles à travers le Québec.',
    'home.fondation.btn': 'En savoir plus',

    // Home — Notre cause
    'home.cause.subtitle': 'Notre cause',
    'home.cause.title': 'Offrir du répit aux familles',
    'home.cause.text': 'Grâce à vos dons, plus de familles peuvent accéder à des services de répit adaptés, abordables et bienveillants. Chaque séjour contribue à alléger le quotidien des proches aidant·es.',
    'home.cause.btn': 'Découvrir',

    // Home — Nos gens
    'home.gens.subtitle': 'Nos gens',
    'home.gens.title': 'Des personnes engagées',
    'home.gens.text': 'La mission de la Fondation Emergo est portée par des parents, des allié·es, des professionnel·les et des jeunes engagé·es. Leur implication est au cœur de tout ce que nous faisons.',
    'home.gens.li1': 'Un conseil d\'administration composé de parents et de professionnel·les',
    'home.gens.li2': 'Des ambassadeur·rices engagé·es à nos côtés depuis des années',
    'home.gens.li3': 'Des équipes de répit formées avec soin et bienveillance',
    'home.gens.btn': 'Découvrir',

    // Home — Social
    'home.social.title': 'Rejoignez notre communauté en ligne',

    // Home — CTA
    'home.cta.title': 'Je veux contribuer',
    'home.cta.text': 'Votre don aide une famille vivant avec l\'autisme à accéder à un répit spécialisé et accueillant.',
    'home.cta.btn': 'Faire un don',

    // ===== À PROPOS =====
    'about.hero.eyebrow': 'En savoir plus',
    'about.hero.title': 'À propos de la Fondation Emergo',
    'about.hero.text': 'Organisme de bienfaisance enregistré, la Fondation Emergo soutient le développement et la pérennité des services de répit spécialisés offerts par Répit Emergo au Québec.',
    'about.mission.title': 'Une mission centrée sur les familles',
    'about.mission.text': 'La Fondation Emergo soutient les services de Répit Emergo et agit comme un levier de financement, de développement et de sensibilisation. Sa mission : rendre le répit spécialisé plus accessible aux familles qui vivent au quotidien la réalité de l\'autisme, souvent épuisées et isolées. Elle mobilise la communauté autour de cette réalité, valorise l\'engagement des intervenant·es et veille à ce que les services demeurent humains, adaptés et durables.',
    'about.rapports.eyebrow': 'Nos publications',
    'about.rapports.title': 'Rapports annuels',
    'about.rapports.text': 'Nos rapports annuels illustrent l\'impact de vos dons et la portée de notre mission. Découvrez en toute transparence les actions concrètes réalisées chaque année.',
    'about.rapports.dl1': 'Rapport 2024-2025',
    'about.rapports.dl2': 'Rapport 2023-2024',
    'about.rapports.dl3': 'Rapport 2022-2023',
    'about.rapports.dl4': 'Rapport 2021-2022',
    'about.rapports.dl5': 'Rapport 2020-2021',
    'about.ca.title': 'Notre C.A.',
    'about.ca.subtitle': 'Des parents et alliés engagés qui veillent à la mission d\'Emergo.',
    'about.ca.role1': 'Présidente et parent',
    'about.ca.role2': 'Trésorière et parent',
    'about.ca.role3': 'Président fondateur et parent',
    'about.ca.role4': 'Administratrice et parent',
    'about.ca.role5': 'Administrateur',
    'about.ca.role6': 'Administratrice',
    'about.ca.role7': 'Administratrice',
    'about.quote1.text': 'Ce répit, c\'est un souffle. Il nous permet, comme parents, de tenir bon, de rester disponibles pour les autres enfants… de continuer malgré les défis du quotidien.',
    'about.quote1.role': 'Présidente et parent',
    'about.ambassadors.title': 'Ambassadeur·rices',
    'about.ambassadors.subtitle': 'Des allié·es fidèles qui soutiennent la mission d\'Emergo depuis des années',
    'about.amb.role1': 'Président fondateur',
    'about.amb.role2': 'Banque Nationale',
    'about.amb.role3': 'Groupe Robert',
    'about.amb.role4': 'Domaine Roy & Fils',
    'about.amb.role5': 'J.C. Flowers & Co',
    'about.amb.role6': 'Groupe Robert',
    'about.equipe.title': 'L\'équipe Répit',
    'about.equipe.text': 'Chaque année, nous recrutons et formons une équipe attentionnée et dynamique, prête à accompagner les participant·es avec respect, structure et bonne humeur.',
    'about.equipe.btn': 'Visitez le site de Répit Emergo',
    'about.quote2.text': 'Voir les enfants s\'épanouir pendant que les parents reprennent leur souffle, c\'est la preuve que notre travail a un réel impact. C\'est ce qui me motive chaque jour.',
    'about.quote2.role': 'Personnel de répit',
    'about.bureau.title': 'Équipe Bureau',
    'about.bureau.text': 'Qu\'il s\'agisse d\'organiser les séjours de répit ou de coordonner les activités de la Fondation, notre équipe de bureau engagée assure l\'encadrement, la logistique, le financement et le soutien aux familles. Elle est composée de Pierre (directeur, Répit Emergo), Reetta (directrice, Fondation Emergo), Éric (directeur adjoint), Marie-Alice (coordonnatrice des répits) et Ameyo (agente administrative).',
    'about.cta.title': 'Soutenez notre mission',
    'about.cta.text': 'Chaque don nous permet d\'offrir plus de répits aux familles qui en ont le plus besoin.',
    'about.cta.btn': 'Faire un don',

    // ===== LA CAUSE =====
    'cause.hero.eyebrow': 'Pour une pause essentielle',
    'cause.hero.title': 'Soutenir les familles vivant avec l\'autisme',
    'cause.hero.text': 'L\'autisme ne prend pas de pause. Nos répits spécialisés offrent aux familles un souffle vital, dans un cadre sécuritaire, bienveillant et adapté à leurs réalités.',
    'cause.repit.title': 'Le répit : un besoin réel, souvent invisible',
    'cause.repit.text1': 'Vivre avec une personne autiste ayant des besoins de soutien élevés demande une présence constante et une énergie inépuisable. Pour de nombreuses familles, cela signifie souvent s\'effacer, parfois s\'épuiser.',
    'cause.repit.text2': 'Les répits Emergo ne sont pas un luxe : ils sont une réponse concrète à un besoin urgent. Une pause bienveillante et sécuritaire, pour que la personne autiste vive un moment agréable... et que ses proches puissent enfin souffler.',
    'cause.aussi.title': 'Le répit, c\'est aussi pour la personne autiste',
    'cause.aussi.text': 'Les répits Emergo ne sont pas seulement un moment de pause pour les familles. Pour les participant·es, ce sont des séjours riches en activités, en découvertes et en liens humains. Encadré·es par une équipe formée et attentionnée, les enfants, adolescent·es et adultes autistes vivent des expériences valorisantes, dans un environnement qui respecte leur rythme et leurs besoins. Ici, ils et elles peuvent être eux-mêmes, en sécurité. Et parfois, faire un pas de plus — vers l\'autonomie, vers la confiance, ou tout simplement vers le plaisir.',
    'cause.stat1.title': '1 enfant sur 50 est autiste au Canada (2022)',
    'cause.stat1.text': 'Cela représente plus de 7,2 millions de jeunes âgé·es de 1 à 17 ans. Les besoins sont immenses, et l\'accès à des services spécialisés demeure limité pour de nombreuses familles.',
    'cause.stat2.title': '1,5 million de proches aidants au Québec',
    'cause.stat2.text': 'Un adulte sur cinq consacre temps et énergie à soutenir un·e proche. Trop souvent, ces personnes proches aidantes s\'épuisent, faute de répit ou de soutien adéquat.',
    'cause.stat3.title': '2 145 nuitées offertes par Emergo en 2024',
    'cause.stat3.text': 'Grâce à votre soutien, la Fondation Emergo continue de répondre à un besoin urgent en offrant des répits humains, sécuritaires et adaptés aux personnes autistes et à leurs familles.',
    'cause.quote.text': 'Au début, c\'était un peu effrayant de laisser Maxence, mais on a vite vu à quel point il était heureux à Emergo. Ces répits nous donnent à tou·tes le temps et l\'espace pour recharger nos batteries — y compris pour son frère. Maintenant, toute la famille les attend avec impatience.',
    'cause.quote.author': 'Thomas',
    'cause.quote.role': 'Père de Maxence',
    'cause.impact.title': 'Ce que votre soutien rend possible',
    'cause.impact.text': 'Chaque don permet de transformer la réalité d\'une famille, d\'un·e participant·e ou d\'un·e étudiant·e engagé·e auprès d\'Emergo. Voici trois exemples concrets de l\'impact que vous rendez possible.',
    'cause.impact1.title': 'Une pause pour les familles',
    'cause.impact1.text': 'Des personnes proches aidantes qui reprennent leur souffle grâce à un moment de répit bien mérité.',
    'cause.impact2.title': 'Des participant·es épanoui·es',
    'cause.impact2.text': 'Des personnes autistes accueillies dans un environnement respectueux, sécuritaire et joyeux.',
    'cause.impact3.title': 'Une expérience humaine inoubliable',
    'cause.impact3.text': 'Des étudiant·es vivent une expérience concrète, enrichissante et profondément humaine au sein de l\'équipe de répit.',
    'cause.cta.title': 'Je veux contribuer',
    'cause.cta.text': 'Votre don aide une famille vivant avec l\'autisme à accéder à un répit spécialisé et accueillant.',
    'cause.cta.btn': 'Faire un don',

    // ===== DONS =====
    'dons.hero.eyebrow': 'Soutenir Emergo',
    'dons.hero.title': 'Ensemble, donnons du souffle',
    'dons.hero.text': 'Grâce à votre soutien, nous rendons les répits spécialisés plus accessibles aux familles ayant un proche autiste. Votre générosité allège un fardeau bien réel et soutient une mission essentielle.',
    'dons.pourquoi.title': 'Pourquoi faire un don ?',
    'dons.pourquoi.text': 'Offrir du répit, c\'est soutenir concrètement des familles vivant avec l\'autisme. Ces séjours permettent aux proches aidants de souffler, de prévenir l\'épuisement, mais aussi aux participants de vivre des moments positifs, valorisants et adaptés à leurs besoins. Vos dons rendent ces services plus accessibles à travers le Québec, soutiennent la formation du personnel et le développement de projets essentiels.',
    'dons.impact.title': 'Choisissez votre impact',
    'dons.impact.text': 'Soutenez un projet qui vous tient à cœur. Chaque contribution a un effet réel et mesurable.',
    'dons.box1.title': 'Équipement adapté pour le répit',
    'dons.box1.text': 'Aidez à financer du matériel essentiel pour des séjours confortables et sécuritaires.',
    'dons.box1.btn': 'J\'équipe',
    'dons.box2.title': 'Sorties spéciales pendant le répit',
    'dons.box2.text': 'Aidez à offrir des journées mémorables et stimulantes aux personnes autistes.',
    'dons.box2.btn': 'Je donne le sourire',
    'dons.box3.title': 'Former nos intervenants',
    'dons.box3.text': 'Aidez-nous à offrir une formation de qualité à ceux et celles qui accompagnent nos participants.',
    'dons.box3.btn': 'Je soutiens',
    'dons.quote.text': 'Ce qu\'on vit ici, c\'est une compréhension profonde. Ma fille est accueillie telle qu\'elle est, et nous, comme parents, on sent qu\'on n\'a pas à s\'expliquer ou à justifier. On est compris.',
    'dons.quote.author': 'Henriette Angers',
    'dons.quote.role': 'Mère, donatrice et administratrice',
    'dons.cta.title': 'Votre impact compte',
    'dons.cta.text': 'Chaque don, petit ou grand, contribue à offrir du répit et du soutien à des familles.',
    'dons.cta.btn': 'Faire un don maintenant',

    // ===== S'IMPLIQUER =====
    'simpl.hero.eyebrow': 'Impliquez-vous à nos côtés',
    'simpl.hero.title': 'Des événements rassembleurs et porteurs',
    'simpl.hero.text': 'Participer à un événement de la Fondation Emergo, c\'est joindre l\'utile à l\'agréable. Que ce soit en courant, en jouant au golf ou en donnant un coup de main, chaque geste – qu\'il soit posé par un·e coureur·euse, golfeur·euse ou bénévole – contribue à offrir du répit aux familles qui en ont besoin.',
    'simpl.events.title': 'Nos événements',
    'simpl.ev1.name': 'Marathon Beneva de Montréal 2025',
    'simpl.ev1.date': '20/09/2025',
    'simpl.ev1.text': 'Inscrivez-vous dès maintenant au Marathon Beneva de Montréal le samedi 20 septembre 2025 et courez ou marchez pour amasser des fonds pour notre cause !<br><br>Lors de votre inscription :<br>· Rejoignez <strong style="color:var(--beige);">l\'équipe Fondation Emergo</strong><br>· Choisissez <strong style="color:var(--beige);">Fondation Emergo</strong> comme organisme de bienfaisance',
    'simpl.ev1.btn': 'Joindre l\'équipe',
    'simpl.ev2.name': 'Choisissez votre impact',
    'simpl.ev2.date': '31/12/2025',
    'simpl.ev2.text': 'Soutenez un projet concret parmi ceux qui vous tiennent à cœur. Chaque contribution est dirigée vers une initiative bien précise.',
    'simpl.ev2.btn': 'Découvrir les projets',
    'simpl.ev3.name': 'Tournoi de golf-bénéfice 2025',
    'simpl.ev3.date': '19/06/2025',
    'simpl.ev3.text': 'Joignez-vous à nous pour une journée conviviale au profit des services de répit. Une occasion unique de jouer, réseauter et soutenir une cause essentielle.',
    'simpl.ev3.btn': 'Je souhaite m\'inscrire',
    'simpl.merci.title': 'Merci à celles et ceux qui rendent tout cela possible',
    'simpl.merci.text': 'Grâce à votre générosité, des familles reçoivent le répit dont elles ont tant besoin. Vous êtes au cœur de notre mission. Retrouvez nos grand·es donateurs et donatrices dans les rapports annuels.',
    'simpl.merci.btn': 'Découvrez les actions réalisées',
    'simpl.logos.title': 'Merci à nos partenaires engagés',
    'simpl.logos.text': 'Leur soutien fidèle nous permet d\'aller plus loin. Ensemble, nous bâtissons un réseau de répit solide, humain et accessible pour les familles.',
    'simpl.cta.title': 'Votre impact compte',
    'simpl.cta.text': 'Chaque don, petit ou grand, contribue à offrir du répit et du soutien à des familles.',
    'simpl.cta.btn': 'Faire un don maintenant',

    // Footer
    'footer.address.label': 'Adresse:',
    'footer.association.label': 'Numéro d\'association:',
    'footer.contact.label': 'Contact',
    'footer.copyright': '© 2025 Emergo. Tous droits réservés.',
    'footer.privacy': 'Politique de confidentialité'
  },

  en: {
    // Meta
    'meta.title': 'Emergo Foundation – Autism Respite in Quebec',
    'meta.description': 'Fondation Emergo supports families by funding specialized respite care for autistic individuals of all ages.',

    // Nav
    'nav.about': 'About us',
    'nav.cause': 'Our cause',
    'nav.dons': 'Donate',
    'nav.simpliquer': 'Get involved',
    'nav.donate': 'Donate',
    'nav.lang': 'FR',

    // Home — Hero
    'home.hero.title': 'Because autism doesn\'t take a break',
    'home.hero.text': 'Fondation Emergo supports families by funding specialized respite care for autistic individuals of all ages.',
    'home.hero.btn1': 'Who we are',
    'home.hero.btn2': 'Our cause',

    // Home — Notre fondation
    'home.fondation.subtitle': 'Our foundation',
    'home.fondation.title': 'A committed mission',
    'home.fondation.text': 'Since its creation, Fondation Emergo supports families who experience the reality of autism in their daily lives, by funding specialized, compassionate, and accessible respite services across Quebec.',
    'home.fondation.btn': 'Learn more',

    // Home — Notre cause
    'home.cause.subtitle': 'Our cause',
    'home.cause.title': 'Providing respite for families',
    'home.cause.text': 'Thanks to your donations, more families can access affordable, caring, and adapted respite services. Each stay helps lighten the daily load of caregivers and supports autistic individuals.',
    'home.cause.btn': 'Discover',

    // Home — Nos gens
    'home.gens.subtitle': 'Our people',
    'home.gens.title': 'Committed individuals',
    'home.gens.text': 'Emergo Foundation\'s mission is carried by parents, professionals, allies, and young people who care. Their commitment is at the heart of everything we do.',
    'home.gens.li1': 'A board made up of parents and professionals',
    'home.gens.li2': 'Long-time ambassadors standing with our cause',
    'home.gens.li3': 'Dedicated respite teams trained with care',
    'home.gens.btn': 'Learn more',

    // Home — Social
    'home.social.title': 'Join our online community',

    // Home — CTA
    'home.cta.title': 'I want to help',
    'home.cta.text': 'Your donation helps a family access meaningful, caring respite adapted to autism.',
    'home.cta.btn': 'Donate now',

    // ===== ABOUT =====
    'about.hero.eyebrow': 'Learn more',
    'about.hero.title': 'About Fondation Emergo',
    'about.hero.text': 'A registered charity, Fondation Emergo supports the development and long-term sustainability of specialized respite services offered by Répit Emergo across Quebec.',
    'about.mission.title': 'A mission focused on families',
    'about.mission.text': 'Fondation Emergo supports the services of Répit Emergo and acts as a lever for funding, development, and awareness. Its mission: to make specialized respite care more accessible to families who live the reality of autism on a daily basis, often feeling exhausted and isolated. The foundation mobilizes the community around this reality, values the commitment of care providers, and ensures that services remain humane, tailored, and sustainable.',
    'about.rapports.eyebrow': 'Our publications',
    'about.rapports.title': 'Annual reports',
    'about.rapports.text': 'Our annual reports highlight the impact of your donations and the reach of our mission. A transparent overview of the work accomplished each year.',
    'about.rapports.dl1': '2024-2025 Report',
    'about.rapports.dl2': '2023-2024 Report',
    'about.rapports.dl3': '2022-2023 Report',
    'about.rapports.dl4': '2021-2022 Report',
    'about.rapports.dl5': '2020-2021 Report',
    'about.ca.title': 'Our Board',
    'about.ca.subtitle': 'Parents and allies committed to guiding Emergo\'s mission.',
    'about.ca.role1': 'Chair and parent',
    'about.ca.role2': 'Treasurer and parent',
    'about.ca.role3': 'Founding Chair and parent',
    'about.ca.role4': 'Director and parent',
    'about.ca.role5': 'Director',
    'about.ca.role6': 'Director',
    'about.ca.role7': 'Director',
    'about.quote1.text': 'Respite is a breath of fresh air. It\'s what allows us, as parents, to keep going, to be there for our other children… to carry on despite the daily challenges.',
    'about.quote1.role': 'Chair and parent',
    'about.ambassadors.title': 'Ambassadors',
    'about.ambassadors.subtitle': 'Long-time allies who support Emergo\'s mission year after year',
    'about.amb.role1': 'Founding President',
    'about.amb.role2': 'National Bank',
    'about.amb.role3': 'Groupe Robert',
    'about.amb.role4': 'Domaine Roy & Fils',
    'about.amb.role5': 'J.C. Flowers & Co',
    'about.amb.role6': 'Groupe Robert',
    'about.equipe.title': 'Respite team',
    'about.equipe.text': 'Every year, we recruit and train a caring and dynamic team, ready to support participants with respect, structure, and positivity.',
    'about.equipe.btn': 'Visit Emergo respite website',
    'about.quote2.text': 'Seeing kids thrive while their parents finally catch their breath is proof that what we do matters. That\'s what motivates me every day.',
    'about.quote2.role': 'Respite staff',
    'about.bureau.title': 'Office team',
    'about.bureau.text': 'Whether it\'s organizing respite stays or coordinating the Foundation\'s activities, our dedicated office team oversees logistics, supervision, fundraising, and family support. The team includes Pierre (Director, Répit Emergo), Reetta (Director, Fondation Emergo), Éric (Assistant Director), Marie-Alice (Respite Coordinator), and Ameyo (Administrative Officer).',
    'about.cta.title': 'Support our mission',
    'about.cta.text': 'Every donation helps us offer more respite to families who need it most.',
    'about.cta.btn': 'Donate now',

    // ===== OUR CAUSE =====
    'cause.hero.eyebrow': 'A much-needed pause',
    'cause.hero.title': 'Supporting families living with autism',
    'cause.hero.text': 'Autism doesn\'t take a break. Our specialized respite services offer families a vital breath of relief, in a safe, compassionate, and adapted environment that reflects their realities.',
    'cause.repit.title': 'Respite: a real, often invisible need',
    'cause.repit.text1': 'Living with an autistic person who has high support needs requires constant presence and boundless energy. For many families, it often means putting themselves aside—and sometimes, burning out.',
    'cause.repit.text2': 'Emergo\'s respite services are not a luxury; they are a concrete response to an urgent need. A compassionate, safe pause—so the autistic person can enjoy a positive experience… and their loved ones can finally catch their breath.',
    'cause.aussi.title': 'Respite is for autistic individuals too',
    'cause.aussi.text': 'Emergo\'s respite services are not just a break for families. For participants, they are meaningful stays filled with activities, discovery, and human connection. Guided by a trained and caring team, autistic children, teens, and adults experience enriching moments in an environment that respects their pace and their needs. Here, they can be themselves—safe, supported, and sometimes taking a step forward: toward autonomy, toward confidence, or simply toward joy.',
    'cause.stat1.title': '1 in 50 children is autistic in Canada (2022)',
    'cause.stat1.text': 'That\'s over 7.2M young people between the ages of 1 and 17. The need is great, and access to specialized services remains limited for many families.',
    'cause.stat2.title': '1.5 million caregivers in Québec',
    'cause.stat2.text': 'One in five adults supports a loved one. Too often, these caregivers reach the point of exhaustion due to a lack of appropriate support or respite.',
    'cause.stat3.title': '2,145 respite nights offered by Emergo in 2024',
    'cause.stat3.text': 'With your support, Fondation Emergo continues to meet urgent needs by offering safe, personalized, and human respite to autistic individuals and their families.',
    'cause.quote.text': 'At first, it was a little scary to leave Maxence, but we quickly saw how happy he was at Emergo. These respite stays give our whole family — including his brother — the time and space to recharge. Now, we all look forward to them.',
    'cause.quote.author': 'Thomas',
    'cause.quote.role': 'Father of Maxence',
    'cause.impact.title': 'What Your Support Makes Possible',
    'cause.impact.text': 'Every donation helps transform the reality of a family, a participant, or a student committed to Emergo. Here are three concrete examples of the impact you make possible.',
    'cause.impact1.title': 'A Break for Families',
    'cause.impact1.text': 'Caregivers catching their breath thanks to a well-deserved moment of respite.',
    'cause.impact2.title': 'Participants Who Thrive',
    'cause.impact2.text': 'Autistic individuals welcomed into a respectful, safe, and joyful environment.',
    'cause.impact3.title': 'A Meaningful Experience',
    'cause.impact3.text': 'Students gaining hands-on experience that is enriching, meaningful, and deeply human as part of the respite team.',
    'cause.cta.title': 'I want to help',
    'cause.cta.text': 'Your donation helps a family access meaningful, caring respite adapted to autism.',
    'cause.cta.btn': 'Donate now',

    // ===== DONATE =====
    'dons.hero.eyebrow': 'Support Emergo',
    'dons.hero.title': 'Together, let\'s bring relief',
    'dons.hero.text': 'With your support, we help make specialized respite more accessible to families with an autistic loved one. Your generosity lightens the load and supports a vital mission.',
    'dons.pourquoi.title': 'Why donate?',
    'dons.pourquoi.text': 'Donating to Emergo means supporting families living with autism. Respite stays offer caregivers a vital break and help prevent burnout — but they also give participants the chance to enjoy meaningful, structured, and joyful experiences. Your gift helps make these services more accessible across Quebec and supports staff training, safe environments, and the development of new initiatives.',
    'dons.impact.title': 'Choose your impact',
    'dons.impact.text': 'Direct your donation to a project that truly makes a difference in the lives of families.',
    'dons.box1.title': 'Adaptive equipment for the respites',
    'dons.box1.text': 'Help us purchase essential equipment for safe, comfortable respite stays.',
    'dons.box1.btn': 'I equip',
    'dons.box2.title': 'Special outings for participants',
    'dons.box2.text': 'Help us offer joyful, stimulating activities that make respite even more meaningful.',
    'dons.box2.btn': 'I give joy',
    'dons.box3.title': 'Training future staff',
    'dons.box3.text': 'Help us train committed, compassionate staff to support autistic participants year-round.',
    'dons.box3.btn': 'I support',
    'dons.quote.text': 'What we experience here is deep understanding. My daughter is welcomed exactly as she is, and as parents, we don\'t need to explain or justify. We feel understood.',
    'dons.quote.author': 'Henriette Angers',
    'dons.quote.role': 'Mother, donor and board member',
    'dons.cta.title': 'Your donation matters',
    'dons.cta.text': 'Every donation, big or small, helps us provide respite and support to families.',
    'dons.cta.btn': 'I want to give',

    // ===== GET INVOLVED =====
    'simpl.hero.eyebrow': 'Get involved with us',
    'simpl.hero.title': 'Events that bring people together',
    'simpl.hero.text': 'Taking part in a Fondation Emergo event means doing good while having fun. Whether you\'re running, golfing, or lending a hand, every action helps provide much-needed respite to families.',
    'simpl.events.title': 'Our events',
    'simpl.ev1.name': 'Beneva Montreal Marathon 2025',
    'simpl.ev1.date': '09/20/2025',
    'simpl.ev1.text': 'Register now for the Beneva Montreal Marathon on Saturday, September 20, 2025, and run or walk to help raise funds for our cause!<br><br>When registering:<br>· Join <strong style="color:var(--beige);">Team Fondation Emergo</strong><br>· Select <strong style="color:var(--beige);">Fondation Emergo</strong> as your charity of choice',
    'simpl.ev1.btn': 'Join the team',
    'simpl.ev2.name': 'Choose your impact',
    'simpl.ev2.date': '12/31/2025',
    'simpl.ev2.text': 'Support a project that matters to you. Your gift goes directly to the initiative you care about most.',
    'simpl.ev2.btn': 'Discover the projects',
    'simpl.ev3.name': 'Charity Golf Tournament 2025',
    'simpl.ev3.date': '06/19/2025',
    'simpl.ev3.text': 'A festive and meaningful day to support respite services for families. Gather a foursome and join us!',
    'simpl.ev3.btn': 'I want to register',
    'simpl.merci.title': 'Thank you to everyone who makes this possible',
    'simpl.merci.text': 'Thanks to your generosity, families receive the respite they so deeply need. You are at the heart of our mission. Our major donors are listed in the annual reports.',
    'simpl.merci.btn': 'See the concrete impact we make each year',
    'simpl.logos.title': 'Thank you to our dedicated partners',
    'simpl.logos.text': 'Your ongoing support helps us go further. Together, we\'re building a strong, compassionate and accessible respite network for families.',
    'simpl.cta.title': 'Your donation matters',
    'simpl.cta.text': 'Every donation, big or small, helps us provide respite and support to families.',
    'simpl.cta.btn': 'Donate now',

    // Footer
    'footer.address.label': 'Address:',
    'footer.association.label': 'Association number:',
    'footer.contact.label': 'Contact',
    'footer.copyright': '© 2025 Emergo. All rights reserved.',
    'footer.privacy': 'Privacy policy'
  }
};

let currentLang = 'fr';

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  // Handle data-i18n (textContent)
  document.querySelectorAll('[data-i18n]').forEach(function(el) {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translations[lang][key];
      } else {
        el.textContent = translations[lang][key];
      }
    }
  });

  // Handle data-i18n-html (innerHTML for rich text)
  document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
    const key = el.getAttribute('data-i18n-html');
    if (translations[lang] && translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });

  // Handle data-i18n-attr (attributes like content, title, alt, etc.)
  document.querySelectorAll('[data-i18n-attr]').forEach(function(el) {
    var pairs = el.getAttribute('data-i18n-attr').split(',');
    pairs.forEach(function(pair) {
      var parts = pair.trim().split(':');
      if (parts.length === 2) {
        var attr = parts[0].trim();
        var key = parts[1].trim();
        if (translations[lang] && translations[lang][key]) {
          el.setAttribute(attr, translations[lang][key]);
        }
      }
    });
  });

  // Update page title from data-i18n-title on <html> or fallback to meta.title
  var titleEl = document.querySelector('[data-i18n-title]');
  if (titleEl) {
    var titleKey = titleEl.getAttribute('data-i18n-title');
    if (translations[lang] && translations[lang][titleKey]) {
      document.title = translations[lang][titleKey];
    }
  } else if (translations[lang] && translations[lang]['meta.title']) {
    document.title = translations[lang]['meta.title'];
  }

  // Update lang toggle button text
  document.querySelectorAll('.lang-toggle').forEach(function(btn) {
    btn.textContent = lang === 'fr' ? 'EN' : 'FR';
  });

  // Save preference
  localStorage.setItem('fondation-lang', lang);
}

function toggleLang() {
  setLang(currentLang === 'fr' ? 'en' : 'fr');
}
