import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import './css/services.css';
import { FaWhatsapp } from 'react-icons/fa';
import { db } from './Auth'; // Assuming Firebase has been initialized
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Services = ({ isAdmin }) => {
  const [services, setServices] = useState([
    { title: 'Cybersecurity', description: 'Protecting digital assets and ensuring security against threats.' },
    { title: 'Web Development', description: 'Creating user-friendly and responsive websites.' },
    { title: 'Database', description: 'Efficiently organizing and managing data.' },
    { title: 'Electrical Engineering', description: 'Design and implementation of electrical systems.' },
    { title: 'Document Writing', description: 'Professional technical documentation services.' },
    { title: 'Graphic Designing', description: 'Visually appealing designs for branding and marketing.' },
  ]);
  const [userId, setUserId] = useState(null);
  const [purchasedServices, setPurchasedServices] = useState([]);
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);
  const [voucher, setVoucher] = useState({ discount: 0, id: '' });

  const [showForm, setShowForm] = useState(false);
  const [newService, setNewService] = useState({ title: '', description: '' });

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const generateVoucherId = () => {
    return Math.random().toString(36).substr(2, 5).toUpperCase();
  };

  const calculateDiscount = (purchaseCount) => {
    if (purchaseCount === 3) return { discount: 3, id: generateVoucherId() };
    if (purchaseCount === 4) return { discount: 5, id: generateVoucherId() };
    if (purchaseCount === 5) return { discount: 10, id: generateVoucherId() };
    return null;
  };

  useEffect(() => {
    const currentUser = getCookie('userId');
    if (currentUser) {
      setUserId(currentUser);

      const fetchUserData = async () => {
        try {
          const userRef = doc(db, 'users', currentUser);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setPurchasedServices(userData.purchasedServices || []);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchUserData();
    }
  }, []);

  const isServicePurchased = (serviceTitle) => {
    return purchasedServices.includes(serviceTitle);
  };

  const updatePurchasedServices = async (serviceTitle) => {
    if (!userId) {
      alert('Please log in to purchase services.');
      return;
    }

    try {
      const userRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const currentPurchasedServices = userData.purchasedServices || [];

        if (!currentPurchasedServices.includes(serviceTitle)) {
          currentPurchasedServices.push(serviceTitle);
          await setDoc(userRef, { purchasedServices: currentPurchasedServices }, { merge: true });

          setPurchasedServices(currentPurchasedServices);

          const purchaseCount = currentPurchasedServices.length;
          const discountInfo = calculateDiscount(purchaseCount);

          if (discountInfo) {
            setVoucher(discountInfo);
            setShowDiscountPopup(true);
          }

          alert(`Successfully purchased ${serviceTitle}`);
        } else {
          alert('You have already purchased this service.');
        }
      }
    } catch (error) {
      console.error('Error purchasing service:', error);
      alert('An error occurred while purchasing the service.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    if (newService.title && newService.description) {
      try {
        setServices((prevServices) => [...prevServices, newService]);
        setShowForm(false);
        setNewService({ title: '', description: '' });
      } catch (error) {
        console.error('Error adding new service:', error);
      }
    } else {
      alert('Please provide both a title and description for the service.');
    }
  };

  return (
    <div className="services-first">
      <Navbar />

      {isAdmin && (
        <div className="add-service-wrapper">
          <div className="add-service-icon" onClick={() => setShowForm(!showForm)}>
            +
          </div>
          {showForm && (
            <div className="add-service-form">
              <form onSubmit={handleAddService}>
                <input
                  type="text"
                  name="title"
                  placeholder="Service Title"
                  value={newService.title}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
                <textarea
                  name="description"
                  placeholder="Service Description"
                  value={newService.description}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                />
                <button type="submit" className="add-service-button">
                  Add Service
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      <div className="services-page">
        <h2>Our Services</h2>
        <p>We offer a wide range of professional services to meet your business needs.</p>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="btn-wrap">
                {isServicePurchased(service.title) ? (
                  <button className="btn-buy purchased" disabled>
                    Already Purchased
                  </button>
                ) : (
                  <button
                    className="btn-buy"
                    onClick={() => updatePurchasedServices(service.title)}
                  >
                    Buy Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showDiscountPopup && (
        <div className="discount-popup">
          <div className="popup-content">
            <h3>Congratulations!</h3>
            <p>You have earned a discount voucher.</p>
            <p>
              Discount: <strong>{voucher.discount}%</strong>
            </p>
            <p>Your voucher ID: <strong>{voucher.id}</strong></p>
            <button className="claim-button" onClick={() => setShowDiscountPopup(false)}>
              Claim
            </button>
          </div>
        </div>
      )}

      <Footer />

      <a
        href="https://wa.me/+923279546260"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-icon"
      >
        <FaWhatsapp />
      </a>
    </div>
  );
};

export default Services;
