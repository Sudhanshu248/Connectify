# <img src="https://drive.google.com/uc?id=1C_VwhwDIM5Kmr-11jkyoTfEVLiq-prik" width="50px" /> Connectify

Connectify is a dynamic web-based platform designed to facilitate seamless user interactions. Where you can connect with other people, post your activity, create and edit your profile. You can also download your resume based on your profile. Connectify provides an intuitive and efficient interface to bring users together.

<img src="https://drive.google.com/uc?id=1W1zurut5OdYeMKgOPzp2NAu_XSh0R6z9"   />


 <h1>🚀 Features</h1>  

- **User Authentication**: Secure user registration and login system.
- **Interactive UI**: Modern and responsive design for a seamless user experience.
- **Scalable Backend**: Robust server-side logic to handle increasing user demands.


<h1>📖 How It Works</h1>

1. **User Registration & Login**:
   - Users sign up with their email and password.
   - Authentication is handled securely with token-based authentication (e.g., JWT).

2. **Creating Post**:
   - Users can create post of their activity.

2. **Edit Profile and download Resume**:
   - Users can edit his/her profile and download resume based on his/her profile in Pdf format.

2. **Search People and Connect with them**:
   - Users can search people and can connect with them.

3. **Data Management**:
   - User data and posts are stored in a MongoDB database.
   - Backend APIs handle data retrieval and updates efficiently.

4. **Interactive Interface**:
   - The React.js frontend provides a smooth, user-friendly experience.
   - Responsive design ensures compatibility across devices.
     

<h1>🛠️ Tech Stack</h1> 

### Frontend
- **React.js**: For building a dynamic and interactive user interface.
- **Bootstrap**: For styling and creating responsive designs.

### Backend
- **Node.js**: Server-side runtime environment.
- **Express.js**: Web framework for building robust APIs.

### Database
- **MongoDB**: For storing user and application data.
  

<h1>🚀 Getting Started</h1>

### Prerequisites

- Node.js
- npm 

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sudhanshu248/Connectify.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Connectify
   ```

3. Install dependencies for frontend:
   ```bash
   cd frontend
   npm install
   ```
   Install dependencies for backend:
   ```bash
   cd backend
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add required variables such as `PORT`, `MONGO_URI`, etc.

5. Start the development servers for frontend:
   ```bash
   cd frontend
   npm run dev
   ```
   Start the development servers for backend:
   ```bash
   cd backend
   nodemon server.js
   ```


<h1>🌐 Live Demo</h1>

Check out the live application here: [Connectify](https://connectify-cyan.vercel.app)


##

**Connectify** - Connecting people, empowering ideas.
