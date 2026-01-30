# AutoForm AI Assist

**Intelligent, context-aware form filling powered by multiple AI providers.**

[**Visit the Website & Download**](https://autoform-ai-assist.vercel.app/)

## 🚀 Overview

**AutoForm AI Assist** is a browser extension designed to streamline the process of filling out web forms. Unlike standard autofill tools that use static data, this extension utilizes Large Language Models (LLMs) to generate contextually relevant, professional content on the fly.

Whether you are applying for jobs, writing professional messages, or filling out bio sections, AutoForm AI Assist reads the field context and your personal profile to generate the perfect response.

## ✨ Key Features

* **🤖 Multi-LLM Support:** Choose your preferred AI provider. Supports **OpenAI (GPT-3.5)**, **Google Gemini (Pro)**, and **Groq (Llama 3)**.
* **👤 Context-Aware Personalization:** Stores a user profile (Name, Role, Company, LinkedIn) to tailor every response to your specific professional background.
* **📝 Smart Field Detection:** Automatically detects field types to generate specific content:
    * **Bios:** Professional, engaging summaries (50-80 words).
    * **Cover Letters:** Role-specific application excerpts.
    * **Messages:** Polite and concise professional correspondence.
    * **Explanations:** Realistic reasons and motivations based on your profile.
* **🔒 Privacy Focused:** Your API keys are stored locally in your browser.

## 🛠️ Tech Stack

### Extension Core
* **Manifest V3:** Modern Chrome Extension architecture.
* **JavaScript (ES6+):** Service workers and content scripts for DOM manipulation.
* **Storage API:** Local handling of user profiles and settings.

### Landing Page & Distribution
* **React 18:** Component-based UI.
* **Vite:** Fast build tool and development server.
* **Tailwind CSS & shadcn/ui:** Modern, responsive styling.
* **Supabase:** Backend integration for payment verification.
* **Razorpay:** Secure payment gateway integration.

## 📦 Installation

### For Users
1.  Visit [https://autoform-ai-assist.vercel.app/](https://autoform-ai-assist.vercel.app/).
2.  Download the `AI_Form_Filler.zip` file.
3.  Unzip the file on your computer.
4.  Open Chrome and navigate to `chrome://extensions/`.
5.  Enable **Developer Mode** (top right toggle).
6.  Click **Load unpacked** and select the unzipped folder.

### For Developers (Build from Source)
To run the landing page or modify the extension locally:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/autoform-ai-assist.git](https://github.com/yourusername/autoform-ai-assist.git)
    cd autoform-ai-assist
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the landing page:**
    ```bash
    npm run dev
    ```

4.  **Extension Development:**
    * The extension source code is located in `public/AI_Form_Filler.zip/AI_Form_Filler/`.
    * You can extract this folder and load it into Chrome to test changes to `background.js` or `content.js`.

## ⚙️ Configuration

Once installed, pin the extension to your browser bar and click the icon to open the **Settings** panel.

1.  **Select Provider:** Choose between OpenAI, Gemini, or Groq.
2.  **API Key:** Enter your valid API key for the selected provider.
3.  **User Profile:** Navigate to the "Profile" tab and enter your professional details (Name, Role, Company). This context is sent to the AI to personalize responses.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
