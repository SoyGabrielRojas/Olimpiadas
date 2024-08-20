// import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Protected(props) {
//   let Cmp = props.Cmp;  
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!localStorage.getItem('user-info')) {
//       navigate('/login');
//     }
//   }, [navigate]);

//   return (
//     <div>
//       <Cmp />
//     </div>
//   );
// }

// export default Protected;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Protected(props) {
  let Cmp = props.Cmp;  
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem('user-info'));

  useEffect(() => {
    if (!user) {
      navigate('/login'); 
    } else if (props.adminOnly && user.role !== 'admin') {
      navigate('/home'); 
    }
  }, [navigate, user, props.adminOnly]);

  return (
    <div>
      <Cmp />
    </div>
  );
}

export default Protected;


