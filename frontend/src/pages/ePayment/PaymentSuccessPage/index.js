import { Link } from "react-router-dom";
import "./index.scss";
import axios from "axios";

const customerData = localStorage.getItem("customer");
const customer = JSON.parse(customerData);

const url = `${process.env.REACT_APP_BACKEND_URL}/api/purchased-packages`;
const options = {
  method: "POST",
  url: url,
  headers: {
    "Content-Type": "application/json",
  },
  data: customer,
};

const PaymentSuccessPage = () => {
  if (customer) {
    axios(options).then((response) => {
      console.log(response);
    });
  }
  return (
    <section>
      <div className="notfoundContainer">
        <div className="notfound">
          <h2>Your Payment is Successful</h2>
          <p>
            Thank you for your payment. An automated payment receipt will be
            sent to your registered email.
          </p>

          <table>
            <tbody>
              <tr>
                <th>Order ID</th>
                <td>{customer.order_id}</td>
              </tr>
              <tr>
                <th>Amount</th>
                <td>{customer.amount}</td>
              </tr>
              <tr>
                <th>Package</th>
                <td>{customer.package_id}</td>
              </tr>
              <tr>
                <th>Variant</th>
                <td>{customer.variant_id}</td>
              </tr>
              <tr>
                <th>Doctor</th>
                <td>{customer.doctor_id}</td>
              </tr>
              <tr>
                <th>Your Email</th>
                <td>{customer.customer_email}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{customer.customer_name}</td>
              </tr>
              <tr>
                <th>Mobile Phone</th>
                <td>{customer.customer_phone}</td>
              </tr>
            </tbody>
          </table>

          <Link to="/" className="btn-primary">
            Back To Homepage
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccessPage;
