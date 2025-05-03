// import React, { useState } from 'react';
// import SuccessStoryModal from './SuccessStoryModal';

// const SuccessStories = () => {
//   const [selectedStory, setSelectedStory] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const stories = [
//     {
//       id: 1,
//       names: "Sarah & Mike",
//       timeline: "Matched in 2022 • Engaged 2023",
//       story: "We matched during the pandemic and bonded over our love for hiking...",
//       howTheyMet: "Through Zozo's 'Adventure Lovers' category",
//       firstDate: "A 6-hour hike at sunrise",
//       tags: ["#Outdoorsy", "#LongDistance"],
//       photos: [
//         "https://randomuser.me/api/portraits/women/44.jpg",
//         "https://randomuser.me/api/portraits/men/32.jpg"
//       ]
//     },
//     {
//       id: 2,
//       names: "Sarah & Aayush",
//       timeline: "Matched in 2016 • Engaged 2023",
//       story: "We matched during the pandemic and bonded over our love for hiking...",
//       howTheyMet: "Through Zozo's 'Adventure Lovers' category",
//       firstDate: "A 6-hour hike at sunrise",
//       tags: ["#Outdoorsy", "#LongDistance"],
//       photos: [
//         "https://randomuser.me/api/portraits/women/44.jpg",
//         "https://randomuser.me/api/portraits/men/32.jpg"
//       ]
//     },
//     // ... other stories
//   ];

//   const openModal = (story) => {
//     setSelectedStory(story);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedStory(null);
//   };

//   return (
//     <section className="success_stories">
//       {/* Your existing stories list */}
//       {stories.map(story => (
//         <button key={story.id} onClick={() => openModal(story)}>
//           Read {story.names}'s Story
//         </button>
//       ))}
      
//       {/* Modal */}
//       {isModalOpen && (
//         <SuccessStoryModal 
//           story={selectedStory} 
//           onClose={closeModal} 
//         />
//       )}
//     </section>
//   );
// };

// export default SuccessStories;
// export { stories }; 