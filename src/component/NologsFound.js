const NoLogsFound = ({ message, icon:Icon }) => {
  return (
    <div className="col-span-3 w-full flex flex-col items-center justify-center min-h-[400px] py-16 gap-4">
      <Icon className="w-20 h-20 text-gray-300" />
      <p className="text-black text-xl font-medium font-dmsans">
        {message}
      </p>
    </div>
  );
};

export default NoLogsFound;