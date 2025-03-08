# Trusty Works

Trusty Works is a service-based website built using React and Firebase. Our platform offers a variety of project-based services, including:

- **Cybersecurity Projects**
- **Web Development Projects**
- **Software Development Projects**
- **Graphic Design Projects**
- **Student Projects & Assignments**

We provide tailored project solutions to meet the needs of students and professionals.

---

## ⚙️ Technologies Used

- **React** – Frontend framework
- **Firebase** – Backend database and authentication
- **CSS** – Styling
- **JavaScript** – Programming language
- **Node.js & npm** – Package management

---

## 🚀 Getting Started

Follow these steps to set up and run the project on your local machine.

### 📌 Prerequisites

Ensure you have the following installed:

- **Node.js** (Download from [here](https://nodejs.org/))
- **npm** (Comes with Node.js)
- **Firebase Account** (Sign up at [Firebase Console](https://console.firebase.google.com/))

---

## 📂 Installation

### 1. Create a New React Project

Open your terminal and run:

```sh
npx create-react-app trusty-works
cd trusty-works
```

### 2. Replace Default Files

- Delete the existing `src` and `public` folders in your new project.
- Copy and paste the `src` and `public` folders from this repository into your project directory.

### 3. Install Dependencies

Run the following command to install all necessary dependencies:

```sh
npm install
```

---

## 🔥 Firebase Setup

To integrate Firebase with the project:

### 1. Create a Firebase Project

- Go to [Firebase Console](https://console.firebase.google.com/).
- Click **Add Project** and follow the setup steps.

### 2. Add a Web App

- In Firebase, navigate to **Project Settings** → **General** → **Add App**.
- Choose **Web App** and register it.

### 3. Configure Firebase in Your Project

- Get the Firebase configuration object from Firebase Console.
- Replace it inside `src/firebase.js`:

```javascript
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);

export default app;
```

### 4. Enable Firebase Services

- Go to **Firebase Console** → **Firestore Database** → Enable Firestore.
- Enable **Authentication** if login functionality is required.

---

## ▶️ Running the Project

Once setup is complete, start the development server:

```sh
npm start
```

The project should now be running at `http://localhost:3000/`.

---

## 📤 Deployment (Firebase Hosting)

To deploy your project using Firebase Hosting:

### 1. Install Firebase CLI

```sh
npm install -g firebase-tools
```

### 2. Login to Firebase

```sh
firebase login
```

### 3. Initialize Firebase in Your Project

```sh
firebase init
```

- Choose **Hosting** and select your Firebase project.
- Set `build` as the public directory.
- Configure as a **single-page app (Yes)**.

### 4. Build & Deploy

```sh
npm run build
firebase deploy
```

After deployment, Firebase will provide a live URL for your website.

---

## 🤝 Contributing

If you’d like to contribute:

1. **Fork the repository**
2. **Create a new branch**
3. **Make your changes**
4. **Submit a pull request**

---

## 👥 Collaborators

- **Jalil Ahmad** ([JalilAhmad2004](https://github.com/JalilAhmad2004))
- **Umer Farooq** ([w0lt41r](https://github.com/w0lt41r))
- **Abdul Hadi** ([Abdul-H-adi](https://github.com/Abdul-H-adi))

---

## 📜 License

This project is licensed under the **MIT License**.


