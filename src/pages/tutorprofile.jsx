import React, { useState } from "react";

const RegisterUser = () => {
  const [role, setRole] = useState("tutor"); // Default role is Tutor
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "", // Course applies to all roles but has different meanings
    subject: "", // Only for Tutors
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Role-based background images
  const backgroundImages = {
    tutor: "url('https://via.placeholder.com/800x400?text=Tutor')",
    student: "url('https://via.placeholder.com/800x400?text=Student')",
    parent: "url('https://via.placeholder.com/800x400?text=Parent')",
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setUser({ name: "", email: "", mobile: "", course: "", subject: "" }); // Reset form on role change
    setImage(null);
    setPreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!user.name || !user.email || !user.mobile || !user.course || (role === "tutor" && !user.subject)) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    Object.keys(user).forEach((key) => formData.append(key, user[key]));
    formData.append("role", role);
    if (role === "tutor" && image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Server Response:", result);

      if (response.ok) {
        alert(`${role.charAt(0).toUpperCase() + role.slice(1)} registered successfully!`);
        setUser({ name: "", email: "", mobile: "", course: "", subject: "" });
        setImage(null);
        setPreview(null);
      } else {
        setError(result.message || "Failed to register.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Check the console.");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        backgroundImage: backgroundImages[role],
        backgroundSize: "cover",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <h2>Register as {role.charAt(0).toUpperCase() + role.slice(1)}</h2>

      {/* Role selection with radio buttons */}
      <div>
        <label>
          <input type="radio" value="tutor" checked={role === "tutor"} onChange={handleRoleChange} />
          Tutor
        </label>
        <label>
          <input type="radio" value="student" checked={role === "student"} onChange={handleRoleChange} />
          Student
        </label>
        <label>
          <input type="radio" value="parent" checked={role === "parent"} onChange={handleRoleChange} />
          Parent
        </label>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading...</p>}

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} required />
        <input type="text" name="mobile" placeholder="Mobile" value={user.mobile} onChange={handleChange} required />

        <input
          type="text"
          name="course"
          placeholder={role === "tutor" ? "Higher Qualification" : "Course Interested In"}
          value={user.course}
          onChange={handleChange}
          required
        />

        {role === "tutor" && (
          <>
            <input type="text" name="subject" placeholder="Subjects you teach" value={user.subject} onChange={handleChange} required />
            <input type="file" name="image" onChange={handleImageChange} required />
            {preview && <img src={preview} alt="Preview" style={{ width: "100px", marginTop: "10px" }} />}
          </>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
