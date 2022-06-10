import { CButton, CCol, CForm, CFormInput, CFormSelect } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const KycForm = () => {
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
    setTempAddr({ ...permanentAddr, [key]: e.target.value })
  }

  const handleContactChange = (key, e) => {
    setContact({ ...contact, [key]: e.target.value })
  }

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
  })
  useEffect(() => {
    console.log('hello')

    axios
      .post('http://localhost:8081/api/v1/getKYC', {
        email: 'zignuyospo@vusra.com',
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
        })
        setTempAddr({
          ...tempAddr,
          district: address(res.data.data.temporaryAddress, 0),
          province: address(res.data.data.temporaryAddress, 1),
          municipality: address(res.data.data.temporaryAddress, 2),
          tole: address(res.data.data.temporaryAddress, 3),
        })
        setPermanentAddr({
          ...permanentAddr,
          district: address(res.data.data.permanentAddress, 0),
          province: address(res.data.data.permanentAddress, 1),
          municipality: address(res.data.data.permanentAddress, 2),
          tole: address(res.data.data.permanentAddress, 3),
        })
        setContact({
          ...contact,
          primaryMobile: res.data.data.primaryMobile,
          secondaryMobile: res.data.data.secondaryMobile,
          telephone: res.data.data.telephone,
          otherEmail: res.data.data.otherEmail,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <CForm className="row g-3">
      <h2 style={{ fontWeight: 'bold' }}>Personal Information</h2>
      <p>{JSON.stringify(kyc)}</p>
      <p>{JSON.stringify(tempAddr)}</p>
      <p>{JSON.stringify(permanentAddr)}</p>
      <p>{JSON.stringify(contact)}</p>
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
        <CFormInput type="file" id="citizenshipFront" label="Front" />
      </CCol>

      <CCol md={3}>
        <CFormInput type="file" id="citizenshipBack" label="Back" />
      </CCol>

      <div className="mt-4" />

      <CCol xs={12}>
        <CButton className="mb-3" style={{ background: 'navy' }} type="submit">
          Submit
        </CButton>
      </CCol>
    </CForm>
  )
}

export default KycForm
