import React, { useState, useEffect } from 'react';
import { TypingText } from './Typingeffect';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    mail: '',
    ids: ''
  });
  const [submittedData, setSubmittedData] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data for demonstration - replace with actual API call
useEffect(() => {
  const fetchData = async () => {
    // try {
    //   const response = await fetch('https://uti1ng6zpl.execute-api.eu-north-1.amazonaws.com/dev/data');
    //   const result = await response.json();

    //   if (Array.isArray(result.items)) {
    //     const formattedItems = result.items.map(item => ({
    //       id: item.id?.S || '',
    //       name: item.name?.S || '',
    //       email: item.email?.S || '',
    //       timestamp: item.timestamp?.S || new Date().toISOString()
    //     }));
    //     setSubmittedData(formattedItems);
    //   } else {
    //     console.warn("Unexpected response format:", result);
    //   }
    // } catch (error) {
    //   console.error("Failed to fetch data:", error);
    // }
  };

  fetchData();
}, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
  setIsSubmitting(true);

  const dataToSend = {
    id: formData.ids.trim(),
    name: formData.name.trim(),
    email: formData.mail.trim()
  };

  try {
    const response = await fetch('https://uti1ng6zpl.execute-api.eu-north-1.amazonaws.com/dev/receive', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dataToSend)
    });

    if (!response.ok) throw new Error(`Server error: ${response.statusText}`);

    alert("✅ Submission Successful!");

    // Optimistically update UI
    setSubmittedData(prev => [
      {
        ...dataToSend,
        timestamp: new Date().toISOString()
      },
      ...prev
    ]);

    setFormData({ name: '', mail: '', ids: '' }); // Clear form

  } catch (error) {
    console.error("Submission Error:", error);
    alert("🚫 An error occurred while submitting. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};


  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div style={styles.container}>
      {/* Sticky Navigation */}
      <nav style={styles.navbar}>
        <div style={styles.navContent}>
          <div style={styles.logo}>
            <span style={styles.logoText}> Tickup</span>
          </div>

        </div>
      </nav>

      {/* Hero Section with Form */}
      <section id="form" style={styles.heroSection}>
        <div style={styles.formContainer}>
          <div style={styles.heroHeader}>
            <h1 style={styles.heroTitle}>
              Submit Your <TypingText text="Information" />
            </h1>

            <p style={styles.heroSubtitle}>
              Join our community by submitting your details. We'll keep your information secure and organized.
            </p>
          </div>

          {/* Form Container */}
          <div style={styles.formCard}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <div style={styles.inputContainer}>
                <span style={styles.inputIcon}>👤</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <div style={styles.inputContainer}>
                <span style={styles.inputIcon}>📧</span>
                <input
                  type="email"
                  name="mail"
                  value={formData.mail}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>ID Number</label>
              <div style={styles.inputContainer}>
                <span style={styles.inputIcon}>#️⃣</span>
                <input
                  type="text"
                  name="ids"
                  value={formData.ids}
                  onChange={handleChange}
                  required
                  placeholder="Enter your ID number"
                  style={styles.input}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                ...styles.submitButton,
                ...(isSubmitting ? styles.submitButtonDisabled : {})
              }}
            >
              {isSubmitting ? (
                <>
                  <span style={styles.spinner}>⏳</span>
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>🚀</span>
                  <span>Submit Information</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Submitted Data Section */}
      <section id="data" style={styles.dataSection}>
        <div style={styles.dataContainer}>
          <div style={styles.dataHeader}>
            <h2 style={styles.dataTitle}>👥 Recent Submissions</h2>
            <p style={styles.dataSubtitle}>
              Here are the latest entries from our community members
            </p>
          </div>

          <div style={styles.cardsGrid}>
            {submittedData.map((item, index) => (
              <div key={`${item.id}-${index}`} style={styles.card}>
                <div style={styles.cardHeader}>
                  <div style={styles.cardAvatar}>
                    <span style={styles.cardAvatarIcon}>👤</span>
                  </div>
                  <div>
                    <h3 style={styles.cardName}>{item.name}</h3>
                    <p style={styles.cardId}>ID: {item.id}</p>
                  </div>
                </div>

                <div style={styles.cardContent}>
                  <div style={styles.cardEmail}>
                    <span style={styles.cardEmailIcon}>📧</span>
                    <span style={styles.cardEmailText}>{item.email}</span>
                  </div>

                  <div style={styles.cardFooter}>
                    <p style={styles.cardTimestamp}>
                      Submitted: {formatDate(item.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {submittedData.length === 0 && (
            <div style={styles.emptyState}>
              <div style={styles.emptyStateIcon}>👥</div>
              <h3 style={styles.emptyStateTitle}>No submissions yet</h3>
              <p style={styles.emptyStateText}>Be the first to submit your information!</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerGrid}>
            <div style={styles.footerSection}>
              <div style={styles.footerLogo}>
                <span style={styles.footerLogoText}>✨ Tickup</span>
              </div>
              <div style={{display:"flex", justifyContent:"space-between"}}>

              <p style={styles.footerDescription}>
                Building the future of data collection with beautiful, secure, and user-friendly forms.
              </p>
              <p style={styles.footerCopyright}>&copy; 2025 Tickup, Inc. All rights reserved.</p>
              </div>

            </div>


            
          </div>

        
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
  },

  navbar: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 2px 20px rgba(0, 0, 0, 0.1)'
  },

  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70px'
  },

  logo: {
    display: 'flex',
    alignItems: 'center'
  },

  logoText: {
    fontSize: '24px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },

  navLinks: {
    display: 'flex',
    gap: '30px'
  },

  navLink: {
    textDecoration: 'none',
    color: '#4a5568',
    fontWeight: '500',
    transition: 'color 0.3s ease',
    fontSize: '16px',
    ':hover': {
      color: '#667eea'
    }
  },

  heroSection: {
    padding: '80px 20px',
    textAlign: 'center'
  },

  formContainer: {
    maxWidth: '600px',
    margin: '0 auto'
  },

  heroHeader: {
    marginBottom: '50px'
  },

  heroTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '20px',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
  },

  heroTitleAccent: {
    background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },

  heroSubtitle: {
    fontSize: '20px',
    color: 'rgba(255, 255, 255, 0.9)',
    maxWidth: '500px',
    margin: '0 auto',
    lineHeight: '1.6'
  },

  formCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '40px',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },

  formGroup: {
    marginBottom: '25px',
    textAlign: 'left'
  },

  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: '8px'
  },

  inputContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },

  inputIcon: {
    position: 'absolute',
    left: '15px',
    fontSize: '18px',
    zIndex: 2
  },

  input: {
    width: '100%',
    padding: '15px 15px 15px 50px',
    fontSize: '16px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    backgroundColor: 'rgba(248, 250, 252, 0.8)',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxSizing: 'border-box',
    ':focus': {
      borderColor: '#667eea',
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    }
  },

  submitButton: {
    width: '100%',
    padding: '16px 24px',
    fontSize: '18px',
    fontWeight: '600',
    color: 'white',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 25px rgba(102, 126, 234, 0.6)'
    }
  },

  submitButtonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
    transform: 'none'
  },

  spinner: {
    animation: 'spin 1s linear infinite'
  },

  dataSection: {
    padding: '80px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)'
  },

  dataContainer: {
    maxWidth: '1200px',
    margin: '0 auto'
  },

  dataHeader: {
    textAlign: 'center',
    marginBottom: '50px'
  },

  dataTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '15px',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
  },

  dataSubtitle: {
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.9)',
    maxWidth: '600px',
    margin: '0 auto'
  },

  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px'
  },

  card: {
    backgroundColor: 'white',
    borderRadius: '16px',
    padding: '25px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    ':hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
    }
  },

  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '20px'
  },

  cardAvatar: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  cardAvatarIcon: {
    fontSize: '20px',
    filter: 'brightness(0) invert(1)'
  },

  cardName: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#2d3748',
    margin: '0 0 5px 0'
  },

  cardId: {
    fontSize: '14px',
    color: '#718096',
    margin: 0
  },

  cardContent: {
    borderTop: '1px solid #e2e8f0',
    paddingTop: '15px'
  },

  cardEmail: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '15px'
  },

  cardEmailIcon: {
    fontSize: '16px'
  },

  cardEmailText: {
    fontSize: '14px',
    color: '#4a5568'
  },

  cardFooter: {
    borderTop: '1px solid #f7fafc',
    paddingTop: '10px'
  },

  cardTimestamp: {
    fontSize: '12px',
    color: '#a0aec0',
    margin: 0
  },

  emptyState: {
    textAlign: 'center',
    padding: '60px 20px',
    color: 'white'
  },

  emptyStateIcon: {
    fontSize: '64px',
    marginBottom: '20px',
    opacity: 0.7
  },

  emptyStateTitle: {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '10px',
    color: 'rgba(255, 255, 255, 0.9)'
  },

  emptyStateText: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.7)'
  },

  footer: {
    backgroundColor: '#1a202c',
    color: 'white',
    padding: '20px 20px 20px'
  },

  footerContent: {
    maxWidth: '1200px',
    margin: '0 auto'
  },

  footerGrid: {
    display: 'flex',
    justifyContent:"center",
    alignItems:"center",
    // gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    // marginBottom: '40px'
  },

  footerSection: {
    width:"100%",
    marginBottom:"15px"
    
  },

  footerLogo: {
    marginBottom: '20px'
  },

  footerLogoText: {
    fontSize: '24px',
    fontWeight: 'bold'
  },

  footerDescription: {
    color: '#a0aec0',
    lineHeight: '1.6',
    // maxWidth: '300px'
  },

  footerSectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '20px',
    color: 'white'
  },

  footerList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },

  footerLink: {
    color: '#a0aec0',
    textDecoration: 'none',
    display: 'block',
    padding: '5px 0',
    transition: 'color 0.3s ease',
    ':hover': {
      color: 'white'
    }
  },

  footerContactItem: {
    color: '#a0aec0',
    padding: '5px 0'
  },

  footerBottom: {
    borderTop: '1px solid #2d3748',
    paddingTop: '20px',
    textAlign: "right"
  },

  footerCopyright: {
    color: '#a0aec0',
    margin: 0
  }
};

export default App;