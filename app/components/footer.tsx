export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-social">
          <p className="footer-title">Follow Us</p>
          <div className="social-links">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/rolloverkimbap/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link instagram"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2m-.25 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5A3.75 3.75 0 0020 16.25v-8.5A3.75 3.75 0 0016.25 4h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6zm5.5-1.5a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" />
              </svg>
            </a>

            {/* Threads */}
            <a
              href="https://www.threads.com/@rolloverkimbap"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link threads"
              aria-label="Threads"
              title="Threads"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-copyright">
          <p>&copy; 2025 Roll Over Kimbap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
