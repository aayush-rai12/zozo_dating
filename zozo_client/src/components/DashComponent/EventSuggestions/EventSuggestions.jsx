import React from "react";
import "./EventSuggestions.css";
function EventSuggestions() {
  return (
    <section className="event_suggestions">
      <div className="section_header">
        <h3>Events & Date Ideas Near You</h3>
        <button className="see_all_btn">See All</button>
      </div>

      <div className="event_cards">
        {/* Event Card 1 */}
        <div className="event_card">
          <div
            className="event_image"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60)",
            }}
          >
            <span className="event_category">Music</span>
          </div>
          <div className="event_details">
            <h4>Jazz Night at Blue Note</h4>
            <div className="event_meta">
              <span>
                <i className="fa-solid fa-calendar-days"></i> Fri, Jun 10 • 8PM
              </span>
              <span>
                <i className="fa-solid fa-location-dot"></i> 1.2mi away
              </span>
            </div>
            <div className="event_stats">
              <span>
                <i className="fa-solid fa-user-group"></i> 12 Zozo members going
              </span>
              <button className="rsvp_btn">RSVP</button>
            </div>
          </div>
        </div>

        {/* Event Card 2 */}
        <div className="event_card">
          <div
            className="event_image"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d2luZSUyMHRhc3Rpbmd8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60)",
            }}
          >
            <span className="event_category">Food & Drink</span>
          </div>
          <div className="event_details">
            <h4>Wine Tasting Experience</h4>
            <div className="event_meta">
              <span>
                <i className="fa-solid fa-calendar-days"></i> Sat, Jun 11 • 6PM
              </span>
              <span>
                <i className="fa-solid fa-location-dot"></i> 0.8mi away
              </span>
            </div>
            <div className="event_stats">
              <span>
                <i className="fa-solid fa-user-group"></i> 8 Zozo members going
              </span>
              <button className="rsvp_btn">RSVP</button>
            </div>
          </div>
        </div>
        <div className="event_card">
          <div
            className="event_image"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29uY2VydHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60)",
            }}
          >
            <span className="event_category">Music</span>
          </div>
          <div className="event_details">
            <h4>Jazz Night at Blue Note</h4>
            <div className="event_meta">
              <span>
                <i className="fa-solid fa-calendar-days"></i> Fri, Jun 10 • 8PM
              </span>
              <span>
                <i className="fa-solid fa-location-dot"></i> 1.2mi away
              </span>
            </div>
            <div className="event_stats">
              <span>
                <i className="fa-solid fa-user-group"></i> 12 Zozo members going
              </span>
              <button className="rsvp_btn">RSVP</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EventSuggestions;
