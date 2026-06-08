import { verGrupoService } from '../services/group.services';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function GrupoCard({ name, id }) {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);

  useEffect(() => {
    verGrupoService(id)
      .then((res) => setMembers(res.miembros ?? []))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div
      key={id}
      className=" rounded-lg p-4 min-w-70 min-h-40 max-w-140 max-h-80 m-4 bg-[#1A1C20] glass-card flex flex-col justify-between"
    >
      <h3 className="text-white text-xl font-bold max-w-50 truncate">{name}</h3>

      <p className="text-gray-400">Miembros: {members.length + 1}</p>
      <input
        type="button"
        value="Ver Grupo"
        onClick={() => navigate(`/groupdetail/${id}`)}
        className="bg-[#202123] text-white rounded px-4 py-2 font-bold cursor-pointer hover:bg-[#2A2C30]/90 transition-colors"
      />
    </div>
  );
}

export default GrupoCard;
