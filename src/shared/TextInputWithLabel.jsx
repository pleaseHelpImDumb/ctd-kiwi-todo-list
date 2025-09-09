import styled, {keyframes} from "styled-components";

const glowAnimation = keyframes`
  0% {
    border-color: #573d1c; // Magenta
    box-shadow: 0 0 10px #573d1c;
  }
  25% {
    border-color: #4c956c; // Cyan
    box-shadow: 0 0 10px #4c956c;
  }
  50% {
    border-color: #e3f09b; // Yellow
    box-shadow: 0 0 10px #e3f09b;
  }  
  75% {
  border-color: #4c956c; // Cyan
  box-shadow: 0 0 10px #4c956c;
  }
  100% {
    border-color: #573d1c; // Back to Magenta for a smooth loop
    box-shadow: 0 0 10px #573d1c;
  }
`;

const StyledInput = styled.input`
width:50px;
border-style: solid;
border-width:5px;
animation: ${glowAnimation} 4s linear infinite;
`;

function TextInputWithLabel({ elementId, label, onChange, ref, value }) {
  return (
    <>
      <label htmlFor={elementId}>{label}</label>
      <StyledInput
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default TextInputWithLabel;
