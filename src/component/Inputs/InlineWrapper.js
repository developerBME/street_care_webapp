const InlineWrapper = ({ children }) => {
  return (
    <div name="horizontal 2inputs" className="w-full flex gap-[2rem]">
      {children}
    </div>
  );
};

export default InlineWrapper;
