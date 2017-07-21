
const K_SIZE = 30;

const markerStyle = {
  // initially any map object has left top corner at lat lng coordinates
  // it's on you to set object origin to 0,0 coordinates
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  border: '5px solid #1b6ec2',
  borderRadius: K_SIZE,
  backgroundColor: '#1b6ec2',
  textAlign: 'center',
  color: 'white',
  fontSize: 14,
  fontWeight: 'bold',
  padding: 2,
  cursor: 'pointer'
};

const markerStyleHover = {
  ...markerStyle,
  border: '5px solid white',
  backgroundColor: 'white',
  color: '#1b6ec2'
};

const hintStyle = {
  display: 'none',
  padding: '5px',
  width: '150px',
  left: '-65px',
  fontWeight: 'none',
  borderRadius: '5px',
  position: 'absolute',
  fontSize: '14px',
  backgroundColor: '#1b6ec2',
  color: 'white',
  top: K_SIZE - 5
};

const hintStyleHover = {
  ...hintStyle,
  display: 'block'
};



export {hintStyle, hintStyleHover, markerStyle, markerStyleHover};
