import { useLoaderData, useNavigate } from "react-router-dom";


const HomePage = () => {
    const navigate = useNavigate();
   
    return (
      <div className="bg-gray-50 min-h-screen font-sans">
        {/* Header Section */}
        <header className="text-center py-16 bg-blue-600 text-white">
          <h1 className="text-4xl font-semibold">TaskFlow</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Organize and prioritize your life with Google Tasks, reimagined.
          </p>
        </header>
  
        {/* Features Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8 bg-white">
          <div className="text-center p-6 border rounded-lg shadow-lg">
            <img
              className="mx-auto mb-4"
              src="https://img.icons8.com/fluency/48/000000/google-tasks.png"
              alt="Google Tasks Icon"
            />
            <h2 className="text-xl font-semibold">Seamless Integration</h2>
            <p className="text-gray-600 mt-2">
              Effortlessly sync and manage all your Google Tasks in one place.
            </p>
          </div>
  
          <div className="text-center p-6 border rounded-lg shadow-lg">
            <img
              className="mx-auto mb-4"
              src="https://img.icons8.com/color/48/000000/to-do.png"
              alt="Task Icon"
            />
            <h2 className="text-xl font-semibold">Organize Effortlessly</h2>
            <p className="text-gray-600 mt-2">
              Keep your to-do list clear, structured, and prioritized like never before.
            </p>
          </div>
  
          <div className="text-center p-6 border rounded-lg shadow-lg">
            <img
              className="mx-auto mb-4"
              src="https://img.icons8.com/fluency/48/000000/speed.png"
              alt="Fast Icon"
            />
            <h2 className="text-xl font-semibold">Fast and Reliable</h2>
            <p className="text-gray-600 mt-2">
              Designed to be quick, responsive, and accessible anywhere.
            </p>
          </div>
        </section>
  
        {/* Call to Action Section */}
        <section className="text-center py-16 bg-blue-100">
          <h2 className="text-3xl font-semibold text-gray-800">Get Started</h2>
          <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
            Join TaskFlow and bring clarity to your workflow today!
          </p>
          <button className="mt-8 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition" onClick={()=>navigate('login')}>
            Sign Up Now
          </button>
        </section>
  
        {/* Footer Section */}
        <footer className="text-center py-4 bg-gray-800 text-white">
          <p>&copy; 2024 TaskFlow. All rights reserved.</p>
        </footer>
      </div>
    );
  };
  
  export default HomePage;
  