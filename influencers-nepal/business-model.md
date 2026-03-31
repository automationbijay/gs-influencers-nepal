# Influencers Nepal: Business Model (Phase 1 - Market Testing)

## Intent and Purpose
The primary goal is to test the market demand by bridging the gap between local creators and businesses via a centralized directory. This phase serves as a validation period before launching a full-fledged platform after reaching **1000 active influencers**.

## Core Value Proposition
- **For Influencers:** A free platform to list profiles and be discovered by brands.
- **For Businesses:** A searchable directory of verified local talent starting at a minimum engagement price of **Rs. 500**.

## Operational Model (Market Testing Phase)

### 1. Data Collection & Automation
- **Method:** Influencers provide their information via a Google Form.
- **Automation (n8n):** An n8n workflow intercepts the Google Form submission to:
  - Validate user details and social media links.
  - Automatically update the `influencers.json` file used by the frontend.
- **Content:** Profiles include niche, social media reach, and communication modes.

### 2. Data Management & Delivery
- **Static Architecture:** High-performance static site fetching from a central `json` file.
- **Real-time Updates:** n8n ensures the directory remains current without manual intervention.

### 3. Monetization & Negotiation
- **Zero Commission:** During this testing phase, the platform takes no commission.
- **Direct Negotiation:** All campaign details and payments are negotiated **directly** between the business and the creator. Influencers Nepal acts strictly as a discovery tool and does not intervene in current transactions.
- **Minimum Price:** The floor price for any collaboration starts at **Rs. 500** (derived from the lowest creator quotes).

## Communication Workflow
1. **Discovery:** Business browses the directory on Influencers Nepal.
2. **Contact:** Business uses provided communication modes (WhatsApp, Email, etc.) to contact the creator directly.
3. **Collaboration:** Both parties negotiate terms independently.

## Roadmap to Full Platform
- **Threshold:** Once **1000 influencers** have joined, the platform will transition from a directory to a full marketplace.
- **Future Intervention:** In the future, Influencers Nepal will facilitate payments, mediate disputes, and take a platform fee.

## Success Metrics
- Reaching 1000 active, validated influencer listings.
- Qualitative feedback from direct business-to-creator connections.
