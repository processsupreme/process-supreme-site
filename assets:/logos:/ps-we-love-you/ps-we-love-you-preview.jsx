import React from 'react';

const PSWeLoveYou = () => {
  return (
    <div style={{ 
      backgroundColor: '#0A0A0A', 
      minHeight: '100vh', 
      padding: '60px',
      fontFamily: 'system-ui'
    }}>
      <h1 style={{ 
        color: '#2A2A2A', 
        textAlign: 'center', 
        marginBottom: '60px',
        fontSize: '11px',
        textTransform: 'uppercase',
        letterSpacing: '6px'
      }}>
        PS, We Love You — Signature Element
      </h1>

      {/* Main signature - using Google Font */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');`}
        {`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');`}
        {`@import url('https://fonts.googleapis.com/css2?family=Allura&display=swap');`}
      </style>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '80px',
        maxWidth: '1000px',
        margin: '0 auto'
      }}>

        {/* Version 1: Great Vibes - closest to original */}
        <div style={{ 
          backgroundColor: '#0A0A0A', 
          padding: '60px',
          border: '1px solid #1a1a1a',
          borderRadius: '4px'
        }}>
          <span style={{ color: '#2A2A2A', fontSize: '10px', letterSpacing: '2px', display: 'block', marginBottom: '30px' }}>GREAT VIBES</span>
          <div style={{ 
            transform: 'rotate(-5deg)',
            transformOrigin: 'left center'
          }}>
            <span style={{ 
              fontFamily: '"Great Vibes", cursive',
              fontSize: '72px',
              color: '#722F37',
              letterSpacing: '2px'
            }}>
              PS, we love you
            </span>
          </div>
        </div>

        {/* Version 2: Allura */}
        <div style={{ 
          backgroundColor: '#0A0A0A', 
          padding: '60px',
          border: '1px solid #1a1a1a',
          borderRadius: '4px'
        }}>
          <span style={{ color: '#2A2A2A', fontSize: '10px', letterSpacing: '2px', display: 'block', marginBottom: '30px' }}>ALLURA</span>
          <div style={{ 
            transform: 'rotate(-5deg)',
            transformOrigin: 'left center'
          }}>
            <span style={{ 
              fontFamily: '"Allura", cursive',
              fontSize: '72px',
              color: '#722F37',
              letterSpacing: '2px'
            }}>
              PS, we love you
            </span>
          </div>
        </div>

        {/* Version 3: Dancing Script */}
        <div style={{ 
          backgroundColor: '#0A0A0A', 
          padding: '60px',
          border: '1px solid #1a1a1a',
          borderRadius: '4px'
        }}>
          <span style={{ color: '#2A2A2A', fontSize: '10px', letterSpacing: '2px', display: 'block', marginBottom: '30px' }}>DANCING SCRIPT</span>
          <div style={{ 
            transform: 'rotate(-5deg)',
            transformOrigin: 'left center'
          }}>
            <span style={{ 
              fontFamily: '"Dancing Script", cursive',
              fontSize: '72px',
              color: '#722F37',
              fontWeight: '500',
              letterSpacing: '1px'
            }}>
              PS, we love you
            </span>
          </div>
        </div>

        {/* Version 4: Larger, more dramatic */}
        <div style={{ 
          backgroundColor: '#0A0A0A', 
          padding: '80px 60px',
          border: '1px solid #1a1a1a',
          borderRadius: '4px'
        }}>
          <span style={{ color: '#2A2A2A', fontSize: '10px', letterSpacing: '2px', display: 'block', marginBottom: '40px' }}>LARGE FORMAT</span>
          <div style={{ 
            transform: 'rotate(-6deg)',
            transformOrigin: 'left center'
          }}>
            <span style={{ 
              fontFamily: '"Great Vibes", cursive',
              fontSize: '96px',
              color: '#722F37',
              letterSpacing: '3px'
            }}>
              PS, we love you
            </span>
          </div>
        </div>

        {/* Combined with circle mark */}
        <div style={{ 
          backgroundColor: '#0A0A0A', 
          padding: '60px',
          border: '1px solid #1a1a1a',
          borderRadius: '4px'
        }}>
          <span style={{ color: '#2A2A2A', fontSize: '10px', letterSpacing: '2px', display: 'block', marginBottom: '30px' }}>WITH CIRCLE MARK</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <div style={{ 
              width: '100px',
              height: '100px',
              backgroundColor: '#722F37',
              borderRadius: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <span style={{ fontFamily: 'Arial Black', fontSize: '14px', color: '#E3DAC9', letterSpacing: '1px' }}>PROCESS</span>
              <span style={{ fontFamily: 'Arial Black', fontSize: '14px', color: '#E3DAC9', letterSpacing: '1px' }}>SUPREME</span>
            </div>
            <div style={{ 
              transform: 'rotate(-5deg)',
              transformOrigin: 'left center'
            }}>
              <span style={{ 
                fontFamily: '"Great Vibes", cursive',
                fontSize: '56px',
                color: '#722F37',
                letterSpacing: '2px'
              }}>
                PS, we love you
              </span>
            </div>
          </div>
        </div>

        {/* Bone colored version */}
        <div style={{ 
          backgroundColor: '#0A0A0A', 
          padding: '60px',
          border: '1px solid #1a1a1a',
          borderRadius: '4px'
        }}>
          <span style={{ color: '#2A2A2A', fontSize: '10px', letterSpacing: '2px', display: 'block', marginBottom: '30px' }}>BONE COLOR VARIANT</span>
          <div style={{ 
            transform: 'rotate(-5deg)',
            transformOrigin: 'left center'
          }}>
            <span style={{ 
              fontFamily: '"Great Vibes", cursive',
              fontSize: '72px',
              color: '#E3DAC9',
              letterSpacing: '2px'
            }}>
              PS, we love you
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PSWeLoveYou;
