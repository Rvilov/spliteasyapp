import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { groupsService, createGroupService } from '../services/group.services';
import Nav from '../components/Nav';

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
    <div
      className="w-full h-screen bg-[radial-gradient(circle_at_20%_30%,rgba(76,214,255,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(157,80,187,0.08)_0%,transparent_50%)]
      flex
      flex-col
      items-left
      justify-start
      gap-4
    "
    >
      <Nav />
      <h2 className="text-white text-2xl font-bold">Tus grupos</h2>
      <div className="text-white flex flex-row flex-wrap justify-around items-center w-screen h-auto">
        {groups.length === 0 ? (
          <h2>No groups found</h2>
        ) : (
          groups.map((grupo) => (
            <div
              key={grupo.id}
              className=" rounded-lg p-4 min-w-70 min-h-40 max-w-140 max-h-80 m-4 bg-[#1A1C20] glass-card "
            >
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
      </div>
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
