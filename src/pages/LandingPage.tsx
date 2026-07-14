import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';
import {
  FiZap,
  FiTarget,
  FiLayout,
  FiDownload,
  FiArrowRight,
  FiGithub,
  FiTwitter,
  FiLinkedin,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from '../assets/favicon.png';

type CSSVarStyle = CSSProperties & { '--p'?: string };

interface RevealProps {
  children: ReactNode;
  className?: string;
}

function Reveal({ children, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
    </div>
  );
}

export function LandingPage() {
  const [atsScore, setAtsScore] = useState(0);

  useEffect(() => {
    const target = 98;
    const duration = 1400;
    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setAtsScore(Math.round(progress * target));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const scoreRingStyle: CSSVarStyle = { '--p': `${atsScore}%` };

  return (
    <div className="landing-page">
      {/* NAV */}
      <header className="landing-nav">
        <div className="landing-nav__brand">
          <img src={logo} alt="Logo" className="landing-nav__logo" />
        </div>
        <Link to="/login" className="landing-btn landing-btn--ghost">
          Essayer gratuitement
        </Link>
      </header>

      {/* HERO */}
      <section className="landing-hero">
        <div className="landing-hero__text">
          <p className="landing-eyebrow">Générateur de CV</p>
          <h1 className="landing-title">
            Un CV qui se construit <span>sous vos yeux.</span>
          </h1>
          <p className="landing-subtitle">
            Renseignez vos informations, choisissez un modèle, et laissez
            l'algorithme structurer un CV clair, cohérent et lisible aussi bien
            par les recruteurs que par les logiciels de tri.
          </p>
          <div className="landing-hero__actions">
            <Link to="/login" className="landing-btn landing-btn--primary">
              Essayer maintenant <FiArrowRight />
            </Link>
          </div>
          <ul className="landing-trust">
            <li>Aucune carte bancaire requise</li>
            <li>Export PDF en un clic</li>
            <li>Optimisé pour les ATS</li>
          </ul>
        </div>

        <div className="landing-hero__visual" aria-hidden="true">
          <div className="cv-card">
            <div className="cv-card__header">
              <div className="cv-avatar" />
              <div className="cv-header-lines">
                <span className="cv-line cv-line--name" />
                <span className="cv-line cv-line--role" />
              </div>
            </div>

            <div className="cv-card__body">
              <span className="cv-tag cv-tag--1">Expérience</span>
              <span className="cv-line cv-line--w1" />
              <span className="cv-line cv-line--w2" />
              <span className="cv-line cv-line--w3" />

              <span className="cv-tag cv-tag--2">Compétences</span>
              <span className="cv-pill cv-pill--1" />
              <span className="cv-pill cv-pill--2" />
              <span className="cv-pill cv-pill--3" />
            </div>

            <div className="cv-card__score">
              <div className="cv-score-ring" style={scoreRingStyle}>
                <span>{atsScore}%</span>
              </div>
              <span className="cv-score-label">Score ATS</span>
            </div>
          </div>
        </div>
      </section>

      {/* ÉTAPES */}
      <Reveal className="landing-steps">
        <ol className="landing-steps__list">
          <li>
            <span className="landing-steps__num">01</span>
            <h3>Importez vos informations</h3>
            <p>Renseignez votre parcours en quelques minutes, ou reprenez un ancien CV.</p>
          </li>
          <li>
            <span className="landing-steps__num">02</span>
            <h3>Choisissez un modèle</h3>
            <p>Sélectionnez une mise en page adaptée à votre secteur et à votre profil.</p>
          </li>
          <li>
            <span className="landing-steps__num">03</span>
            <h3>Téléchargez votre CV</h3>
            <p>Exportez un PDF prêt à l'envoi, formaté et relu pour vous.</p>
          </li>
        </ol>
      </Reveal>

      {/* FONCTIONNALITÉS */}
      <Reveal className="landing-features">
        <h2 className="landing-section-title">Pensé pour aller vite, sans rien sacrifier</h2>
        <div className="landing-features__grid">
          <div className="landing-feature">
            <FiZap className="landing-feature__icon" />
            <h3>Génération instantanée</h3>
            <p>Un CV structuré généré en quelques secondes à partir de vos réponses.</p>
          </div>
          <div className="landing-feature">
            <FiTarget className="landing-feature__icon" />
            <h3>Optimisé pour les ATS</h3>
            <p>Une structure lisible par les logiciels de tri des recruteurs.</p>
          </div>
          <div className="landing-feature">
            <FiLayout className="landing-feature__icon" />
            <h3>Modèles professionnels</h3>
            <p>Plusieurs mises en page, pensées pour différents métiers et niveaux d'expérience.</p>
          </div>
          <div className="landing-feature">
            <FiDownload className="landing-feature__icon" />
            <h3>Export PDF haute qualité</h3>
            <p>Un fichier prêt à l'envoi, sans mise en page à retoucher.</p>
          </div>
        </div>
      </Reveal>

      {/* MODÈLES */}
      <Reveal className="landing-templates">
        <h2 className="landing-section-title">Des modèles pour chaque profil</h2>
        <div className="landing-templates__row">
          <div className="template-card template-card--modern">
            <div className="template-preview template-preview--modern">
              <span className="tp-sidebar" />
              <div className="tp-content">
                <span className="tp-line tp-line--title" />
                <span className="tp-line tp-line--sub" />
                <span className="tp-line tp-line--w1" />
                <span className="tp-line tp-line--w2" />
              </div>
            </div>
            <span className="template-card__label">Moderne</span>
          </div>

          <div className="template-card template-card--classic">
            <div className="template-preview template-preview--classic">
              <span className="tp-line tp-line--center-title" />
              <span className="tp-rule" />
              <span className="tp-line tp-line--w1" />
              <span className="tp-line tp-line--w2" />
              <span className="tp-line tp-line--w3" />
            </div>
            <span className="template-card__label">Classique</span>
          </div>

          <div className="template-card template-card--creative">
            <div className="template-preview template-preview--creative">
              <span className="tp-diagonal" />
              <span className="tp-avatar" />
              <span className="tp-line tp-line--w1" />
              <span className="tp-line tp-line--w2" />
              <span className="tp-dot tp-dot--1" />
              <span className="tp-dot tp-dot--2" />
              <span className="tp-dot tp-dot--3" />
            </div>
            <span className="template-card__label">Créatif</span>
          </div>
        </div>
      </Reveal>

      {/* BANNIÈRE CTA */}
      <Reveal className="landing-cta">
        <h2>Prêt à créer votre prochain CV ?</h2>
        <p>Commencez gratuitement, aucune inscription par carte bancaire.</p>
        <Link to="/login" id="essayer" className="landing-btn landing-btn--primary landing-btn--lg">
          Essayer gratuitement <FiArrowRight />
        </Link>
      </Reveal>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="landing-footer__top">
          <div className="landing-footer__brand">
            <img src={logo} alt="Logo" className="landing-footer__logo" />
            <p>Créez un CV clair, structuré et prêt à convaincre.</p>
          </div>

          <div className="landing-footer__col">
            <h4>Produit</h4>
            <a href="#">Essayer</a>
            <a href="#">Modèles</a>
            <a href="#">Tarifs</a>
          </div>

          <div className="landing-footer__col">
            <h4>Ressources</h4>
            <a href="#">Guide du CV</a>
            <a href="#">Blog</a>
            <a href="#">FAQ</a>
          </div>

          <div className="landing-footer__col">
            <h4>Légal</h4>
            <a href="#">Confidentialité</a>
            <a href="#">Conditions</a>
          </div>
        </div>

        <div className="landing-footer__bottom">
          <span>© {new Date().getFullYear()} — Tous droits réservés</span>
          <div className="landing-footer__socials">
            <a href="#" aria-label="Github"><FiGithub /></a>
            <a href="#" aria-label="Twitter"><FiTwitter /></a>
            <a href="#" aria-label="LinkedIn"><FiLinkedin /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
