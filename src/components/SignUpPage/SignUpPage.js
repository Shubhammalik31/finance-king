import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./SignUpPage.css";
import telegramIcon from "../icons/icons8-telegram-100.png";
import supportIcon from "../icons/contact.png";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const referral = params.get("referral");
    if (referral) {
      setReferralCode(referral);
    }
  }, [location.search]);

  const handleTele = () => {
    const telegramUsername = "Piyush3029";
    const telegramUrl = `https://t.me/${telegramUsername}`;
    window.open(telegramUrl, "_blank");
  };

  const handleSupport = () => {
    navigate("/contact");
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("https://rajjiowin-backend.vercel.app/signup", {
          email,
          phoneNumber,
          password,
          referralCode,
        })
        .then((res) => {
          if (res.data === "exists") {
            alert("User already exists");
          } else if (res.data === "notexists") {
            alert("User Register Successfully");
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signup">
      <form>
        <div className="form-container">
          <h2>Rajjowin</h2>
          <div>
            <label className="email-label">Email</label>
            <input
              placeholder="Enter Email"
              id="email"
              className="email_input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="mobile-label">Mobile No.</label>
            <input
              placeholder="Enter Mobile No."
              id="phoneNumber"
              className="mobile_input"
              type="number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div>
            <label className="password-label">Password</label>
            <input
              className="password_input"
              id="password"
              placeholder="Enter Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="referral-label">Referral Code (optional)</label>
            <input
              className="referral_input"
              id="referralCode"
              placeholder="Enter Referral Code"
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
            />
          </div>
          <button className="register_btn" onClick={handleSignup}>
            Register
          </button>
          <div>
            <p className="register">
              Already have an account? <Link to="/login">Login Here</Link>
            </p>
          </div>
          <button className="tele_button" onClick={handleTele}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "25px",
              }}
            >
              <img
                src={telegramIcon}
                alt="telegram"
                style={{
                  width: "30px",
                  height: "30px",
                  marginRight: "5px",
                  marginBottom: "5px",
                }}
              />
              <p style={{ margin: "4px 2px 7px 2px" }}>Official Telegram</p>
            </div>
          </button>
          <button onClick={handleSupport} className="support_button">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                height: "25px",
              }}
            >
              <img
                src={supportIcon}
                alt="support"
                style={{ width: "30px", height: "30px", marginRight: "5px" }}
              />
              <p style={{ margin: "4px 2px 7px 2px" }}>Contact Support</p>
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
