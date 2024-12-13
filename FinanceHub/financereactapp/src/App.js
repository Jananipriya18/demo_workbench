import React from 'react';
import Login from './Components/Login';
import HomePage from './Components/HomePage';
import SignupForm from './Components/Signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import PrivateRoute from './Components/PrivateRoute';
import { Navigate } from 'react-router-dom';
import ErrorPage from './Components/ErrorPage';
import SavingsPlanForm from './FinancialConsultantComponents/SavingsPlanForm';
import ViewSavingsPlan from './FinancialConsultantComponents/ViewSavingsPlan';
import ViewFeedback from './FinancialConsultantComponents/ViewFeedback';
import PlanApproval from './RegionalManagerComponents/PlanApproval';
import ViewAllSavingsPlans from './ClientComponents/ViewAllSavingsPlan';
import PlanApplicationForm from './ClientComponents/PlanApplicationForm';
import ViewAllSavingsPlan from './ClientComponents/ViewAllSavingsPlan';
import AppliedSavingsPlan from './ClientComponents/AppliedSavingsPlan';
import CustomerPostFeedback from './ClientComponents/CustomerPostFeedback';
import CustomerMyFeedback from './ClientComponents/CustomerMyFeedback';
import PlanApplicationApproval from './RegionalManagerComponents/PlanApplicationApproval';
import ViewFeedbacks from './RegionalManagerComponents/ViewFeedbacks';
import ReplyForm from './FinancialConsultantComponents/ReplyForm';
import ViewInquiry from './FinancialConsultantComponents/ViewInquiry';
import InquiryForm from './ClientComponents/InquiryForm';
import InquiryDetails from './ClientComponents/InquiryDetails';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="user">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<SignupForm />} />
        </Route>
        <Route path="/home"  element={  <PrivateRoute>  <HomePage /> </PrivateRoute>}/>   
        <Route path="/viewsavingsplans" element={ <PrivateRoute> <ViewSavingsPlan /> </PrivateRoute>}  />
        <Route path="/newsavingsplan/:savingsPlanId?"  element={  <PrivateRoute>  <SavingsPlanForm /> </PrivateRoute>}/>  
        <Route path="/editsavingsplan/:savingsPlanId?"  element={  <PrivateRoute>  <SavingsPlanForm /> </PrivateRoute>}/>  
        <Route path="/savingsplanapproval"  element={  <PrivateRoute>  <PlanApproval /> </PrivateRoute>}/>  
        <Route path="/availablesavingsplan"  element={  <PrivateRoute>  <ViewAllSavingsPlans /> </PrivateRoute>}/>  
        <Route path="/savingsPlanApplicationForm"  element={  <PrivateRoute>  <PlanApplicationForm /> </PrivateRoute>}/>  
        <Route path="/appliedplans"  element={  <PrivateRoute>  <AppliedSavingsPlan /> </PrivateRoute>}/>  
        <Route path="/planapplicationapproval"  element={  <PrivateRoute>  <PlanApplicationApproval /> </PrivateRoute>}/>  
        <Route path="/viewfeedback" element={ <PrivateRoute> <ViewFeedback /> </PrivateRoute>}  />
        <Route path="/userpostfeedback" element={ <PrivateRoute> <CustomerPostFeedback /> </PrivateRoute>}  />
        <Route path="/usermyfeedback" element={ <PrivateRoute> <CustomerMyFeedback /> </PrivateRoute>}  />
        <Route path="/viewfeedbackmanager" element={ <PrivateRoute> <ViewFeedbacks /> </PrivateRoute>}  />
        <Route path="/inquiries" element={<ViewInquiry />} />
        <Route path="/reply/:inquiryId" element={<ReplyForm />} />
        <Route path="/inquiry-form" element={<InquiryForm />} />
        <Route path="/inquiry-details/:inquiryId" element={<InquiryDetails />} />
        <Route path="*" element={<Navigate to="/user/login" replace />} />
        <Route path="/error"  element={<ErrorPage/> }/>  

     </Routes>
    </BrowserRouter>
  );
}

export default App;
