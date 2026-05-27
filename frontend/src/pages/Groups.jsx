import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { groupsService, createGroupService } from '../services/group.services';

function Groups() {
  const navigate = useNavigate();
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState('');
  const [refresh, setRefresh] = useState(0);

  const handleCreateGroup = async (name) => {
    if (name === '' || name === undefined) {
      alert.error('Group name is required');
      return;
    } else {
      await createGroupService(name);
      setRefresh((prev) => prev + 1);
      setNewGroup('');
    }
  };

  useEffect(() => {
    groupsService()
      .then((res) => setGroups(res.grupos ?? []))
      .catch((err) => console.log(err));
  }, [refresh]);

  return (
    <div>
      {groups.length === 0 ? (
        <h2>No groups found</h2>
      ) : (
        groups.map((grupo) => (
          <div key={grupo.id}>
            <h3>{grupo.name}</h3>
            <h3>{grupo.id}</h3>
            <input
              type="button"
              value="Ver Grupo"
              onClick={() => navigate(`/groupdetail/${grupo.id}`)}
            />
          </div>
        ))
      )}

      <div>
        <input
          type="text"
          placeholder="Group Name"
          value={newGroup}
          onChange={(e) => setNewGroup(e.target.value)}
        />

        <input
          type="button"
          value="New group"
          onClick={() => {
            handleCreateGroup(newGroup);
          }}
        />
      </div>
    </div>
  );
}

export default Groups;
