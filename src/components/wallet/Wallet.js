import React, { useEffect, useState } from "react"
import { CButton, CCard, CCardBody, CCardText, CFormInput } from "@coreui/react"
import axios from "axios"
import WalletTransTable from "./WalletTransTable"
import { number } from "prop-types"

const Wallet = () => {
  const [walletTotalBalance, setWalletTotalBalance] = useState(0)
  const [walletAvailableBalance, setWalletAvailableBalance] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [loadWalletButtonLoading, setLoadWalletButtonLoading] = useState(false)
  const [loadingAmount, setLoadingAmount] = useState(0.0)

  const loadWallet = () => {
    if (!loadingAmount || loadingAmount <= 0) {
      alert("Invalid amount")
      return
    }
    setLoadWalletButtonLoading(true)

    axios({
      method: "post",
      url: "http://localhost:8083/api/v1/wallet/loadBalance",
      data: {
        amount: loadingAmount
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
      .then((res) => {
        alert("Wallet loaded successfully")
        setLoadWalletButtonLoading(false)
      })
      .catch((err) => {
        setLoadWalletButtonLoading(false)
        alert("Something went wrong")
      })
  }

  const fetchWalletBalance = () => {
    return axios({
      method: "get",
      url: "http://localhost:8083/api/v1/wallet/getBalance",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
  }

  const handleLoadAmountChange = (e) => {
    setLoadingAmount(parseInt(e.target.value))
  }

  const fetchAllTransactions = () => {
    return axios({
      method: "get",
      url: "http://localhost:8083/api/v1/wallet/getAllTransactions",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`
      }
    })
  }

  useEffect(() => {
    fetchWalletBalance().then((res) => {
      setWalletTotalBalance(parseFloat(res.data.data.totalBalance))
      setWalletAvailableBalance(parseFloat(res.data.data.availableBalance))
    })

    fetchAllTransactions().then((res) => {
      setTransactions(res.data.data)
    })
  }, [loadWalletButtonLoading])

  return (
    <>
      <CCard>
        <CCardBody>
          <CCardText>
            <div style={{ overflow: "auto", marginBottom: "80px" }}>
              <div style={{ width: "50%", float: "left" }}>
                <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>
                  Wallet Summary
                </h2>
                <p style={{ marginBottom: "15px" }}>
                  Total Balance: &nbsp;&nbsp;
                  <strong>
                    Rs. {walletTotalBalance.toLocaleString("en-Us")}{" "}
                  </strong>
                </p>
                <p>
                  Available Balance: &nbsp;&nbsp;
                  <strong>
                    Rs. {walletAvailableBalance.toLocaleString("en-Us")}{" "}
                  </strong>
                </p>
              </div>
              <div style={{ width: "50%", float: "left" }}>
                <h2 style={{ fontWeight: "bold", marginBottom: "20px" }}>
                  Wallet Load
                </h2>
                <CFormInput
                  type={"number"}
                  placeholder="Amount to load"
                  style={{ width: "200px", display: "inline" }}
                  min={0}
                  onChange={handleLoadAmountChange}
                ></CFormInput>

                <CButton
                  onClick={loadWallet}
                  style={{ backgroundColor: "navy" }}
                  className="ml-3"
                  active
                  tabIndex={-1}
                >
                  {loadWalletButtonLoading ? (
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    <>&nbsp;&nbsp;Load&nbsp;&nbsp;</>
                  )}
                </CButton>
              </div>
            </div>

            {transactions.length > 0 ? (
              <div>
                <WalletTransTable transactions={transactions} />
              </div>
            ) : (
              <p
                style={{
                  marginBottom: "20px",
                  fontSize: "0.9em",
                  fontStyle: "italic",
                  marginTop: "50px"
                }}
              >
                Wallet Transactions will appear here
              </p>
            )}
          </CCardText>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Wallet
