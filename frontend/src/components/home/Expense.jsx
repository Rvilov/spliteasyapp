function Expense({ description, name, amount }) {
  return (
    <div className="flex w-full flex-row justify-between border rounded-2xl px-8 h-18 items-center bg-[#2A2C30]  border-gray-500">
      <div>
        <p>{description}</p>
        <p className="text-gray-400 text-xs">{name}</p>
      </div>

      <p>${amount}</p>
    </div>
  );
}

export default Expense;
