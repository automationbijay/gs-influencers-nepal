# Influencers Nepal: Business Model (Phase 1)

## Intent and Purpose
The primary goal of the first phase of Influencers Nepal is to bridge the gap between local creators and businesses by providing a centralized, accessible directory. We aim to empower Nepali influencers to showcase their profiles and enable businesses to discover and contact them directly, fostering authentic collaborations without intermediaries.

## Core Value Proposition
- **For Influencers:** A free platform to list their profiles, social media reach, and contact information, making them discoverable to brands and local businesses.
- **For Businesses:** A searchable directory of verified local talent, providing direct communication channels to discuss potential partnerships and campaigns.

## Operational Model (Phase 1)

### 1. Data Collection
- **Method:** Influencers provide their information via a standardized Google Form.
- **Content:** Profiles include niche, social media handles, audience demographics, and preferred communication modes (Email, WhatsApp, Instagram DM, etc.).

### 2. Data Management & Delivery
- **Static Architecture:** The platform is served as a static website for maximum performance and reliability.
- **JSON Backend:** Data collected from the Google Form is processed and served via a `json` file.
- **Automated Updates:** When an influencer updates their information in the Google Form, the corresponding entry in the JSON data is updated (via automation scripts), ensuring the directory remains current.

### 3. Monetization & Accessibility
- **Free for All:** During this initial phase, the platform is completely free for both influencers to list themselves and for businesses to browse and contact them.
- **No Middleman:** We do not take commissions or facilitate payments; our role is strictly to provide the connection point.

## Communication Workflow
1. **Discovery:** A business visits the Influencers Nepal website and browses the directory.
2. **Evaluation:** The business reviews influencer profiles and their respective niches/social media presence.
3. **Contact:** The business uses the "Communication Mode" provided by the influencer (e.g., clicking a WhatsApp link or copying an email address) to initiate a conversation externally.

## Success Metrics for Phase 1
- Number of active influencer listings in the directory.
- Website traffic from local business owners.
- Qualitative feedback on the ease of connection between both parties.
