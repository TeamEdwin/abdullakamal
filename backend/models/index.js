// const AboutUsSchema = require("./about_us");

// const InsuranceSchema = require("./insurance");
// const mongoose = require("mongoose");
// const AppointmentSchema = require("./appointment");
// const CategorySchema = require("./category");
// const CommentSchema = require("./comment");
// const ContactSchema = require("./contact-form");
// const DepartmentSchema = require("./departments");
// const DoctorSchema = require("./doctor");
// const HealthSchema = require("./health");
// const GoalSchema = require("./goal");
// const HealthPointsSchema = require("./healthfitness");
// const HomeSchema = require("./home");
// const PackageSchema = require("./package");
// ;
// const PatientRightsSchema = require("./patient_rights");
// const PrivacySchema = require("./privacy");
// const StorySchema = require("./story");
// const TermSchema = require("./terms");
// const TestimonialSchema = require("./testimonial");
// const UserSchema = require("./user");


// module.exports = (db) => {
    
//   // db here represents the connection object that will come from our connection file
//   db.model("AboutUs", AboutUsSchema);
//   // db.model("Insurance", InsuranceSchema);
//   // db.model("Appointment", AppointmentSchema);
//   // db.model("Category", CategorySchema);
//   // db.model("ContactPage", ContactSchema);
//   // db.model("Comment", CommentSchema);
//   db.model("Department", DepartmentSchema);
//   db.model("Doctor", DoctorSchema);
//   // db.model("Health", HealthSchema); 
//   db.model("Goals", GoalSchema);
//   // db.model("HealthPoints", HealthPointsSchema);
//   // db.model("Home", HomeSchema);
//   db.model("Package", PackageSchema);

//   db.model("PatientRights", PatientRightsSchema);
//   // db.model("Privacy", PrivacySchema);
//   // db.model("Story", ProductSchema);
//   // db.model("Privacy", StorySchema);
//   // db.model("Term", TermSchema);
//   // db.model("Testimonial", TestimonialSchema);
//   db.model("User", UserSchema);

//   // Other file in our schema
//   // db.model("model", modelSchema)

//   return db;
// };