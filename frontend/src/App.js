import { Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import AboutUs from "./pages/about";
import Gallery from "./pages/Gallery";

import PaymentSuccessPage from "./pages/ePayment/PaymentSuccessPage";

import Department from "./pages/department";
import DepartmentAll from "./pages/department/DepartmentAll";
import DepartmentDetail from "./pages/department/DepartmentDetail";

import OurDoctors from "./pages/ourDoctors";
import DoctorAll from "./pages/ourDoctors/DoctorAll";
import DoctorDetail from "./pages/ourDoctors/DoctorDetail";

import InsuranceProviders from "./pages/insuranceProviders";
import HealthInformation from "./pages/healthInformation";

import Package from "./pages/package";
import PackageDetail from "./pages/package/PackageDetail";
import PackageAll from "./pages/package/PackageAll";

import Contact from "./pages/contact";

import News from "./pages/news";
import NewsAll from "./pages/news/NewsAll";
import NewsDetail from "./pages/news/NewsDetail";

import FindDoctor from "./pages/findDoctor";
import RequestAppointment from "./pages/requestAppointment";
import EPayment from "./pages/ePayment";
import PaymentPage from "./pages/_shared/paymentPage";

import Privacy from "./pages/Privacy-TC/Privacy";
import TermsCondition from "./pages/Privacy-TC/TermsCondition";

import "./App.scss";
import SignUp from "./admin/signup";
import LogIn from "./admin/login";
import ForgotPassword from "./admin/forgotpassword";
import ChangePassword from "./admin/changepassword";
import DashboardRoutes from "./admin/DashboardRoutes";
import ErrorPage from "./pages/ErrorPage";
import UserPage from "./admin/UserPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/departments" element={<Department />}>
        <Route index element={<DepartmentAll />} />
        <Route path=":departmentID" element={<DepartmentDetail />} />
      </Route>
      <Route path="/doctors" element={<OurDoctors />}>
        <Route index element={<DoctorAll />} />
        <Route path=":doctorId" element={<DoctorDetail />} />
      </Route>
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/insurance-providers" element={<InsuranceProviders />} />
      <Route path="/health-information" element={<HealthInformation />} />
      <Route path="/packages" element={<Package />}>
        <Route index element={<PackageAll />} />
        <Route path=":packageId" element={<PackageDetail />} />
      </Route>
      <Route path="/contact-us" element={<Contact />} />
      <Route path="/news" element={<News />}>
        <Route index element={<NewsAll />} />
        <Route path=":newsId" element={<NewsDetail />} />
      </Route>
      <Route path="/find-doctor" element={<FindDoctor />} />
      <Route path="/request-appointment" element={<RequestAppointment />} />
      <Route path="/e-payment" element={<EPayment />} />
      <Route path="/paymentresult" element={<PaymentPage />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms-conditions" element={<TermsCondition />} />
      <Route path="userpage" element={<UserPage />} />
      <Route path="/adminsignup" element={<SignUp />} />
      <Route path="/adminlogin" element={<LogIn />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="/dashboard/*" element={<DashboardRoutes />} />
      <Route path="/payment-success" element={<PaymentSuccessPage />} />;
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
