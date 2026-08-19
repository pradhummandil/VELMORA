"use client";
import { useState, useId } from "react";

interface MortgageCalculatorProps {
  initialPrice?: number;
}

const formatINR = (val: number) => {
  if (isNaN(val) || val <= 0) return "₹0";
  if (val >= 10000000) {
    const cr = val / 10000000;
    return `₹${cr.toFixed(2).replace(/\.00$/, "")} Cr`;
  } else if (val >= 100000) {
    const lakh = val / 100000;
    return `₹${lakh.toFixed(2).replace(/\.00$/, "")} Lakh`;
  }
  return `₹${Math.round(val).toLocaleString("en-IN")}`;
};

const formatExactINR = (val: number) => {
  if (isNaN(val) || val <= 0) return "₹0";
  return `₹${Math.round(val).toLocaleString("en-IN")}`;
};

const MortgageCalculator = ({ initialPrice = 48000000 }: MortgageCalculatorProps) => {
  const [homePrice, setHomePrice] = useState<number>(initialPrice || 48000000);
  const [downPayment, setDownPayment] = useState<number>(Math.round((initialPrice || 48000000) * 0.2)); // 20% default
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5% default Indian home loan rate
  const [loanTerm, setLoanTerm] = useState<number>(20); // 20 years default
  const [showResult, setShowResult] = useState<boolean>(true);

  // Form input unique IDs for accessibility
  const homePriceId = useId();
  const downPaymentId = useId();
  const interestRateId = useId();
  const loanTermId = useId();

  // EMI Calculation
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

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <div className="mortgage-calc-wrapper">
      <form onSubmit={handleCalculate}>
        <div className="input-box-three mb-20">
          <label htmlFor={homePriceId} className="label fs-13 fw-500 d-flex justify-content-between">
            <span>Home Price (INR)*</span>
            <span className="fw-600 color-dark">{formatINR(homePrice)}</span>
          </label>
          <input
            id={homePriceId}
            type="number"
            value={homePrice || ""}
            onChange={(e) => {
              const val = Math.max(0, Number(e.target.value));
              setHomePrice(val);
              if (downPayment > val) setDownPayment(Math.round(val * 0.2));
            }}
            placeholder="48000000"
            className="type-input p-2 border rounded w-100"
          />
        </div>

        <div className="input-box-three mb-20">
          <label htmlFor={downPaymentId} className="label fs-13 fw-500 d-flex justify-content-between">
            <span>Down Payment (₹)*</span>
            <span className="fw-600 color-dark">{formatINR(downPayment)} ({homePrice > 0 ? Math.round((downPayment / homePrice) * 100) : 0}%)</span>
          </label>
          <input
            id={downPaymentId}
            type="number"
            value={downPayment || ""}
            onChange={(e) => {
              const val = Math.min(homePrice, Math.max(0, Number(e.target.value)));
              setDownPayment(val);
            }}
            placeholder="9600000"
            className="type-input p-2 border rounded w-100"
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
                min="1"
                max="25"
                value={interestRate || ""}
                onChange={(e) => setInterestRate(Math.min(30, Math.max(0.1, Number(e.target.value))))}
                placeholder="8.5"
                className="type-input p-2 border rounded w-100"
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
                <option value="5">5 Years</option>
                <option value="10">10 Years</option>
                <option value="15">15 Years</option>
                <option value="20">20 Years</option>
                <option value="25">25 Years</option>
                <option value="30">30 Years</option>
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="btn-five text-uppercase sm rounded-3 w-100 mb-15">
          Calculate EMI
        </button>
      </form>

      {showResult && (
        <div className="mortgage-results bg-light p-3 rounded border mt-2">
          <div className="d-flex justify-content-between align-items-center mb-2 pb-2 border-bottom">
            <span className="fs-13 text-muted">Monthly EMI:</span>
            <strong className="fs-18 color-dark fw-bold text-success">{formatExactINR(monthlyEMI)}</strong>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="fs-12 text-muted">Loan Principal:</span>
            <span className="fs-13 fw-500 color-dark">{formatExactINR(principal)}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="fs-12 text-muted">Total Interest:</span>
            <span className="fs-13 fw-500 color-dark">{formatExactINR(totalInterest)}</span>
          </div>
          <div className="d-flex justify-content-between align-items-center pt-1 border-top mt-1">
            <span className="fs-12 text-muted">Total Payable:</span>
            <span className="fs-13 fw-600 color-dark">{formatExactINR(totalPayment)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;
