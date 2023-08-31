import { Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard";
import Reports from "./dashboard/reports";

import Appointments from "./dashboard/Appointments";
import Purchases from "./dashboard/Purchases";
import Contacts from "./dashboard/Contacts";

import Package from "./dashboard/Package";
import PackageAll from "./dashboard/Package/PackageAll";
import PackageAdd from "./dashboard/Package/PackageAdd";
import PackageEdit from "./dashboard/Package/PackageEdit";

import Doctor from "./dashboard/Doctor";
import DoctorAll from "./dashboard/Doctor/DoctorAll";
import DoctorAdd from "./dashboard/Doctor/DoctorAdd";
import DoctorEdit from "./dashboard/Doctor/DoctorEdit";

import AdminDepartment from "./dashboard/Department";
import DepartmentAll from "./dashboard/Department/DepartmentAll";
import DepartmentAdd from "./dashboard/Department/DepartmentAdd";
import DepartmentEdit from "./dashboard/Department/DepartmentEdit";

import Blog from "./dashboard/blog";
import PostAll from "./dashboard/blog/PostAll";
import PostAdd from "./dashboard/blog/PostAdd";
import PostEdit from "./dashboard/blog/PostEdit";
import PostDetail from "./dashboard/blog/PostDetail";
import Category from "./dashboard/blog/Categories";
import CategoryAll from "./dashboard/blog/Categories/CategoryAll";
import CategoryAdd from "./dashboard/blog/Categories/CategoryAdd";
import CategoryEdit from "./dashboard/blog/Categories/CategoryEdit";

import Pages from "./dashboard/pages";
import PagesAll from "./dashboard/pages/PagesAll";
import Home from "./dashboard/pages/Home";
import AboutUs from "./dashboard/pages/AboutUs";
import ContactUs from "./dashboard/pages/ContactUs";
import HealthInfo from "./dashboard/pages/HealthInfo";
import Privacy from "./dashboard/pages/Privacy";
import TermsCondition from "./dashboard/pages/TermsCondition";
import InsuranceProvider from "./dashboard/pages/InsuranceProvider";

import Gallery from "./dashboard/Gallery";

import Users from "./dashboard/Users";

import Profile from "./dashboard/profile";
import UsersAll from "./dashboard/Users/UsersAll";
import UserEdit from "./dashboard/Users/UsersEdit";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route index element={<DoctorAll />} />

        <Route path="appointments" element={<Appointments />} />

        <Route path="purchases" element={<Purchases />} />

        <Route path="contacts" element={<Contacts />} />

        <Route path="packages" element={<Package />}>
          <Route index element={<PackageAll />} />
          <Route path="add" element={<PackageAdd />} />
          <Route path=":packageId/edit" element={<PackageEdit />} />
        </Route>

        <Route path="doctor" element={<Doctor />}>
          <Route index element={<DoctorAll />} />
          <Route path="add" element={<DoctorAdd />} />
          <Route path=":doctorId/edit" element={<DoctorEdit />} />
        </Route>

        <Route path="department" element={<AdminDepartment />}>
          <Route index element={<DepartmentAll />} />
          <Route path="add" element={<DepartmentAdd />} />
          <Route path=":departmentId/edit" element={<DepartmentEdit />} />
        </Route>

        <Route path="blog" element={<Blog />}>
          <Route index element={<PostAll />} />
          <Route path="add" element={<PostAdd />} />
          <Route path=":blogId/edit" element={<PostEdit />} />
          <Route path=":blogId" element={<PostDetail />} />
          <Route path="categories" element={<Category />}>
            <Route index element={<CategoryAll />} />
            <Route path="add" element={<CategoryAdd />} />
            <Route path=":categoryId/edit" element={<CategoryEdit />} />
          </Route>
        </Route>

        <Route path="pages" element={<Pages />}>
          <Route index element={<PagesAll />} />
          <Route path="home" element={<Home />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="contactus" element={<ContactUs />} />
          <Route path="healthInfo" element={<HealthInfo />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="termscondition" element={<TermsCondition />} />
          <Route path="insuranceprovider" element={<InsuranceProvider />} />
        </Route>

        <Route path="gallery" element={<Gallery />} />

        <Route path="users" element={<Users />}>
          <Route index element={<UsersAll />} />
          <Route path=":userId/edit" element={<UserEdit />} />
        </Route>

        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default DashboardRoutes;
