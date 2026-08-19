"use client";
import { useState, useId } from "react";

const formatExactINR = (val: number) => {
  if (isNaN(val) || val <= 0) return "₹0";
  return `₹${Math.round(val).toLocaleString("en-IN")}`;
};

const MortgageCalculator = () => {
  const [homePrice, setHomePrice] = useState<number>(48000000);
  const [downPayment, setDownPayment] = useState<number>(9600000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [loanTerm, setLoanTerm] = useState<number>(20);
  const [showResult, setShowResult] = useState<boolean>(true);

  // Form input unique IDs for accessibility
  const homePriceId = useId();
  const downPaymentId = useId();
  const interestRateId = useId();
  const loanTermId = useId();

  const principal = Math.max(0, homePrice - downPayment);
  const monthlyRate = interestRate > 0 ? (interestRate / 100) / 12 : 0;
  const totalMonths = Math.max(1, loanTerm * 12);

  let monthlyEMI = 0;
  if (principal > 0 && monthlyRate > 0) {
    const rateFactor = Math.pow(1 + monthlyRate, totalMonths);
    monthlyEMI = (principal * monthlyRate * rateFactor) / (rateFactor - 1);
  } else if (principal > 0 && monthlyRate === 0) {
    monthlyEMI = principal / totalMonths;
  }

  const totalPayment = monthlyEMI * totalMonths;
  const totalInterest = Math.max(0, totalPayment - principal);

  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseNineA"
          aria-expanded="true"
          aria-controls="collapseNineA"
        >
          Mortgage Calculator
        </button>
      </h2>
      <div id="collapseNineA" className="accordion-collapse collapse">
        <div className="accordion-body">
          <div className="mortgage-calculator">
            <form onSubmit={(e) => { e.preventDefault(); setShowResult(true); }}>
              <div className="input-box-three mb-20">
                <label htmlFor={homePriceId} className="label fs-13 fw-500">Home Price (INR ₹)*</label>
                <input
                  id={homePriceId}
                  type="number"
                  value={homePrice || ""}
                  onChange={(e) => setHomePrice(Math.max(0, Number(e.target.value)))}
                  placeholder="48000000"
                  className="type-input rounded-0 p-2 border w-100"
                />
              </div>

              <div className="input-box-three mb-20">
                <label htmlFor={downPaymentId} className="label fs-13 fw-500">Down Payment (₹)*</label>
                <input
                  id={downPaymentId}
                  type="number"
                  value={downPayment || ""}
                  onChange={(e) => setDownPayment(Math.min(homePrice, Math.max(0, Number(e.target.value))))}
                  placeholder="9600000"
                  className="type-input rounded-0 p-2 border w-100"
                />
              </div>

              <div className="row g-2 mb-20">
                <div className="col-6">
                  <div className="input-box-three">
                    <label htmlFor={interestRateId} className="label fs-13 fw-500">Interest Rate (%)*</label>
                    <input
                      id={interestRateId}
                      type="number"
                      step="0.1"
                      value={interestRate || ""}
                      onChange={(e) => setInterestRate(Math.min(30, Math.max(0.1, Number(e.target.value))))}
                      placeholder="8.5"
                      className="type-input rounded-0 p-2 border w-100"
                    />
                  </div>
                </div>

                <div className="col-6">
                  <div className="input-box-three">
                    <label htmlFor={loanTermId} className="label fs-13 fw-500">Tenure (Years)*</label>
                    <select
                      id={loanTermId}
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="form-select fs-13 p-2 h-100"
                    >
                      <option value="10">10 Years</option>
                      <option value="15">15 Years</option>
                      <option value="20">20 Years</option>
                      <option value="25">25 Years</option>
                      <option value="30">30 Years</option>
                    </select>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-five text-uppercase sm rounded-0 w-100 mb-10">
                CALCULATE
              </button>
            </form>

            {showResult && (
              <div className="bg-light p-3 border mt-3 rounded">
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="fs-13 text-muted">Monthly EMI:</span>
                  <strong className="fs-16 color-dark text-success">{formatExactINR(monthlyEMI)}</strong>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="fs-12 text-muted">Principal:</span>
                  <span className="fs-12 color-dark">{formatExactINR(principal)}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-1">
                  <span className="fs-12 text-muted">Interest:</span>
                  <span className="fs-12 color-dark">{formatExactINR(totalInterest)}</span>
                </div>
                <div className="d-flex justify-content-between align-items-center pt-1 border-top mt-1">
                  <span className="fs-12 text-muted">Total Payable:</span>
                  <span className="fs-12 fw-600 color-dark">{formatExactINR(totalPayment)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
