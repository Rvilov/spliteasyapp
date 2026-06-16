import { useState, useEffect } from 'react';

import { groupsService, createGroupService } from '../services/group.services';

import GrupoCard from '../components/GrupoCard';

function Groups() {
  const [groups, setGroups] = useState([]);
  const [newGroup, setNewGroup] = useState('');
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    groupsService()
      .then((res) => setGroups(res.grupos ?? []))
      .catch((err) => console.log(err));
  }, [refresh]);

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

  return (
    <div
      className=" w-full h-screen 
      flex
      flex-col
      items-left
      justify-start
      gap-4
    "
    >
      <div className="aurora-glow "></div>
      <h2 className="text-white text-2xl font-bold w-full px-5 mt-5">
        Tus grupos
      </h2>
      <div className="text-white flex flex-row flex-wrap justify-around items-center w-screen h-auto">
        <div className=" flex flex-col justify-around items-center rounded-lg p-4 min-w-70 min-h-40 max-w-140 max-h-80 m-4 bg-[#1a1e20] glass-card">
          <input
            type="text"
            placeholder="Group Name"
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
            className=" bg-[#2A2C30] rounded text-white placeholder:text-gray-500 px-2 w-50 h-10 focus:outline-none focus:ring-1 focus:ring-[#00D1FF]  "
          />

          <input
            type="button"
            value="New group"
            onClick={() => {
              handleCreateGroup(newGroup);
            }}
            className="bg-[#00D1FF] text-[#1A1C20] rounded px-4 py-2 font-bold cursor-pointer hover:bg-[#00D1FF]/90 transition-colors"
          />
        </div>
        {groups.length === 0 ? (
          <h2>No groups found</h2>
        ) : (
          groups.map((grupo) => (
            <GrupoCard key={grupo.id} name={grupo.name} id={grupo.id} />
          ))
        )}
      </div>
    </div>
  );
}

export default Groups;
