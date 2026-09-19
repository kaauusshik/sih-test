const fs = require('fs');
const css = `
.story-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  opacity: 0;
  animation: modal-fade-in 0.3s forwards ease-out;
}
.story-modal {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  transform: translateY(20px);
  animation: modal-slide-up 0.4s forwards cubic-bezier(0.16, 1, 0.3, 1);
}
.story-modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
}
.story-modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  color: var(--text);
}
.story-modal-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-bottom: 1px solid var(--border);
}
.story-modal-content {
  padding: 3rem;
}
.story-modal-meta {
  display: flex;
  gap: 1rem;
  color: var(--text-muted);
  font-size: 0.875rem;
  margin-bottom: 1rem;
  align-items: center;
  font-weight: 500;
}
.story-modal-meta span {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}
.story-modal h2 {
  font-size: 2.5rem;
  line-height: 1.1;
  margin-bottom: 1rem;
  font-weight: 400;
  letter-spacing: -0.02em;
}
.story-modal-author {
  font-size: 1.125rem;
  color: var(--primary);
  margin-bottom: 2rem;
  font-style: italic;
}
.story-modal-body {
  font-size: 1.125rem;
  line-height: 1.7;
  color: var(--text-secondary);
  white-space: pre-wrap;
}
@keyframes modal-fade-in {
  to {
    opacity: 1;
  }
}
@keyframes modal-slide-up {
  to {
    transform: translateY(0);
  }
}
`;
fs.appendFileSync('c:/Users/kaauu/OneDrive/Desktop/SIH/client/global.css', css, 'utf8');
console.log('Done');
