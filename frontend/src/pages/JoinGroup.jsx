import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { joinGroupService } from '../services/group.services';

function JoinGroup() {
  const { inviteToken } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Joining group...');

  useEffect(() => {
    joinGroupService(inviteToken)
      .then((res) => {
        if (res.message === 'ID de usuario es requerido') {
          setStatus('No user ID provided. Please log in and try again.');
        } else if (res.message === 'Usuario no existe') {
          setStatus('User does not exist. Please log in and try again.');
        } else if (res.message === 'Grupo no existe') {
          setStatus(
            'Group does not exist. Please check the invite link and try again.'
          );
        } else if (res.message === 'Usuario ya existe en el grupo') {
          setStatus(
            'You are already a member of this group. Redirecting to groups page...'
          );
          setTimeout(() => {
            navigate('/groups');
          }, 3000);
        } else if (res.message === 'Te uniste al grupo') {
          setStatus(
            'Successfully joined the group! Redirecting to groups page...'
          );
          setTimeout(() => {
            navigate('/groups');
          }, 3000);
        }
      })
      .catch((err) => {
        setStatus('An error occurred while joining the group.' + err.message);
      });
  }, [inviteToken, navigate]);

  return (
    <div>
      <p>{status}</p>
    </div>
  );
}

export default JoinGroup;
