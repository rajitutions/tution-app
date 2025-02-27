import React, { useState, useRef, useEffect } from "react";
import '../styles/register.css';

const Register = () => {
    const [user, setUser] = useState({
        name: "", email: "", mobile: "", role: "tutor", qualification: "", subjects: "", interestedCourse: "", area: ""
    });
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        const container = document.querySelector(".register-container");
        if (container) {
            container.setAttribute("data-role", user.role);
        }
    }, [user.role]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && !file.type.startsWith("image/")) {
            setError("Please upload a valid image file.");
            return;
        }
        if (file && file.size > 2 * 1024 * 1024) { // 2MB limit
            setError("Image size should be less than 2MB.");
            return;
        }
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        let userData = {
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
            area: user.area.trim() || "Not Provided",
            interestedCourse: (user.role === "student" || user.role === "parent") ? (user.interestedCourse.trim() || "Not Provided") : "",
        };

        if (user.role === "tutor") {
            userData.qualification = user.qualification || "Not Provided";
            userData.subjects = user.subjects ? user.subjects.split(",").map(s => s.trim()).join(",") : "Not Provided";
        }

        const formData = new FormData();
        Object.keys(userData).forEach(key => formData.append(key, userData[key]));
        if (image) formData.append("image", image);

        try {
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();
            console.log("✅ Response from Backend:", result);

            if (response.ok) {
                setSuccess("🎉 Registered Successfully!");
                setUser({ name: "", email: "", mobile: "", role: "tutor", qualification: "", subjects: "", interestedCourse: "", area: "" });
                setImage(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
            } else {
                setError(result.error || "Failed to register.");
            }
        } catch (err) {
            console.error("❌ Error:", err);
            setError("Something went wrong.");
        }

        setLoading(false);
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <form onSubmit={handleSubmit} className="register-form">
                <div className="role-selection">
                    <label>
                        <input type="radio" name="role" value="tutor" checked={user.role === "tutor"} onChange={handleChange} />
                        Tutor
                    </label>
                    <label>
                        <input type="radio" name="role" value="student" checked={user.role === "student"} onChange={handleChange} />
                        Student
                    </label>
                    <label>
                        <input type="radio" name="role" value="parent" checked={user.role === "parent"} onChange={handleChange} />
                        Parent
                    </label>
                </div>

                <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
                <input type="text" name="mobile" placeholder="Mobile" value={user.mobile} onChange={handleChange} required />
                <input type="text" name="area" placeholder="Your Area" value={user.area} onChange={handleChange} required />

                {user.role === "tutor" ? (
                    <>
                        <input type="text" name="qualification" placeholder="Higher Qualification" value={user.qualification} onChange={handleChange} required />
                        <input type="text" name="subjects" placeholder="Subjects you teach (comma-separated)" value={user.subjects} onChange={handleChange} required />
                    </>
                ) : (
                    <input type="text" name="interestedCourse" placeholder="Course Interested In" value={user.interestedCourse} onChange={handleChange} required />
                )}

                <input type="file" name="image" onChange={handleImageChange} ref={fileInputRef} />

                <button type="submit" disabled={loading}>
                    {loading ? <span className="loader"></span> : "Register"}
                </button>
            </form>
        </div>
    );
};

export default Register;
