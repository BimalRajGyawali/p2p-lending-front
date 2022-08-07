import { CButton, CCol, CForm, CFormInput, CFormSelect, CSpinner } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const KycForm = () => {
  const [submitting, setSubmitting] = useState(false)

  const [tempAddr, setTempAddr] = useState({
    district: '',
    province: '',
    municipality: '',
    ward: '',
    tole: '',
  })

  const [permanentAddr, setPermanentAddr] = useState({
    district: '',
    province: '',
    municipality: '',
    ward: '',
    tole: '',
  })

  const [contact, setContact] = useState({
    otherEmail: '',
    telephone: '',
    primaryMobile: '',
    secondaryMobile: '',
  })

  const [kyc, setKyc] = useState({
    id: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    citizenShipNumber: '',
    dob: '',
    maritalStatus: '',
    verificationStatus: '',
    citizenShipFrontPath: '',
    citizenShipBackPath: '',
  })

  const [citizenShipFront, setCitizenShipFront] = useState(null)
  const [citizenShipBack, setCitizenShipBack] = useState(null)

  const address = (address, index) => {
    if (!address) return ''

    if (address.split(',').length < index + 1) return ''

    return address.split(',')[index]
  }

  const handleInputChange = (key, e) => {
    setKyc({ ...kyc, [key]: e.target.value })
  }

  const handleTempAddressChange = (key, e) => {
    setTempAddr({ ...tempAddr, [key]: e.target.value })
  }

  const handlePermanentAddressChange = (key, e) => {
    setPermanentAddr({ ...permanentAddr, [key]: e.target.value })
  }

  const handleContactChange = (key, e) => {
    setContact({ ...contact, [key]: e.target.value })
  }

  const handleCitizenShipFront = (e) => {
    setCitizenShipFront(e.target.files[0])
  }

  const handleCitizenShipBack = (e) => {
    setCitizenShipBack(e.target.files[0])
  }

  const populateForm = () => {
    axios
      .post('http://localhost:8081/registration/getKYC', {
        email: localStorage.getItem('email'),
      })
      .then((res) => {
        console.log(res.data.data)
        setKyc({
          ...kyc,
          id: res.data.data.id,
          firstName: res.data.data.firstName,
          middleName: res.data.data.middleName,
          lastName: res.data.data.lastName,
          gender: res.data.data.gender,
          citizenShipNumber: res.data.data.citizenShipNumber,
          dob: res.data.data.dob,
          maritalStatus: res.data.data.maritalStatus,
          verificationStatus: res.data.data.verified,
          citizenShipFrontPath: res.data.data.citizenShipPhotoFront,
          citizenShipBackPath: res.data.data.citizenShipPhotoBack,
        })
        setTempAddr({
          ...tempAddr,
          district: address(res.data.data.temporaryAddress, 0),
          province: address(res.data.data.temporaryAddress, 1),
          municipality: address(res.data.data.temporaryAddress, 2),
          ward: address(res.data.data.temporaryAddress, 3),
          tole: address(res.data.data.temporaryAddress, 4),
        })
        setPermanentAddr({
          ...permanentAddr,
          district: address(res.data.data.permanentAddress, 0),
          province: address(res.data.data.permanentAddress, 1),
          municipality: address(res.data.data.permanentAddress, 2),
          ward: address(res.data.data.permanentAddress, 3),
          tole: address(res.data.data.permanentAddress, 3),
        })
        setContact({
          ...contact,
          primaryMobile: res.data.data.contact.primaryMobile,
          secondaryMobile: res.data.data.contact.secondaryMobile,
          telephone: res.data.data.contact.telephone,
          otherEmail: res.data.data.contact.otherEmail,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    populateForm()
  }, [])

  const submitKycForm = () => {
    setSubmitting(true)

    let formData = new FormData()
    formData.append('permanentAddress', JSON.stringify(permanentAddr))
    formData.append('temporaryAddress', JSON.stringify(tempAddr))
    formData.append('contact', JSON.stringify(contact))
    formData.append('firstName', kyc.firstName)
    formData.append('middleName', kyc.middleName)
    formData.append('lastName', kyc.lastName)
    formData.append('dob', kyc.dob)
    formData.append('gender', kyc.gender)
    formData.append('citizenShipNumber', kyc.citizenShipNumber)
    formData.append('maritalStatus', kyc.maritalStatus)
    formData.append('citizenShipPhotoFront', citizenShipFront)
    formData.append('citizenShipPhotoBack', citizenShipBack)
    formData.append('email', localStorage.getItem('email'))

    axios({
      method: 'post',
      url: 'http://localhost:8081/registration/registerKYC',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(function (response) {
        setSubmitting(false)
        populateForm()
        alert('Kyc submitted successfully')
      })
      .catch(function (response) {
        console.log(response)
        setSubmitting(false)
        alert('Error in submitting Kyc')
      })
  }

  return (
    <CForm className="row g-3">
      {kyc.verificationStatus !== '' && (
        <p style={{ marginBottom: '30px' }}>
          {kyc.verificationStatus ? (
            <span style={{ color: 'green', fontSize: '1.1em' }}>Kyc Verified</span>
          ) : (
            <span style={{ color: 'red', fontSize: '1.1em' }}>Kyc Not Verified</span>
          )}
        </p>
      )}
      <h2 style={{ fontWeight: 'bold' }}>Personal Information</h2>
      <CCol md={4}>
        <CFormInput
          type="text"
          id="firstName"
          label="First Name"
          value={kyc.firstName}
          onChange={(e) => handleInputChange('firstName', e)}
        />
      </CCol>
      <CCol md={4}>
        <CFormInput
          type="text"
          id="middleName"
          label="Middle Name"
          value={kyc.middleName}
          onChange={(e) => handleInputChange('middleName', e)}
        />
      </CCol>
      <CCol md={4}>
        <CFormInput
          type="text"
          id="lastName"
          label="Last Name"
          value={kyc.lastName}
          onChange={(e) => handleInputChange('lastName', e)}
        />
      </CCol>

      <CCol md={4}>
        <CFormInput
          type="date"
          id="dob"
          label="Date of Birth"
          value={kyc.dob}
          onChange={(e) => handleInputChange('dob', e)}
        />
      </CCol>

      <CCol md={4}>
        <CFormSelect
          id="maritalStatus"
          label="Marital Status"
          onChange={(e) => handleInputChange('maritalStatus', e)}
        >
          <option selected={kyc.maritalStatus === 'Not Married'}>Not Married</option>
          <option selected={kyc.maritalStatus === 'Married'}>Married</option>
          <option selected={kyc.maritalStatus === 'Divorced'}>Divorced</option>
        </CFormSelect>
      </CCol>

      <CCol md={4}>
        <CFormSelect id="gender" label="Gender" onChange={(e) => handleInputChange('gender', e)}>
          <option selected={kyc.gender === 'Female'}>Female</option>
          <option selected={kyc.gender === 'Male'}>Male</option>
          <option selected={kyc.gender === 'Other'}>Other</option>
        </CFormSelect>
      </CCol>

      <div className="mt-5" />

      <h2 style={{ fontWeight: 'bold' }}>Permanent Address</h2>

      <CCol md={3}>
        <CFormInput
          id="district"
          label="District"
          value={permanentAddr.district}
          onChange={(e) => handlePermanentAddressChange('district', e)}
        />
      </CCol>
      <CCol md={2}>
        <CFormSelect
          id="province"
          label="Province"
          onChange={(e) => handlePermanentAddressChange('province', e)}
        >
          <option selected={permanentAddr.province === 'Province 1'}>Province 1</option>
          <option selected={permanentAddr.province === 'Province 2'}>Province 2</option>
          <option selected={permanentAddr.province === 'Province 3'}>Province 3</option>
          <option selected={permanentAddr.province === 'Province 4'}>Province 4</option>
          <option selected={permanentAddr.province === 'Province 5'}>Province 5</option>
          <option selected={permanentAddr.province === 'Province 6'}>Province 6</option>
          <option selected={permanentAddr.province === 'Province 7'}>Province 7</option>
        </CFormSelect>
      </CCol>
      <CCol md={3}>
        <CFormInput
          id="municipality"
          label="Municipality"
          value={permanentAddr.municipality}
          onChange={(e) => handlePermanentAddressChange('municipality', e)}
        />
      </CCol>
      <CCol md={2}>
        <CFormInput
          id="ward"
          label="Ward No."
          value={permanentAddr.ward}
          onChange={(e) => handlePermanentAddressChange('ward', e)}
        />
      </CCol>
      <CCol md={2}>
        <CFormInput
          id="tole"
          label="Tole"
          value={permanentAddr.tole}
          onChange={(e) => handlePermanentAddressChange('tole', e)}
        />
      </CCol>
      <div className="mt-5" />

      <h2 style={{ fontWeight: 'bold' }}>Temporary Address</h2>

      <CCol md={3}>
        <CFormInput
          id="tempDistrict"
          label="District"
          value={tempAddr.district}
          onChange={(e) => handleTempAddressChange('district', e)}
        />
      </CCol>
      <CCol md={2}>
        <CFormSelect
          id="tempProvince"
          label="Province"
          onChange={(e) => handleTempAddressChange('province', e)}
        >
          <option selected={tempAddr.province === 'Province 1'}>Province 1</option>
          <option selected={tempAddr.province === 'Province 2'}>Province 2</option>
          <option selected={tempAddr.province === 'Province 3'}>Province 3</option>
          <option selected={tempAddr.province === 'Province 4'}>Province 4</option>
          <option selected={tempAddr.province === 'Province 5'}>Province 5</option>
          <option selected={tempAddr.province === 'Province 6'}>Province 6</option>
          <option selected={tempAddr.province === 'Province 7'}>Province 7</option>
        </CFormSelect>
      </CCol>
      <CCol md={3}>
        <CFormInput
          id="tempMunicipality"
          label="Municipality"
          value={tempAddr.municipality}
          onChange={(e) => handleTempAddressChange('municipality', e)}
        />
      </CCol>
      <CCol md={2}>
        <CFormInput
          id="tempWard"
          label="Ward No."
          value={tempAddr.ward}
          onChange={(e) => handleTempAddressChange('ward', e)}
        />
      </CCol>
      <CCol md={2}>
        <CFormInput
          id="tempTole"
          label="Tole"
          value={tempAddr.tole}
          onChange={(e) => handleTempAddressChange('tole', e)}
        />
      </CCol>

      <div className="mt-5" />

      <h2 style={{ fontWeight: 'bold' }}>Contact</h2>
      <CCol md={3}>
        <CFormInput
          id="telephone"
          label="Telephone"
          value={contact.telephone}
          onChange={(e) => handleContactChange('telephone', e)}
        />
      </CCol>

      <CCol md={3}>
        <CFormInput
          id="primaryMobile"
          label="Primary Mobile"
          value={contact.primaryMobile}
          onChange={(e) => handleContactChange('primaryMobile', e)}
        />
      </CCol>

      <CCol md={3}>
        <CFormInput
          id="secMobile"
          label="Secondary Mobile"
          value={contact.secondaryMobile}
          onChange={(e) => handleContactChange('secondaryMobile', e)}
        />
      </CCol>

      <CCol md={3}>
        <CFormInput
          type="email"
          id="email"
          label="Email"
          value={contact.otherEmail}
          onChange={(e) => handleContactChange('otherEmail', e)}
        />
      </CCol>

      <div className="mt-5" />

      <h2 style={{ fontWeight: 'bold' }}>Citizenship</h2>

      <CCol md={3}>
        <CFormInput
          type="text"
          id="citizenShipNumber"
          label="CitizenShip Number"
          value={kyc.citizenShipNumber}
          onChange={(e) => handleInputChange('citizenShipNumber', e)}
        />
      </CCol>
      <CCol md={3}>
        <CFormInput
          type="file"
          id="citizenshipFront"
          label="Front"
          onChange={handleCitizenShipFront}
        />
      </CCol>

      <CCol md={3}>
        <CFormInput
          type="file"
          id="citizenshipBack"
          label="Back"
          onChange={handleCitizenShipBack}
        />
      </CCol>

      <div style={{ marginTop: '100px', display: 'flex' }}>
        <a
          href={`http://localhost:8081/registration/documents/${kyc.citizenShipFrontPath}`}
          style={{ cursor: 'zoom-in', marginRight: '120px' }}
        >
          <img
            src={`http://localhost:8081/registration/documents/${kyc.citizenShipFrontPath}`}
            style={{ height: '300px', width: '300px' }}
            alt={'Citizenship front'}
          />
          <figcaption>Citizenship Front</figcaption>
        </a>

        <a
          href={`http://localhost:8081/registration/documents/${kyc.citizenShipBackPath}`}
          style={{ cursor: 'zoom-in' }}
        >
          <img
            src={`http://localhost:8081/registration/documents/${kyc.citizenShipBackPath}`}
            style={{ height: '300px', width: '300px' }}
            alt={'Citizenship Back'}
          />
          <figcaption>Citizenship Back</figcaption>
        </a>
      </div>

      <div className="mt-4" />

      <CCol xs={12}>
        {submitting ? (
          <CButton
            disabled={true}
            className="mb-3"
            style={{ background: 'navy' }}
            type="submit"
            onClick={submitKycForm}
          >
            <CSpinner component="span" size="sm" />
            &nbsp;Submitting
          </CButton>
        ) : (
          <CButton
            className="mb-3"
            style={{ background: 'navy' }}
            type="submit"
            onClick={submitKycForm}
          >
            Submit
          </CButton>
        )}
      </CCol>
    </CForm>
  )
}
export default KycForm
