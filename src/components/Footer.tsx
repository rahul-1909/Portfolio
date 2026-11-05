import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { profileData } from '../data/profile';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [timeStr, setTimeStr] = useState<string>('--:--:-- IST (HYDERABAD)');

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        setTimeStr(`${formatted} IST (HYDERABAD)`);
      } catch {
        setTimeStr('GMT+5:30 (HYDERABAD)');
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border-light dark:border-border-dark bg-background-light dark:bg-background-dark py-12 transition-colors">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-border-light dark:border-border-dark">
          <div>
            <div className="font-mono text-sm font-semibold text-text-light dark:text-text-dark">
              Rahul Teja Nalla
            </div>
            <p className="text-xs text-text-mutedLight dark:text-text-mutedDark mt-1">
              Backend Engineering &amp; AI/ML Systems • Hyderabad, India
            </p>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-text-mutedLight dark:text-text-mutedDark">
            <a
              href={profileData.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-light dark:hover:text-accent-dark transition-colors"
            >
              GitHub ↗
            </a>
            <a
              href={profileData.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-light dark:hover:text-accent-dark transition-colors"
            >
              X / Twitter ↗
            </a>
            <a
              href={profileData.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-light dark:hover:text-accent-dark transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href={profileData.socials.email}
              className="hover:text-accent-light dark:hover:text-accent-dark transition-colors"
            >
              Email ↗
            </a>
          </div>
        </div>

        {/* Bottom bar with Live Hyderabad Clock */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 font-mono text-xs text-text-mutedLight dark:text-text-mutedDark">
          <div>
            © {currentYear} Rahul Teja. All systems operational.
          </div>

          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-light dark:bg-accent-dark shadow-[0_0_8px_rgba(0,229,160,0.8)]" />
            <span>{timeStr}</span>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/today-i-learned" className="hover:text-accent-light dark:hover:text-accent-dark transition-colors">
              Changelog
            </Link>
            <button
              onClick={scrollToTop}
              className="hover:text-accent-light dark:hover:text-accent-dark transition-colors"
            >
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
