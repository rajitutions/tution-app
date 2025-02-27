import React, { useState, useEffect, useMemo } from "react";
import "../styles/searchtutour.css";
import UserDetailModal from '../components/UserDetailModal';

const Search = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [filterRole, setFilterRole] = useState("tutor");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [selectedArea, setSelectedArea] = useState("");
    const [error, setError] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Get unique courses and areas for filters
    const uniqueCourses = useMemo(() => {
        const courses = new Set(users.filter(user => user.subjects).flatMap(user => user.subjects));
        return Array.from(courses).sort();
    }, [users]);

    const uniqueAreas = useMemo(() => {
        const areas = new Set(users.filter(user => user.area).map(user => user.area));
        return Array.from(areas).sort();
    }, [users]);

    const openModal = (user) => {
        console.log("Opening modal for user:", user);
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedUser(null);
        setIsModalOpen(false);
    };

    // Fetch Users from Backend
    const fetchUsers = () => {
        fetch("http://localhost:5000/users")
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched Users:", data);
                setUsers(data);
                setError("");
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
                setError("Failed to load users. Please try again later.");
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Web links for role images
    const roleImages = {
        student: "https://media.istockphoto.com/id/1453308027/photo/happy-indian-student-schoolgirl-do-thumbs-up-wearing-school-uniform-holding-books-and-bag.jpg?s=612x612&w=0&k=20&c=luHqe_RQQ3OxhHA6bXSCKKOrSGnJDGqGZO0diGggOBA=",
        parent: "https://playlearnthrive.com/wp-content/uploads/2021/09/qualities-of-a-good-parent-1.jpg",
        tutor: "https://principaltutors.com/wp-content/uploads/2022/06/home-tutor-m.jpg",
    };

    // Filter users based on all criteria
    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            const roleMatch = user.role?.toLowerCase() === filterRole.toLowerCase();
            const searchMatch = 
                user.name?.toLowerCase().includes(search.toLowerCase()) ||
                user.email?.toLowerCase().includes(search.toLowerCase()) ||
                user.mobile?.toLowerCase().includes(search.toLowerCase()) ||
                user.area?.toLowerCase().includes(search.toLowerCase());
            const courseMatch = !selectedCourse || (user.subjects && user.subjects.includes(selectedCourse));
            const areaMatch = !selectedArea || user.area === selectedArea;
            
            return roleMatch && searchMatch && courseMatch && areaMatch;
        });
    }, [users, search, filterRole, selectedCourse, selectedArea]);

    function sortUsersByRole(role) {
        setFilterRole(role);
    }

    return (
        <div className="container" data-role={filterRole}>
            {/* Role Selection */}
            <div className="role-selection">
                {["student", "parent", "tutor"].map((role) => (
                    <div key={role} className={`role-item ${filterRole === role ? "active" : ""}`}>
                        <img
                            src={roleImages[role]}
                            alt={role}
                            className="role-image"
                            onClick={() => sortUsersByRole(role)}
                            onError={(e) => e.target.src = "https://via.placeholder.com/100"}
                        />
                        <button className="role-button" onClick={() => sortUsersByRole(role)}>
                            Sort by {role.charAt(0).toUpperCase() + role.slice(1)}
                        </button>
                    </div>
                ))}
            </div>

            {/* Search Box */}
            <div className="search-container">
                <input
                    type="text"
                    className="search-box"
                    placeholder="Search by name, email, mobile, or area..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* Filter Section */}
            <div className="filter-section">
                <div className="filter-group">
                    <label className="filter-label">Course</label>
                    <select 
                        className="filter-select"
                        value={selectedCourse}
                        onChange={(e) => setSelectedCourse(e.target.value)}
                    >
                        <option value="">All Courses</option>
                        {uniqueCourses.map(course => (
                            <option key={course} value={course}>{course}</option>
                        ))}
                    </select>
                </div>
                <div className="filter-group">
                    <label className="filter-label">Area</label>
                    <select 
                        className="filter-select"
                        value={selectedArea}
                        onChange={(e) => setSelectedArea(e.target.value)}
                    >
                        <option value="">All Areas</option>
                        {uniqueAreas.map(area => (
                            <option key={area} value={area}>{area}</option>
                        ))}
                    </select>
                </div>
                <button 
                    className="sort-button"
                    onClick={() => {
                        setSelectedCourse("");
                        setSelectedArea("");
                    }}
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 3h18v2H3zM7 11h10v2H7zM11 19h2v2h-2z"/>
                    </svg>
                    Reset Filters
                </button>
            </div>

            {/* Error Handling */}
            {error && (
                <div className="error-message">
                    <p>{error}</p>
                    <button onClick={fetchUsers}>Retry</button>
                </div>
            )}

            {/* User List */}
            <div className="user-list">
                {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                        <div key={user._id} className="user-card" onClick={() => openModal(user)}>
                            <span className={`role-badge ${user.role.toLowerCase()}`}>
                                {user.role}
                            </span>
                            <div className="user-content">
                                <div className="user-image-container">
                                    <img
                                        src={user.imageUrl || "https://example.com/default-profile.png"}
                                        alt={user.name}
                                        className="user-image"
                                        onError={(e) => e.target.src = "https://example.com/default-profile.png"}
                                    />
                                </div>
                                <div className="user-details">
                                    <h3>{user.name}</h3>
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Mobile:</strong> {user.mobile}</p>
                                    <p><strong>Area:</strong> {user.area || "Not Provided"}</p>
                                    {user.role === "tutor" ? (
                                        <>
                                            <p><strong>Qualification:</strong> {user.qualification || "Not Provided"}</p>
                                            <p><strong>Subjects:</strong> {user.subjects?.join(", ") || "Not Provided"}</p>
                                        </>
                                    ) : (
                                        <p><strong>Course Interested In:</strong> {user.interestedCourse || "Not Provided"}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-users">No users found</p>
                )}
            </div>

            {/* User Detail Modal */}
            <UserDetailModal
                user={selectedUser}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
};

export default Search;
