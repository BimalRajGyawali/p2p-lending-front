import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardText, CCardTitle, CCol, CRow,CButton,CCardImage} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilList } from '@coreui/icons'
import axios from 'axios'
import IncomeStatementImg from 'src/assets/images/income statement.png'
import EmiImg from 'src/assets/images/emi_statement.png'
import InvestmentPortfolioImg from 'src/assets/images/investment_portfolio.png'
const LenderReport = () => {

    const handleDownload = async () => {
        try {
          const response = await axios.get(
            "http://localhost:8084/api/v1/wallet/generateReport",
            {
              responseType: "blob",
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              }
            }
          );
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "report.xls");
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          console.error(error);
        }
      };
return (
<>
<CRow>
          
            <CCol style={{ marginBottom: '40px' }} sm={4} >
              <CCard>
                <CCardBody>
                <span style={{textAlign:'center',fontSize:30}}>
                  <CCardTitle>Income Statement</CCardTitle>
                  </span>
                  <CCardImage src={IncomeStatementImg} />    
                  <span style={{ display: "flex", justifyContent: "center" }}>      
        <CButton
              className='mb-3'
              style={{ background: 'blue', marginRight: '20px',marginTop:'20px',alignContent:'center',paddingLeft:'40px',paddingRight:'40px',borderRadius:'10px' }}
              type='submit'
              onClick={handleDownload}
              
            
            >  
                Download
                    </CButton>
                    </span>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol style={{ marginBottom: '40px' }} sm={4} >
              <CCard>
                <CCardBody>
                <span style={{textAlign:'center',fontSize:30}}>
                  <CCardTitle>EMI Statement</CCardTitle>
                  </span>
                  <CCardImage src={EmiImg} />    
                  <span style={{ display: "flex", justifyContent: "center" }}>      
        <CButton
              className='mb-3'
              style={{ background: 'blue', marginRight: '20px',marginTop:'20px',alignContent:'center',paddingLeft:'40px',paddingRight:'40px',borderRadius:'10px' }}
              type='submit'
              onClick={handleDownload}
            
            >  
                Download
                    </CButton>
                    </span>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol style={{ marginBottom: '40px' }} sm={4} >
              <CCard>
                <CCardBody>
                <span style={{textAlign:'center',fontSize:30}}>
                  <CCardTitle>Investment Portfolio
</CCardTitle>
                  </span>
                  <CCardImage src={InvestmentPortfolioImg} />    
                  <span style={{ display: "flex", justifyContent: "center" }}>      
        <CButton
              className='mb-3'
              style={{ background: 'blue', marginRight: '20px',marginTop:'20px',alignContent:'center',paddingLeft:'40px',paddingRight:'40px',borderRadius:'10px' }}
              type='submit'
              onClick={handleDownload}
            
            >  
                Download
                    </CButton>
                    </span>
                </CCardBody>
              </CCard>
            </CCol>
           
            
        </CRow>
</>
)
}
export default LenderReport