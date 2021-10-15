import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from './card';

const Anchor = ({
  text,
  fetchCaptcha,
  submitResponse,
  openCaptcha,
  verified,
  style,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => { setOpen(false); };
  const handleOpen = () => {
    setOpen(true);
    openCaptcha();
  };
  const handleKey = (e) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      setOpen(true);
      openCaptcha();
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };
  return (
    <div style={{ display: 'flex', flex: '1', position: 'relative' }}>
      <div
        className="scaptcha-anchor-container scaptcha-anchor-element"
        onClick={handleOpen}
      >
        <button
          suppressHydrationWarning
          type="button"
          className="scaptcha-anchor-checkbox scaptcha-anchor-checkbox-default scaptcha-anchor-element"
          onKeyUp={handleKey}
          style={style}
        >
          {/* {verified && (
            <SuccessIcon />
          )} */}
          {text.anchor}
        </button>
        {/* <div className="scaptcha-anchor-label scaptcha-anchor-element">
          {text.anchor}
        </div> */}
      </div>
      {!verified && open && (
        <div>
          <div className="scaptcha-hidden" onClick={handleClose} />
          <Card
            fetchCaptcha={fetchCaptcha}
            submitResponse={submitResponse}
            text={text}
          />
        </div>
      )}
    </div>
  );
};

Anchor.propTypes = {
  fetchCaptcha: PropTypes.func.isRequired,
  submitResponse: PropTypes.func.isRequired,
  text: PropTypes.shape({
    anchor: PropTypes.string,
    challenge: PropTypes.string,
  }).isRequired,
  openCaptcha: PropTypes.func.isRequired,
  verified: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  style: PropTypes.any.isRequired,
};

export default Anchor;
