const InlineWrapper = ({ children }) => {
  return (
    <div name="horizontal 2inputs" className="w-full flex flex-col md:flex-row gap-4 md:gap-[2rem]">
      {children}
    </div>
  );
};

export default InlineWrapper;
