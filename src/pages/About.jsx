import React from "react";
import "./RajiHomeTuition.css";

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <h1 className="hero-title">About Raji Home Tuition</h1>
        <p className="hero-subtitle">Your Trusted Partner in Personalized Learning</p>
      </section>

      {/* About Us */}
      <section className="section about-section">
                <p className="text">
          At Raji Home Tuition, we believe that every student has unique learning needs. 
          Our mission is to provide high-quality, customized education that fosters academic excellence.
          With a team of highly experienced and passionate tutors, we aim to bridge the gap between classroom learning 
          and individual student understanding. 
        </p>
        <p className="text">
          Our tutoring services cater to students from primary school to college level, ensuring a strong foundation
          in core subjects. We use interactive teaching methods, real-world examples, and practical exercises to 
          make learning engaging and effective. Whether you're struggling with math, science, or languages,
          our tutors are here to guide you every step of the way.
        </p>
        <p className="text">
          We also offer exam preparation support, career counseling, and skill development sessions. 
          Our flexible learning schedules and one-on-one tutoring approach ensure that every student 
          gets the attention and guidance they need to excel in their studies.
        </p>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <h2 className="section-title">Why Choose Us?</h2>
        <ul className="list">
          <li>Expert tutors with subject specialization</li>
          <li>Flexible timings to suit students' schedules</li>
          <li>One-on-one tutoring for personalized attention</li>
          <li>Affordable fees with quality teaching</li>
          <li>Regular assessments and progress reports</li>
          <li>Customized lesson plans based on student needs</li>
          <li>Access to study materials and online resources</li>
        </ul>
      </section>

      {/* How It Works */}
      <section className="section">
        <h2 className="section-title">How It Works</h2>
        <div className="steps">
          <div className="step">Step 1: Contact us for a free consultation</div>
          <div className="step">Step 2: We assign the best tutor for you</div>
          <div className="step">Step 3: Start your learning journey with expert guidance</div>
          <div className="step">Step 4: Track your progress with regular tests and feedback</div>
          <div className="step">Step 5: Get additional support for exams and assignments</div>
        </div>
      </section>

      {/* Courses We Offer */}
      <section className="section">
        <h2 className="section-title">Our Courses</h2>
        <div className="courses">
          <div className="course-box">Class 1st - 10th (All Subjects)</div>
          <div className="course-box">Intermediate (MPC, BiPC, CEC, MEC)</div>
          <div className="course-box">Degree Courses (B.A, B.Sc, B.Com, etc.)</div>
          <div className="course-box">B.Tech (All Engineering Branches)</div>
          <div className="course-box">Competitive Exam Preparation (JEE, NEET, SSC, etc.)</div>
          <div className="course-box">Spoken English & Personality Development</div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section contact-section">
        <h2 className="section-title">Contact Us</h2>
        <p className="text">Location: Hyderabad, Telangana</p>
        <p className="text">Phone: <a href="tel:+919014798713" className="link">+91 9014798713</a></p>
        <p className="text">Email: <a href="mailto:rajihtuition@gmail.com" className="link">rajihtuition@gmail.com</a></p>
        <p className="text">Follow us on social media for updates and study tips!</p>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Raji Home Tuition. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default About;