import React from 'react';

const ExpFeatures = [
  {
    title: 'VIP Events',
    desc: 'Exclusive parties and meetups for premium members',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30'
  },
  {
    title: 'Audio Dating',
    desc: 'Connect through voice before meeting',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4'
  },
  {
    title: 'Date Planner',
    desc: 'AI-powered date ideas based on mutual interests',
    image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a'
  }
];

export default function ExploreFeatures() {
  return (
    <div className="features-section">
      <div className="section-header">
        <h4 className="section-title">Premium Features</h4>
        <a href="#" className="see-all">See All</a>
      </div>
      <div className="feature-cards">
        {ExpFeatures.map((f, idx) => (
          <div className="feature-card" key={idx}>
            <img src={f.image} alt={f.title} className="feature-image" />
            <div className="feature-content">
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
