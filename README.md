# 🌊 Coastal Threat Alert System
**Team: TechTonic**

---

## Problem Statement
Coastal regions are increasingly vulnerable to **storm surges, flooding, erosion, and pollution** that damage communities and **blue carbon ecosystems** (mangroves, salt marshes, seagrasses).  
The loss of these habitats worsens **flood risks, biodiversity decline, and reduces carbon storage** critical for climate regulation.  

Existing systems are:  
- Siloed and fragmented.  
- Slow in threat detection.  
- Not accessible to local communities.  

**Timely detection and role-based alerts can save lives, property, and ecosystems.**

---

##  Our Solution
A comprehensive **AI/ML-powered early warning and monitoring platform** that:  
- Integrates **multi-source data** (satellites, sensors, historical records).  
- Uses **Deep Learning** for real-time flood detection.  
- Predicts **mangrove density loss** from geospatial data.  
- Provides **role-based, multilingual alerts** (SMS, Push notifications, P2P offline sharing).  
- Engages **communities via crowdsourced reporting + gamification**.  
- Offers **dashboards & hazard maps** for authorities.  

---

##  Target Users
- Disaster Management Departments  
- Coastal City Governments & Urban Planners  
- Environmental NGOs  
- Fisherfolk & Local Communities  
- Civil Defence & Response Teams  

---

##  Key Innovations (USP)
✅ **Deep Learning Flood Detection** – Real-time flood level estimation with masked imagery.  
✅ **Mangrove Density Prediction** – Predicts presence/absence of mangroves using 7 features (lat, long, elevation, climate data, etc.).  
✅ **Multi-Source Data Fusion** – Satellites + sensors + API-based weather/tide info.  
✅ **Explainable AI Alerts** – Each alert comes with drivers & confidence levels.  
✅ **Peer-to-Peer Alerts** – Works even in low/no internet zones.  
✅ **Community Participation** – Reporting module with crowdsourced validation & gamification.  
✅ **Blue Carbon Ecosystem Protection** – Dedicated monitoring module for mangroves, salt marshes & seagrass.  

---

##  System Workflow
**Data-to-Action Pipeline**

Data Ingestion ➝ AI/ML Anomaly Detection ➝ Predictive Forecasting
➝ Role-based Alert Dissemination ➝ Community Feedback
➝ Model Refinement


### Components
1. **Data Ingestion Layer** – Satellite data (Sentinel), weather APIs, tide gauges, IoT sensors.  
2. **Processing & AI Models**
   - Flood Detection (DL segmentation model).  
   - Mangrove Classifier (Geospatial ML).  
   - Time-Series Forecasting (Prophet).  
3. **Backend APIs** – FastAPI + NoSQL (MongoDB/Firebase).  
4. **Visualization Layer** – React UI with **Leaflet maps & D3.js charts**.  
5. **Alerting & Reporting** – Firebase, Twilio, P2P communication.  

---

##  Tech Stack
- **Data** → Sentinel-2, Tide gauges, Weather APIs, IoT Sensors  
- **AI/ML** → TensorFlow, PyTorch, Prophet (forecasting)  
- **Backend** → Python (FastAPI/Flask), MongoDB/Firebase  
- **Frontend** → React, Leaflet / Mapbox, D3.js  
- **Alerts** → Firebase Cloud Messaging, Twilio SMS Gateway  

---

##  Models Implemented
### 1.  Flood Detection (Deep Learning)
- **Input:** Satellite imagery / camera feed.  
- **Output:** Flood masks, estimated flood level.  
- **Impact:** Enables remote monitoring and faster response.  

### 2.  Mangrove Density Classifier
- **Features (7 total):** Latitude, Longitude, Elevation, Proximity to coast, NDVI, Rainfall, Slope.  
- **Output:** Binary classification → `Mangrove: Yes / No`.  
- **Impact:** Monitors habitat cover & prevents ecosystem degradation.  

---

##  User Workflows
### For Authorities
- Hazard map dashboards with historical analytics.
- Incident tracking & disaster response management.  

### For Communities
- **Multilingual SMS / notification alerts**.  
- **Offline peer-to-peer alert sharing** during poor connectivity.  
- Community reporting (photos, audio notes).  

---

##  Impact & Value Proposition
-  **30–60 minutes earlier alerts** than baseline.  
-  **>80% accuracy** in anomaly detection.  
-  **20% faster coordination** in disaster scenarios.  
-  Safeguards **blue carbon ecosystems**, aiding climate goals.  
-  Promotes **govt. & NGO R&D adoption** via data insights.  

---

##  Challenges & Mitigation
- **Data quality gaps** → use of multi-source redundancy.  
- **Low community participation** → gamification + local languages.  
- **Real-time scaling issues** → cloud-native, serverless architecture.  

---

##  Future Roadmap
- Govt. integration with national disaster platforms.  
- Tracking **mangrove afforestation & density recovery efforts**.  
- **SAR-based deep learning** with Sentinel-1 data.  
- Offline-first **mobile app** for alerts & feedback.  
- Fisherfolk wearable IoT devices for **cyclone & theft alerts**.  

---

##  Repository Structure
├── models/ # ML/DL models (Flood detection, Mangrove classifier)
├── backend/ # APIs (FastAPI + DB)
├── frontend/ # React dashboard + visualizations
├── data/ # Sample datasets & preprocessing scripts
├── notebooks/ # Jupyter notebooks (training & experiments)
├── docs/ # Diagrams, workflows, architecture docs
└── README.md # Project overview (this file)


---

##  Why This Project Stands Out
- **Dual impact** → Saves human lives & protects blue carbon ecosystems.  
- **AI + Community** → Technology fused with local participation.  
- **Explainable & Scalable** → Trustworthy alerts built for real-world adoption.  
- **Hackathon Ready** → Working models + clear workflow + strong impact.  

---

 *Coastal resilience through data, AI, and community collaboration — safeguarding lives and ecosystems for a sustainable future.*  

