import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { LoadingIcon } from './icons';
import Challenge from './challenge';

const Card = ({ text, fetchCaptcha, submitResponse }) => {
  const [key, setKey] = useState(Math.random());
  const [captcha, setCaptcha] = useState(false);
  const isMounted = useRef(false);

  const refreshCaptcha = () => {
    fetchCaptcha().then((newCaptcha) => {
      setTimeout(() => {
        if (!isMounted.current) return;
        setKey(Math.random());
        setCaptcha(newCaptcha);
      }, 300);
    });
  };
  const completeCaptcha = (response, trail) =>
    new Promise((resolve) => {
      submitResponse(response, trail).then((verified) => {
        if (verified) {
          resolve(true);
        } else {
          refreshCaptcha();
          resolve(false);
        }
      });
    });

  useEffect(() => {
    isMounted.current = true;
    refreshCaptcha();
    return () => { isMounted.current = false; };
  }, []);

  return (
    <div
      className="scaptcha-card-container scaptcha-card-element"
      style={{
        position: 'absolute',
        left: '0',
        width: '100%',
        textAlign: '-webkit-center',
        zIndex: '1',
      }}
    >
      {captcha ? (
        <Challenge
          key={key}
          text={text}
          captcha={captcha}
          completeCaptcha={completeCaptcha}
        />
      ) : (
        <div
          className="scaptcha-card-loading scaptcha-card-element"
          style={{ width: '100%', padding: '15px 15px 0px 15px' }}
        >
          <LoadingIcon />
        </div>
        )}
    </div>
  );
};

Card.propTypes = {
  fetchCaptcha: PropTypes.func.isRequired,
  submitResponse: PropTypes.func.isRequired,
  text: PropTypes.shape({
    anchor: PropTypes.string,
    challenge: PropTypes.string,
  }).isRequired,
};

export default Card;
