### User Story

- The elevator technician receives a work order.
- Opens the Elevator Maintenance Assistant app on a mobile phone/tablet.
- Inputs or scans the elevator ID (or selects a work order).
- The system automatically retrieves the elevator’s historical faults, alarm records, and manual summaries, generating **key troubleshooting suggestions**.
- The technician uses voice input on-site, e.g., “I replaced the door operator, tested and it works fine.” The app automatically converts this into a structured report.
- The technician uploads a photo of the new part; AI automatically recognizes it as a “door operator” and attaches it to the report.
- One-click submission of the work order report.

---

### UI Design

#### Tech Stack
- Antd Mobile
- Antd X

#### Demo Pages

1. **Work Order Selection Page**
    - Input elevator ID, with a search box
    - Display a list of work orders
2. **Work Order Detail & AI Suggestion Page**
    - Show work order details (location, ID, fault description, etc.)
    - One-click to generate/display AI “Key Troubleshooting Suggestions” (aggregated from history, alarms, and manuals)
3. **Maintenance Operation Entry Page**
    - **Voice Input** (tap microphone, record a sentence, auto-convert to text and fill the form)
    - **Image Upload** (select from local or take a photo)
    - Automatically display “Recognized Part: Door Operator”
    - Option to manually add additional notes
4. **Report Preview & Submission Page**
    - Display the structured report for this operation (including text, images, suggestions, etc.)
    - One-click “Submit Work Order”

---

### Demo Flow

- Judges can experience the full loop: “Select Work Order → View AI Suggestions → Voice Description → Photo Upload → Auto-Generated Report”, directly feeling the convenience of “Information Aggregation + AI Report”.