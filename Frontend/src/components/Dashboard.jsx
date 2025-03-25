import React, { useEffect, useState } from "react";
import { FaBell, FaCaretDown, FaGraduationCap, FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { GiSkills } from "react-icons/gi";
import { MdDashboard, MdEmail, MdInterests } from "react-icons/md";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom"; // Import useLocation
import Applications from "./Applications"; // Import the Applications component
import InitialProfileSetupForm from './InitialProfileSetupForm'; // Import the InitialProfileSetupForm component
import UpdateProfileForm from './UpdateProfileForm';

// import Profile from "./Profile.jsx";

const Sidebar = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    navigate("/"); // Redirect to SplashScreen
  };

  return (
    <div className="w-60 h-screen bg-purple-500 p-5 text-white rounded-lg flex flex-col fixed left-4 top-4">
      <div className="flex items-center space-x-2 mb-6">
        <FaGraduationCap size={30} />
        <h2 className="">StudentLink</h2>
      </div>
      <nav className="flex flex-col space-y-4">
        <Link to="/dashboard" className="flex items-center space-x-2 hover:opacity-80">
          <MdDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link to="/dashboard/applications" className="flex items-center space-x-2 opacity-70">
          <span>Applications</span>
        </Link>

      </nav>
      <div className="mt-auto">
        <a href="#" className="flex items-center space-x-2 hover:opacity-80" onClick={handleLogout}>
          <FiLogOut size={20} />
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
};

const Dashboard = ({ userName }) => {
  const [currentDate, setCurrentDate] = useState("");
  const location = useLocation(); // Get the current location

  // Update date on component mount
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    setCurrentDate(formattedDate);
  }, []);

  // Check if the current route is the main dashboard
  const isMainDashboard = location.pathname === "/dashboard";

  return (
    <div className="relative flex h-screen bg-[#2e2e2e]">
      {/* Render UserProfile only on the main dashboard */}
      {isMainDashboard && <UserProfile userName={userName} />}

      <Sidebar userName={userName} />
      <div className="flex-1 ml-68 mr-90 p-4">
        {/* Show welcome message and search bar only on the main dashboard */}
        {isMainDashboard && (
          <div className="bg-gradient-to-r from-purple-500  to-purple-400 text-white text-center p-8 h-60 rounded-lg shadow-lg justify-center">
            <div className="flex justify-center mb-4">
              <FaGraduationCap size={30} className="mr-2" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full max-w-md p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <p className="text-sm">{currentDate}</p>
            <div className="flex flex-col items-center text-center mt-10">
              <h1 className="text-2xl font-bold">Welcome back, {userName || "John"}!</h1>
              <p className="text-md">Always stay updated in your portal</p>
            </div>
          </div>
        )}

        {/* Routes for Dashboard Content */}
        <Routes>
          <Route path="applications" element={<Applications />} />
          {/* Add other nested routes here */}
        </Routes>
      </div>
    </div>
  );
};

const UserProfile = ({ userName, userEmail }) => {
    const [isModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isInitialSetupModalOpen, setIsInitialSetupModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        // firstName: "",
        // lastName: "",
        // email: "",
        admissionNo: "",
        programStudy: "",
        skillname: "",
        skillDescription: "",
        interest: "",
        interestDescription: "",
        socialLinks: ""
    });

    const handleUpdateProfile = () => {
        setIsUpdateModalOpen(true);
    };

    const handleInitialSetup = () => {
        setIsInitialSetupModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
    };

    const handleCloseInitialSetupModal = () => {
        setIsInitialSetupModalOpen(false);
    };
        return (
        <div className="absolute top-4 right bg-gradient-to-r from-purple-500 to-purple-400 h-150 text-white   rounded-lg shadow-lg w-80">
            <div className="profile-picture rounded-lg p-2 h-60 text-center" >
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-lg text-black font-bold">Profile</h1>
                    <div className="flex items-center space-x-2 text-gray-500">
                        <FaBell className="cursor-pointer" />
                        <FaCaretDown className="cursor-pointer" />
                    </div>
                </div>
                <div className="w-24 h-24 rounded-full overflow-hidden ml-26 mb-4 border border-gray-300">
                  <FaUserCircle className="text-gray-500 ml-5 mt-5" size={50} />
                </div>
                <h2 className="text-lg text-black font-semibold mb-2">{ userName || "John Doe"}</h2>
            </div>
            <div className="flex flex-col p-4">
                    <div>
                      <FaGraduationCap size={30} className="mr-2" />
                      <hr />
                      <p><span className="ml-4">{formData.admissionNo || "EB1/61319/22"}</span></p>
                      <p><span className="ml-4">{formData.programStudy || "Computer Science"}</span></p>
                    </div>
                    <div  className="mt-2">
                      <MdEmail size={30} className="mr-2"/>
                      <hr />
                      <p><span className="ml-4">{userEmail || "johndoe123@gmail.com"}</span></p>
                    </div>
                    <div className="mt-2">
                      <GiSkills size={30} className="mr-2"/>
                      <hr />
                      <p><span className="ml-4">{formData.skillname || "Python"}</span></p>
                    </div>
                    <div className="mt-2"> 
                      <MdInterests size={30} className="mr-2" />
                      <hr />
                      <p><span className="ml-4">{formData.interest || "Web Development"}</span></p>
                    </div>
            </div>
            <div className='btn items-center space-x-15 p-4'>
                    <button onClick={handleInitialSetup} className="update-btn  text-white rounded ">Enhance profile</button>
                    <button onClick={handleUpdateProfile} className="update-btn text-white rounded  ">Update profile </button>
            </div>
            {isInitialSetupModalOpen && (
                <div className="fixed inset-0 flex enhanceForm items-center justify-center backdrop-blur-md bg-black/30">
                    <div className="bg-white p-8 rounded-lg shadow-md w-96">
                        <h2 className="text-center text-2xl font-bold mb-6">Enhance Your Profile</h2>
                        <p>Add this section to your profile</p>
                        <InitialProfileSetupForm formData={formData} setFormData={setFormData} handleCloseModal={handleCloseInitialSetupModal} />
                    </div>
                </div>
            )}
 
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/30">
                    <div className="bg-white p-8 rounded-lg shadow-md w-96">
                        <h2 className="text-center text-2xl font-bold mb-6">Update Profile</h2>
                        <UpdateProfileForm formData={formData} setFormData={setFormData} handleCloseModal={handleCloseUpdateModal} />
                    </div>
                </div>
            )}
        </div>
    );
};


export default Dashboard;