import React from "react";
import PropTypes from "prop-types";

const Button = ({ text, onClick, className, color }) => {
    return (
        <button data-testid="button" className={className} onClick={onClick} style={{ color: color }} >
            {text}{" "}
        </button>
    );
};
Button.defaultProps = {
    color: "rgb(108,212,218)",
};

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
